# Solana market and narrative research: 2026-09-23

## 0. How this was produced, and what it is not

- **No live market data was pulled for this report.** This environment's network policy blocked every market API and site: CoinGecko, DexScreener, GeckoTerminal, DefiLlama, Jupiter, Solana RPC, pump.fun, alternative.me, X and Reddit. Every number below comes from **web-search result summaries of published articles**, dated where the source gave a date.
  - No article bodies were opened.
  - No X posts were read directly.
  - Where a claim rests on a single low-tier source, it is marked.
- **Live data unavailable.** Treat every price or market figure here as *reported by the cited source at its date*, not as a current quote. To get live numbers, run `npm run snapshot` from a machine with open network access (see README).
- **Tags:**
  - **[FACT]**: reported as an event or data point by a reputable outlet or a primary source (SEC, Solana changelog, company press release).
  - **[SIGNAL]**: a momentum or attention indicator, or a figure from a secondary or lower-tier source.
  - **[SPEC]**: a forecast, an opinion, or our own inference.
  - ⚠ marks a conflict between sources, or a reliability problem.
- **Excluded as promotion:** paid-PR and "next 100x"/presale content (openpr, Mudrex/CoinGabbar/Coingape "coins to buy" lists, MemeToro/Pepeto presale pieces). It counts only as evidence that paid promotion exists.
- **Low reliability:** CoinMarketCap "CMC AI" update pages, which are AI-generated. At least one of them mis-dated a 2025 event as 2026.

---

## 1. Executive summary

1. **Macro flipped to euphoria in the last week, against a hawkish backdrop.**
   - BTC broke $87K on Sep 21, an 8-month high, on a record $999M ETF inflow day and a short squeeze.
   - Fear & Greed hit 78 ("Extreme Greed") on Sep 22, its first extreme-greed reading since July 2025.
   - Santiment's crowd-FOMO metric is at a roughly 2-year high.
   - This came *despite* a Fed rate **hike** on Sep 16 and the **failure** of the CLARITY Act in the Senate on Sep 15.
   - [SPEC] Santiment itself treats extreme crowd FOMO as a contrarian warning.
2. **SOL is recovering mostly as beta to BTC.**
   - About $115–117, +26% over 30 days, a year-to-date high on Sep 21. Still about 60% below the $294 all-time high of Jan 2025.
   - Institutional demand is steady: 12 straight weeks of spot SOL ETF inflows (~$1.62B AUM), and Forward Industries holds 8.16M SOL.
