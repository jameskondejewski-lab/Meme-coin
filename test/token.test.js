import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  appendTransactionMessageInstructions,
  createTransactionMessage,
  generateKeyPairSigner,
  getTransactionSize,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from '@solana/kit';
import { TOKEN_2022_PROGRAM_ADDRESS, getSetAuthorityInstructionDataDecoder } from '@solana-program/token-2022';
import { SpecError, specHash, validateSpec } from '../src/token/spec.js';
import { buildLaunchInstructions, mintSizes } from '../src/token/plan.js';
import { verifyLaunch } from '../src/token/verify.js';
import { TOKEN_2022_PROGRAM_ID } from '../src/analysis/tokenSafety.js';

const SPEC = { name: 'Test Token', symbol: 'TEST', uri: '', decimals: 6, supply: '1000000000' };
const OWNER = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

test('spec: valid devnet spec normalises with defaults', () => {
  const s = validateSpec(SPEC, { cluster: 'devnet' });
  assert.equal(s.immutableMetadata, true);
  assert.equal(s.supplyBase, 1_000_000_000_000_000n);
});

test('spec: collects every problem at once', () => {
  assert.throws(
    () => validateSpec({ name: 'x'.repeat(40), symbol: 'bad!', uri: 'http://insecure', decimals: 12, supply: '0' }, { cluster: 'devnet' }),
    (err) => err instanceof SpecError && ['name', 'symbol', 'uri', 'decimals', 'supply'].every((f) => err.message.includes(f)),
  );
});

test('spec: mainnet requires a metadata uri; u64 overflow is rejected', () => {
  assert.throws(() => validateSpec(SPEC, { cluster: 'mainnet-beta' }), /uri is required on mainnet/);
  assert.throws(() => validateSpec({ ...SPEC, supply: '99999999999999', decimals: 9 }, { cluster: 'devnet' }), /exceeds u64/);
});

test('spec: allocations must sum to supply and use valid owners', () => {
  assert.throws(
    () => validateSpec({ ...SPEC, allocations: [{ label: 'a', owner: OWNER, amount: '5' }] }, { cluster: 'devnet' }),
    /sum to 5, not the supply/,
  );
  assert.throws(
    () => validateSpec({ ...SPEC, allocations: [{ label: 'a', owner: 'nope', amount: SPEC.supply }] }, { cluster: 'devnet' }),
    /owner is not a valid address/,
  );
});

test('spec hash is stable across key order and changes with content', () => {
  const a = validateSpec(SPEC, { cluster: 'devnet' });
  const b = validateSpec({ supply: SPEC.supply, decimals: 6, uri: '', symbol: 'TEST', name: 'Test Token' }, { cluster: 'devnet' });
  assert.equal(specHash(a), specHash(b));
  assert.notEqual(specHash(a), specHash({ ...a, supply: '2' }));
});

async function plan(spec = validateSpec(SPEC, { cluster: 'devnet' })) {
  const payer = await generateKeyPairSigner();
  const mint = await generateKeyPairSigner();
  const { instructions, recipients } = await buildLaunchInstructions({ spec, payer, mint, rentLamports: 5_000_000n });
  return { payer, mint, instructions, recipients, spec };
}

test('plan: one atomic transaction, authority revocation last, within size limit', async () => {
  const { payer, instructions, recipients } = await plan();
  // create, pointer, mint2, metadata, ATA, mintTo, revoke mint authority, drop metadata authority
  assert.equal(instructions.length, 8);
  const token2022 = instructions.slice(1).filter((ix) => ix.programAddress === TOKEN_2022_PROGRAM_ADDRESS);
  assert.equal(token2022.length, 6); // ATA creation goes through the associated-token program

  const revoke = getSetAuthorityInstructionDataDecoder().decode(instructions[6].data);
  assert.equal(revoke.authorityType, 0); // MintTokens
  assert.equal(revoke.newAuthority.__option, 'None');

  assert.equal(recipients.length, 1);
  assert.equal(recipients[0].owner, payer.address);
  assert.equal(recipients[0].amountBase, '1000000000000000');

  const msg = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayerSigner(payer, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash({ blockhash: '11111111111111111111111111111111', lastValidBlockHeight: 1n }, m),
    (m) => appendTransactionMessageInstructions(instructions, m),
  );
  const signed = await signTransactionMessageWithSigners(msg);
  assert.ok(getTransactionSize(signed) <= 1232, `size ${getTransactionSize(signed)}`);
});

test('plan: mutable-metadata spec omits the update-authority removal', async () => {
  const { instructions } = await plan(validateSpec({ ...SPEC, immutableMetadata: false }, { cluster: 'devnet' }));
  assert.equal(instructions.length, 7);
});

test('plan: rent covers the metadata that InitializeTokenMetadata reallocates', async () => {
  const mint = await generateKeyPairSigner();
  const { space, rentSpace } = mintSizes(validateSpec(SPEC, { cluster: 'devnet' }), mint.address, mint.address);
  assert.ok(rentSpace > space + 32 + 10 + 4, `rentSpace ${rentSpace} vs space ${space}`);
});

function mintInfoFor(spec, mintAddr, over = {}) {
  return {
    mint: mintAddr,
    programId: TOKEN_2022_PROGRAM_ID,
    decimals: spec.decimals,
    supplyRaw: spec.supplyBase.toString(),
    mintAuthority: null,
    freezeAuthority: null,
    extensions: [
      { extension: 'metadataPointer', state: { authority: null, metadataAddress: mintAddr } },
      { extension: 'tokenMetadata', state: { updateAuthority: null, mint: mintAddr, name: spec.name, symbol: spec.symbol, uri: spec.uri, additionalMetadata: [] } },
    ],
    ...over,
  };
}

test('verify: a correct launch passes every check and the safety scan', () => {
  const spec = validateSpec(SPEC, { cluster: 'devnet' });
  const r = verifyLaunch(mintInfoFor(spec, 'Mint1'), spec, [{ label: 'payer', amountBase: '1', actualBase: '1' }]);
  assert.equal(r.ok, true, JSON.stringify(r.checks.filter((c) => !c.ok)));
});

test('verify: live mint authority, extra extension or wrong balance fail loudly', () => {
  const spec = validateSpec(SPEC, { cluster: 'devnet' });
  const bad = mintInfoFor(spec, 'Mint1', { mintAuthority: 'Auth' });
  bad.extensions.push({ extension: 'permanentDelegate', state: { delegate: 'Del' } });
  const r = verifyLaunch(bad, spec, [{ label: 'payer', amountBase: '10', actualBase: '9' }]);
  assert.equal(r.ok, false);
  const failed = r.checks.filter((c) => !c.ok).map((c) => c.name);
  assert.deepEqual(failed, ['mint authority revoked', 'only expected extensions', 'balance payer', 'safety scanner: no findings']);
});
