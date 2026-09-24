# Launch sheet: Won't Budge ($BUDGE), pump.fun

**Status:** preparing. The name/IP check and the logo are in progress. Nothing has been launched.

## The idea

> A basset hound asleep on the dev's bag. He has not moved. He will not move.

The dev buy is small (0.25 SOL, about 0.9% of supply). The joke is that the dog is lying on it. The honesty *is* the meme.

## pump.fun form

| Field | Value |
|---|---|
| Name | `Won't Budge` |
| Ticker | `BUDGE` |
| Image | `assets/budge/budge.png` (1000×1000, original artwork) |
| Description | see below |
| X / Telegram / Website | optional. If you create an X account first, add it. A coin with no socials looks abandoned. |
| Fee mode | **Creator fee** (the default). Not Holder Rewards: paying holders a share of fees looks like a yield product. |
| Quote asset | SOL (standard; 47 of the 50 newest coins use it) |
| Initial buy (dev buy) | **0.25 SOL** in the create step. It is the first buy, so no one front-runs it. |

### Description, version A (if you will lock the dev bag)

```
He has not moved. He will not move.

A basset hound asleep on the dev bag.
Dev bought 0.25 SOL at launch (~0.9% of supply), one wallet.
No presale. No team tokens. No bundles.
Dev bag gets locked on Jupiter Lock right after launch. Receipt on X.

Just a meme. No roadmap. No promises. Don't budge.
```

### Description, version B (no lock)

```
He has not moved. He will not move.

A basset hound asleep on the dev bag.
Dev bought 0.25 SOL at launch (~0.9% of supply), one wallet.
No presale. No team tokens. No bundles.

Just a meme. No roadmap. No promises. Don't budge.
```

pump.fun metadata **cannot be edited after launch**, so only claim what you will actually do.

## What 0.25 SOL buys (verified from pump.fun's live API, 2026-09-24)

- 59 of the 91 newest SOL-quoted coins use the standard curve: 30 SOL virtual reserves and 1.073B virtual tokens.
- On that curve, 0.25 SOL buys about **8.8M BUDGE, around 0.88% of supply**. The exact figure depends on the fee tier at launch.
- Holdings under 1% don't trip the usual "whale dev" warnings on RugCheck, Bubblemaps or DexScreener, as long as it's one wallet.

## Who signs: your wallet (recommended)

Create the coin yourself at pump.fun with **your own wallet** (Phantom, Solflare or Backpack). Reasons:

- **You are the creator on-chain,** so creator fees go to you directly.
- **No private key ever leaves your wallet.** The alternative is a hot key inside a temporary cloud container, which disappears when the session ends.
- **It takes about 2 minutes:** connect wallet → "create coin" → fill in the form above → set initial buy to 0.25 → confirm.

**Budget:** 0.25 SOL for the dev buy, plus about 0.02–0.05 SOL for creation and network fees. Keep roughly 0.35 SOL in the wallet.

## Before you click "Create"

- [ ] Name/ticker/IP check is clear (see the result below).
- [ ] Logo downloaded from `assets/budge/budge.png`.
- [ ] Description chosen (A only if you will really lock).
- [ ] Wallet holds about 0.35 SOL and is on **mainnet**.
- [ ] Initial buy is set to **0.25 SOL**.
- [ ] One wallet only: no buys from other wallets you control in the first blocks. That is "bundling", and scanners flag it.
- [ ] You accept the downside. Most pump.fun coins never graduate; in June only about 0.26% did. Treat the 0.25 SOL as spent.

## Right after launch

1. **Send me the mint address**, the "CA" shown on the coin page. I will run:
   - `npm run snapshot -- --mint <CA>`, which checks the price across sources, liquidity, and the RugCheck and on-chain safety review;
   - a holder and bundle check, confirming only one dev wallet;
   - verification that the mint is Token-2022, has no freeze authority, has a fixed supply, and that the metadata matches this sheet.
2. **Optional, if you chose version A:** lock the dev tokens at <https://lock.jup.ag>.
   - Choose a cliff, e.g. 30 or 90 days. The schedule cannot be changed afterwards.
   - Post the lock link on X. That post is the receipt.
3. **Don't sell the dev bag early.** That is the whole joke.

## Risks, stated plainly

- Meme coins are speculative. Most go to zero. The 0.25 SOL may be lost.
- Snipers and bots buy in the first seconds of almost every pump.fun launch. We don't control that, and it isn't a sign of anything we did.
- **Name confusion:** anyone can launch another "BUDGE" afterwards. Always share the exact contract address.
- **Legal:** this is a meme with no utility, no promises and no yield. That is deliberate. This sheet is not legal or financial advice.
