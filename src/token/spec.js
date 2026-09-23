// A token spec is the single, reviewable description of a launch. Everything
// the launcher does is derived from it, and the deployment record stores its
// hash so what was reviewed is provably what was deployed.

import { createHash } from 'node:crypto';
import { isValidAddress } from '../lib/context.js';

const U64_MAX = (1n << 64n) - 1n;

export class SpecError extends Error {}

/**
 * @typedef {object} TokenSpec
 * @property {string} name          <= 32 bytes
 * @property {string} symbol        2-10 chars, A-Z0-9
 * @property {string} uri           https:// metadata JSON, or '' (devnet tests only)
 * @property {number} decimals      0-9
 * @property {string} supply        whole tokens, integer string
 * @property {boolean} [immutableMetadata]  default true: drop the metadata update authority
 * @property {{label: string, owner: string, amount: string}[]} [allocations]
 *   whole-token amounts; must sum to supply. Omitted: everything to the payer.
 */

/** Validate and normalise a spec. Throws SpecError listing every problem. */
export function validateSpec(raw, { cluster }) {
  const errors = [];
  const spec = { immutableMetadata: true, allocations: [], ...raw };

  if (typeof spec.name !== 'string' || !spec.name.trim()) errors.push('name is required');
  else if (Buffer.byteLength(spec.name) > 32) errors.push('name must be at most 32 bytes');

  if (typeof spec.symbol !== 'string' || !/^[A-Z0-9]{2,10}$/.test(spec.symbol)) {
    errors.push('symbol must be 2-10 characters of A-Z / 0-9');
  }

  if (typeof spec.uri !== 'string') errors.push('uri must be a string');
  else if (spec.uri === '') {
    if (cluster === 'mainnet-beta') errors.push('uri is required on mainnet (hosted metadata JSON)');
  } else if (!/^https:\/\/\S+$/.test(spec.uri) || spec.uri.length > 200) {
    errors.push('uri must be an https:// URL of at most 200 characters');
  }

  if (!Number.isInteger(spec.decimals) || spec.decimals < 0 || spec.decimals > 9) errors.push('decimals must be an integer 0-9');

  let supplyBase = null;
  if (typeof spec.supply !== 'string' || !/^[1-9][0-9]*$/.test(spec.supply)) errors.push('supply must be a positive integer string');
  else if (Number.isInteger(spec.decimals)) {
    supplyBase = BigInt(spec.supply) * 10n ** BigInt(spec.decimals);
    if (supplyBase > U64_MAX) errors.push('supply * 10^decimals exceeds u64');
  }

  if (!Array.isArray(spec.allocations)) errors.push('allocations must be an array');
  else if (spec.allocations.length) {
    let sum = 0n;
    spec.allocations.forEach((a, i) => {
      if (!a || typeof a.label !== 'string' || !a.label) errors.push(`allocations[${i}].label is required`);
      if (!isValidAddress(a?.owner)) errors.push(`allocations[${i}].owner is not a valid address`);
      if (typeof a?.amount !== 'string' || !/^[1-9][0-9]*$/.test(a.amount)) errors.push(`allocations[${i}].amount must be a positive integer string`);
      else sum += BigInt(a.amount);
    });
    if (typeof spec.supply === 'string' && /^[1-9][0-9]*$/.test(spec.supply) && sum !== BigInt(spec.supply)) {
      errors.push(`allocations sum to ${sum}, not the supply ${spec.supply}`);
    }
  }

  if (typeof spec.immutableMetadata !== 'boolean') errors.push('immutableMetadata must be a boolean');

  if (errors.length) throw new SpecError(`Invalid token spec:\n  - ${errors.join('\n  - ')}`);
  return { ...spec, supplyBase };
}

/** Stable hash of the fields that define the token (key order independent). */
export function specHash(spec) {
  const canonical = JSON.stringify({
    name: spec.name,
    symbol: spec.symbol,
    uri: spec.uri,
    decimals: spec.decimals,
    supply: spec.supply,
    immutableMetadata: spec.immutableMetadata,
    allocations: spec.allocations.map(({ label, owner, amount }) => ({ label, owner, amount })),
  });
  return createHash('sha256').update(canonical).digest('hex');
}