3. **Solana usage is at records, but memecoins are a much smaller part of it.**
   - August set records for non-vote transactions (5.2B) and app revenue ($143M, #1 of all chains).
   - Network revenue in H1 2026 was down 87% year on year, and memecoins' share of Solana spot volume fell from 40% to 16% (H1 2025 → H1 2026).
   - The Solana meme sector is reported at about **$3.97B** market cap, tiny next to 2025.
4. **The hottest meta is stock-paired memecoins ("memestocks" / "MemeFi").**
   - These are memes whose quote asset is a tokenized stock.
   - The theme started on Robinhood Chain and BNB Chain in July–August. Solana answered with StonkFun, Pump.fun Custom Pairs (Sep 9) and Raydium LaunchLab.
   - It is about 8 weeks old and already crowded at the launchpad layer, and it carries unresolved regulatory questions.
5. **Token supply is extreme and survival rates are tiny.**
   - Solana logged a record of about 263K new tokens in one day (~Sep 10), much of it automated or stock-paired.
   - Pump.fun graduation fell to about 0.26% in mid-June 2026.
   - An undifferentiated meme launch has very poor odds.
6. **Trust is the scarce resource.** Communities reward:
   - buyback-and-burn funded by real revenue;
   - fee sharing with holders (Pump.fun Holder Rewards, Sep 12);
   - bundle and insider screening (Bubblemaps V2, Sep 16);
   - real liquidity depth.
   - The main 2026 shock events were the $20M BONK DAO governance attack (July), which led to BONK's Upbit delisting on Sep 7; the $LAPTOP crash on Sep 9 ($1.6B market cap on $2.5M liquidity); and AI16Z's collapse.
7. **X is a noisy, shifting data source.**
   - X banned "InfoFi" pay-to-post apps (Jan 15), so Kaito Yaps is gone.
   - It replaced creator revenue sharing with "Original Content Rewards" (Sep 7–8).
   - It sued a crypto bot farm (Sep 17).
   - Polymarket and Kaito "attention markets" now pay out on mindshare, which creates a direct incentive to manipulate it.
   - Any sentiment baseline has to account for these regime changes.

---

## 2. Macro and market sentiment

| Item | Finding | Tag | Source |
|---|---|---|---|
| BTC | Ran from about $81.2K to an intraday **$87,397** on Sep 21, an 8-month high and first print above $85K since late January. All-time high $126,080 (Oct 2025). | FACT | [TechTimes 2026-09-23](https://www.techtimes.com/articles/327946/20260923/record-bitcoin-etf-inflows-short-squeeze-drive-btc-eight-month-high.htm), [CoinReporter](https://www.coinreporter.io/2026/09/record-etf-inflows-and-a-short-squeeze-drive-bitcoins-87000-break/) |
| BTC ETFs | **$999M** net inflow on Sep 21, the largest day since Oct 2025. About $4.9B since Aug 19. | FACT | same |
| Short liquidations | ⚠ Reported anywhere from $648M to $920M | SIGNAL | [Bitcoin.com 2026-09-22](https://news.bitcoin.com/crypto-news/bitcoin-fomo-hits-two-year-high-after-87k-breakout/) and others |
| Fear & Greed (alternative.me) | Went from 70 to **78, "Extreme Greed"**, on Sep 22. First extreme-greed reading since July 2025. ⚠ Other indices showed 64 and 76 on Sep 23. | FACT | [Bloomingbit](https://en.bloomingbit.io/feed/news/120832), [SpendNode](https://www.spendnode.io/blog/crypto-fear-greed-index-78-extreme-greed-september-2026/) |
| Crowd sentiment | Santiment: FOMO at its highest in about 2 years, the biggest bullish spike since Dec 2024. It had read "extreme FOMO" on Sep 14, cooled to neutral by Sep 17, then spiked again. Late June had been "extreme fear", with BTC below $60K. | SIGNAL | [Bitcoin.com 2026-09-22](https://news.bitcoin.com/crypto-news/bitcoin-fomo-hits-two-year-high-after-87k-breakout/), [Santiment](https://app.santiment.net/insights/read/bitcoin-fomo-hits-highest-level-since-2024-11210) |
| Fed | FOMC **raised** rates 25bp to 3.75–4.00% on Sep 16 (12–0), its first hike since 2023. The median dot implies more hikes. | FACT (primary statement not retrieved) | [KuCoin blog](https://www.kucoin.com/blog/september-2026-fomc-fed-hikes-25-bp-hawkish-dot-plot-is-this-a-new-hiking-cycle), [Coingape](https://coingape.com/fomc-meeting-2026-live-updates-sep-16-fed-rate-hike-decision-today/) |
| CLARITY Act | Senate cloture **failed** on Sep 15, short of the 60 votes needed. ⚠ The split is reported as both 50–49 and 49–50. CoinDesk says this effectively ends Senate market-structure work for 2026. | FACT | [CoinDesk 2026-09-15](https://www.coindesk.com/policy/2026/09/15/crypto-clarity-act-flames-out-in-failed-u-s-senate-vote), [CNBC 2026-09-15](https://www.cnbc.com/2026/09/15/senate-cloture-vote-on-clarity-act-fails-dealing-regulatory-setback-to-crypto-industry.html) |
| SEC: tokenized stocks | "Innovation Exemption" (Sep 17): conditional, 5 years, for trading tokenized NMS stock on **permissioned** AMMs and liquidity pools | FACT | [SEC 2026-90](https://www.sec.gov/newsroom/press-releases/2026-90-sec-issues-innovation-exemption-facilitate-trading-tokenized-nms-stock-request-comment), [CNBC 2026-09-17](https://www.cnbc.com/2026/09/17/sec-clears-path-for-tokenized-stocks-bringing-24/7-trading-closer.html) |
| SEC: Regulation Crypto Assets | Proposed Aug 18: offering exemptions up to $5M over 4 years and up to $75M per 12 months, plus a safe harbor from "investment contract" status. Published in the Federal Register Aug 21; the 60-day comment window closes around Oct 20 (our calculation). | FACT | [SEC 2026-76](https://www.sec.gov/newsroom/press-releases/2026-76-sec-proposes-new-regulation-crypto-assets), [Federal Register](https://www.federalregister.gov/documents/2026/08/21/2026-17183/regulation-crypto-assets) |
| SEC/CFTC taxonomy | A 2026 interpretation places native tokens, collectibles and stablecoins outside securities law | FACT | [SEC 2026-30](https://www.sec.gov/newsroom/press-releases/2026-30-sec-clarifies-application-federal-securities-laws-crypto-assets) |
| Altseason | CMC Altcoin Season Index was 34 on Sep 2; BTC dominance about 59–60%. No late-September reading was found. | SIGNAL (low-tier) | [OneBullEx](https://www.onebullex.com/news/articles/altcoin-season-index-holds-at-34-points-on-september-2-keeping-bitcoin-dominant-3) |
| Retail search interest | Google interest in "crypto" was about 26/100, near a one-year low. ⚠ The reading has no confirmed date. | SIGNAL | [crypto.news](https://crypto.news/why-crypto-search-interest-hit-a-one-year-low-in-2026/) |

**[SPEC] Reading:** the rally is driven by ETFs and leverage. It is not broad retail re-entry, since search interest is low and altseason has not arrived. Launching into an extreme-greed spike with a hiking Fed is risky timing.

## 3. Solana ecosystem

### Price, ETFs and treasuries

| Item | Finding | Tag | Source |
|---|---|---|---|
| SOL price | **$117.23 on Sep 21**, the highest since January, with about $18M of shorts liquidated. About $115 on Sep 23 (price-page snapshot). About +26.5% over 30 days. | FACT / SIGNAL | [CoinGape](https://coingape.com/markets/solana-price-hits-highest-level-since-january-amid-18m-liquidations-is-130-next/), [CoinCentral](https://coincentral.com/solana-sol-price-18m-in-shorts-wiped-out-as-sol-hits-its-highest-level-since-january), [CoinGecko](https://www.coingecko.com/en/coins/solana) |
| All-time high | $294 (Jan 2025) | FACT | [Wikipedia](https://en.wikipedia.org/wiki/Solana_(blockchain_platform)) |
| SOL low of 2026 | About $78 around Jul 9, when Santiment's negative-commentary reading was at its 2026 peak | SIGNAL | [The Crypto Basic 2026-07-09](https://thecryptobasic.com/2026/07/09/solana-fud-hits-highest-level-of-2026-as-trading-volume-falls-to-yearly-low-will-sol-hit-100-soon/) |
| Spot SOL ETFs | 12 straight weeks of net inflows totalling more than $1.4B, with AUM about **$1.62B** (week to about Sep 18). Weekly flows are lumpy: $153.9M the week to Aug 28, then $6.2M the week to Sep 4. | FACT | [24/7 Wall St 2026-09-19](https://247wallst.com/investing/cryptocurrency/2026/09/19/solana-etfs-experience-12-consecutive-weeks-of-inflows-while-bitcoin-has-its-quietest-week-on-record/), [24/7 Wall St 2026-09-08](https://247wallst.com/investing/cryptocurrency/2026/09/08/solana-etf-inflows-fell-96-in-a-week-from-153-87-million-to-6-18-million-what-changed/) |
| Bitwise BSOL (staking) | Passed $1B AUM on Aug 28 and took about 80% of all SOL ETF inflows | FACT | [Solana Compass](https://solanacompass.com/news/us-spot-solana-etfs-log-12-consecutive-weeks-of-net-inflows-accumulating-14b) |
| Forward Industries | About **8.16M SOL** (Sep 21), the largest public SOL treasury. Announced a $25M direct offering on Sep 23 to buy more. | FACT (company PR) | [GlobeNewswire 2026-09-21](https://www.globenewswire.com/news-release/2026/09/21/3365847/0/en/forward-industries-sol-holdings-rise-to-approximately-8-16-million-sol.html), [GlobeNewswire 2026-09-23](https://www.globenewswire.com/news-release/2026/09/23/3367424/0/en/forward-industries-announces-25-million-registered-direct-offering-with-institutional-investor.html) |

### Network activity and economics

| Item | Finding | Tag | Source |
|---|---|---|---|
| Transactions | **5.2B non-vote transactions in August**, a record and more than all other L1s and L2s combined (July: 4.2B) | FACT | [Solana Compass](https://solanacompass.com/news/solana-processes-52-billion-non-vote-transactions-in-august-surpassing-all-other-l1s-and-l2s-combined), [Crypto Briefing](https://cryptobriefing.com/solana-record-5-billion-non-vote-transactions-august/) |
| DEX volume | About **$48.5B in August**, roughly 27% of all-chain DEX volume. ⚠ The same source's weekly figures don't add up to that total. On Aug 2, BNB Chain beat Solana on 24h DEX volume. | FACT / ⚠ | [crypto.news](https://crypto.news/four-things-worth-knowing-before-choosing-a-solana-dex/), [KuCoin flash](https://www.kucoin.com/news/flash/bnb-chain-surpasses-solana-in-24-hour-dex-volume) |
| Trade count | 208M DEX trades in one week against about 190M on the NYSE. ⚠ The week's dates are inconsistent across reports. Bots account for much of the count. | SIGNAL | [Solana Compass](https://solanacompass.com/news/solana-dexs-log-208-million-weekly-trades-overtaking-nyse-in-trade-count-for-first-time) |
| App revenue | **$143.2M in August**, #1 of all chains with 38%. By app: Pump.fun about $58.2M, Axiom $24M, Fomo $14.6M. The daily record for 2026 was $7.935M on Sep 12. | FACT | [Solana Compass](https://solanacompass.com/news/solana-tops-all-blockchains-for-app-revenue-in-august-2026-with-143m-capturing-38-of-global-total), [Crypto Briefing](https://cryptobriefing.com/solana-app-revenue-august-pumpfun/) |
| Network revenue | **$141M in H1 2026, down 87.1% year on year.** Memecoins fell from 40% to 16% of spot volume; stablecoin swaps rose from 6% to 19%. Q2 REV was $51.0M (−43% QoQ). | FACT | [21Shares](https://www.21shares.com/en-eu/insights/solana-h1-2026-earnings-analysis), [Blockworks Q2](https://x.com/Blockworks/article/2079204785425670413) |
| TVL | About $5.9–6.0B (late Aug to early Sep), +24–25% over 30 days | FACT (DefiLlama-derived aggregator) | [blockchainmagazine.net](https://blockchainmagazine.net/solana-defi-activity-in-2026-tvl-hits-5-92b-as-dex-volume-surges-past-1-96b-daily/) |
| Stablecoins | ⚠ **Unresolved.** Reported as $16.7B (Aug 9, Solana Compass), $15.7B (end of H1, 21Shares) and $10.17B (DefiLlama snippet, undated). Circle minted about $11B of USDC on Solana in August (gross). | FACT, conflicting | [Solana Compass](https://solanacompass.com/news/solana-stablecoin-supply-reaches-167b-growing-11x-in-three-years-to-rank-third-globally), [21Shares](https://www.21shares.com/en-eu/insights/solana-h1-2026-earnings-analysis) |
| x402 agent payments | Solana carried **76% of x402 transactions (23.2M)** in the 4 weeks to Sep 22 | FACT | [Solana Compass](https://solanacompass.com/news/solana-processes-76-of-all-x402-ai-agent-transactions-232-million-in-four-weeks) |
| Tokenized stocks | $684M of tokenized-equity supply on Solana, with more than 900K holder wallets. Solana's share of tokenized-stock volume fell from 71% to 30% in late August, then recovered to about 35%. Raydium carries more than 90% of Solana's tokenized-stock DEX volume. | SIGNAL | [Solana Compass](https://solanacompass.com/news/solana-tokenized-equity-wallets-pass-900000-as-supply-reaches-684m-all-time-high), [Crypto Briefing](https://cryptobriefing.com/solana-tokenized-equities-volume-share-35-percent/) |

### Protocol upgrades and incidents

| Date | Event | Tag | Source |
|---|---|---|---|
| Jul 29 | SIMD-0286: block compute limit raised from 60M to 100M CUs | FACT | [solana.com](https://solana.com/upgrades/100m-cu-blocks) |
| Aug 12 | TeraSwitch routing failure: about 90 validators offline and **28.83% of stake delinquent**. Finality halts at 33.34%. Restored in about 33 minutes. | FACT | [SolanaFloor](https://solanafloor.com/news/solana-hit-86-of-its-halt-threshold) |
| From Aug 31 | Rent reduced 90% over five steps | FACT | [solana.com/upgrades](https://solana.com/upgrades) |
| Sep 9 | Transaction V1 (SIMD-0296): transactions up to 4,096 bytes, opt-in | FACT | [crypto.news](https://crypto.news/solana-sets-sept-9-date-for-transaction-v1/) |
| Sep 18 | **250ms slots** (SIMD-0525 step 4); 200ms is next | FACT | [Solana changelog 2026-09-18](https://solana.com/news/solana-changelog-september-18-2026) |
| Sep 22 | **Alpenglow live on testnet**, targeting about 150ms finality (from about 12.8s). ⚠ Mainnet date unconfirmed: Sep 28, October and Nov 9 have all been reported. | FACT / SPEC | [CoinDesk 2026-09-23](https://www.coindesk.com/tech/2026/09/23/solana-starts-testing-upgrade-that-could-cut-finality-from-12-8-seconds-to-150-milliseconds) |

## 4. Launchpad landscape

- **[FACT] Pump.fun is still the revenue leader:** about $58.2M in August, more than 40% of Solana app revenue.
  - Apr 29: burned about $370M of bought-back PUMP (about 36% of circulating supply) and moved to a 12-month buyback-and-burn at 50% of net revenue. ([CoinDesk 2026-04-29](https://www.coindesk.com/markets/2026/04/29/pump-fun-burns-36-of-pump-supply-in-usd370-million-wipe-locks-50-revenue-into-ongoing-buybacks))
  - Custom Pairs launched Sep 9 ([The Defiant](https://thedefiant.io/news/defi/pump-fun-lets-creators-launch-coins-priced-in-tokenized-stocks)).
  - Holder Rewards launched Sep 12 ([Crypto Briefing](https://cryptobriefing.com/pumpfun-holder-rewards-cashback-deprecated/)).
  - The iOS app was pulled from the US and India App Stores on Sep 10 and restored on Sep 18.
  - ⚠ "$322M revenue YTD" comes only from a CMC-AI page and is unverified.
  - ⚠ A "PUMP $0.0034 → $0.0086, first time above $3B" claim appears to be **September 2025** price action mis-dated to 2026.
- **[FACT] Graduation rate:** about 0.26% in mid-June 2026 ([The Block](https://www.theblock.co/post/404806/pump-fun-activity-craters-80-three-months-solana-fees-lower-traders-rotate-perps)). A later "BOOST" change reportedly lifted it to 6.7%; ⚠ date unclear.
- **[SIGNAL] Record token issuance:** about 263K new Solana tokens in one day (~Sep 10). Pump.fun issued 34,184 of the 40,360 tokens launched through launchpads that day. ([Cointelegraph](https://cointelegraph.com/news/solana-record-263k-tokens-issued))
- **[FACT] StonkFun** (paired with SPYx):
  - STONK rose 250% to a $140M market cap on Sep 6.
  - It made $1.51M of revenue that day, ahead of Pump.fun.
  - 60% of its revenue goes to buyback-and-burn.
  - From Aug 9 to Sep 7, revenue share was Pump.fun 64.2% vs StonkFun 7.6%.
  - Source: [The Block 2026-09-06](https://www.theblock.co/news/defi/2026-09-06-stonk-surges-250-to-140-million-market-cap-as-stock-paired-solana-launchpad-stonkfun-pulls-volume-to-raydium-and-jupiter-413621).
- **[FACT] Fomo** (social/copy trading):
  - Six straight weeks of record volume.
  - Out-earned Pump.fun on one September day.
  - Over 30 days, Pump.fun still led at about $57M vs $17.6M.
  - Source: [Crypto Briefing](https://cryptobriefing.com/fomo-surpasses-pumpfun-seven-day-revenue/).
- **[SIGNAL, low-tier] LaunchOnSF** reportedly topped 24h launchpad revenue around Sep 22. This is a single-day snapshot. ([coinfomania](https://coinfomania.com/launchonsf-becomes-top-memecoin-launchpad-as-revenues-surge/))
- **[FACT] Off-Solana competition:** on Robinhood Chain, Pons made about $5.95M in fees over 24h, #4 on DefiLlama ([CoinDesk 2026-09-03](https://www.coindesk.com/tech/2026/09/03/a-memecoin-making-app-becomes-crypto-s-top-fee-generators-as-robinhood-chain-activity-explodes)). BNB Chain is running a $4M "Stonks Season".
- **Not found for Aug–Sep 2026:** market share for Bonk.fun, Believe, Heaven, Moonshot, Meteora DBC and LaunchLab.

## 5. Meme sector and token movers

| Token | Latest dated finding | Tag | Source |
|---|---|---|---|
| Sector | Solana meme sector about **$3.97B** market cap. ⚠ 24h volume reported as $1.35B in one source and $937M in another; date unclear. Total meme market about $38.4B in August (⚠ another source says $30.6B). | SIGNAL | [CoinGecko category](https://www.coingecko.com/en/categories/solana-meme-coins) (via search summary) |
| TRUMP | About $680M market cap (August). Unlock of 28.7M tokens on Sep 18. In August, project-linked wallets pulled $3.39M USDC out of pools. ⚠ A "$2.52B" figure is likely stale or FDV. | FACT | [CMC AI](https://coinmarketcap.com/cmc-ai/official-trump/latest-updates/), [Bitcoin.com](https://news.bitcoin.com/crypto-news/trump-meme-coin-26-million-sol-transfer-september-unlock/) |
| BONK | About $333M market cap (Sep 23), near a 3-year low. **Delisted by Upbit on Sep 7** after the July $20M DAO governance attack. | FACT | [CoinDesk 2026-07-07](https://www.coindesk.com/markets/2026/07/07/bonk-faces-usd20-million-treasury-drain-after-attacker-spends-usd4-million-to-pass-malicious-proposal), [Cryptonomist](https://en.cryptonomist.ch/2026/08/07/upbit-bonk-delisting/) |
| PENGU | +12% on Sep 23 and +27% on the week. Plush toys in Target stores; Korea Blockchain Week tour from Sep 28. | FACT | [CryptoTimes 2026-09-23](https://www.cryptotimes.io/2026/09/23/pengu-surges-nearly-12-as-pudgy-penguins-token-extends-weekly-rally/) |
| USELESS | Listed on Upbit Sep 8, then Bithumb. About $325M market cap (Sep 23 snapshot). Briefly passed BONK, but on **perps volume about 11× spot** ($1.87B vs $167M). | FACT | [crypto.news](https://crypto.news/upbit-drops-hemi-after-exploit-lists-cp-and-useless/), [Coinpaper](https://coinpaper.com/35283/useless-flips-bonk-intraday-as-solana-memecoin-rally-hands-trader-32m-profit) |
| FARTCOIN | About $209M market cap, +51.6% over 7 days (snapshot date unclear) | FACT, weak dating | [CMC](https://coinmarketcap.com/currencies/fartcoin/) |
| WIF | About $180–220M market cap (mid-September) | low reliability | Mudrex listicle |
| MEW, POPCAT, SPX, GOAT, MOODENG | No 2026 data found | gap | — |

## 6. X and social attention (second-hand; X was not read directly)

**Topics getting coverage (Sep 2026):**
- the CLARITY failure and "who killed it";
- the Fed hike;
- the SEC tokenized-stock exemption;
- the BTC FOMO breakout;
- stock-paired memes and launchpad wars;
- Solana speed ("beats NYSE", 250ms slots, Alpenglow);
- X's own policy changes.

**Fast-growing, with evidence:**
- stock-paired launchpads (on-chain fees and counts);
- tokenized equities after the SEC exemption (UNI reportedly +18% in 24h);
- BTC FOMO (Santiment).

**Weak evidence:** "AI agents are back". This rests mainly on SEO and exchange blogs.

**Debates:**
- Solana as a "memecoin casino" vs "Internet Capital Markets".
- Hyperliquid vs Solana for liquidity.
- Pump.fun vs Fomo.
- Memecoin fatigue vs "no token fatigue".
- Whether regulation matters or only liquidity does. Arthur Hayes, Sep 18: "we didn't need some nonsense piece of crypto regulation… just a rate hike"; this is a claim, not evidence.

**Influence, as reported claims:**
- Nikita Bier (X product) on platform policy.
- Lily Liu (Solana Foundation) on ICM.
- Ki Young Ju (CryptoQuant) on bots.
- Unipcs ("Bonk Guy") promoting USELESS.
- ⚠ A "deleted Musk post hinting at Solana" is an **unverified rumor** with no screenshots (Gate News).

**Sentiment:**
- Mixed, swinging to euphoric over the last week.
- SOL-specific: negative commentary peaked on Jul 9 (Santiment). **No September SOL social reading was found.**
- LunarCrush (about June): unique creators posting about Solana were −20.7% over 12 months.

**Platform regime changes that break baselines:**

| Date | Change | Source |
|---|---|---|
| Dec 2025 | Reported algorithm change suppressing crypto reach (contested) | [Bitrue blog](https://www.bitrue.com/blog/crypto-twitter-dying-x-algorithm-suppresses-crypto-visibility) (weak) |
| Jan 9, 2026 | 7.75M crypto bot posts in one day (+1,224%), per CryptoQuant | [Cointelegraph](https://cointelegraph.com/news/cryptoquant-founder-slams-x-over-bot-spam-and-crypto-suppression) |
| Jan 15, 2026 | X bans InfoFi pay-to-post apps; Kaito Yaps shut down | [CoinDesk 2026-01-15](https://www.coindesk.com/business/2026/01/15/kaito-to-sunset-yaps-as-x-cracks-down-on-infofi-apps-token-falls-17) |
| Feb–Mar 2026 | Polymarket × Kaito attention markets (bets on mindshare) | [Forbes 2026-02-10](https://www.forbes.com/sites/aliciapark/2026/02/10/polymarket-to-offer-attention-markets-in-partnership-with-kaito-ai/) |
| Sep 7–8, 2026 | Creator revenue sharing replaced by Original Content Rewards; "artificially generated" engagement excluded | [TechCrunch 2026-08-08](https://techcrunch.com/2026/08/08/x-replaces-misaligned-revenue-sharing-program-with-original-content-rewards/) |
| Sep 17, 2026 | X sues a crypto engagement farm: 6 accounts and at least 3 boosters posting near-identical BTC headlines seconds apart, earning about £207K | [CoinDesk 2026-09-21](https://www.coindesk.com/markets/2026/09/21/x-sues-its-won-users-for-running-a-fake-bitcoin-news-bot-farm) |

**Background (2025):** ZachXBT's leak showed more than 200 KOLs pitched for paid promos. He alleged that fewer than 5 of about 160 who took the deal disclosed it ([The Block](https://www.theblock.co/post/368956/zachxbt-says-over-100-crypto-influencers-accepted-promo-deals-without-disclosing-paid-ads)).

**Reliability:** medium for the major events, medium-low for what CT actually discusses and how much, and low for mindshare and KOL rankings. No Kaito or LunarCrush September data was found.

## 7. Trend detection: narrative assessments

| # | Narrative | Why it's discussed | Momentum / stage | Drivers | Solana relevance | Competition | Audience | Key risks | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Stock-paired memes ("memestocks")** | Meme-stock culture plus 24/7 on-chain equities. Weekend "float squeezes" (the BONER/HIMS episode on Robinhood Chain; ⚠ chain disputed). | Early to established, about 8 weeks old, at its peak in September | Pons, StonkFun, Pump.fun, Four.meme, xStocks/Sunrise issuers | High, but Solana lost volume share in August | Launchpad layer crowded (5+ in about 8 weeks) | Meme and stock retail traders | Thin liquidity (CHATON: $160K volume on $16.6K liquidity); premiums revert within hours; Bankless argues the squeeze thesis is mechanically false; [SPEC] securities-law exposure | **Strong** (CoinDesk, The Block, The Defiant) |
| 2 | **Revenue-backed buyback-and-burn** | Launchpads compete on real revenue: PUMP 50% buyback, STONK 60% | Established | Pump.fun, StonkFun, Pons | High | Many copies | Holders who want "real yield" | Revenue is cyclical; unlock overhang; [SPEC] regulatory framing | Strong |
| 3 | **Holder rewards / fee redistribution** | Pump.fun Holder Rewards (Sep 12) replaced Cashback | Early, 11 days old | Pump.fun | High | New | Holders | [SPEC] Yield-like payouts may change the securities analysis; no adoption data | Moderate (confirmed product, no adoption data) |
| 4 | **Trust / anti-rug tooling** | LAPTOP, the BONK DAO attack, SIAS; Bubblemaps V2 insider filter (Sep 16) | Established need, rising tooling | Bubblemaps, RugCheck, ZachXBT-style sleuths | High | Scanners, not tokens | Everyone who was burned | Hard to monetize as a token | Moderate |
| 5 | **Solana speed (250ms slots, Alpenglow, "beats NYSE")** | Upgrades are shipping quickly and give the community a source of pride | Early, with Alpenglow mainnet pending | Solana Foundation, Anza, Helius (mert) | Native | Low for tokens | Solana loyalists and devs | Execution risk (the Aug 12 near-halt); the "NYSE" stat is bot-inflated | Moderate (primary sources, no social volume data) |
| 6 | **x402 agent payments** | 76% of x402 transactions happen on Solana; Linux Foundation governance | Early (infrastructure) | x402 Foundation (Visa, Stripe, Google, AWS) | High | Infrastructure, not memes | Builders | **Not a meme narrative.** AI-agent memecoins broke with AI16Z. | Strong for infrastructure, weak for tokens |
| 7 | **IP/brand memes with real products (PENGU)** | Retail stores, a robot toy, touring | Established, one token | Pudgy Penguins | Medium | Hard to replicate | Mainstream and collectors | Needs a real brand and distribution | Moderate |
| 8 | **Korean listing catalysts (USELESS up, BONK down)** | Upbit and Bithumb access moves prices | Established, single-token | Exchanges, Unipcs | Medium | n/a | KR retail | Perps-led (11× spot); delisting risk | Moderate |
| 9 | **Social / copy trading (Fomo)** | Record weeks, revenue battle with Pump.fun | Established | Fomo, Pump.fun | High | App-level | Traders | Not a token narrative (no Fomo token found) | Moderate |

**Weak or no 2026 evidence:** creator/streamer coins, prediction-market memes, animal meta (only Hosico Cat, +55% on Sep 20), robotics memes, casino memes (BONKplay) and DePIN memes.

## 8. Saturated or damaged narratives to avoid

- **Celebrity and political tokens.** $LAPTOP on Base fell from $190.81 to $3.70 in about an hour ([Washington Post 2026-09-09](https://www.washingtonpost.com/business/2026/09/09/hunter-bidens-laptop-crypto-coin-crashes-minutes-after-launch/)). TRUMP is about 97% below its peak, and senators have asked the SEC to investigate.
- **"AI agent that talks" memecoins.** AI16Z's founder called it "dead" ([CoinDesk 2026-08-05](https://www.coindesk.com/markets/2026/08/05/ai-agent-token-once-worth-usd2-4-billion-ends-with-founder-calling-it-dead)), and it faces an SDNY class action.
- **Generic ICM / tweet-to-launch tokens.** Believe-style volume fell 80% in 2025.
- **DAO-treasury-heavy memes.** The BONK governance attack showed that a large treasury is a target.
- **Undifferentiated Pump.fun launches.** The graduation rate was about 0.26% in June.
- **Launching yet another stock-paired launchpad.** [SPEC] There are already 5+ competitors in about 8 weeks.

## 9. Trust and security environment

**What communities reward** [FACT/SIGNAL]:
- buyback-and-burn from real revenue;
- fee sharing with holders;
- fair launches with no presale (the USELESS case);
- bundle and insider screening;
- **liquidity depth relative to market cap**, the lesson most cited from LAPTOP.
- No 2026-specific data was found on LP lock/burn or on authority revocation. Scanners check both as standard (see the tech due-diligence doc).

**Supply chain** [FACT]:
- Dec 2024: the `@solana/web3.js` 1.95.6/1.95.7 backdoor.
- Mar 2026: Solana `bs58` typosquats that steal keys.
- **Aug 4, 2026: the ChainDrop npm worm.** It spreads through `preinstall` scripts and steals wallets and CI secrets. See `2026-09-23-tech-due-diligence.md`.

## 10. Implications for a legitimate launch

**What we found → why it matters → evidence → uncertainty → next step**

1. **The base rate for a generic meme launch is terrible.**
   - *Why it matters:* the average new token dies. Differentiation has to be real.
   - *Evidence:* about 263K tokens in a day; graduation about 0.26% (June); memes fell to 16% of Solana spot volume in H1 2026.
   - *Uncertainty:* September graduation rates and survival rates are unknown.
   - *Next step:* get daily launch and graduation data (Dune or a paid API) before committing.
2. **The only strong, current meta (stock-paired memes) is crowded and legally unclear.**
   - *Why it matters:* entering late into launchpad saturation, with possible securities exposure, is a poor risk/reward.
   - *Evidence:* narrative #1 above; the SEC exemption covers **permissioned** AMMs only.
   - *Uncertainty:* how regulators treat memes paired with tokenized equities; whether Solana regains share.
   - *Next step:* get legal review before any stock-paired design; treat this as a watch item, not a default.
3. **Trust and transparency is the one theme that is under-supplied and aligned with this project's goals.**
   - *Why it matters:* buyers now screen for insiders, bundles, liquidity depth and authorities.
   - *Evidence:* the 2026 scandals; Bubblemaps V2; the Pump.fun design changes.
   - *Uncertainty:* whether "transparent by construction" can hold attention on its own.
   - *Next step:* the concept stage should pair a genuine cultural hook with verifiable on-chain guarantees: revoked authorities, locked LP, public vesting, no bundling.
4. **Timing.**
   - *Why it matters:* launching into extreme-greed peaks with a hiking Fed tends to end in reversals.
   - *Evidence:* F&G 78, Santiment FOMO at a 2-year high, the Sep 16 Fed hike.
   - *Uncertainty:* sentiment can stay euphoric for weeks.
   - *Next step:* no mainnet launch now in any case. Build and test on devnet, and watch the snapshot tool's sentiment and liquidity readings.
5. **Social data needs a paid feed, and regime-aware baselines.**
   - *Why it matters:* second-hand coverage is not measurement.
   - *Evidence:* the X policy regime changes in section 6; X API reads are pay-per-use at about $0.005 per post.
   - *Uncertainty:* the cost of LunarCrush vs X for the needed coverage.
   - *Next step:* choose a social data provider and budget.

## 11. Conflicts and data gaps

- **CLARITY vote:** 50–49 vs 49–50. It failed either way.
- **Solana stablecoin supply:** $16.7B vs $15.7B vs $10.17B.
- **Solana meme 24h volume:** $1.35B vs $937M.
- **Total meme market cap:** $38.4B vs $30.6B.
- **TRUMP market cap:** $680M vs a stale "$2.52B".
- **PUMP price history:** 2025 figures mis-dated as 2026 by a CMC-AI page.
- **The BONER/HIMS squeeze:** Robinhood Chain vs Solana.
- **Alpenglow mainnet date:** unconfirmed.
- **Missing entirely:**
  - September Kaito, LunarCrush or Santiment data for SOL;
  - Google Trends for "solana" and "pump.fun";
  - September launchpad market share;
  - 2026 data for MEW, POPCAT, SPX, GOAT, MOODENG;
  - daily launch and graduation counts for September;
  - the regulatory status of stock-paired memes.
- **How to close these:** run `npm run snapshot` with open network access for live price, liquidity, sector and trending data. Add a social-data provider and a Dune/Helius pipeline for launch and holder analytics.
