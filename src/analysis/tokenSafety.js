export const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
export const TOKEN_2022_PROGRAM_ID = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';

const SEVERITY_ORDER = ['info', 'medium', 'high', 'critical'];
const downgrade = (s) => SEVERITY_ORDER[Math.max(0, SEVERITY_ORDER.indexOf(s) - 1)];

/**
 * Token-2022 extensions that give an authority power over holders' tokens or
 * over transfers. Names match the RPC's jsonParsed `extension` field.
 */
function assessExtension(ext) {
  const s = ext.state ?? {};
  switch (ext.extension) {
    case 'permanentDelegate':
      return s.delegate
        ? { severity: 'critical', message: `Permanent delegate ${s.delegate} can transfer or burn tokens from ANY holder.` }
        : null;
    case 'transferHook':
      return s.programId
        ? { severity: 'high', message: `Transfer hook program ${s.programId} runs on every transfer and can block sells.` }
        : s.authority
          ? { severity: 'medium', message: 'Transfer hook is unset but its authority can enable one later.' }
          : null;
    case 'pausableConfig':
      return { severity: 'high', message: `Authority ${s.authority ?? '(unknown)'} can pause all transfers${s.paused ? ' — CURRENTLY PAUSED' : ''}.` };
    case 'defaultAccountState':
      return s.accountState === 'frozen'
        ? { severity: 'high', message: 'New token accounts start frozen; holders need the freeze authority to thaw them.' }
        : null;
    case 'nonTransferable':
      return { severity: 'high', message: 'Token is non-transferable (soulbound); it cannot be sold.' };
    case 'transferFeeConfig': {
      const bps = Math.max(
        Number(s.newerTransferFee?.transferFeeBasisPoints ?? 0),
        Number(s.olderTransferFee?.transferFeeBasisPoints ?? 0),
      );
      const canChange = Boolean(s.transferFeeConfigAuthority);
      if (bps === 0 && !canChange) return null;
      return {
        severity: canChange ? 'high' : 'medium',
        message: `Transfer fee ${bps / 100}%${canChange ? `; authority ${s.transferFeeConfigAuthority} can raise it` : ''}.`,
      };
    }
    case 'mintCloseAuthority':
      return s.closeAuthority ? { severity: 'medium', message: `Mint can be closed by ${s.closeAuthority}.` } : null;
    case 'confidentialTransferMint':
      return { severity: 'medium', message: 'Confidential transfers enabled: balances and flows may be hidden from analysis.' };
    case 'interestBearingConfig':
    case 'scaledUiAmountConfig':
      return { severity: 'medium', message: `${ext.extension}: displayed balances can be changed by an authority.` };
    default:
      return null; // metadataPointer, tokenMetadata, group pointers, etc. are benign
  }
}

function pctOf(amountRaw, supplyRaw) {
  const supply = BigInt(supplyRaw);
  if (supply === 0n) return 0;
  return Number((BigInt(amountRaw) * 1_000_000n) / supply) / 10_000; // 4 dp
}

/**
 * Static red-flag review of a mint. "No flags detected" is NOT a safety
 * guarantee: it cannot see off-chain promises, LP lock status, insider
 * clusters funded from the same wallet, or social manipulation.
 *
 * @param {Awaited<ReturnType<import('../sources/solanaRpc.js').getMintInfo>>} mintInfo
 * @param {{address: string, amountRaw: string}[]} [largestAccounts]
 * @param {{excludeAddresses?: string[]}} [opts]  known pool vaults / lockers / burn accounts
 */
export function assessTokenSafety(mintInfo, largestAccounts = [], { excludeAddresses = [] } = {}) {
  const findings = [];
  const add = (id, severity, message) => findings.push({ id, severity, message });

  const program =
    mintInfo.programId === TOKEN_PROGRAM_ID ? 'spl-token'
      : mintInfo.programId === TOKEN_2022_PROGRAM_ID ? 'token-2022'
        : 'unknown';
  if (program === 'unknown') add('unknown-program', 'critical', `Mint is owned by unrecognised program ${mintInfo.programId}.`);

  if (mintInfo.mintAuthority) {
    add('mint-authority', 'critical', `Mint authority ${mintInfo.mintAuthority} can create unlimited new supply.`);
  }
  if (mintInfo.freezeAuthority) {
    add('freeze-authority', 'high', `Freeze authority ${mintInfo.freezeAuthority} can freeze any holder's account (honeypot risk).`);
  }

  for (const ext of mintInfo.extensions ?? []) {
    const r = assessExtension(ext);
    if (r) add(`ext:${ext.extension}`, r.severity, r.message);
  }

  let concentration = null;
  if (largestAccounts.length && mintInfo.supplyRaw && BigInt(mintInfo.supplyRaw) > 0n) {
    const excluded = new Set(excludeAddresses);
    const counted = largestAccounts.filter((a) => !excluded.has(a.address));
    const top1Pct = counted.length ? pctOf(counted[0].amountRaw, mintInfo.supplyRaw) : 0;
    const top10Pct = pctOf(
      counted.slice(0, 10).reduce((sum, a) => sum + BigInt(a.amountRaw), 0n),
      mintInfo.supplyRaw,
    );
    const adjusted = excluded.size > 0;
    concentration = { top1Pct, top10Pct, excludedCount: largestAccounts.length - counted.length, adjusted };

    const caveat = adjusted ? '' : ' (upper bound: pool vaults and lockers not excluded)';
    const sev = (s) => (adjusted ? s : downgrade(s));
    if (top10Pct > 50) add('top10-concentration', sev('high'), `Top 10 accounts hold ${top10Pct}% of supply${caveat}.`);
    else if (top10Pct > 30) add('top10-concentration', sev('medium'), `Top 10 accounts hold ${top10Pct}% of supply${caveat}.`);
    if (top1Pct > 10) add('top1-concentration', sev('high'), `Largest account holds ${top1Pct}% of supply${caveat}.`);
  }

  findings.sort((a, b) => SEVERITY_ORDER.indexOf(b.severity) - SEVERITY_ORDER.indexOf(a.severity));
  const worst = findings[0]?.severity;
  const verdict = worst === 'critical' || worst === 'high' ? 'red-flags' : worst === 'medium' ? 'caution' : 'no-flags-detected';

  return {
    mint: mintInfo.mint,
    program,
    verdict,
    findings,
    concentration,
    note: 'Static on-chain checks only. Absence of flags is not proof of safety.',
  };
}
