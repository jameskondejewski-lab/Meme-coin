#!/usr/bin/env node
// Launch an SPL (Token-2022) token from a reviewed spec file.
// Devnet by default. Every run: validate spec -> build ONE atomic transaction
// -> simulate -> (unless --dry-run) send -> confirm -> verify on-chain -> write
// a deployment record.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  appendTransactionMessageInstructions,
  createSolanaRpc,
  createTransactionMessage,
  generateKeyPairSigner,
  getBase64EncodedWireTransaction,
  getSignatureFromTransaction,
  getTransactionSize,
  lamports,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from '@solana/kit';
import { reexecWithEnvProxyIfNeeded } from '../lib/proxy.js';
import { createContext } from '../lib/context.js';
import { getMintInfo } from '../sources/solanaRpc.js';
import { validateSpec, specHash, SpecError } from '../token/spec.js';
import { buildLaunchInstructions, mintSizes } from '../token/plan.js';
import { defaultKeypairPath, loadOrCreatePayer } from '../token/keys.js';
import { verifyLaunch } from '../token/verify.js';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const RPC_URLS = {
  localnet: 'http://127.0.0.1:8899', // solana-test-validator
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
};
const TX_SIZE_LIMIT = 1232;
const LAMPORTS_PER_SOL = 1_000_000_000n;

const USAGE = `Usage: npm run launch -- --spec <file> [options]

  --spec <file>              Token spec JSON (see tokens/)
  --cluster <name>           devnet (default) | localnet | testnet | mainnet-beta
  --rpc <url>                Override the cluster RPC URL
  --keypair <file>           Payer keypair (default ~/.config/solana-launch-intel/<cluster>-payer.json;
                             generated automatically on devnet/testnet only)
  --airdrop                  localnet/devnet/testnet: request SOL from the faucet if the balance is too low
  --dry-run                  Build and simulate only; send nothing
  --confirm-mainnet <SYMBOL> Required for mainnet-beta; must equal the spec symbol
  -h, --help`;

