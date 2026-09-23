import { fetchJson, num } from '../lib/http.js';

const SOURCE = 'jupiter';

/** Jupiter Price API v3: USD price per mint (max 50 mints per call). */
export async function getPrices(ctx, mints) {
  const { jupiterApiBase, jupiterApiKey } = ctx.config;
  const headers = jupiterApiKey ? { 'x-api-key': jupiterApiKey } : {};
  const out = {};
  for (let i = 0; i < mints.length; i += 50) {
    const ids = mints.slice(i, i + 50).join(',');
    const raw = await fetchJson(SOURCE, `${jupiterApiBase}/price/v3?ids=${ids}`, { fetchImpl: ctx.fetchImpl, headers });
    for (const [mint, row] of Object.entries(raw ?? {})) {
      if (!row) continue; // Jupiter omits or nulls mints it cannot price reliably
      out[mint] = { priceUsd: num(row.usdPrice), change24hPct: num(row.priceChange24h), blockId: num(row.blockId) };
    }
  }
  return out;
}
