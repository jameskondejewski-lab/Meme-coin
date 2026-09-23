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

test('honours Retry-After on 429 (capped)', async () => {
  let n = 0;
  const started = Date.now();
  const fetchImpl = async () =>
    ++n === 1
      ? { ok: false, status: 429, headers: new Headers({ 'retry-after': '1' }), json: async () => ({}) }
      : res(200, { ok: 1 });
  await fetchJson('src', 'https://example.test/x', { fetchImpl, retries: 1, backoffMs: 1, minIntervalMs: 0, maxRetryAfterMs: 300 });
  const waited = Date.now() - started;
  assert.ok(waited >= 250 && waited < 1000, `waited ${waited}ms, expected the 300ms cap`);
});

test('requests to the same host are spaced; different hosts are not', async () => {
  const times = {};
  const fetchImpl = async (url) => {
    (times[new URL(url).host] ??= []).push(Date.now());
    return res(200, {});
  };
  const opts = { fetchImpl, minIntervalMs: 120 };
  await Promise.all([
    fetchJson('a', 'https://one.test/1', opts),
    fetchJson('a', 'https://one.test/2', opts),
    fetchJson('b', 'https://two.test/1', opts),
  ]);
  const [t1, t2] = times['one.test'];
  assert.ok(t2 - t1 >= 110, `same-host gap ${t2 - t1}ms`);
  assert.ok(Math.abs(times['two.test'][0] - t1) < 100, 'other host not delayed');
});
