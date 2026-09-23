import { fetchJson, num } from '../lib/http.js';

const SOURCE = 'geckoterminal';
const BASE = 'https://api.geckoterminal.com/api/v2';
const HEADERS = { accept: 'application/json;version=20230302' };

// GeckoTerminal ids look like "solana_<address>".
const stripNetwork = (id) => (typeof id === 'string' ? id.replace(/^solana_/, '') : null);

function normalizePool(pool, tokensById) {
  const a = pool.attributes ?? {};
  const baseId = pool.relationships?.base_token?.data?.id;
  const quoteId = pool.relationships?.quote_token?.data?.id;
  const [nameBase, nameQuote] = String(a.name ?? '').split(' / ');
  const tx = (w) => ({
    buys: num(a.transactions?.[w]?.buys),
    sells: num(a.transactions?.[w]?.sells),
    buyers: num(a.transactions?.[w]?.buyers),
    sellers: num(a.transactions?.[w]?.sellers),
  });
  return {
    source: SOURCE,
    poolAddress: a.address,
    name: a.name,
    dexId: pool.relationships?.dex?.data?.id ?? null,
    baseAddress: stripNetwork(baseId),
    baseSymbol: tokensById.get(baseId)?.symbol ?? nameBase ?? null,
    quoteSymbol: tokensById.get(quoteId)?.symbol ?? nameQuote ?? null,
    priceUsd: num(a.base_token_price_usd),
    liquidityUsd: num(a.reserve_in_usd),
    fdvUsd: num(a.fdv_usd),
    marketCapUsd: num(a.market_cap_usd),
    volumeUsd: { m5: num(a.volume_usd?.m5), h1: num(a.volume_usd?.h1), h6: num(a.volume_usd?.h6), h24: num(a.volume_usd?.h24) },
    txns: { m5: tx('m5'), h1: tx('h1'), h6: tx('h6'), h24: tx('h24') },
    priceChangePct: {
      m5: num(a.price_change_percentage?.m5),
      h1: num(a.price_change_percentage?.h1),
      h6: num(a.price_change_percentage?.h6),
      h24: num(a.price_change_percentage?.h24),
    },
    createdAt: a.pool_created_at ?? null,
  };
}

async function getPools(ctx, path) {
  const raw = await fetchJson(SOURCE, `${BASE}${path}`, { fetchImpl: ctx.fetchImpl, headers: HEADERS });
  const tokensById = new Map(
    (raw?.included ?? []).filter((x) => x.type === 'token').map((t) => [t.id, t.attributes ?? {}]),
  );
  return (raw?.data ?? []).map((p) => normalizePool(p, tokensById));
}

export const getTrendingPools = (ctx) =>
  getPools(ctx, '/networks/solana/trending_pools?include=base_token,quote_token,dex');

export const getNewPools = (ctx) =>
  getPools(ctx, '/networks/solana/new_pools?include=base_token,quote_token,dex');
