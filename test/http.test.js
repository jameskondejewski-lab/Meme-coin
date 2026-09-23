import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchJson, num } from '../src/lib/http.js';

const res = (status, body) => ({ ok: status < 300, status, json: async () => body });

test('retries 429 then succeeds', async () => {
  let n = 0;
  const fetchImpl = async () => (++n === 1 ? res(429, {}) : res(200, { ok: 1 }));
  assert.deepEqual(await fetchJson('src', 'u', { fetchImpl, retries: 2, backoffMs: 1 }), { ok: 1 });
  assert.equal(n, 2);
});

test('does not retry a 404 and names the source', async () => {
  let n = 0;
  const fetchImpl = async () => (n++, res(404, {}));
  await assert.rejects(fetchJson('dexscreener', 'u', { fetchImpl, retries: 3, backoffMs: 1 }), /dexscreener: HTTP 404/);
  assert.equal(n, 1);
});

test('times out a hung request', async () => {
  const fetchImpl = (_u, { signal }) =>
    new Promise((_, reject) => signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' }))));
  await assert.rejects(fetchJson('slow', 'u', { fetchImpl, timeoutMs: 20, retries: 0 }), /slow: timeout after 20ms/);
});

test('num() parses string numbers and rejects junk', () => {
  assert.equal(num('1.5'), 1.5);
  assert.equal(num(2), 2);
  assert.equal(num(null), null);
  assert.equal(num(''), null);
  assert.equal(num('abc'), null);
});

test('isValidAddress accepts base58 mints and rejects path tricks', async () => {
  const { isValidAddress } = await import('../src/lib/context.js');
  assert.equal(isValidAddress('So11111111111111111111111111111111111111112'), true);
  assert.equal(isValidAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), true);
  assert.equal(isValidAddress('../../token-boosts/top/v1'), false);
  assert.equal(isValidAddress('So1111111111111111111111111111111111111111O'), false); // 'O' is not base58
  assert.equal(isValidAddress('short'), false);
});
