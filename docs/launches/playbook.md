# pump.fun launch playbook (owner creates the coin)

From the next coin on, the owner creates the coin on pump.fun with their own wallet. Claude prepares everything else and checks the result on-chain.

Why this setup:
- **pump.fun lists the owner as creator.** With $ISOLD it listed the launch wallet instead.
- **The dev buy lands straight in the owner's wallet,** with no transfer step.
- **No key ever sits in a cloud session.**

## What $ISOLD taught us (2026-09-24, all from on-chain data)

| Time (UTC) | Wallet | Event |
|---|---|---|
| 04:00:04 | launch wallet | Created; dev buy 0.335 SOL = 11,704,819 ISOLD (1.17%); swept to 7bS28 |
| 04:00:22 | 7bS28 | Buy 1.73M, paid 0.0815 SOL |
| 04:01:10 | `65K9Xu…YYdF` | The only outside buyer: 1.72M for 0.053 SOL (~$6) |
| 04:01:16 | 7bS28 | Buy 1.71M, paid 0.0925 SOL (0.012 SOL priority fee) |
| 04:01:37 | 7bS28 | Sold all 15.14M; 0.4255 SOL out of the curve, 0.3902 SOL received |
| 04:01:49 | `65K9Xu…YYdF` | Sold |

CA `5nGXUT3qCmsW5H6wzi6QZrMBsNRebY4goCzvTn7YkHRH`. The launch itself worked: verification 8/8 and the sweep delivered.

**Net result: about −0.142 SOL (~$16 at $114.45/SOL).** Where it went:
- **0.090 SOL:** a flat 0.03 SOL tip on each of the owner's three trades. It came from a limit-order preset in the trading app, left on by mistake.
- **0.015 SOL:** four failed transactions. Failed transactions still pay fees.
- **~0.019 SOL:** the app's 1% fee plus priority fees.
- **~0.018 SOL:** pump.fun's ~1.25% fee each way, plus the one-time launch account costs.

**Lessons:**
1. **Audience first.** About 960 coins launch on pump.fun every hour (398 in 24.8 minutes when sampled). With no one watching, a coin gets failed sniper transactions and maybe one tourist.
2. **Check the trading preset before the first click.** A tip meant for limit orders cost more than every other fee combined.
3. **No volume buys from our own wallets.** Trading apps link them to the dev, they bring in no buyers, and every round trip costs fees and tips. It also misleads other buyers.
4. **The one-minute rule is fine only while we are the sole holder.** Once anyone else holds, selling the dev bag is a rug on them.

## Before launch

- [ ] **Concept, name and ticker.** Claude checks for collisions on DexScreener, Jupiter and CoinGecko.
- [ ] **Image.** At least 1000×1000 PNG or JPG, original art. No brand logos, no real people, nobody else's art.
- [ ] **Description.** The joke only. No promises, no dev-buy talk, no fake partnerships or listings.
- [ ] **X account.** The avatar is the coin image; add a banner and a bio. Post 3–5 memes or teasers before launch and announce the launch time.
- [ ] **Trading app preset** (the one you will actually use):
  - priority fee ≤ 0.001 SOL;
  - tip ≤ 0.001 SOL, or off;
  - MEV protection off, or its cost known;
  - slippage 10–20%.
- [ ] **Wallet balance.** It holds the initial buy plus about 0.03 SOL for fees and account costs.

## pump.fun form

| Field | Value |
|---|---|
| Name / Ticker / Description / Image | from the kit Claude prepares |
| X | the coin's X account URL |
| Website | only once it is shared publicly |
| Fee mode | **Creator** (not Holder Rewards) |
| Mayhem mode | **OFF**, because it "may increase coin supply" |
| Initial buy | owner's choice; see the table below |

Share of supply for a given initial buy, on the standard curve (30 SOL / 1.073B virtual reserves) with about 1.25% fees:

| Initial buy | Tokens | Supply | Source |
|---|---|---|---|
| 0.1 SOL | ~3.52M | ~0.35% | curve math |
| 0.2 SOL | ~7.02M | ~0.70% | curve math |
| 0.2857 SOL | 10,000,000 | 1.00% | live SDK quote, 2026-09-24 |
| 0.335 SOL | 11,704,819 | 1.17% | live launch, 2026-09-24 |
| 0.5 SOL | ~17.4M | ~1.74% | curve math |

## Launch minute

1. **Create the coin** on pump.fun and copy the CA.
2. **Send Claude the CA.** Claude checks on-chain:
   - Token-2022, no freeze authority, supply 1B, metadata locked;
   - creator, mayhem mode off, holder rewards off.

   Claude then puts the CA on the website and sends the post to pin.
3. **On X:** post and pin the CA, and set the profile's website field to the pump.fun link.
4. **One-minute rule:** leave only while no one else holds. After that, holding the dev bag is part of the joke.
