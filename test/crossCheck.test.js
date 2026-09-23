import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crossCheck } from '../src/analysis/crossCheck.js';

test('consistent when sources agree within tolerance', () => {
  const r = crossCheck([
    { source: 'a', value: 100 },
    { source: 'b', value: 101 },
    { source: 'c', value: 100.5 },
  ]);
  assert.equal(r.status, 'consistent');
  assert.equal(r.median, 100.5);
  assert.ok(r.maxDeviationPct < 1);
});

test('divergent when one source is off by more than the tolerance', () => {
  const r = crossCheck([
    { source: 'a', value: 100 },
    { source: 'b', value: 100 },
    { source: 'c', value: 110 },
  ]);
  assert.equal(r.status, 'divergent');
  assert.equal(r.median, 100);
  assert.equal(Math.round(r.maxDeviationPct), 10);
});

test('single-source and unavailable are reported, never filled in', () => {
  const single = crossCheck([{ source: 'a', value: 5 }, { source: 'b', value: null }]);
  assert.equal(single.status, 'single-source');
  assert.deepEqual(single.missing, ['b']);

  const none = crossCheck([{ source: 'a', value: undefined }, { source: 'b', value: 0 }]);
  assert.equal(none.status, 'unavailable');
  assert.equal(none.median, null);
});
