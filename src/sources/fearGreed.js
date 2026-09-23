import { fetchJson, num } from '../lib/http.js';

/** alternative.me Crypto Fear & Greed index (BTC-weighted, market-wide). */
export async function getFearGreed(ctx) {
  const raw = await fetchJson('alternative.me', 'https://api.alternative.me/fng/?limit=1', { fetchImpl: ctx.fetchImpl });
  const row = raw?.data?.[0];
  if (!row) throw new Error('alternative.me: empty response');
  return {
    value: num(row.value),
    classification: row.value_classification ?? null,
    asOf: row.timestamp ? new Date(Number(row.timestamp) * 1000).toISOString() : null,
  };
}
