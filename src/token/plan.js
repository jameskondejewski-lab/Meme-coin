// Builds the launch as ONE atomic transaction:
//
//   1. create the mint account (Token-2022)
//   2. MetadataPointer -> the mint itself, with NO pointer authority
//   3. InitializeMint2 with NO freeze authority
//   4. TokenMetadata (name, symbol, uri) stored on the mint
//   5. for each allocation: create its associated token account + MintToChecked
//   6. revoke the mint authority (supply is fixed forever)
//   7. optionally drop the metadata update authority (immutable metadata)
//
// Atomicity is a security property: there is never a confirmed state where
// supply exists and the mint authority is still live, or vice versa.
//
// Deliberately NOT used: transfer fees, transfer hooks, permanent delegate,
// pausable, default-frozen accounts, or any other extension that scanners
// (RugCheck, GoPlus) treat as a red flag.

import { none, some } from '@solana/kit';
import { getCreateAccountInstruction } from '@solana-program/system';
import {
  AuthorityType,
  TOKEN_2022_PROGRAM_ADDRESS,
  extension,
  findAssociatedTokenPda,
  getCreateAssociatedTokenIdempotentInstruction,
  getInitializeMetadataPointerInstruction,
  getInitializeMint2Instruction,
  getInitializeTokenMetadataInstruction,
  getMintSize,
  getMintToCheckedInstruction,
  getSetAuthorityInstruction,
  getUpdateTokenMetadataUpdateAuthorityInstruction,
} from '@solana-program/token-2022';

/**
 * Account sizes for the mint. The account is created with room for the
 * fixed-size MetadataPointer only; InitializeTokenMetadata reallocates it, so
 * the rent deposit must already cover the final size including metadata.
 */
export function mintSizes(spec, mintAddress, updateAuthority) {
  const pointer = extension('MetadataPointer', { authority: none(), metadataAddress: some(mintAddress) });
  const metadata = extension('TokenMetadata', {
    updateAuthority: some(updateAuthority),
    mint: mintAddress,
    name: spec.name,
    symbol: spec.symbol,
    uri: spec.uri,
    additionalMetadata: new Map(),
  });
  return { space: getMintSize([pointer]), rentSpace: getMintSize([pointer, metadata]) };
}

/**
 * @param {object} p
 * @param {ReturnType<import('./spec.js').validateSpec>} p.spec
 * @param {import('@solana/kit').TransactionSigner} p.payer   pays rent/fees; temporary mint + update authority
 * @param {import('@solana/kit').TransactionSigner} p.mint    fresh keypair for the mint account
 * @param {bigint} p.rentLamports  rent-exempt minimum for mintSizes().rentSpace
 */
export async function buildLaunchInstructions({ spec, payer, mint, rentLamports }) {
  const { space } = mintSizes(spec, mint.address, payer.address);
  const allocations = spec.allocations.length
    ? spec.allocations
    : [{ label: 'payer', owner: payer.address, amount: spec.supply }];
  const scale = 10n ** BigInt(spec.decimals);

  const instructions = [
    getCreateAccountInstruction({
      payer,
      newAccount: mint,
      lamports: rentLamports,
      space,
      programAddress: TOKEN_2022_PROGRAM_ADDRESS,
    }),
    getInitializeMetadataPointerInstruction({ mint: mint.address, authority: none(), metadataAddress: some(mint.address) }),
    getInitializeMint2Instruction({ mint: mint.address, decimals: spec.decimals, mintAuthority: payer.address, freezeAuthority: none() }),
    getInitializeTokenMetadataInstruction({
      metadata: mint.address,
      updateAuthority: payer.address,
      mint: mint.address,
      mintAuthority: payer,
      name: spec.name,
      symbol: spec.symbol,
      uri: spec.uri,
    }),
  ];

  const recipients = [];
  for (const a of allocations) {
    const [ata] = await findAssociatedTokenPda({ owner: a.owner, mint: mint.address, tokenProgram: TOKEN_2022_PROGRAM_ADDRESS });
    const amount = BigInt(a.amount) * scale;
    instructions.push(
      getCreateAssociatedTokenIdempotentInstruction({ payer, ata, owner: a.owner, mint: mint.address, tokenProgram: TOKEN_2022_PROGRAM_ADDRESS }),
      getMintToCheckedInstruction({ mint: mint.address, token: ata, mintAuthority: payer, amount, decimals: spec.decimals }),
    );
    recipients.push({ label: a.label, owner: a.owner, tokenAccount: ata, amountBase: amount.toString() });
  }

  instructions.push(
    getSetAuthorityInstruction({ owned: mint.address, owner: payer, authorityType: AuthorityType.MintTokens, newAuthority: none() }),
  );
  if (spec.immutableMetadata) {
    instructions.push(
      getUpdateTokenMetadataUpdateAuthorityInstruction({ metadata: mint.address, updateAuthority: payer, newUpdateAuthority: none() }),
    );
  }

  return { instructions, recipients };
}
