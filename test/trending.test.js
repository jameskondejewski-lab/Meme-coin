import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessPool } from '../src/analysis/trending.js';

const now = new Date('2026-01-10T00:00:00Z');
const pool = (over = {}) => ({
  baseAddress: 'Tok',
  liquidityUsd: 100_000,
  fdvUsd: 1_000_000,
  volumeUsd: { h24: 500_000 },
  txns: { h24: { buys: 1000, sells: 900, buyers: 600, sellers: 500 } },
  createdAt: '2025-12-01T00:00:00Z',
  ...over,
});
const flagIds = (p) => p.flags.map((f) => f.id);

test('healthy pool has no flags', () => {
  const r = assessPool(pool(), { now });
  assert.deepEqual(flagIds(r), []);
  assert.equal(r.metrics.liquidityToFdv, 0.1);
  assert.equal(r.metrics.turnover24h, 5);
});

test('flags new, thin, sell-heavy, high-turnover, few-trader and paid pools', () => {
  const r = assessPool(
    pool({
      createdAt: '2026-01-09T18:00:00Z',
      liquidityUsd: 20_000,
      fdvUsd: 2_000_000,
      volumeUsd: { h24: 1_000_000 },
      txns: { h24: { buys: 1000, sells: 2000, buyers: 40, sellers: 30 } },
    }),
    { now, paidBoostMints: new Set(['Tok']) },
  );
  assert.deepEqual(flagIds(r), ['new-pool', 'thin-liquidity', 'sell-pressure', 'high-turnover', 'few-traders', 'paid-promotion']);
  assert.equal(r.metrics.ageHours, 6);
});

test('missing fields produce no flags rather than false alarms', () => {
  const r = assessPool({ baseAddress: 'Tok', volumeUsd: {}, txns: {} }, { now });
  assert.deepEqual(flagIds(r), []);
  assert.equal(r.metrics.liquidityToFdv, null);
});

test('thin-liquidity ignores pools that are deep in absolute terms', () => {
  const deep = assessPool(pool({ liquidityUsd: 21_800_000, fdvUsd: 3_320_000_000 }), { now });
  assert.ok(!flagIds(deep).includes('thin-liquidity'));
  const shallow = assessPool(pool({ liquidityUsd: 2_500_000, fdvUsd: 1_600_000_000 }), { now });
  assert.ok(flagIds(shallow).includes('thin-liquidity'));
});
