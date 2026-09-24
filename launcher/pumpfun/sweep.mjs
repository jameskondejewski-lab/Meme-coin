#!/usr/bin/env node
// Empty the launch wallet into the owner's wallet: token balances first
// (creating the owner's associated token accounts as needed, closing ours),
// then all remaining SOL.
//   node sweep.mjs --wallet <name> --to <address> [--mint <CA>|latest] [--tokens-only] [--dry-run]
// With --mint, only that coin is moved, and the SOL stays put unless its
// tokens were found and transferred (so a retry can still pay the fees).
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

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

const fail = (m) => {
  console.error(`\n✗ ${m}`);
  process.exit(1);
};
const arg = (name) => {
  const i = process.argv.indexOf(name);
  if (i < 0) return null;
  const v = process.argv[i + 1];
  if (!v || v.startsWith('--')) fail(`${name} needs a value`);
  return v;
};

const toValue = arg('--to') ?? fail('--to <address> is required');
let OWNER;
try {
  OWNER = new PublicKey(toValue);
} catch {
  fail(`invalid --to ${toValue}`);
}
const walletName = arg('--wallet');
const mintArg = arg('--mint');
const tokensOnly = process.argv.includes('--tokens-only');
const dryRun = process.argv.includes('--dry-run');
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
    const st = (await connection.getSignatureStatuses([sig], { searchTransactionHistory: true })).value[0];
    if (st?.err) throw new Error(`${label} failed: ${JSON.stringify(st.err)}`);
    if (st && ['confirmed', 'finalized'].includes(st.confirmationStatus)) {
      console.log(`  ✓ ${label}: https://solscan.io/tx/${sig}`);
      return sig;
    }
    await sleep(1000);
  }
  throw new Error(`${label}: ${sig} not confirmed after 60s; check Solscan`);
}

// Newest launch record written by launch.mjs for this wallet.
function latestLaunchMint() {
  const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../../deployments/mainnet');
  const records = existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => f.startsWith('pumpfun-') && f.endsWith('.json'))
        .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')))
        .filter((r) => r.launchWallet === payer.publicKey.toBase58())
        .sort((a, b) => String(b.launchedAt).localeCompare(String(a.launchedAt)))
    : [];
  if (!records.length) fail(`no launch record for ${payer.publicKey.toBase58()} in ${dir}`);
  return records[0].mint;
}

async function moveTokens(pubkey, info, programId) {
  const mint = new PublicKey(info.mint);
  const amount = BigInt(info.tokenAmount.amount);
  const destination = getAssociatedTokenAddressSync(mint, OWNER, false, programId);
  console.log(`Token ${mint.toBase58()}: ${info.tokenAmount.uiAmountString} -> ${destination.toBase58()}`);
  if (dryRun) return;
  const tx = new Transaction().add(
    createAssociatedTokenAccountIdempotentInstruction(payer.publicKey, destination, OWNER, mint, programId),
    ...(amount > 0n ? [createTransferCheckedInstruction(pubkey, mint, destination, payer.publicKey, amount, info.tokenAmount.decimals, [], programId)] : []),
    createCloseAccountInstruction(pubkey, OWNER, payer.publicKey, [], programId), // rent goes to the owner too
  );
  await sendAndConfirm(tx, `moved ${info.tokenAmount.uiAmountString} tokens`);
}

console.log(`Launch wallet ${payer.publicKey.toBase58()} -> owner ${OWNER.toBase58()}${dryRun ? ' (dry run)' : ''}`);

// 1. Tokens.
if (mintArg) {
  // One coin (pump.fun coins are Token-2022). Poll so a lagging RPC node can't make us skip it.
  let mintKey;
  try {
    mintKey = new PublicKey(mintArg === 'latest' ? latestLaunchMint() : mintArg);
  } catch {
    fail(`invalid --mint ${mintArg}`);
  }
  const source = getAssociatedTokenAddressSync(mintKey, payer.publicKey, true, TOKEN_2022_PROGRAM_ID);
  let info = null;
  for (let i = 0; i < 30 && !info; i++) {
    const acc = await connection.getParsedAccountInfo(source, 'confirmed');
    const parsed = acc.value?.data?.parsed?.info;
    if (parsed && BigInt(parsed.tokenAmount.amount) > 0n) info = parsed;
    else await sleep(1000);
  }
  if (!info) fail(`no ${mintKey.toBase58()} tokens in ${source.toBase58()} after 30s. Nothing moved; the SOL stays for a retry.`);
  await moveTokens(source, info, TOKEN_2022_PROGRAM_ID);
} else {
  // Everything (one transaction per token keeps each well under the size limit).
  for (const programId of [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]) {
    const { value } = await connection.getParsedTokenAccountsByOwner(payer.publicKey, { programId }, 'confirmed');
    for (const { pubkey, account } of value) await moveTokens(pubkey, account.data.parsed.info, programId);
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
