import { fetchJson, num } from '../lib/http.js';

const SOURCE = 'dexscreener';
const BASE = 'https://api.dexscreener.com';
const MAX_TOKENS_PER_CALL = 30;

function normalizePair(p) {
  const txn = (w) => ({ buys: num(p.txns?.[w]?.buys), sells: num(p.txns?.[w]?.sells) });
  return {
    source: SOURCE,
    pairAddress: p.pairAddress,
    dexId: p.dexId,
    url: p.url,
    baseAddress: p.baseToken?.address,
    baseSymbol: p.baseToken?.symbol,
    quoteAddress: p.quoteToken?.address,
    quoteSymbol: p.quoteToken?.symbol,
    priceUsd: num(p.priceUsd),
    liquidityUsd: num(p.liquidity?.usd),
    fdvUsd: num(p.fdv),
    marketCapUsd: num(p.marketCap),
    volumeUsd: { m5: num(p.volume?.m5), h1: num(p.volume?.h1), h6: num(p.volume?.h6), h24: num(p.volume?.h24) },
    txns: { m5: txn('m5'), h1: txn('h1'), h6: txn('h6'), h24: txn('h24') },
    priceChangePct: {
      m5: num(p.priceChange?.m5),
      h1: num(p.priceChange?.h1),
      h6: num(p.priceChange?.h6),
      h24: num(p.priceChange?.h24),
    },
    createdAt: p.pairCreatedAt ? new Date(p.pairCreatedAt).toISOString() : null,
    activeBoosts: num(p.boosts?.active) ?? 0,
  };
}

/** All Solana pairs for up to 30 mints per request (batched automatically). */
export async function getTokenPairs(ctx, mints) {
  const pairs = [];
  for (let i = 0; i < mints.length; i += MAX_TOKENS_PER_CALL) {
    const batch = mints.slice(i, i + MAX_TOKENS_PER_CALL);
    const raw = await fetchJson(SOURCE, `${BASE}/tokens/v1/solana/${batch.join(',')}`, { fetchImpl: ctx.fetchImpl });
    const list = Array.isArray(raw) ? raw : raw?.pairs ?? [];
    pairs.push(...list.filter((p) => p.chainId === 'solana').map(normalizePair));
  }
  return pairs;
}

/**
 * Every pool for one token (max 30). Unlike /tokens/v1, which returns only the
 * top pool per token, this is what total on-chain liquidity must be summed from.
 */
export async function getAllPools(ctx, mint) {
  const raw = await fetchJson(SOURCE, `${BASE}/token-pairs/v1/solana/${mint}`, { fetchImpl: ctx.fetchImpl });
  return (Array.isArray(raw) ? raw : []).filter((p) => p.chainId === 'solana').map(normalizePair);
}

/** Liquidity summary for `mint` across its pools (lower bound: API caps at 30 pools). */
export function summarizePools(pools, mint) {
  const own = pools.filter((p) => p.baseAddress === mint || p.quoteAddress === mint);
  const deepest = deepestPairFor(own, mint);
  return {
    poolCount: own.length,
    poolCountCapped: pools.length >= 30,
    totalLiquidityUsd: own.reduce((sum, p) => sum + (p.liquidityUsd ?? 0), 0),
    volume24hUsd: own.reduce((sum, p) => sum + (p.volumeUsd.h24 ?? 0), 0),
    deepest,
  };
}

/** Deepest-liquidity pair where `mint` is the base token. */
export function deepestPairFor(pairs, mint) {
  return pairs
    .filter((p) => p.baseAddress === mint && p.liquidityUsd !== null)
    .sort((a, b) => b.liquidityUsd - a.liquidityUsd)[0] ?? null;
}

/**
 * Tokens with the most DexScreener boosts. Boosts are PAID promotion, so this
 * list measures marketing spend, not organic attention.
 */
export async function getTopBoosts(ctx) {
  const raw = await fetchJson(SOURCE, `${BASE}/token-boosts/top/v1`, { fetchImpl: ctx.fetchImpl });
  return (Array.isArray(raw) ? raw : [])
    .filter((b) => b.chainId === 'solana')
    .map((b) => ({ tokenAddress: b.tokenAddress, totalBoostAmount: num(b.totalAmount), url: b.url, paid: true }));
}
