#!/usr/bin/env node
// Move SOL from the funding wallet to a per-coin launch wallet.
//   node fund.mjs --to <wallet name> --sol <amount> [--dry-run]
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY) {
  const r = spawnSync(process.execPath, ['--disable-warning=UNDICI-EHPA', '--no-deprecation', ...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 1);
}

const require = createRequire(import.meta.url);
const { Connection, Keypair, SystemProgram, Transaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const { values } = parseArgs({ options: { to: { type: 'string' }, sol: { type: 'string' }, 'dry-run': { type: 'boolean', default: false } } });
if (!values.to || !values.sol) throw new Error('Usage: node fund.mjs --to <wallet name> --sol <amount>');
const MAX_PER_WALLET_SOL = 0.5; // owner's cap
const sol = Number(values.sol);
if (!(sol > 0 && sol <= MAX_PER_WALLET_SOL)) throw new Error(`--sol must be > 0 and <= ${MAX_PER_WALLET_SOL}`);

const dir = join(homedir(), '.config/solana-launch-intel');
const load = (p) => Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(p, 'utf8'))));
const from = load(join(dir, 'mainnet-launcher.json'));
const to = load(join(dir, 'wallets', `${values.to}.json`)).publicKey;
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com', { commitment: 'confirmed', fetch: globalThis.fetch });

const lamports = Math.round(sol * LAMPORTS_PER_SOL);
const balance = await connection.getBalance(from.publicKey, 'confirmed');
console.log(`Funding wallet ${from.publicKey.toBase58()} has ${balance / LAMPORTS_PER_SOL} SOL`);
console.log(`${values['dry-run'] ? 'Would send' : 'Sending'} ${sol} SOL -> ${values.to} (${to.toBase58()})`);
if (balance < lamports + 5000) throw new Error('Not enough SOL in the funding wallet.');
if (values['dry-run']) process.exit(0);

const sig = await connection.sendTransaction(new Transaction().add(SystemProgram.transfer({ fromPubkey: from.publicKey, toPubkey: to, lamports })), [from]);
for (let i = 0; i < 60; i++) {
  const st = (await connection.getSignatureStatuses([sig])).value[0];
  if (st?.err) throw new Error(`transfer failed: ${JSON.stringify(st.err)}`);
  if (st && ['confirmed', 'finalized'].includes(st.confirmationStatus)) {
    console.log(`Funded: https://solscan.io/tx/${sig}`);
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 1000));
}
console.log(`Sent ${sig}, not confirmed after 60s; check Solscan.`);
