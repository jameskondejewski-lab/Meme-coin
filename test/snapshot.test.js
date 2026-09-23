import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContext } from '../src/lib/context.js';
import { createFixtureFetch, FIXTURE_NOW } from '../src/lib/fixtureFetch.js';
import { buildSnapshot } from '../src/snapshot.js';
import { renderReport } from '../src/report.js';

const DOG = 'FixtureDog1111111111111111111111111111111111';
const now = () => FIXTURE_NOW;

async function snapshotWith(failing = []) {
  const { fetchImpl, calls } = createFixtureFetch({ failing });
  const ctx = createContext({ env: {}, fetchImpl, now });
  const snap = await buildSnapshot(ctx, { watchMints: [DOG], mode: 'fixtures' });
  return { snap, calls };
}

test('all sources up: SOL price cross-checked across three sources', async () => {
  const { snap } = await snapshotWith();
  assert.ok(Object.values(snap.sources).every((s) => s.ok));
  const sol = snap.market.solPrice;
  assert.equal(sol.status, 'consistent');
  assert.deepEqual(sol.observations.map((o) => o.source), ['coingecko', 'jupiter', 'dexscreener']);
  // DexScreener must use the deepest SOL-base pair (USDC, $100.50), not USDT.
  assert.equal(sol.observations.find((o) => o.source === 'dexscreener').value, 100.5);
  assert.equal(snap.ecosystem.tvl.tvlUsd, 10e9);
  assert.equal(snap.memeSector.category.volume24hUsd, 1e9);
});

test('trending pools carry indicator flags, including paid promotion', async () => {
  const { snap } = await snapshotWith();
  const bySym = Object.fromEntries(snap.trending.pools.map((p) => [p.baseSymbol, p.flags.map((f) => f.id)]));
  assert.deepEqual(bySym.FIXDOG, []);
  assert.deepEqual(bySym.FIXCAT, ['new-pool', 'thin-liquidity', 'sell-pressure', 'high-turnover', 'few-traders']);
  assert.deepEqual(bySym.FIXFROG, ['paid-promotion']);
});

test('watchlist token: deepest pool, summed liquidity from both methods, safety with RugCheck', async () => {
  const { snap } = await snapshotWith();
  const [w] = snap.watchlist;
  assert.equal(w.symbol, 'FIXDOG');
  assert.equal(w.market.liquidityUsd, 50000);
  assert.deepEqual(w.liquidity, { dexscreenerPoolsUsd: 55000, dexscreenerPoolCount: 2, dexscreenerCapped: false, jupiterAggregateUsd: 60000 });
  // RugCheck labels the 20% pool vault as AMM, so concentration excludes it.
  assert.equal(w.safety.concentration.source, 'rugcheck');
  assert.equal(w.safety.concentration.top1Pct, 5);
  assert.equal(w.safety.concentration.top10Pct, 7);
  assert.equal(w.safety.partial, false);
  assert.equal(w.safety.verdict, 'caution'); // RugCheck "Mutable metadata" warn
  assert.deepEqual(w.safety.findings.map((f) => f.id), ['rugcheck:mutable-metadata']);
  assert.equal(w.safety.rugcheck.scoreNormalised, 7);
});

test('without RugCheck, concentration falls back to RPC and is labelled an upper bound', async () => {
  const { snap } = await snapshotWith(['rugcheck-report.json']);
  const [w] = snap.watchlist;
  assert.equal(w.safety.concentration.source, 'rpc');
  assert.equal(w.safety.concentration.top1Pct, 20);
  assert.match(w.safety.findings.find((f) => f.id === 'top1-concentration').message, /upper bound/);
  assert.equal(w.safety.rugcheck.unavailable, true);
  assert.deepEqual(w.safety.missingChecks, ['insiders']);
  assert.equal(w.safety.partial, true);
});

test('with neither holder source, the verdict is explicitly partial', async () => {
  const { snap } = await snapshotWith(['rugcheck-report.json', 'rpc-getTokenLargestAccounts.json']);
  const [w] = snap.watchlist;
  assert.equal(w.safety.concentration, null);
  assert.deepEqual(w.safety.missingChecks, ['concentration', 'insiders']);
  assert.match(renderReport(snap), /PARTIAL, not checked: concentration, insiders/);
});

test('failed sources are marked unavailable with a reason — no placeholder values', async () => {
  const { snap } = await snapshotWith(['coingecko-simple-price.json', 'llama-chains.json', 'geckoterminal-trending.json']);
  assert.equal(snap.sources['coingecko.prices'].ok, false);
  assert.match(snap.sources['coingecko.prices'].error, /HTTP 503/);
  assert.equal(snap.market.btc.unavailable, true);
  assert.equal(snap.market.btc.priceUsd, undefined);
  assert.equal(snap.ecosystem.tvl.unavailable, true);
  assert.equal(snap.trending.unavailable, true);
  assert.deepEqual(snap.market.solPrice.missing, ['coingecko']);

  const text = renderReport(snap);
  assert.match(text, /SYNTHETIC FIXTURE DATA/);
  assert.match(text, /Live data unavailable \(coingecko: HTTP 503\)/);
});

test('RPC failure leaves safety unavailable rather than "safe"', async () => {
  const { snap } = await snapshotWith(['rpc-getAccountInfo.json']);
  const [w] = snap.watchlist;
  assert.equal(w.safety.unavailable, true);
  assert.equal(w.safety.verdict, undefined);
});
