# Solana token stack and data-API due diligence (2026-09-23)

## How this was produced

- Everything here comes from web-search summaries, not full pages. Where a page showed no date, it is marked "seen 2026-09-23".
- Each item is tagged **[FACT]** (a primary or official snippet states it) or **[UNCERTAIN]** (a single third-party source, vendor marketing, a conflict, or inference).
- Re-verify versions and limits before pinning anything.

## 1. SDK stack

| Package | Status | Tag | Source |
|---|---|---|---|
| `@solana/kit` | 8.3.0 (≈2026-09-09). Successor to web3.js 1.x. | FACT | [npm](https://www.npmjs.com/package/@solana/kit) |
| `@solana-program/token-2022` | 0.16.1 (≈2026-09-20) | FACT | [npm](https://www.npmjs.com/package/@solana-program/token-2022) |
| `@solana-program/token` | 0.16.0 per the Aug 27 changelog; the npm `latest` tag was not confirmed | UNCERTAIN | [changelog](https://solana.com/news/solana-changelog-august-27-2026) |
| `@solana/web3.js` 1.x | 1.99.0, in maintenance. **Version 3.0, rebuilt on Kit, becomes npm `latest` in Q4 2026.** Any install that doesn't pin a version will break. | FACT | [issue #3947](https://github.com/solana-foundation/solana-web3.js/issues/3947) |
| `@metaplex-foundation/mpl-token-metadata` | 3.4.0, last published about 2 years ago. A Kit-native `mpl-token-metadata-kit` exists; its version was not found. | FACT / ⚠ 2024-era | [npm](https://www.npmjs.com/package/@metaplex-foundation/mpl-token-metadata) |
| `@sqds/multisig` (Squads v4) | 2.1.4 (≈Nov 2025). Probably built on web3.js 1.x. | FACT / UNCERTAIN | [npm](https://www.npmjs.com/package/@sqds/multisig) |

**Metadata [FACT]:**
- Token-2022's MetadataPointer and TokenMetadata extensions store metadata on the mint account itself.
- Metaplex uses a separate PDA account.
- Metaplex can also create metadata for Token-2022 mints.

## 2. Token-2022 extensions that scanners and buyers treat as red flags

- **Critical:** PermanentDelegate, which can move or burn any holder's tokens.
- **High:** TransferHook (can block sells), Pausable, NonTransferable, DefaultAccountState=Frozen, and a TransferFee whose authority can raise the fee.
- **Medium:** fixed TransferFee, MintCloseAuthority, ConfidentialTransfer, InterestBearing and ScaledUiAmount (the last two let an authority change displayed balances).
- `src/analysis/tokenSafety.js` encodes exactly this list.
- ⚠ [UNCERTAIN] One blog claims a March 2026 permanent-delegate scam factory was behind ">40% of new tokens flagged". Single source.

## 3. Supply-chain incidents [FACT]

| Date | Incident |
|---|---|
| 2024-12-02 | `@solana/web3.js` **1.95.6 and 1.95.7** backdoored to steal keys; fixed in 1.95.8 ([Socket](https://socket.dev/blog/supply-chain-attack-solana-web3-js-library)) |
| 2025-09-08 | chalk/debug hijack: a wallet-address swapper that also targeted SOL ([CoinDesk](https://www.coindesk.com/markets/2025/09/09/ethereum-solana-wallets-targeted-in-massive-npm-attack-but-just-5-cents-taken)) |
| Sep and Nov 2025 | Shai-Hulud 1.0 and 2.0 npm worms ([CISA](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem)) |
| 2026-03-24 | Typosquats `raydium-bs58`, `base-x-64`, `base_xd`, `bs58-basic` and `ethersproject-wallet` intercept keypair decoding ([Socket](https://socket.dev/blog/5-malicious-npm-packages-typosquat-solana-and-ethereum-libraries-steal-private-keys)) |
| 2026-08-04 | **ChainDrop** worm: spreads through a `preinstall` script, steals wallets and CI secrets, and plants editor and agent hooks to persist ([Microsoft](https://www.microsoft.com/en-us/security/blog/2026/08/04/chaindrop-supply-chain-compromise-anatomy-self-propagating-worm/)) |

**Policy for this repo:**
- Zero runtime dependencies so far.
- `.npmrc` sets `ignore-scripts=true` and `save-exact=true`.
- When Solana SDKs are added:
  - pin exact versions;
  - commit the lockfile;
  - install with `npm ci`;
  - review lockfile diffs;
  - never hold authority keys in a process that installs packages. Sign with a hardware wallet, or keep authorities in a Squads vault.

## 4. Authorities, vesting and LP locks

- **Squads v4** (`SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf`) [FACT]:
  - Supports time locks and spending limits.
  - Audited by Neodyme, OtterSec and Trail of Bits.
  - Can hold mint, freeze, metadata and upgrade authority.
  - [UNCERTAIN] Authorities should be set to the **vault PDA**, not the multisig account. Verify against the docs before use.
- **Vesting:**
  - Jupiter Lock [FACT]: free and open source. A schedule cannot be changed once created.
  - Streamflow [UNCERTAIN]: more flexible; fees not confirmed.
  - Bonfida vesting is legacy.
- **LP:**
  - Raydium Burn & Earn [FACT]: LP is locked in escrow permanently, and fees stay claimable through a Fee Key NFT.
  - Meteora DAMM v2 [FACT]: `permanent_lock_position`.
  - pump.fun graduations go to PumpSwap with LP burned [UNCERTAIN, third-party].

## 5. Market-data APIs (for the snapshot tool and dashboard)

| API | Access | Tag |
|---|---|---|
| DexScreener | Free. 300 req/min for pairs and tokens; 60 req/min for boosts and profiles. | FACT |
| GeckoTerminal | Free, 30 calls/min | FACT |
| CoinGecko Demo | Free key, 10K calls/month. ⚠ The per-minute limit is reported as both 30 and 100. | FACT / UNCERTAIN |
| Jupiter Price v3 / Tokens v2 | Moving to `api.jup.ag` with an `x-api-key` header. Keyless lite-api is being phased out (date unknown). Price v2 is deprecated. Tokens v2 exposes `organicScore` and `audit`. | FACT |
| Helius | Free tier: 1M credits, 10 RPS (2 RPS for DAS). DAS `getTokenAccounts` returns up to 1,000 accounts per page, for full holder lists. The Parsed Events free period ended on 2026-09-21. | FACT / UNCERTAIN |
| RPC `getTokenLargestAccounts` | Top 20 token accounts only, no pagination | FACT |
| DefiLlama | Free, no key; rate limit undocumented | FACT |
| Birdeye | Free tier: 1 req/sec, 30K compute units per month. Has a `token_security` endpoint. | FACT |
| Scanners | RugCheck and GoPlus (`mintable`, `freezable`, `transfer_hook`, `transfer_fee`), Bubblemaps V2 (relaunched 2026-09-16), Birdeye security | FACT / UNCERTAIN |

## 6. Social data

- **X API is pay-per-use** [FACT]:
  - $0.005 per post read and $0.010 per user read ([docs.x.com](https://docs.x.com/x-api/getting-started/pricing)).
  - That is about $5K per 1M post reads.
- **Apps that reward users for posting lost X API access** on 2026-01-15 [FACT]. Never build pay-to-post mechanics.
- **Alternatives:**
  - LunarCrush [FACT]: $90 / $300 / $900 per month tiers; social endpoints are paid only.
  - Santiment: free tier lags 30 days; real-time needs the MAX plan.
  - Kaito API pricing was not found.
