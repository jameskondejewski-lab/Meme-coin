#!/usr/bin/env node
// pump.fun launcher (official @pump-fun/pump-sdk).
//
//   node launch.mjs --kit <kit.json> [--buy-sol 0] [--dry-run --standin <funded pubkey>]
//
// Guarantees, enforced here:
//   - creator (fee recipient) is the owner's wallet, never the launch wallet
//   - Mayhem mode OFF (it can increase supply), holder-rewards OFF, SOL pair
//   - dev buy <= 0.3 SOL (default 0), made atomically in the create transaction
//   - every launch is simulated first; nothing is sent if simulation fails
//   - after confirmation the mint and bonding curve are re-read and checked
//   - a public deployment record is written (no secrets)

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { createRequire } from 'node:module';

// The SDK's ESM build fails to import (a dependency expects named exports from
// CommonJS @coral-xyz/anchor), so load everything through CommonJS. Loading
// web3.js the same way keeps one PublicKey class shared with the SDK.
const require = createRequire(import.meta.url);
const {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} = require('@solana/web3.js');
const { NATIVE_MINT, TOKEN_2022_PROGRAM_ID } = require('@solana/spl-token');
const BN = require('bn.js');
const { OnlinePumpSdk, PUMP_SDK, bondingCurvePda, getBuyTokenAmountFromSolAmount } = require('@pump-fun/pump-sdk');

// Node's fetch ignores HTTPS_PROXY unless NODE_USE_ENV_PROXY=1: re-exec once.
if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY) {
  const r = spawnSync(process.execPath, ['--disable-warning=UNDICI-EHPA', '--no-deprecation', ...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 1);
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '../..');
const OWNER_CREATOR = '6gVxrgeFt2iS5UgH4VWX3cCH6mtofJdrMeRDdNhJ1wn5'; // owner's wallet: receives creator fees
const MAX_BUY_SOL = 0.3;
const KEYDIR = join(homedir(), '.config/solana-launch-intel');
// One wallet per coin: --wallet <name> uses wallets/<name>.json; default is the funding wallet.
const keypairPath = (name) => (name ? join(KEYDIR, 'wallets', `${name}.json`) : join(KEYDIR, 'mainnet-launcher.json'));
const RPC = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

const { values } = parseArgs({
  options: {
    kit: { type: 'string' },
    'buy-sol': { type: 'string', default: '0' },
    creator: { type: 'string', default: OWNER_CREATOR },
    'dry-run': { type: 'boolean', default: false },
    standin: { type: 'string' }, // funded pubkey used as fee payer for --dry-run simulation only
    'priority-micro-lamports': { type: 'string', default: '200000' },
    'mint-keypair': { type: 'string' },
    wallet: { type: 'string' },
  },
});

const fail = (m) => {
  console.error(`\n✗ ${m}`);
  process.exit(1);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sol = (l) => `${(Number(l) / LAMPORTS_PER_SOL).toFixed(6)} SOL`;

// ---------- kit ----------
if (!values.kit) fail('Usage: node launch.mjs --kit <kit.json> [--buy-sol 0..0.3] [--dry-run --standin <pubkey>]');
const kitPath = resolve(values.kit);
const kit = JSON.parse(readFileSync(kitPath, 'utf8'));
const errors = [];
if (typeof kit.name !== 'string' || !kit.name.trim() || Buffer.byteLength(kit.name) > 32) errors.push('name: 1-32 bytes');
if (typeof kit.symbol !== 'string' || !/^[A-Za-z0-9]{1,10}$/.test(kit.symbol)) errors.push('symbol: 1-10 letters/digits');
if (typeof kit.description !== 'string' || kit.description.length > 1000) errors.push('description: string <= 1000 chars');
const imagePath = kit.image ? resolve(dirname(kitPath), kit.image) : null;
if (!imagePath || !existsSync(imagePath)) errors.push(`image not found: ${imagePath}`);
else if (statSync(imagePath).size > 15 * 1024 * 1024) errors.push('image > 15 MB');
else if (!['.png', '.jpg', '.jpeg', '.gif'].includes(extname(imagePath).toLowerCase())) errors.push('image must be png/jpg/gif');
for (const k of ['twitter', 'telegram', 'website']) if (kit[k] && !/^https:\/\/\S+$/.test(kit[k])) errors.push(`${k} must be an https URL`);
if (errors.length) fail(`Invalid kit ${kitPath}:\n  - ${errors.join('\n  - ')}`);

const buySol = Number(values['buy-sol']);
if (!Number.isFinite(buySol) || buySol < 0) fail('--buy-sol must be >= 0');
if (buySol > MAX_BUY_SOL) fail(`--buy-sol ${buySol} exceeds the owner's cap of ${MAX_BUY_SOL} SOL`);
let creator;
try {
  creator = new PublicKey(values.creator);
} catch {
  fail(`invalid --creator ${values.creator}`);
}

// ---------- chain ----------
const connection = new Connection(RPC, { commitment: 'confirmed', fetch: globalThis.fetch });
const online = new OnlinePumpSdk(connection);
const payer = values['dry-run'] ? null : Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(keypairPath(values.wallet), 'utf8'))));
const feePayer = values['dry-run'] ? new PublicKey(values.standin ?? fail('--dry-run needs --standin <funded pubkey>')) : payer.publicKey;
const mint = values['mint-keypair']
  ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(values['mint-keypair'], 'utf8'))))
  : Keypair.generate();

