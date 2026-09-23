#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { createContext, isValidAddress } from '../lib/context.js';
import { createFixtureFetch, FIXTURE_NOW } from '../lib/fixtureFetch.js';
import { buildSnapshot } from '../snapshot.js';
import { renderReport } from '../report.js';
import { reexecWithEnvProxyIfNeeded } from '../lib/proxy.js';

const USAGE = `Usage: npm run snapshot -- [options]

  --mint <address>      Add a token mint to the watchlist (repeatable)
  --exclude <address>   Token account to exclude from holder concentration,
                        e.g. a pool vault or locker (repeatable)
  --json                Print the snapshot as JSON instead of a report
  --save                Also write JSON to data/snapshots/<timestamp>.json
  --fixtures            Use SYNTHETIC test fixtures instead of the network
  -h, --help            Show this help

Environment: SOLANA_RPC_URL, COINGECKO_API_KEY, JUPITER_API_BASE, JUPITER_API_KEY`;

const { values } = parseArgs({
  options: {
    mint: { type: 'string', multiple: true, default: [] },
    exclude: { type: 'string', multiple: true, default: [] },
    json: { type: 'boolean', default: false },
    save: { type: 'boolean', default: false },
    fixtures: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  console.log(USAGE);
  process.exit(0);
}

if (!values.fixtures) reexecWithEnvProxyIfNeeded();

const invalid = [...values.mint, ...values.exclude].filter((a) => !isValidAddress(a));
if (invalid.length) {
  console.error(`Not a valid Solana address: ${invalid.join(', ')}`);
  process.exit(1);
}

const env = values.fixtures ? {} : process.env;
const ctx = values.fixtures
  ? createContext({ env, fetchImpl: createFixtureFetch().fetchImpl, now: () => FIXTURE_NOW })
  : createContext({ env });

const snapshot = await buildSnapshot(ctx, {
  watchMints: values.mint,
  excludeAddresses: values.exclude,
  mode: values.fixtures ? 'fixtures' : 'live',
});

if (values.save) {
  const dir = join(process.cwd(), 'data', 'snapshots');
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${snapshot.generatedAt.replace(/[:.]/g, '-')}${values.fixtures ? '.fixtures' : ''}.json`);
  writeFileSync(file, JSON.stringify(snapshot, null, 2));
  console.error(`saved ${file}`);
}

console.log(values.json ? JSON.stringify(snapshot, null, 2) : renderReport(snapshot));

// Non-zero exit when every source failed, so schedulers notice a dead pipeline.
if (Object.values(snapshot.sources).every((s) => !s.ok)) process.exitCode = 2;
