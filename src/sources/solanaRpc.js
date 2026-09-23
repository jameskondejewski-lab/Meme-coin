import { fetchJson, num } from '../lib/http.js';

const SOURCE = 'solana-rpc';
let nextId = 1;

export async function rpc(ctx, method, params = []) {
  const res = await fetchJson(SOURCE, ctx.config.solanaRpcUrl, {
    fetchImpl: ctx.fetchImpl,
    method: 'POST',
    body: { jsonrpc: '2.0', id: nextId++, method, params },
  });
  if (res?.error) {
    throw new Error(`${SOURCE}: ${method} failed: ${res.error.message ?? JSON.stringify(res.error)}`);
  }
  return res?.result;
}

/**
 * On-chain mint state: owning program, supply, authorities and (for Token-2022)
 * the enabled extensions. Returns null if the account does not exist.
 */
export async function getMintInfo(ctx, mint) {
  const result = await rpc(ctx, 'getAccountInfo', [mint, { encoding: 'jsonParsed', commitment: 'confirmed' }]);
  const acct = result?.value;
  if (!acct) return null;
  const parsed = acct.data?.parsed;
  if (parsed?.type !== 'mint') {
    throw new Error(`${SOURCE}: ${mint} is not a token mint (owner ${acct.owner})`);
  }
  const info = parsed.info ?? {};
  return {
    mint,
    programId: acct.owner,
    decimals: num(info.decimals),
    supplyRaw: info.supply ?? null, // string: u64 can exceed Number precision
    mintAuthority: info.mintAuthority ?? null,
    freezeAuthority: info.freezeAuthority ?? null,
    extensions: Array.isArray(info.extensions) ? info.extensions : [],
    slot: num(result.context?.slot),
  };
}

/**
 * The 20 largest TOKEN ACCOUNTS (not owners). Pool vaults, CEX wallets and
 * lockers appear here too, so treat concentration numbers as upper bounds
 * until known addresses are excluded.
 */
export async function getLargestTokenAccounts(ctx, mint) {
  const result = await rpc(ctx, 'getTokenLargestAccounts', [mint, { commitment: 'confirmed' }]);
  return (result?.value ?? []).map((a) => ({ address: a.address, amountRaw: a.amount }));
}