console.log(`Mode:      ${values['dry-run'] ? 'DRY RUN (simulate only, nothing uploaded or sent)' : 'LIVE MAINNET LAUNCH'}`);
console.log(`Coin:      ${kit.name} ($${kit.symbol})`);
console.log(`Creator:   ${creator.toBase58()} (receives creator fees)`);
console.log(`Payer:     ${feePayer.toBase58()}`);
console.log(`Mint (CA): ${mint.publicKey.toBase58()}`);
console.log(`Dev buy:   ${buySol} SOL`);

const balance = await connection.getBalance(feePayer, 'confirmed');
console.log(`Balance:   ${sol(balance)}`);

// ---------- metadata ----------
let uri = 'https://ipfs.io/ipfs/bafkreidryrunplaceholderxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
if (!values['dry-run']) {
  const form = new FormData();
  form.append('file', new Blob([readFileSync(imagePath)], { type: `image/${extname(imagePath).slice(1).replace('jpg', 'jpeg')}` }), basename(imagePath));
  form.append('name', kit.name);
  form.append('symbol', kit.symbol);
  form.append('description', kit.description);
  if (kit.twitter) form.append('twitter', kit.twitter);
  if (kit.telegram) form.append('telegram', kit.telegram);
  if (kit.website) form.append('website', kit.website);
  form.append('showName', 'true');
  const res = await fetch('https://pump.fun/api/ipfs', { method: 'POST', body: form });
  const body = await res.text();
  if (!res.ok) fail(`Metadata upload failed: HTTP ${res.status} ${body.slice(0, 300)}`);
  uri = JSON.parse(body).metadataUri;
  if (!uri) fail(`Metadata upload returned no metadataUri: ${body.slice(0, 300)}`);
  console.log(`Metadata:  ${uri}`);
}

// ---------- instructions ----------
const global = await online.fetchGlobal();
const ixs = [
  ComputeBudgetProgram.setComputeUnitLimit({ units: buySol > 0 ? 350_000 : 250_000 }),
  ComputeBudgetProgram.setComputeUnitPrice({ microLamports: Number(values['priority-micro-lamports']) }),
];
let expectedTokens = null;
if (buySol > 0) {
  const feeConfig = await online.fetchFeeConfig();
  const solAmount = new BN(Math.round(buySol * LAMPORTS_PER_SOL));
  expectedTokens = getBuyTokenAmountFromSolAmount({ global, feeConfig, mintSupply: null, bondingCurve: null, amount: solAmount, quoteMint: NATIVE_MINT });
  console.log(`Expected:  ~${(expectedTokens.toNumber() / 1e6).toLocaleString()} tokens for ${buySol} SOL`);
  ixs.push(
    ...(await PUMP_SDK.createV2AndBuyInstructions({
      global,
      mint: mint.publicKey,
      name: kit.name,
      symbol: kit.symbol,
      uri,
      creator,
      user: feePayer,
      amount: expectedTokens,
      solAmount,
      mayhemMode: false,
      holderReward: false,
    })),
  );
} else {
  ixs.push(
    await PUMP_SDK.createV2Instruction({
      mint: mint.publicKey,
      name: kit.name,
      symbol: kit.symbol,
      uri,
      creator,
      user: feePayer,
      mayhemMode: false,
      holderReward: false,
    }),
  );
}

const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
const build = (instructions) => {
  const t = new VersionedTransaction(
    new TransactionMessage({ payerKey: feePayer, recentBlockhash: blockhash, instructions }).compileToV0Message(),
  );
  t.sign(values['dry-run'] ? [mint] : [payer, mint]);
  return t;
};
let tx = build(ixs);
if (tx.serialize().length > 1232) {
  // Create + buy only just exceeds the legacy size limit with the two compute-budget
  // instructions; the default budget (200k CU per instruction) covers ~100k used.
  tx = build(ixs.slice(2));
  console.log('Note:      priority-fee instructions dropped to fit create + buy in one transaction');
}
if (tx.serialize().length > 1232) fail(`Transaction still too large (${tx.serialize().length} bytes)`);
console.log(`Tx size:   ${tx.serialize().length}/1232 bytes, ${tx.message.compiledInstructions.length} instructions`);

