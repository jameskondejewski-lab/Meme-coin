// Minimal JSON fetch helper: timeout, bounded retries on 429/5xx, and errors
// that always name the data source so reports can say exactly what failed.

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
 */
export async function fetchJson(source, url, opts = {}) {
  const {
    fetchImpl = globalThis.fetch,
    method = 'GET',
    headers = {},
    body,
    timeoutMs = 10_000,
    retries = 1,
    backoffMs = 500,
  } = opts;

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await sleep(backoffMs * 2 ** (attempt - 1));

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let res;
    try {
      res = await fetchImpl(url, {
        method,
        headers: {
          accept: 'application/json',
          ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } catch (err) {
      const reason = err?.name === 'AbortError' ? `timeout after ${timeoutMs}ms` : err?.message ?? String(err);
      lastError = new SourceError(source, reason, { cause: err });
      continue; // network errors and timeouts are retryable
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      lastError = new SourceError(source, `HTTP ${res.status}`, { status: res.status });
      if (isRetryableStatus(res.status)) continue;
      throw lastError;
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
