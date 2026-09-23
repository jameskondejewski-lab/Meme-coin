# Solana Launch Intel

A toolkit for **evidence-based** Solana token research, security review and market monitoring.

The planned pipeline is:

Research → Trend detection → Concept → Token creation (devnet first) → Security review → Launch prep → Monitoring → Social intelligence

**Ground rule: no fabricated data.** Every number carries its source and timestamp. When a source fails, the output says `Live data unavailable (<source>: <reason>)` instead of a placeholder.

## Status

| Stage | State |
|---|---|
| Market research (2026-09-23) | [docs/research/2026-09-23-solana-market-research.md](docs/research/2026-09-23-solana-market-research.md) |
| Stack and API due diligence | [docs/research/2026-09-23-tech-due-diligence.md](docs/research/2026-09-23-tech-due-diligence.md) |
| Market snapshot CLI (multi-source, cross-checked) | ✅ `npm run snapshot` |
| Static token safety review (authorities, Token-2022 extensions, concentration) | ✅ in snapshot `--mint` |
| Token concepts | next |
| SPL token scripts (devnet) | planned |
| Alerting and history | planned |
| Social sentiment engine | planned (needs a paid data feed) |
| Dashboard UI | planned |

## Market snapshot

Requires Node ≥ 20. There are no dependencies.

```bash
npm test                          # unit tests (offline)
npm run snapshot:fixtures         # demo on SYNTHETIC fixture data (clearly bannered)
npm run snapshot                  # live: CoinGecko, Jupiter, DexScreener, GeckoTerminal, DefiLlama, alternative.me
npm run snapshot -- --mint <MINT> # add a token: price cross-check, liquidity/volume, safety review
npm run snapshot -- --mint <MINT> --exclude <POOL_VAULT_TOKEN_ACCOUNT> --save --json
```

### What the snapshot reports

- **SOL price, cross-checked across CoinGecko, Jupiter and DexScreener.**
  - It reports the median and the maximum deviation.
  - Status is `consistent` when all sources agree within 2%, `divergent` when they don't, and `single-source` when only one responded.
- **Market context:** BTC, ETH, Fear & Greed, Solana TVL, DEX volume and stablecoin supply (DefiLlama).
- **Solana meme sector:** sector totals and leaders from CoinGecko's `solana-meme-coins` category.
- **Trending pools (GeckoTerminal), with indicator flags:**
  - `new-pool`
  - `thin-liquidity`: liquidity below 3% of FDV
  - `sell-pressure`
  - `high-turnover`: 24h volume above 20× liquidity (possible wash or bot trading)
  - `few-traders`
  - `paid-promotion`: the token is buying DexScreener boosts
  - Flags are **indicators, not proof**.
- **Watchlist tokens (`--mint`):**
  - Jupiter vs DexScreener price.
  - Deepest-pair liquidity and volume.
  - An on-chain safety review:
    - mint and freeze authority;
    - owning program;
    - dangerous Token-2022 extensions (permanent delegate, transfer hook, pausable, frozen default state, adjustable transfer fee, …);
    - top-1 and top-10 holder concentration.
  - Concentration counts pool vaults and lockers until you `--exclude` them, so it is labelled an upper bound.

### Configuration

Copy `.env.example`. All values are optional:
- `SOLANA_RPC_URL`: use a dedicated RPC, because public RPC throttles `getTokenLargestAccounts`.
- `COINGECKO_API_KEY`.
- `JUPITER_API_KEY`: switches to `api.jup.ag`, since keyless lite-api is being phased out.

The process exits with code 2 if every source fails, so a scheduler notices a dead pipeline.

## Security posture

- Zero runtime dependencies.
- `.npmrc` sets `ignore-scripts=true` and `save-exact=true`, because 2025–26 npm worms (Shai-Hulud, ChainDrop) spread through install scripts.
- No private keys are ever read by this code. Keypair files are git-ignored.
- **Nothing here deploys to mainnet.** Token scripts will be devnet-first, with explicit, separate mainnet steps after review.

## Layout

```
src/lib/        http (timeout/retry, source-named errors), context/config, fixture fetch
src/sources/    coingecko, dexscreener, geckoterminal, jupiter, defillama, solanaRpc, fearGreed
src/analysis/   crossCheck, tokenSafety, trending
src/snapshot.js orchestrates sources → snapshot JSON with provenance
src/report.js   terminal report
test/           node:test suites + SYNTHETIC fixtures
docs/research/  dated research reports
```