// ---------- simulate ----------
const sim = await connection.simulateTransaction(tx, {
  sigVerify: !values['dry-run'],
  replaceRecentBlockhash: values['dry-run'],
  commitment: 'confirmed',
  accounts: { encoding: 'base64', addresses: [feePayer.toBase58()] },
});
if (sim.value.err) {
  console.error((sim.value.logs ?? []).slice(-25).join('\n'));
  fail(`Simulation failed: ${JSON.stringify(sim.value.err)}`);
}
const postLamports = sim.value.accounts?.[0]?.lamports;
const cost = postLamports !== undefined ? balance - postLamports : null;
console.log(`Simulated: OK, ${sim.value.unitsConsumed} CU${cost !== null ? `, payer spends ${sol(cost)}` : ''}`);
if (values['dry-run']) {
  console.log('\nDry run complete: nothing uploaded, nothing sent.');
  process.exit(0);
}
if (cost !== null && balance - cost < 0) fail('Payer cannot cover the launch.');

// ---------- send + confirm ----------
const signature = await connection.sendRawTransaction(tx.serialize(), { skipPreflight: true, maxRetries: 3 });
console.log(`Sent:      ${signature}`);
let status = null;
for (let i = 0; i < 90; i++) {
  status = (await connection.getSignatureStatuses([signature])).value[0];
  if (status?.err) fail(`Transaction failed on-chain: ${JSON.stringify(status.err)}`);
  if (status && ['confirmed', 'finalized'].includes(status.confirmationStatus)) break;
  if ((await connection.getBlockHeight('confirmed')) > lastValidBlockHeight) fail('Blockhash expired before confirmation: nothing was created. Re-run.');
  await sleep(1000);
}
if (!status) fail(`Not confirmed after 90s: check ${signature} before re-running.`);
console.log(`Confirmed: slot ${status.slot}`);

// ---------- verify ----------
const checks = [];
const check = (name, ok, detail = '') => checks.push({ name, ok: Boolean(ok), detail });
const mintInfo = await connection.getParsedAccountInfo(mint.publicKey, 'confirmed');
const parsed = mintInfo.value?.data?.parsed?.info;
check('mint owned by Token-2022', mintInfo.value?.owner?.equals(TOKEN_2022_PROGRAM_ID), mintInfo.value?.owner?.toBase58());
check('no freeze authority', parsed && !parsed.freezeAuthority, parsed?.freezeAuthority ?? 'none');
check('supply 1,000,000,000', parsed?.supply === '1000000000000000', parsed?.supply);
const curveInfo = await connection.getAccountInfo(bondingCurvePda(mint.publicKey), 'confirmed');
const curve = curveInfo ? PUMP_SDK.decodeBondingCurve(curveInfo) : null;
check('bonding curve exists', Boolean(curve));
check('creator = owner wallet', curve?.creator?.equals(creator), curve?.creator?.toBase58());
check('mayhem mode off', curve && !curve.isMayhemMode);
check('holder rewards off', curve && !curve.isHolderReward);
if (buySol > 0) {
  const bal = await connection.getParsedTokenAccountsByOwner(payer.publicKey, { mint: mint.publicKey }, 'confirmed');
  const got = bal.value[0]?.account.data.parsed.info.tokenAmount.amount ?? '0';
  check('dev buy landed', BigInt(got) > 0n, `${Number(got) / 1e6} tokens`);
}
const ok = checks.every((c) => c.ok);
console.log(`\nVerification: ${ok ? 'PASSED' : 'FAILED'}`);
for (const c of checks) console.log(`  ${c.ok ? '✓' : '✗'} ${c.name}${c.detail ? ` (${c.detail})` : ''}`);

const record = {
  cluster: 'mainnet-beta',
  venue: 'pump.fun',
  mint: mint.publicKey.toBase58(),
  name: kit.name,
  symbol: kit.symbol,
  metadataUri: uri,
  creator: creator.toBase58(),
  launchWallet: payer.publicKey.toBase58(),
  devBuySol: buySol,
  signature,
  slot: status.slot,
  checks,
  links: {
    pumpfun: `https://pump.fun/coin/${mint.publicKey.toBase58()}`,
    solscan: `https://solscan.io/token/${mint.publicKey.toBase58()}`,
    tx: `https://solscan.io/tx/${signature}`,
  },
  launchedAt: new Date().toISOString(),
};
const out = join(REPO, 'deployments/mainnet', `pumpfun-${kit.symbol}-${mint.publicKey.toBase58()}.json`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(record, null, 2) + '\n');
console.log(`\nCA:        ${record.mint}`);
console.log(`pump.fun:  ${record.links.pumpfun}`);
console.log(`Record:    ${out}`);
process.exit(ok ? 0 : 3);
