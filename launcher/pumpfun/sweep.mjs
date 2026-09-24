#!/usr/bin/env node
// Empty the launch wallet into the owner's wallet: every token balance first
// (creating the owner's associated token accounts as needed, closing ours),
// then all remaining SOL.
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
const {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  createCloseAccountInstruction,
} = require('@solana/spl-token');

// Destination: --to <address> overrides the owner's default wallet.
const toArg = process.argv.indexOf('--to');
const OWNER = new PublicKey(toArg > 0 ? process.argv[toArg + 1] : '6gVxrgeFt2iS5UgH4VWX3cCH6mtofJdrMeRDdNhJ1wn5');
const tokensOnly = process.argv.includes('--tokens-only');
const dryRun = process.argv.includes('--dry-run');
const walletArg = process.argv.indexOf('--wallet');
const walletName = walletArg > 0 ? process.argv[walletArg + 1] : null;
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com', {
  commitment: 'confirmed',
  fetch: globalThis.fetch,
});
const payer = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(readFileSync(join(homedir(), '.config/solana-launch-intel', walletName ? `wallets/${walletName}.json` : 'mainnet-launcher.json'), 'utf8'))),
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sendAndConfirm(tx, label) {
  const sig = await connection.sendTransaction(tx, [payer]);
  for (let i = 0; i < 60; i++) {
    const st = (await connection.getSignatureStatuses([sig])).value[0];
    if (st?.err) throw new Error(`${label} failed: ${JSON.stringify(st.err)}`);
    if (st && ['confirmed', 'finalized'].includes(st.confirmationStatus)) {
      console.log(`  ✓ ${label}: https://solscan.io/tx/${sig}`);
      return sig;
    }
    await sleep(1000);
  }
  throw new Error(`${label}: ${sig} not confirmed after 60s; check Solscan`);
}

console.log(`Launch wallet ${payer.publicKey.toBase58()} -> owner ${OWNER.toBase58()}${dryRun ? ' (dry run)' : ''}`);

// 1. Tokens (one transaction per token keeps each well under the size limit).
for (const programId of [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]) {
  const { value } = await connection.getParsedTokenAccountsByOwner(payer.publicKey, { programId }, 'confirmed');
  for (const { pubkey, account } of value) {
    const info = account.data.parsed.info;
    const mint = new PublicKey(info.mint);
    const amount = BigInt(info.tokenAmount.amount);
    const decimals = info.tokenAmount.decimals;
    const destination = getAssociatedTokenAddressSync(mint, OWNER, false, programId);
    console.log(`Token ${mint.toBase58()}: ${info.tokenAmount.uiAmountString} -> ${destination.toBase58()}`);
    if (dryRun) continue;
    const tx = new Transaction().add(
      createAssociatedTokenAccountIdempotentInstruction(payer.publicKey, destination, OWNER, mint, programId),
      ...(amount > 0n ? [createTransferCheckedInstruction(pubkey, mint, destination, payer.publicKey, amount, decimals, [], programId)] : []),
      createCloseAccountInstruction(pubkey, OWNER, payer.publicKey, [], programId), // rent goes to the owner too
    );
    await sendAndConfirm(tx, `moved ${info.tokenAmount.uiAmountString} tokens`);
  }
}

// 2. Remaining SOL (skipped with --tokens-only).
if (tokensOnly) process.exit(0);
const balance = await connection.getBalance(payer.publicKey, 'confirmed');
const amount = balance - 5000; // one signature fee
console.log(`SOL: ${balance / LAMPORTS_PER_SOL}`);
if (amount <= 0) {
  console.log('No SOL left to sweep.');
  process.exit(0);
}
if (dryRun) {
  console.log(`Would send ${amount / LAMPORTS_PER_SOL} SOL to the owner.`);
  process.exit(0);
}
await sendAndConfirm(
  new Transaction().add(SystemProgram.transfer({ fromPubkey: payer.publicKey, toPubkey: OWNER, lamports: amount })),
  `sent ${amount / LAMPORTS_PER_SOL} SOL`,
);
