import { fetchJson, num } from '../lib/http.js';

const SOURCE = 'coingecko';
const BASE = 'https://api.coingecko.com/api/v3';
export const SOLANA_MEME_CATEGORY = 'solana-meme-coins';

function get(ctx, path) {
  const headers = ctx.config.coingeckoApiKey ? { 'x-cg-demo-api-key': ctx.config.coingeckoApiKey } : {};
  return fetchJson(SOURCE, `${BASE}${path}`, { fetchImpl: ctx.fetchImpl, headers });
}

/** Spot USD prices for CoinGecko coin ids (default: SOL, BTC, ETH). */
export async function getSpotPrices(ctx, ids = ['solana', 'bitcoin', 'ethereum']) {
  const q = new URLSearchParams({
    ids: ids.join(','),
    vs_currencies: 'usd',
    include_market_cap: 'true',
    include_24hr_vol: 'true',
    include_24hr_change: 'true',
    include_last_updated_at: 'true',
  });
  const raw = await get(ctx, `/simple/price?${q}`);
  const out = {};
  for (const id of ids) {
    const row = raw?.[id];
    if (!row) continue;
    out[id] = {
      priceUsd: num(row.usd),
      marketCapUsd: num(row.usd_market_cap),
      volume24hUsd: num(row.usd_24h_vol),
      change24hPct: num(row.usd_24h_change),
      asOf: row.last_updated_at ? new Date(row.last_updated_at * 1000).toISOString() : null,
    };
  }
  return out;
}

/** Sector totals for CoinGecko's "Solana Meme" category. */
export async function getSolanaMemeCategory(ctx) {
  const raw = await get(ctx, '/coins/categories');
  const row = Array.isArray(raw) ? raw.find((c) => c.id === SOLANA_MEME_CATEGORY) : null;
  if (!row) throw new Error(`${SOURCE}: category ${SOLANA_MEME_CATEGORY} not found`);
  return {
    marketCapUsd: num(row.market_cap),
    marketCapChange24hPct: num(row.market_cap_change_24h),
    volume24hUsd: num(row.volume_24h),
    asOf: row.updated_at ?? null,
  };
}

/** Largest Solana meme coins by market cap, with 1h/24h/7d change. */
export async function getSolanaMemeLeaders(ctx, limit = 25) {
  const q = new URLSearchParams({
    vs_currency: 'usd',
    category: SOLANA_MEME_CATEGORY,
    order: 'market_cap_desc',
    per_page: String(limit),
    page: '1',
    price_change_percentage: '1h,24h,7d',
  });
  const raw = await get(ctx, `/coins/markets?${q}`);
  return (Array.isArray(raw) ? raw : []).map((c) => ({
    id: c.id,
    symbol: String(c.symbol ?? '').toUpperCase(),
    name: c.name,
    priceUsd: num(c.current_price),
    marketCapUsd: num(c.market_cap),
    volume24hUsd: num(c.total_volume),
    change1hPct: num(c.price_change_percentage_1h_in_currency),
    change24hPct: num(c.price_change_percentage_24h_in_currency),
    change7dPct: num(c.price_change_percentage_7d_in_currency),
    asOf: c.last_updated ?? null,
  }));
}
