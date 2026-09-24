#!/usr/bin/env node
// Return everything in the launch wallet to the owner's wallet.
//   node sweep.mjs [--dry-run]
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY) {
  const r = spawnSync(process.execPath, ['--disable-warning=UNDICI-EHPA', '--no-deprecation', ...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 1);
}

const require = createRequire(import.meta.url);
const { Connection, Keypair, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const OWNER = new PublicKey('6gVxrgeFt2iS5UgH4VWX3cCH6mtofJdrMeRDdNhJ1wn5');
const dryRun = process.argv.includes('--dry-run');
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com', {
  commitment: 'confirmed',
  fetch: globalThis.fetch,
});
const payer = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(readFileSync(join(homedir(), '.config/solana-launch-intel/mainnet-launcher.json'), 'utf8'))),
);

const balance = await connection.getBalance(payer.publicKey, 'confirmed');
const FEE = 5000; // one signature
const amount = balance - FEE;
console.log(`Launch wallet ${payer.publicKey.toBase58()} holds ${balance / LAMPORTS_PER_SOL} SOL`);
if (amount <= 0) {
  console.log('Nothing to sweep.');
  process.exit(0);
}
console.log(`${dryRun ? 'Would send' : 'Sending'} ${amount / LAMPORTS_PER_SOL} SOL to ${OWNER.toBase58()}`);
if (dryRun) process.exit(0);

const tx = new Transaction().add(SystemProgram.transfer({ fromPubkey: payer.publicKey, toPubkey: OWNER, lamports: amount }));
const sig = await connection.sendTransaction(tx, [payer]);
for (let i = 0; i < 60; i++) {
  const st = (await connection.getSignatureStatuses([sig])).value[0];
  if (st?.err) throw new Error(`sweep failed: ${JSON.stringify(st.err)}`);
  if (st && ['confirmed', 'finalized'].includes(st.confirmationStatus)) {
    console.log(`Swept. Tx: https://solscan.io/tx/${sig}`);
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 1000));
}
console.log(`Sent ${sig}, not yet confirmed after 60s; check Solscan.`);
