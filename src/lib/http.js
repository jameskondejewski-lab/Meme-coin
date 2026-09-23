// Minimal JSON fetch helper: per-host pacing, timeout, bounded retries on
// 429/5xx (honouring Retry-After), and errors that always name the data source
// so reports can say exactly what failed.

export class SourceError extends Error {
  constructor(source, message, { status, cause } = {}) {
    super(`${source}: ${message}`, { cause });
    this.name = 'SourceError';
    this.source = source;
    this.status = status;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isRetryableStatus(status) {
  return status === 429 || status >= 500;
}

/** Retry-After as seconds or HTTP date -> ms, capped. */
export function retryAfterMs(res, capMs) {
  const raw = res?.headers?.get?.('retry-after');
  if (!raw) return null;
  const secs = Number(raw);
  const ms = Number.isFinite(secs) ? secs * 1000 : Date.parse(raw) - Date.now();
  return Number.isFinite(ms) && ms >= 0 ? Math.min(ms, capMs) : null;
}

// Requests to the same host are serialised and spaced, so parallel snapshot
// tasks don't trip free-tier rate limits (CoinGecko allows only a few calls/min
// without a key).
const hostChains = new Map();
export const HOST_MIN_INTERVAL_MS = { 'api.coingecko.com': 2500, 'api.geckoterminal.com': 2100, 'api.rugcheck.xyz': 1100 };

function paced(url, minIntervalMs, fn) {
  let host;
  try {
    host = new URL(url).host;
  } catch {
    return fn();
  }
  const gap = minIntervalMs ?? HOST_MIN_INTERVAL_MS[host] ?? 0;
  const prev = hostChains.get(host) ?? Promise.resolve();
  const run = prev.then(fn);
  // The next request to this host waits for this one to settle, plus the gap.
  hostChains.set(host, run.catch(() => {}).then(() => sleep(gap)));
  return run;
}

/**
 * @param {string} source  human-readable source name, e.g. "geckoterminal"
 * @param {string} url
 * @param {object} [opts]
 * @param {typeof fetch} [opts.fetchImpl]
 * @param {'GET'|'POST'} [opts.method]
 * @param {Record<string,string>} [opts.headers]
 * @param {unknown} [opts.body]  JSON-serialised when present
 * @param {number} [opts.timeoutMs]
 * @param {number} [opts.retries]  extra attempts after the first
 * @param {number} [opts.backoffMs]
 * @param {number} [opts.maxRetryAfterMs]  longest Retry-After we are willing to wait
 * @param {number} [opts.minIntervalMs]  per-host spacing override (0 disables)
 */
export async function fetchJson(source, url, opts = {}) {
  const {
    fetchImpl = globalThis.fetch,
    method = 'GET',
    headers = {},
    body,
    timeoutMs = 10_000,
    retries = 2,
    backoffMs = 750,
    maxRetryAfterMs = 15_000,
    minIntervalMs,
  } = opts;

  let lastError;
  let waitMs = 0;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await sleep(waitMs || backoffMs * 2 ** (attempt - 1));
    waitMs = 0;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let res;
    try {
      res = await paced(url, minIntervalMs, () =>
        fetchImpl(url, {
          method,
          headers: {
            accept: 'application/json',
            ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
            ...headers,
          },
          body: body !== undefined ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        }),
      );
    } catch (err) {
      const reason = err?.name === 'AbortError' ? `timeout after ${timeoutMs}ms` : err?.message ?? String(err);
      lastError = new SourceError(source, reason, { cause: err });
      continue; // network errors and timeouts are retryable
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      lastError = new SourceError(source, `HTTP ${res.status}`, { status: res.status });
      if (!isRetryableStatus(res.status)) throw lastError;
      waitMs = retryAfterMs(res, maxRetryAfterMs) ?? 0;
      continue;
    }

    try {
      return await res.json();
    } catch (err) {
      throw new SourceError(source, 'response was not valid JSON', { cause: err });
    }
  }
  throw lastError;
}

/** Parse a numeric API field (many APIs return numbers as strings). */
export function num(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}
