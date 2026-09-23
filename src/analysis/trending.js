// Heuristics for trending pools. Every flag is an INDICATOR to investigate,
// never proof of manipulation or of organic demand.

export const DEFAULT_THRESHOLDS = {
  newPoolHours: 24,
  thinLiquidityRatio: 0.03, // pool liquidity / FDV ...
  thinLiquidityMaxUsd: 5_000_000, // ... only while the pool is also shallow in absolute terms
  sellPressureRatio: 1.5, // sells / buys over 24h
  highTurnoverRatio: 20, // 24h volume / liquidity
  fewTradersMin: 150, // unique buyers+sellers over 24h ...
  fewTradersVolumeUsd: 250_000, // ... while volume is at least this
};

const ratio = (a, b) => (Number.isFinite(a) && Number.isFinite(b) && b > 0 ? a / b : null);
const round = (n, dp = 2) => (n === null ? null : Math.round(n * 10 ** dp) / 10 ** dp);

export function assessPool(pool, { now = new Date(), paidBoostMints = new Set(), thresholds = DEFAULT_THRESHOLDS } = {}) {
  const t = thresholds;
  const h24 = pool.txns?.h24 ?? {};
  const ageHours = pool.createdAt ? (now.getTime() - Date.parse(pool.createdAt)) / 3_600_000 : null;
  const liqToFdv = ratio(pool.liquidityUsd, pool.fdvUsd);
  const sellBuy = ratio(h24.sells, h24.buys);
  const turnover = ratio(pool.volumeUsd?.h24, pool.liquidityUsd);
  const traders = Number.isFinite(h24.buyers) && Number.isFinite(h24.sellers) ? h24.buyers + h24.sellers : null;

  const flags = [];
  if (ageHours !== null && ageHours < t.newPoolHours) flags.push({ id: 'new-pool', message: `Pool is ${round(ageHours, 1)}h old.` });
  if (liqToFdv !== null && liqToFdv < t.thinLiquidityRatio && pool.liquidityUsd < t.thinLiquidityMaxUsd) {
    flags.push({ id: 'thin-liquidity', message: `Liquidity is ${round(liqToFdv * 100)}% of FDV; price is easy to move.` });
  }
  if (sellBuy !== null && sellBuy > t.sellPressureRatio) {
    flags.push({ id: 'sell-pressure', message: `${round(sellBuy)} sells per buy over 24h.` });
  }
  if (turnover !== null && turnover > t.highTurnoverRatio) {
    flags.push({ id: 'high-turnover', message: `24h volume is ${round(turnover, 1)}x liquidity (possible bot/wash trading).` });
  }
  if (traders !== null && traders < t.fewTradersMin && (pool.volumeUsd?.h24 ?? 0) >= t.fewTradersVolumeUsd) {
    flags.push({ id: 'few-traders', message: `Only ${traders} unique traders behind high 24h volume.` });
  }
  if (pool.baseAddress && paidBoostMints.has(pool.baseAddress)) {
    flags.push({ id: 'paid-promotion', message: 'Token is buying DexScreener boosts (paid visibility).' });
  }

  return {
    ...pool,
    metrics: {
      ageHours: round(ageHours, 1),
      liquidityToFdv: round(liqToFdv, 4),
      sellsPerBuy24h: round(sellBuy),
      turnover24h: round(turnover, 1),
      uniqueTraders24h: traders,
    },
    flags,
  };
}

export function assessTrending(pools, opts) {
  return pools.map((p) => assessPool(p, opts));
}