const { values } = parseArgs({
  options: {
    spec: { type: 'string' },
    cluster: { type: 'string', default: 'devnet' },
    rpc: { type: 'string' },
    keypair: { type: 'string' },
    airdrop: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
    'confirm-mainnet': { type: 'string' },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

const fail = (msg) => {
  console.error(`\n✗ ${msg}`);
  process.exit(1);
};
const sol = (l) => `${(Number(l) / 1e9).toFixed(6)} SOL`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (values.help || !values.spec) {
  console.log(USAGE);
  process.exit(values.help ? 0 : 1);
}
reexecWithEnvProxyIfNeeded();

const cluster = values.cluster;
if (!RPC_URLS[cluster]) fail(`Unknown cluster "${cluster}"`);

let spec;
try {
  spec = validateSpec(JSON.parse(readFileSync(values.spec, 'utf8')), { cluster });
} catch (err) {
  fail(err instanceof SpecError ? err.message : `Could not read spec: ${err.message}`);
}

if (cluster === 'mainnet-beta') {
  if (values['confirm-mainnet'] !== spec.symbol) {
    fail(`Mainnet launch requires --confirm-mainnet ${spec.symbol}. Launch on devnet first and review the deployment record.`);
  }
  if (!values.keypair) fail('Mainnet launch requires an explicit --keypair.');
}

const rpcUrl = values.rpc ?? RPC_URLS[cluster];
const rpc = createSolanaRpc(rpcUrl);
const keypairPath = values.keypair ?? defaultKeypairPath(cluster);

console.log(`Cluster:   ${cluster} (${rpcUrl})`);
console.log(`Token:     ${spec.name} (${spec.symbol}), supply ${spec.supply} × 10^${spec.decimals}`);
console.log(`Spec hash: ${specHash(spec)}`);

const { signer: payer, created } = await loadOrCreatePayer({ path: keypairPath, cluster, repoRoot: REPO_ROOT });
console.log(`Payer:     ${payer.address}${created ? `  (new ${cluster} keypair saved to ${keypairPath})` : ''}`);

const mint = await generateKeyPairSigner();
console.log(`Mint:      ${mint.address}`);

// --- Funding -----------------------------------------------------------------
const { rentSpace } = mintSizes(spec, mint.address, payer.address);
const mintRent = await rpc.getMinimumBalanceForRentExemption(BigInt(rentSpace)).send();
const ataRent = await rpc.getMinimumBalanceForRentExemption(170n).send(); // Token-2022 ATA incl. ImmutableOwner
const recipientsCount = BigInt(Math.max(1, spec.allocations.length));
const needed = mintRent + ataRent * recipientsCount + 20_000n; // + fee headroom
let balance = (await rpc.getBalance(payer.address, { commitment: 'confirmed' }).send()).value;
console.log(`Balance:   ${sol(balance)} (needs ≈ ${sol(needed)})`);

if (balance < needed) {
  if (!values.airdrop || cluster === 'mainnet-beta') {
    fail(`Payer needs at least ${sol(needed)}. Fund ${payer.address}${cluster !== 'mainnet-beta' ? ' or re-run with --airdrop' : ''}.`);
  }
  console.log('Requesting faucet airdrop of 1 SOL …');
  try {
    await rpc.requestAirdrop(payer.address, lamports(LAMPORTS_PER_SOL), { commitment: 'confirmed' }).send();
  } catch (err) {
    fail(`Faucet refused the airdrop (${err.message}). Fund ${payer.address} from https://faucet.solana.com and re-run.`);
  }
  for (let i = 0; i < 30 && balance < needed; i++) {
    await sleep(2000);
    balance = (await rpc.getBalance(payer.address, { commitment: 'confirmed' }).send()).value;
  }
  if (balance < needed) fail(`Airdrop not visible after 60s. Fund ${payer.address} and re-run.`);
  console.log(`Balance:   ${sol(balance)}`);
}

// --- Build, sign, size-check, simulate ----------------------------------------
const { instructions, recipients } = await buildLaunchInstructions({ spec, payer, mint, rentLamports: mintRent });
const { value: blockhash } = await rpc.getLatestBlockhash({ commitment: 'confirmed' }).send();
const message = pipe(
  createTransactionMessage({ version: 0 }),
  (m) => setTransactionMessageFeePayerSigner(payer, m),
  (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
  (m) => appendTransactionMessageInstructions(instructions, m),
);
const signed = await signTransactionMessageWithSigners(message);
const size = getTransactionSize(signed);
console.log(`Tx:        ${instructions.length} instructions, ${size}/${TX_SIZE_LIMIT} bytes`);
if (size > TX_SIZE_LIMIT) fail('Transaction too large for one atomic launch; reduce allocations or URI length.');

const wire = getBase64EncodedWireTransaction(signed);
const sim = await rpc.simulateTransaction(wire, { encoding: 'base64', sigVerify: true, commitment: 'confirmed' }).send();
if (sim.value.err) {
  console.error((sim.value.logs ?? []).join('\n'));
  fail(`Simulation failed: ${JSON.stringify(sim.value.err, (_, v) => (typeof v === 'bigint' ? v.toString() : v))}`);
}
console.log(`Simulated: OK (${sim.value.unitsConsumed} compute units)`);

if (values['dry-run']) {
  console.log('\nDry run: nothing sent.');
  process.exit(0);
}

// --- Send and confirm (polling; no websocket needed) --------------------------
const signature = getSignatureFromTransaction(signed);
await rpc.sendTransaction(wire, { encoding: 'base64', preflightCommitment: 'confirmed' }).send();
console.log(`Sent:      ${signature}`);

let status = null;
for (let i = 0; i < 60; i++) {
  const { value } = await rpc.getSignatureStatuses([signature]).send();
  status = value[0];
  if (status?.err) fail(`Transaction failed on-chain: ${JSON.stringify(status.err)}`);
  if (status && ['confirmed', 'finalized'].includes(status.confirmationStatus)) break;
  const height = await rpc.getBlockHeight({ commitment: 'confirmed' }).send();
  if (height > blockhash.lastValidBlockHeight) fail('Blockhash expired before confirmation; nothing was created. Re-run.');
  await sleep(1000);
}
if (!status) fail(`Not confirmed after 60s. Check ${signature} before re-running.`);
console.log(`Confirmed: slot ${status.slot} (${status.confirmationStatus})`);

// --- Verify on-chain -----------------------------------------------------------
const ctx = createContext({ env: { SOLANA_RPC_URL: rpcUrl } });
const mintInfo = await getMintInfo(ctx, mint.address);
for (const r of recipients) {
  const bal = await rpc.getTokenAccountBalance(r.tokenAccount, { commitment: 'confirmed' }).send();
  r.actualBase = bal.value.amount;
}
const verification = verifyLaunch(mintInfo, spec, recipients);
console.log(`\nVerification: ${verification.ok ? 'PASSED' : 'FAILED'}`);
for (const c of verification.checks) console.log(`  ${c.ok ? '✓' : '✗'} ${c.name}${c.ok ? '' : ` — expected ${c.expected}, got ${c.actual}`}`);

// --- Deployment record (public data only) -------------------------------------
const clusterParam =
  cluster === 'mainnet-beta' ? '' : cluster === 'localnet' ? `?cluster=custom&customUrl=${encodeURIComponent(rpcUrl)}` : `?cluster=${cluster}`;
const record = {
  cluster,
  mint: mint.address,
  signature,
  slot: String(status.slot),
  specHash: specHash(spec),
  spec: { ...spec, supplyBase: spec.supplyBase.toString() },
  payer: payer.address,
  recipients,
  verification: { ok: verification.ok, checks: verification.checks },
  explorer: {
    token: `https://explorer.solana.com/address/${mint.address}${clusterParam}`,
    tx: `https://explorer.solana.com/tx/${signature}${clusterParam}`,
    solscan: `https://solscan.io/token/${mint.address}${clusterParam}`,
  },
  sdk: JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8')).dependencies,
  launchedAt: new Date().toISOString(),
};
const recordPath = join(REPO_ROOT, 'deployments', cluster, `${spec.symbol}-${mint.address}.json`);
mkdirSync(dirname(recordPath), { recursive: true });
writeFileSync(recordPath, JSON.stringify(record, null, 2) + '\n');
console.log(`\nRecord:    ${recordPath}`);
console.log(`Explorer:  ${record.explorer.token}`);
process.exit(verification.ok ? 0 : 3);
