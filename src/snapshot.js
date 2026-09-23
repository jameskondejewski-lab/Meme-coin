import { WSOL_MINT } from './lib/context.js';
import * as coingecko from './sources/coingecko.js';
import * as dexscreener from './sources/dexscreener.js';
import * as geckoterminal from './sources/geckoterminal.js';
import * as jupiter from './sources/jupiter.js';
import * as defillama from './sources/defillama.js';
import * as solanaRpc from './sources/solanaRpc.js';
import * as rugcheck from './sources/rugcheck.js';
import { getFearGreed } from './sources/fearGreed.js';
import { crossCheck } from './analysis/crossCheck.js';
import { assessTrending } from './analysis/trending.js';
import { assessTokenSafety } from './analysis/tokenSafety.js';

export const SCHEMA_VERSION = 1;

async function settle(ctx, fn) {
  const fetchedAt = ctx.now().toISOString();
  try {
    return { ok: true, fetchedAt, data: await fn() };
  } catch (err) {
    return { ok: false, fetchedAt, error: err?.message ?? String(err) };
  }
}

/** Attach provenance to a value, or mark it unavailable with the reason. */
function withSource(name, result, pick = (d) => d) {
  if (!result.ok) return { unavailable: true, source: name, reason: result.error };
  const value = pick(result.data);
  if (value === null || value === undefined) return { unavailable: true, source: name, reason: `${name}: no data in response` };
  return { ...value, source: name, fetchedAt: result.fetchedAt };
}

async function reviewMint(ctx, mint, excludeAddresses) {
  const mintInfo = await settle(ctx, () => solanaRpc.getMintInfo(ctx, mint));
  if (!mintInfo.ok) return { unavailable: true, source: 'solana-rpc', reason: mintInfo.error };
  if (!mintInfo.data) return { unavailable: true, source: 'solana-rpc', reason: 'solana-rpc: mint account not found' };
  // Public RPC refuses getTokenLargestAccounts; RugCheck's pool-aware holder list covers it.
  const [largest, rc] = await Promise.all([
    settle(ctx, () => solanaRpc.getLargestTokenAccounts(ctx, mint)),
    settle(ctx, () => rugcheck.getReport(ctx, mint)),
  ]);
  const safety = assessTokenSafety(mintInfo.data, largest.ok ? largest.data : [], {
    excludeAddresses,
    rugcheck: rc.ok ? rc.data : null,
  });
  return {
    ...safety,
    decimals: mintInfo.data.decimals,
    supplyRaw: mintInfo.data.supplyRaw,
    slot: mintInfo.data.slot,
    rugcheck: rc.ok
      ? {
        scoreNormalised: rc.data.scoreNormalised,
        totalHolders: rc.data.totalHolders,
        deepestMarket: rc.data.deepestMarket,
        launchpad: rc.data.launchpad,
        rugged: rc.data.rugged,
      }
      : { unavailable: true, source: 'rugcheck', reason: rc.error },
    // Only report a failed source as missing data when nothing else covered it.
    unavailableReasons: [
      ...(rc.ok ? [] : [rc.error]),
      ...(largest.ok || safety.coverage.concentration === 'rugcheck' ? [] : [largest.error]),
    ],
    source: 'solana-rpc',
    fetchedAt: mintInfo.fetchedAt,
  };
}

/**
 * Total liquidity from two methods that are expected to differ: DexScreener's
 * sum over the listed pools (max 30) and Jupiter's routable aggregate. Both are
 * reported; neither is averaged.
 */
function crossCheckLiquidity(summary, jup) {
  return {
    dexscreenerPoolsUsd: summary ? Math.round(summary.totalLiquidityUsd) : null,
    dexscreenerPoolCount: summary?.poolCount ?? null,
    dexscreenerCapped: summary?.poolCountCapped ?? null,
    jupiterAggregateUsd: jup?.liquidityUsd !== undefined && jup?.liquidityUsd !== null ? Math.round(jup.liquidityUsd) : null,
  };
}

/**
 * Pull every source in parallel, record which ones failed, and derive views.
 * A failed source yields `{unavailable: true, reason}` — never a placeholder value.
 *
 * @param {ReturnType<import('./lib/context.js').createContext>} ctx
 * @param {{watchMints?: string[], excludeAddresses?: string[], mode?: 'live'|'fixtures'}} [opts]
 */
