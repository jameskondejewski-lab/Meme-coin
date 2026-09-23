import { fetchJson, num } from '../lib/http.js';

const SOURCE = 'rugcheck';
const BASE = 'https://api.rugcheck.xyz/v1';
// knownAccounts types that hold tokens on behalf of a pool/locker, not a holder.
const NON_HOLDER_TYPES = new Set(['AMM', 'LOCKER']);

/**
 * RugCheck's full report, normalised. Third-party analysis: use it to
 * cross-check our own RPC reads, never as the only source of truth.
 */
export async function getReport(ctx, mint) {
  const r = await fetchJson(SOURCE, `${BASE}/tokens/${mint}/report`, { fetchImpl: ctx.fetchImpl, timeoutMs: 20_000 });
  const known = r.knownAccounts ?? {};
  const labelOf = (h) => known[h.owner] ?? known[h.address] ?? null;

  const holders = (r.topHolders ?? []).map((h) => ({
    owner: h.owner,
    tokenAccount: h.address,
    pct: num(h.pct),
    insider: Boolean(h.insider),
    label: labelOf(h)?.name ?? null,
    labelType: labelOf(h)?.type ?? null,
  }));
  const realHolders = holders.filter((h) => !NON_HOLDER_TYPES.has(h.labelType));
  const sumPct = (list) => Math.round(list.reduce((s, h) => s + (h.pct ?? 0), 0) * 100) / 100;

  const markets = (r.markets ?? []).map((m) => ({
    type: m.marketType,
    pool: m.pubkey,
    liquidityUsd: (num(m.lp?.baseUSD) ?? 0) + (num(m.lp?.quoteUSD) ?? 0),
    lpLockedPct: num(m.lp?.lpLockedPct),
  }));
  const deepest = markets.sort((a, b) => b.liquidityUsd - a.liquidityUsd)[0] ?? null;

  return {
    scoreNormalised: num(r.score_normalised),
    risks: (r.risks ?? []).map((x) => ({ name: x.name, level: x.level, description: x.description })),
    mintAuthority: r.token?.mintAuthority ?? r.mintAuthority ?? null,
    freezeAuthority: r.token?.freezeAuthority ?? r.freezeAuthority ?? null,
    tokenProgram: r.tokenProgram ?? null,
    totalHolders: num(r.totalHolders),
    totalMarketLiquidityUsd: num(r.totalMarketLiquidity),
    marketCount: markets.length,
    deepestMarket: deepest,
    top1Pct: realHolders.length ? sumPct(realHolders.slice(0, 1)) : null,
    top10Pct: sumPct(realHolders.slice(0, 10)),
    excludedPoolOrLockerAccounts: holders.length - realHolders.length,
    insiderHoldersInTop: holders.filter((h) => h.insider).length,
    graphInsidersDetected: num(r.graphInsidersDetected),
    insiderNetworks: (r.insiderNetworks ?? []).map((n) => ({ size: num(n.size), type: n.type })),
    launchpad: r.launchpad?.name ?? null,
    rugged: Boolean(r.rugged),
  };
}
