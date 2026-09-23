import { TOKEN_2022_PROGRAM_ID, assessTokenSafety } from '../analysis/tokenSafety.js';

const EXPECTED_EXTENSIONS = ['metadataPointer', 'tokenMetadata'];

/**
 * Compare the on-chain mint against the spec. Every check is explicit so the
 * deployment record shows exactly what was verified.
 *
 * @param {Awaited<ReturnType<import('../sources/solanaRpc.js').getMintInfo>>} mintInfo
 * @param {ReturnType<import('./spec.js').validateSpec>} spec
 * @param {{tokenAccount: string, amountBase: string, actualBase: string|null}[]} recipients
 */
export function verifyLaunch(mintInfo, spec, recipients = []) {
  const checks = [];
  const check = (name, expected, actual) => checks.push({ name, ok: expected === actual, expected, actual });
  const ext = Object.fromEntries((mintInfo?.extensions ?? []).map((e) => [e.extension, e.state ?? {}]));

  check('mint account exists', true, Boolean(mintInfo));
  check('owned by Token-2022', TOKEN_2022_PROGRAM_ID, mintInfo?.programId);
  check('decimals', spec.decimals, mintInfo?.decimals);
  check('supply (base units)', spec.supplyBase.toString(), mintInfo?.supplyRaw);
  check('mint authority revoked', null, mintInfo?.mintAuthority ?? null);
  check('no freeze authority', null, mintInfo?.freezeAuthority ?? null);
  check('only expected extensions', EXPECTED_EXTENSIONS.join(','), Object.keys(ext).sort().join(','));
  check('metadata pointer has no authority', null, ext.metadataPointer?.authority ?? null);
  check('metadata pointer -> mint', mintInfo?.mint, ext.metadataPointer?.metadataAddress);
  check('metadata name', spec.name, ext.tokenMetadata?.name);
  check('metadata symbol', spec.symbol, ext.tokenMetadata?.symbol);
  check('metadata uri', spec.uri, ext.tokenMetadata?.uri);
  if (spec.immutableMetadata) check('metadata immutable', null, ext.tokenMetadata?.updateAuthority ?? null);

  for (const r of recipients) check(`balance ${r.label ?? r.tokenAccount}`, r.amountBase, r.actualBase);

  const safety = mintInfo ? assessTokenSafety(mintInfo) : null;
  const blocking = (safety?.findings ?? []).filter((f) => f.severity !== 'info');
  checks.push({
    name: 'safety scanner: no findings',
    ok: blocking.length === 0,
    expected: 'no findings',
    actual: blocking.length ? blocking.map((f) => f.message).join(' | ') : 'no findings',
  });

  return { ok: checks.every((c) => c.ok), checks, safety };
}
