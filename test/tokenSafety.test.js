import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessTokenSafety, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/analysis/tokenSafety.js';

const base = {
  mint: 'Mint1111111111111111111111111111111111111111',
  programId: TOKEN_PROGRAM_ID,
  decimals: 6,
  supplyRaw: '1000000000000000',
  mintAuthority: null,
  freezeAuthority: null,
  extensions: [],
};
const ids = (r) => r.findings.map((f) => f.id);

test('revoked authorities and no extensions: no flags, but still a caveat', () => {
  const r = assessTokenSafety(base);
  assert.equal(r.verdict, 'no-flags-detected');
  assert.equal(r.program, 'spl-token');
  assert.match(r.note, /not proof of safety/);
});

test('active mint and freeze authorities are red flags', () => {
  const r = assessTokenSafety({ ...base, mintAuthority: 'Auth1', freezeAuthority: 'Auth2' });
  assert.equal(r.verdict, 'red-flags');
  assert.deepEqual(ids(r), ['mint-authority', 'freeze-authority']);
  assert.equal(r.findings[0].severity, 'critical');
});

test('Token-2022 permanent delegate is critical; metadata extensions are ignored', () => {
  const r = assessTokenSafety({
    ...base,
    programId: TOKEN_2022_PROGRAM_ID,
    extensions: [
      { extension: 'metadataPointer', state: { metadataAddress: 'x' } },
      { extension: 'permanentDelegate', state: { delegate: 'Del1' } },
    ],
  });
  assert.equal(r.program, 'token-2022');
  assert.deepEqual(ids(r), ['ext:permanentDelegate']);
  assert.equal(r.findings[0].severity, 'critical');
});

test('transfer fee severity depends on whether an authority can raise it', () => {
  const fee = (authority) => ({
    ...base,
    programId: TOKEN_2022_PROGRAM_ID,
    extensions: [{
      extension: 'transferFeeConfig',
      state: {
        transferFeeConfigAuthority: authority,
        olderTransferFee: { transferFeeBasisPoints: 100 },
        newerTransferFee: { transferFeeBasisPoints: 100 },
      },
    }],
  });
  assert.equal(assessTokenSafety(fee('FeeAuth')).findings[0].severity, 'high');
  assert.equal(assessTokenSafety(fee(null)).findings[0].severity, 'medium');
});

test('frozen default account state and pausable are high', () => {
  const r = assessTokenSafety({
    ...base,
    programId: TOKEN_2022_PROGRAM_ID,
    extensions: [
      { extension: 'defaultAccountState', state: { accountState: 'frozen' } },
      { extension: 'pausableConfig', state: { authority: 'P', paused: true } },
    ],
  });
  assert.equal(r.verdict, 'red-flags');
  assert.match(r.findings.find((f) => f.id === 'ext:pausableConfig').message, /CURRENTLY PAUSED/);
});

test('unknown owning program is critical', () => {
  assert.equal(assessTokenSafety({ ...base, programId: 'Evil111' }).findings[0].id, 'unknown-program');
});

test('concentration is an upper bound until pool vaults are excluded', () => {
  const largest = [
    { address: 'Vault', amountRaw: '600000000000000' }, // 60%
    { address: 'Whale', amountRaw: '150000000000000' }, // 15%
    { address: 'Small', amountRaw: '10000000000000' }, // 1%
  ];
  const raw = assessTokenSafety(base, largest);
  assert.equal(raw.concentration.top10Pct, 76);
  assert.equal(raw.concentration.adjusted, false);
  // Downgraded one level and labelled as an upper bound.
  const top10 = raw.findings.find((f) => f.id === 'top10-concentration');
  assert.equal(top10.severity, 'medium');
  assert.match(top10.message, /upper bound/);

  const adj = assessTokenSafety(base, largest, { excludeAddresses: ['Vault'] });
  assert.equal(adj.concentration.top1Pct, 15);
  assert.equal(adj.concentration.top10Pct, 16);
  assert.equal(adj.findings.find((f) => f.id === 'top1-concentration').severity, 'high');
  assert.equal(adj.verdict, 'red-flags');
});
