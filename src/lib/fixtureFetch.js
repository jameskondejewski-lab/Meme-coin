import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// The synthetic fixtures describe this moment; use it as `now` in fixture mode.
export const FIXTURE_NOW = new Date('2026-01-10T00:00:00Z');

export const FIXTURE_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../test/fixtures');

// URL pattern -> fixture file. RPC calls are routed by JSON-RPC method.
const ROUTES = [
  [/api\.coingecko\.com\/api\/v3\/simple\/price/, 'coingecko-simple-price.json'],
  [/api\.coingecko\.com\/api\/v3\/coins\/categories/, 'coingecko-categories.json'],
  [/api\.coingecko\.com\/api\/v3\/coins\/markets/, 'coingecko-markets.json'],
  [/\/price\/v3\?/, 'jupiter-price.json'],
  [/api\.dexscreener\.com\/tokens\/v1\/solana\/So11111111111111111111111111111111111111112$/, 'dexscreener-sol.json'],
  [/api\.dexscreener\.com\/tokens\/v1\/solana\//, 'dexscreener-watch.json'],
  [/api\.dexscreener\.com\/token-boosts\/top\/v1/, 'dexscreener-boosts.json'],
  [/geckoterminal\.com\/api\/v2\/networks\/solana\/trending_pools/, 'geckoterminal-trending.json'],
  [/api\.llama\.fi\/v2\/chains/, 'llama-chains.json'],
  [/api\.llama\.fi\/overview\/dexs\/solana/, 'llama-dex.json'],
  [/stablecoins\.llama\.fi\/stablecoinchains/, 'llama-stablecoins.json'],
  [/api\.alternative\.me\/fng/, 'feargreed.json'],
];

const RPC_ROUTES = {
  getAccountInfo: 'rpc-getAccountInfo.json',
  getTokenLargestAccounts: 'rpc-getTokenLargestAccounts.json',
};

const load = (file, dir) => JSON.parse(readFileSync(join(dir, file), 'utf8'));

function response(status, body) {
  return { ok: status >= 200 && status < 300, status, json: async () => body };
}

/**
 * A fetch() replacement that serves SYNTHETIC fixtures. `failing` lists
 * fixture files to answer with HTTP 503, to exercise the unavailable paths.
 */
export function createFixtureFetch({ dir = FIXTURE_DIR, failing = [], rpcUrl = 'https://api.mainnet-beta.solana.com' } = {}) {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push(url);
    let file;
    if (url === rpcUrl && init.method === 'POST') {
      const { method, id } = JSON.parse(init.body);
      file = RPC_ROUTES[method];
      if (file && !failing.includes(file)) return response(200, { jsonrpc: '2.0', id, ...load(file, dir) });
    } else {
      file = ROUTES.find(([re]) => re.test(url))?.[1];
    }
    if (!file) return response(404, { error: `no fixture for ${url}` });
    if (failing.includes(file)) return response(503, { error: 'fixture forced failure' });
    return response(200, load(file, dir));
  };
  return { fetchImpl, calls };
}