export async function buildSnapshot(ctx, { watchMints = [], excludeAddresses = [], mode = 'live' } = {}) {
  const tasks = {
    'coingecko.prices': () => coingecko.getSpotPrices(ctx),
    'coingecko.memeCategory': () => coingecko.getSolanaMemeCategory(ctx),
    'coingecko.memeLeaders': () => coingecko.getSolanaMemeLeaders(ctx),
    'jupiter.prices': () => jupiter.getPrices(ctx, [WSOL_MINT, ...watchMints]),
    'dexscreener.sol': () => dexscreener.getTokenPairs(ctx, [WSOL_MINT]),
    'dexscreener.boosts': () => dexscreener.getTopBoosts(ctx),
    'geckoterminal.trending': () => geckoterminal.getTrendingPools(ctx),
    'defillama.tvl': () => defillama.getSolanaTvl(ctx),
    'defillama.dexVolume': () => defillama.getSolanaDexVolume(ctx),
    'defillama.stablecoins': () => defillama.getSolanaStablecoinSupply(ctx),
    'alternative.fearGreed': () => getFearGreed(ctx),
  };

  const names = Object.keys(tasks);
  const settled = await Promise.all(names.map((n) => settle(ctx, tasks[n])));
  const r = Object.fromEntries(names.map((n, i) => [n, settled[i]]));

  const cgPrices = r['coingecko.prices'].ok ? r['coingecko.prices'].data : {};
  const jupPrices = r['jupiter.prices'].ok ? r['jupiter.prices'].data : {};
  const solPair = r['dexscreener.sol'].ok ? dexscreener.deepestPairFor(r['dexscreener.sol'].data, WSOL_MINT) : null;

  const solPrice = crossCheck([
    { source: 'coingecko', value: cgPrices.solana?.priceUsd },
    { source: 'jupiter', value: jupPrices[WSOL_MINT]?.priceUsd },
    { source: 'dexscreener', value: solPair?.priceUsd },
  ]);

  const boosts = r['dexscreener.boosts'];
  const paidBoostMints = new Set(boosts.ok ? boosts.data.map((b) => b.tokenAddress) : []);
  const trending = r['geckoterminal.trending'];

  const watchlist = [];
  for (const mint of watchMints) {
    const pools = await settle(ctx, () => dexscreener.getAllPools(ctx, mint));
    const summary = pools.ok ? dexscreener.summarizePools(pools.data, mint) : null;
    const pair = summary?.deepest ?? null;
    watchlist.push({
      mint,
      symbol: pair?.baseSymbol ?? null,
      price: crossCheck([
        { source: 'jupiter', value: jupPrices[mint]?.priceUsd },
        { source: 'dexscreener', value: pair?.priceUsd },
      ]),
      liquidity: crossCheckLiquidity(summary, jupPrices[mint]),
      market: pair
        ? { ...pair, poolCount: summary.poolCount, poolCountCapped: summary.poolCountCapped, fetchedAt: pools.fetchedAt }
        : { unavailable: true, source: 'dexscreener', reason: pools.ok ? 'dexscreener: no Solana pair found' : pools.error },
      // Sequential per mint: public RPC throttles getTokenLargestAccounts hard.
      safety: await reviewMint(ctx, mint, excludeAddresses),
    });
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: ctx.now().toISOString(),
    mode,
    sources: Object.fromEntries(
      names.map((n) => [n, r[n].ok ? { ok: true, fetchedAt: r[n].fetchedAt } : { ok: false, fetchedAt: r[n].fetchedAt, error: r[n].error }]),
    ),
    market: {
      solPrice,
      btc: withSource('coingecko', r['coingecko.prices'], (d) => d.bitcoin),
      eth: withSource('coingecko', r['coingecko.prices'], (d) => d.ethereum),
      sol: withSource('coingecko', r['coingecko.prices'], (d) => d.solana),
      fearGreed: withSource('alternative.me', r['alternative.fearGreed']),
    },
    ecosystem: {
      tvl: withSource('defillama', r['defillama.tvl']),
      dexVolume: withSource('defillama', r['defillama.dexVolume']),
      stablecoins: withSource('defillama', r['defillama.stablecoins']),
    },
    memeSector: {
      category: withSource('coingecko', r['coingecko.memeCategory']),
      leaders: withSource('coingecko', r['coingecko.memeLeaders'], (d) => ({ coins: d })),
    },
    trending: trending.ok
      ? {
        source: 'geckoterminal',
        fetchedAt: trending.fetchedAt,
        paidBoostCheck: boosts.ok ? 'checked' : `unavailable: ${boosts.error}`,
        pools: assessTrending(trending.data, { now: ctx.now(), paidBoostMints }),
      }
      : { unavailable: true, source: 'geckoterminal', reason: trending.error },
    paidBoosts: withSource('dexscreener', boosts, (d) => ({ tokens: d })),
    watchlist,
  };
}
