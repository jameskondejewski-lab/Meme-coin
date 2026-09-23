import { fetchJson, num } from '../lib/http.js';

const SOURCE = 'defillama';

export async function getSolanaTvl(ctx) {
  const raw = await fetchJson(SOURCE, 'https://api.llama.fi/v2/chains', { fetchImpl: ctx.fetchImpl });
  const row = (Array.isArray(raw) ? raw : []).find((c) => c.name === 'Solana');
  if (!row) throw new Error(`${SOURCE}: Solana not found in /v2/chains`);
  return { tvlUsd: num(row.tvl) };
}

export async function getSolanaDexVolume(ctx) {
  const url =
    'https://api.llama.fi/overview/dexs/solana?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true';
  const raw = await fetchJson(SOURCE, url, { fetchImpl: ctx.fetchImpl });
  return {
    volume24hUsd: num(raw?.total24h),
    volume7dUsd: num(raw?.total7d),
    change1dPct: num(raw?.change_1d),
  };
}

export async function getSolanaStablecoinSupply(ctx) {
  const raw = await fetchJson(SOURCE, 'https://stablecoins.llama.fi/stablecoinchains', { fetchImpl: ctx.fetchImpl });
  const row = (Array.isArray(raw) ? raw : []).find((c) => c.name === 'Solana');
  if (!row) throw new Error(`${SOURCE}: Solana not found in /stablecoinchains`);
  return { stablecoinsUsd: num(row.totalCirculatingUSD?.peggedUSD) };
}
