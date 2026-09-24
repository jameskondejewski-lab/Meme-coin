# Crypto Market & News Briefing — 2026-09-24 (research window 04:45–04:50 UTC)

Legend used throughout: **FACT** = verified number or event, with source and UTC time (these go under "Cited Findings"). **MARKET INTERPRETATION** = my reasoning from the facts (these go under "Inferences"). **SOCIAL-MEDIA SPECULATION** = rumours, viral claims, promotional or unconfirmed items (a sub-heading inside Cited Findings, clearly labelled). All live numbers were pulled 2026-09-24 between 04:45:28 and 04:49:50 UTC unless stated. Items older than 7 days are marked **[OLDER]**.

Source-failure log (live pulls):
- Binance futures API: HTTP 451 (restricted location). Bybit API: HTTP 403 (CloudFront geo-block). Farside ETF flow tables (btc/sol/eth): HTTP 403. CNBC article fetch: HTTP 403. First CoinGecko /global call: HTTP 429, retried OK at 04:46:11 UTC.
- Because Farside failed, ETF flow figures below come from news reports (SoSoValue data relayed by media), not live data. Live data unavailable — this is an analytical assumption rather than current market data. (Applies only to any statement about ETF flows for the 2026-09-23 session, which I could not find; source failed: Farside.)
- Funding came from OKX and Hyperliquid instead of Binance/Bybit.

## 1. BTC, SOL, ETH — live prices, 24h/7d/30d moves, trend

### Takeaway
At ~04:47 UTC BTC ≈ $83.8K, ETH ≈ $2,674, SOL ≈ $114.8; all three are down ~4% in 24h after a macro-driven sell-off on 2026-09-23, but up ~10% (BTC/ETH) and ~15% (SOL) over 7 days, with SOL outperforming. All remain far below their 2025 all-time highs.

### Cited Findings
- FACT — BTC $83,863; 1h −0.59%, 24h −3.78%, 7d +9.89%, 30d +3.99%; 24h high $87,158 / low $83,654; mcap $1.685T; 24h vol $42.7B; ATH $126,080 (2025-10-06), i.e. ~33.5% below ATH. CoinGecko last_updated 04:42:20 UTC — [CoinGecko /coins/markets](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=1h,24h,7d,30d)
- FACT — ETH $2,675.73; 1h −0.42%, 24h −3.81%, 7d +10.18%, 30d +6.66%; 24h range $2,642.70–$2,779.64; mcap $326.6B; ATH $4,946.05 (2025-08-24), ~46% below. Same pull, 04:42:20 UTC — [CoinGecko /coins/markets](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=1h,24h,7d,30d)
- FACT — SOL $114.89; 1h −0.52%, 24h −3.88%, 7d +15.40%, 30d +13.58%; 24h range $113.31–$119.51; mcap $67.5B (rank 7); 24h vol $5.06B; ATH $293.31 (2025-01-19), ~61% below. 04:42:20 UTC — [CoinGecko /coins/markets](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&price_change_percentage=1h,24h,7d,30d)
- FACT (cross-check, SOL) — Jupiter $114.900 (24h −3.85%), on-chain liquidity $937M, 04:45 UTC — [Jupiter Price API v3](https://lite-api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112); repo snapshot (generatedAt 04:45:34 UTC) shows CoinGecko $114.87 / Jupiter $114.909 / DexScreener $114.91, max deviation 0.034% → "consistent" — repo tool `npm run snapshot -- --json` ([CoinGecko](https://api.coingecko.com/api/v3), [DexScreener](https://api.dexscreener.com)).
- FACT (cross-check, BTC/ETH) — Hyperliquid perp marks at 04:47 UTC: BTC $83,831 (prev-day $87,190), ETH $2,675.55 (prev-day $2,784), SOL $114.93 (prev-day $119.66) — [Hyperliquid info API](https://api.hyperliquid.xyz/info) (POST `metaAndAssetCtxs`). Agreement with CoinGecko within ~0.05%.
- FACT (re-pull 04:49:50 UTC) — BTC $83,815 (24h −3.88%), ETH $2,673.66 (−3.95%), SOL $114.82 (−4.00%); Jupiter SOL $114.906 — [CoinGecko](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana), [Jupiter](https://lite-api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112). Direction during the 5-minute window: flat to slightly lower.
- FACT — BTC hit an ~8-month high around 2026-09-22 ("Crypto prices open near 8-month highs") — [Yahoo Finance, 2026-09-23](https://finance.yahoo.com/personal-finance/investing/article/bitcoin-and-ethereum-prices-today-wednesday-september-23-2026-crypto-prices-open-near-8-month-highs-is-the-crypto-winter-over-113908671.html); "Record Bitcoin ETF inflows and short squeeze drive BTC to eight-month high" — [TechTimes, 2026-09-23](https://www.techtimes.com/articles/327946/20260923/record-bitcoin-etf-inflows-short-squeeze-drive-btc-eight-month-high.htm). BTC briefly traded above $87,200 — [Bitcoin.com News](https://news.bitcoin.com/market-updates/bitcoin-etfs-hit-2026-high-with-999m-inflow-as-bitcoin-price-tops-86k/).
- FACT — BTC is ~$26,400 lower than a year earlier — [KuCoin flash, 2026-09-23](https://www.kucoin.com/news/flash/bitcoin-price-drops-to-85-686-on-september-23-2026) (aggregator; consistent with CoinGecko ATH history).
- Other large caps, 04:47 UTC — HYPE $91.85 (24h −5.75%, 7d +15.73%, rank 11, mcap $20.4B); DOGE $0.0934 (24h −10.01%, 7d +15.13%) — [CoinGecko /coins/markets](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=hyperliquid,dogecoin&price_change_percentage=24h,7d,30d).

### Inferences
- MARKET INTERPRETATION — Short-term trend is up (7d and 30d positive, 8-month high on 09-22), but the 09-23 reversal came right at the $87K area, and the macro backdrop (Fed hiking, 10y yield >5%) is hostile. Read it as a relief rally in a longer drawdown (all three are 33–61% below ATH), not a confirmed new bull leg.
- MARKET INTERPRETATION — SOL has higher beta than BTC in both directions (+15.4% vs +9.9% over 7d, −3.9% vs −3.8% over 24h). SOL on-chain activity (memes, launchpads) tends to amplify BTC moves.
- MARKET INTERPRETATION — Prices from CoinGecko, Jupiter, DexScreener and Hyperliquid agree to within about 0.05%, so the price layer is reliable. Discrepancies elsewhere in this note come from different methods, not bad prices.

### Gaps
- No CoinMarketCap or Coinbase direct pull, so the price cross-check for BTC and ETH uses CoinGecko and Hyperliquid only.
- A search summary claimed "BTC trading around $78,500 on September 24 at 5pm EDT". That is the label of a Polymarket contract ("Bitcoin above ___ on Sept 24"), not a price. It is discarded ([Polymarket](https://polymarket.com/event/bitcoin-above-on-september-24-2026)).
- A Forbes Advisor page gave BTC mcap $1.33T and dominance 61%. That is inconsistent with live data ($1.685T / 58.7%) and is treated as stale ([Forbes Advisor](https://www.forbes.com/financial-services/top-10-cryptocurrencies-2/)).

## 2. Overall sentiment — Fear & Greed, derivatives, stablecoins, total market cap, BTC dominance

### Takeaway
Sentiment is still "Greed" (F&G 71) after peaking at 78 "Extreme Greed" on 09-22. Leverage is modest: funding is near baseline, and BTC perps trade at a slight discount after roughly $180M of long liquidations. Stablecoin supply keeps growing (+0.9% w/w, USDC +3.8% w/w). BTC dominance is ~58.7%.

### Cited Findings
- FACT — Crypto Fear & Greed Index (daily, stamped 00:00 UTC): 09-24 **71 Greed**; 09-23 71; 09-22 **78 Extreme Greed**; 09-21 70; 09-20 71; 09-19 71; 09-18 56; 09-17 50 Neutral; 09-16 51 Neutral; 09-15 69; 30 days earlier (08-25) 74 Greed — [alternative.me FNG API](https://api.alternative.me/fng/?limit=31) (fetched 04:45 UTC).
- FACT — Total crypto market cap **$2.866T**; 24h volume $120.1B; CoinGecko-reported 24h mcap change −5.88%; dominance: BTC **58.67%**, ETH 11.37%, USDT 6.39%, BNB 3.56%, XRP 3.27%, USDC 2.62%, SOL 2.35%, TRX 1.14%, stETH 0.91%, ZEC 0.89%. CoinGecko updated_at 04:43:46 UTC — [CoinGecko /global](https://api.coingecko.com/api/v3/global).
- FACT — Funding (OKX USDT-margined perps, current 8h period, ts ≈04:46:28 UTC): BTC **+0.0080%** / 8h (≈8.7% annualised), ETH +0.0056%, SOL +0.0075%; last settled (00:00 UTC) BTC +0.0005%, ETH +0.0030%, SOL +0.0025%; premium index about −0.044% on all three (perps slightly below spot) — [OKX funding-rate API](https://www.okx.com/api/v5/public/funding-rate?instId=BTC-USDT-SWAP) (also ETH/SOL instIds).
- FACT — Open interest (OKX, ~04:47 UTC): BTC-USDT-SWAP $2.51B, ETH $1.65B, SOL $351M — [OKX open-interest API](https://www.okx.com/api/v5/public/open-interest?instType=SWAP&instId=SOL-USDT-SWAP).
- FACT — Hyperliquid (04:47 UTC): BTC funding **−0.00019%/hr** (slightly negative), OI 37,034 BTC (≈$3.1B); ETH/SOL/HYPE/WIF/PENGU/FARTCOIN/kBONK/PUMP funding +0.00125%/hr (the baseline rate); TRUMP −0.0046%/hr; SOL OI 6.12M SOL (≈$704M); HYPE 24h notional volume $746M — [Hyperliquid info API](https://api.hyperliquid.xyz/info).
- FACT — On 09-23, BTC fell 1.58% in one hour to below $85,000, triggering ~$180M of liquidations ($174M longs, $6.4M shorts) — [KuCoin flash](https://www.kucoin.com/news/flash/global-crypto-liquidations-reach-180m-in-one-hour-as-bitcoin-drops-below-85-000). Another outlet cites $237M of liquidations on the $87K rejection (different time window) — [Interactive Crypto](https://www.interactivecrypto.com/bitcoin-s-87-000-rejection-macro-fears-trigger-237m-liquidations-despite-etf-inflows).
- FACT — USD stablecoin supply (DefiLlama, sum of current circulating) **$313.3B**; prior week $310.5B (+0.91%); prior month $309.4B (+1.28%). USDT $183.5B (+0.08% w/w), **USDC $76.6B (+3.78% w/w)**, USDS $6.56B, USDe $4.89B (+20.2% m/m), DAI $4.80B, USD1 $4.40B (+8.8% m/m), PYUSD $2.69B (−4.1% w/w) — [DefiLlama stablecoins](https://stablecoins.llama.fi/stablecoins). DefiLlama's aggregate chart shows $311.0B at 00:00 UTC 09-24 — [DefiLlama stablecoincharts/all](https://stablecoins.llama.fi/stablecoincharts/all). CoinGecko's "Stablecoins" category is $291.9B (24h +0.06%) — [CoinGecko categories](https://api.coingecko.com/api/v3/coins/categories). The spread comes from coverage differences.
- FACT — Solana stablecoins: **$16.37B** on 09-24 vs $15.70B on 09-17 (+4.2% w/w) and $16.19B on 08-25 — [DefiLlama stablecoincharts/Solana](https://stablecoins.llama.fi/stablecoincharts/Solana). The repo snapshot's `stablecoinchains` method gives $17.17B (04:45 UTC). The methods differ, so treat ~$16.4–17.2B as the range.
- FACT — Deribit Q3 expiry: $15.9B BTC and $2.1B ETH options expire Fri 2026-09-25 08:00 UTC. BTC put/call ratio 0.69, max pain $75,000, most contracts at the $85,000 strike, ~55% of $9.4B call notional in the money — [CoinDesk, 2026-09-23](https://www.coindesk.com/markets/2026/09/23/bitcoin-s-usd16-billion-quarterly-options-settlement-arrives-with-a-call-heavy-book).

#### SOCIAL-MEDIA / HEADLINE FRAMING (not facts)
- "Is the crypto winter over?" (Yahoo headline framing, 09-23). This is a narrative hook, not evidence — [Yahoo Finance](https://finance.yahoo.com/personal-finance/investing/article/bitcoin-and-ethereum-prices-today-wednesday-september-23-2026-crypto-prices-open-near-8-month-highs-is-the-crypto-winter-over-113908671.html).

### Inferences
- MARKET INTERPRETATION — Positioning is not overheated. Funding is at or below the 0.01%/8h baseline on OKX, BTC funding on Hyperliquid is slightly negative, and perp premiums are slightly negative. So the 09-23 drop flushed longs rather than leaving a crowded long book, which lowers the odds of another liquidation cascade overnight. The same data also shows no aggressive dip-buying on leverage.
- MARKET INTERPRETATION — Greed readings of 71–78 while BTC is ~33% below ATH suggest the index is tracking the 1–2 week rebound, not the level. The 09-25 00:00 UTC print will be the first to fully reflect the 09-23 yield shock. A drop toward 55–65 would fit the pattern after the 09-16 hike (69→51).
- MARKET INTERPRETATION — Stablecoin growth, led by USDC (+3.8% w/w, possibly helped by Circle's Arc launch on 09-16), means dry powder is rising. Solana's stablecoin base (+4.2% w/w) is growing faster than the total, which supports on-chain Solana activity.
- MARKET INTERPRETATION — CoinGecko's −5.88% 24h total-mcap change does not match the component moves (BTC/ETH ≈ −3.8%, stables flat, L1 category −4.0%, meme −8.9%). It probably reflects methodology (coin inclusion changes), so treat ~−4% as the more realistic broad-market 24h move.

### Gaps
- No aggregated cross-exchange funding or OI (Coinglass not queried; Binance and Bybit blocked).
- No live long/short ratio.
- No options skew or implied-volatility data.

## 3. Meme-coin sector — CoinGecko Meme and Solana-Meme categories, top movers

### Takeaway
Memes are the weakest large sector in the last 24h: Meme −8.9% and Solana Meme −8.5%, versus BTC −3.8%. They are still strongly up on 7 days (PENGU +37%, FARTCOIN +33%, BONK +30%, WIF +29%). The stock-paired StonkFun token (STONK) is rising against the tape. Cat-themed and fresh pump.fun tickers dominate Solana's trending pools, and several trending tokens show thin liquidity or paid promotion.

### Cited Findings
- FACT — CoinGecko categories (updated 04:40:21 UTC): **Meme $35.32B (24h −8.88%, vol $4.73B)**; **Solana Meme $3.884B (−8.47%, vol $1.41B)**; Pump.fun Ecosystem $1.449B (−7.84%); AI Meme $803M (−9.70%); Four.meme/BNB memes $822M (−5.92%); Base Meme $323M (−2.24%); **Robinhood Chain Meme $893M (−9.84%)**; BONK.fun Ecosystem $316M (−14.78%); PolitiFi $748M (−11.22%); Dog-themed $19.6B (−9.26%); Cat-themed $808M (−7.72%); Stock-market-themed $451M (**−16.57%**); Pons Launchpad $469M (−11.97%); Believe App ecosystem $20.6M (−8.13%) — [CoinGecko /coins/categories](https://api.coingecko.com/api/v3/coins/categories).
- FACT — Solana Meme leaders (CoinGecko, as of 04:43:10 UTC; mcap, 24h, 7d): PENGU $609M, −8.6%, **+37.0%**; TRUMP $557M, −12.5%, +1.3%; BONK $309M, −7.8%, +30.2%; USELESS $300M, −14.6%, +24.5%; WIF $242M, −6.6%, +29.3%; FARTCOIN $185M, −13.3%, +32.8%; MELANIA $104M, −8.6%, +8.6%; BOME $76M, −2.5%, +20.1%; ZCAT $75M, −13.4%, **−41.1%**; ANSEM $64M, −14.1%, +9.5%; POPCAT $55M, −5.6%, +24.7%; PNUT $54M, −8.8%, +19.0%; TROLL $47M, −16.7%, +10.1%; MOODENG $45M, −7.1%, +17.2%; MEW $42M, −3.2%, +22.3%; **NEET $39M, +6.6%, +67.4%**; TDCCP $24M, +31.7%, −16.9% — repo snapshot, CoinGecko source ([CoinGecko API](https://api.coingecko.com/api/v3)).
- FACT — CoinGecko Trending (04:45 UTC), coins with 24h %: NIL (+43.0%), NEAR (+1.9%), TAO (−8.9%), **STONK (+12.3%)**, PONS (−12.6%), PENGU (−8.1%), BTC, SOL, ZEC (−5.9%), UNI (−11.9%), RHEA, ZRO (+8.4%), ONDO, AKT, PENDLE. Trending categories: Data Availability, Chain Abstraction, Privacy Infrastructure, Quantum-Resistant, Privacy, ZK — [CoinGecko /search/trending](https://api.coingecko.com/api/v3/search/trending).
- FACT — GeckoTerminal Solana trending pools (repo snapshot 04:45 UTC), selected: STONK/SOL on Meteora, FDV $294.6M, liquidity $3.08M (1.05% of FDV → **thin-liquidity flag**), 24h vol $10.5M, **+11.65% 24h**, 14,643 unique traders; `familiars` (5.4h old, FDV $2.1M, +4,419% 24h, new-pool and high-turnover flags); ARCHIBROWN (19.9h, +692%); **BLUF (12.9h, +228%, flagged paid-promotion, i.e. buying DexScreener boosts)**; GIGACAT (+81%), KCAT (+68%), PUMPCAT (+107%), CATE (FDV $90.7M, −11.6%); JEANPHIL (FDV $4.25M, −20.4%); PAID (−32.6%); PUMP token pool (FDV $3.31B, −9.8%) — repo snapshot via [GeckoTerminal API](https://api.geckoterminal.com/api/v2).
- FACT — 11 Solana tokens had active paid DexScreener boosts at 04:45 UTC (largest 500 units; several `...pump` mints) — repo snapshot via [DexScreener API](https://api.dexscreener.com).
- FACT — Cat-themed memecoin hype on Solana led by CATE — [KuCoin flash](https://www.kucoin.com/news/flash/cate-drives-cat-themed-memecoin-hype-on-solana) (aggregator, date not confirmed).
- FACT — PUMP (pump.fun token) $0.003957, 24h −10.24%, 7d +4.35%, **30d −18.57%**; PONS $0.6225, 24h −11.65%, **30d +654.5%**; RAY $2.00, **24h +9.34%, 7d +35.9%, 30d +138.3%**; JUP $0.290, 7d +31.4% (04:47 UTC) — [CoinGecko /coins/markets](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=pump-fun,pons,raydium,jupiter-exchange-solana&price_change_percentage=24h,7d,30d).
- FACT — STONK set an ATH near $0.36 around 09-21 after a 26% drop to $0.22 on 09-14 (aggregated), and about 17% of the 1B STONK supply has been burned via fee-funded buybacks — [KuCoin blog](https://www.kucoin.com/blog/stonk-token-burn-hits-17-how-stonkfun-s-buyback-model-is-shrinking-supply); [CoinMarketCap AI updates](https://coinmarketcap.com/cmc-ai/stonk-fun/latest-updates/) (both secondary).

#### SOCIAL-MEDIA SPECULATION / PROMOTION FLAGS
- Viral posts claimed "StonkFun is dumping on holders". An on-chain investigation says the reward/fee wallet sold $56.3M of StonkFun coins between 08-23 and 09-22 (including $8.47M of ZCAT) but paid $56.2M back out to holders in each coin's pair asset. It found the claimed buyback ($2.09M) overstated (only $1.23M on-chain), ≥$1.41M sent to StonkFun-linked wallets outside the public ledger, and 2,178 LaunchLab coins with **mutable tax rates up to 100%** — [Bitquery investigation, 2026-09-22](https://bitquery.io/investigations/is-stonkfun-dumping-on-holders). The claim is partly true: selling is constant by design, not a covert dump.
- "Pons token up 18,000% since July" (headline) — [Yahoo Finance](https://finance.yahoo.com/markets/crypto/articles/pons-robinhood-chain-meme-coin-204604745.html). Unverified start point; CoinGecko shows +654% over 30d.
- "Can STONK reach $500M valuation?" — speculative headline — [AMBCrypto](https://ambcrypto.com/stonkfun-up-48-after-integrating-aave-avax-can-stonk-reach-500m-valuation/).
- **Paid promotion:** openpr.com "Crypto Market News/Overview September 2026 … Pepeto presale" pieces are press releases pushing a presale. Do not treat them as news, even where their market numbers ($2.86T mcap, BTC $86K) happen to match live data — e.g. [openpr](https://www.openpr.com/news/4641147/crypto-market-news-september-2026-oil-drops-bitcoin-hits-86k).

### Inferences
- MARKET INTERPRETATION — Meme beta is about 2.3× BTC on down days (−8.9% vs −3.8%). A new launch tomorrow lands in a sector that just gave back part of a +20–37% weekly run. Momentum buyers are still around, but they are nervous.
- MARKET INTERPRETATION — The strongest relative-strength signals on a red day are STONK (+11.7%) and RAY (+9.3%). The stock-paired/LaunchLab narrative is the one attracting fresh flow. ZCAT (−41% 7d), a StonkFun reward coin heavily sold by the fee wallet, shows the downside of reward-tax designs for individual launches even while the platform token rises.
- MARKET INTERPRETATION — Cat-themed tickers (KCAT, GIGACAT, PUMPCAT, CATE) cluster in trending. Short-lived theme clustering is typical; expect crowding.
- MARKET INTERPRETATION — Trending lists are contaminated by paid boosts (BLUF, 11 boosted tokens) and very new pools with extreme turnover. They measure attention, not organic demand.

### Gaps
- No pump.fun launch-count or graduation-rate data for the last 24h (pump.fun has no public stats API in this toolkit).
- No X/Twitter or Telegram sentiment scrape; CT chatter is represented only through news-reported viral claims.

## 4. DEX activity — Solana vs other chains, Solana TVL, fees

### Takeaway
Solana is still the #1 chain by DEX volume ($2.68B/24h, ~26% share), but volume is cooling (−16% d/d, −12% m/m). Robinhood Chain has become the #2 venue ($1.51B/24h, +125% m/m). In launchpad fees, Robinhood Chain's Pons V2 is the single largest ($2.37M/24h), but Solana launchpads combined (pump.fun, StonkFun, LaunchLab, BONK.fun, etc.) take about half of all launchpad fees, and StonkFun and LaunchLab are growing fastest.

### Cited Findings
- FACT — All-chain DEX volume 24h **$10.21B** (−8.94% d/d); 7d $75.7B (−12.1%); 30d $311.9B (−7.1%) — [DefiLlama /overview/dexs](https://api.llama.fi/overview/dexs?excludeTotalDataChart=true) (04:46 UTC).
- FACT — DEX volume by chain (24h / 1d chg / 7d / 1m chg), DefiLlama chain endpoints, 04:46 UTC:
  - **Solana $2.683B / −16.0% / $19.96B / −11.9%** — [DefiLlama dexs/solana](https://api.llama.fi/overview/dexs/solana?excludeTotalDataChart=true)
  - **Robinhood Chain $1.507B / −4.5% / $10.50B / +125.2%** — [DefiLlama dexs/robinhood](https://api.llama.fi/overview/dexs/robinhood?excludeTotalDataChart=true)
  - Ethereum $1.381B / −32.5% / $11.74B / −16.6% — [DefiLlama dexs/ethereum](https://api.llama.fi/overview/dexs/ethereum?excludeTotalDataChart=true)
  - Base $1.098B / +19.0% / $6.54B / −21.2% — [DefiLlama dexs/base](https://api.llama.fi/overview/dexs/base?excludeTotalDataChart=true)
  - BSC $0.959B / +3.4% / $7.59B / −18.7% — [DefiLlama dexs/bsc](https://api.llama.fi/overview/dexs/bsc?excludeTotalDataChart=true)
  - Hyperliquid L1 (spot) $0.329B / −11.0% / $3.19B / −43.1% — [DefiLlama dexs/hyperliquid](https://api.llama.fi/overview/dexs/hyperliquid?excludeTotalDataChart=true)
  - Arbitrum $0.232B / +19.4% / $1.61B / −23.9% — [DefiLlama dexs/arbitrum](https://api.llama.fi/overview/dexs/arbitrum?excludeTotalDataChart=true)
  - Solana share of all-chain volume (derived): 26.3% (24h), 26.4% (7d), 25.2% (30d). Robinhood Chain 30d share ≈17.4%.
- FACT (cross-check) — The Defiant reported Robinhood Chain DEX volume at $1.49B/24h and ranked it second among chains, ahead of Ethereum, BNB Chain and Base. Publication date not visible, so treat as recent/older — [The Defiant](https://thedefiant.io/news/blockchains/robinhood-chain-dex-volume-hits-usd1-49-billion-as-pons-takes-two-thirds-of-launchpad-fees). This is consistent with the live DefiLlama $1.507B.
- FACT — Top Solana DEX protocols 24h (DefiLlama): Raydium AMM $395M (−17.1% d/d, +52.1% w/w), BisonFi $368M, Orca $358M (+39.8% w/w), **PumpSwap $270M (−57.4% d/d, −38.8% w/w)**, Meteora DLMM $234M (+34.2% w/w), Scorch $129M (+252% w/w), fomo Wallet $129M, pump.fun $121M, GoonFi $115M, Axiom $107M — [DefiLlama dexs/solana](https://api.llama.fi/overview/dexs/solana?excludeTotalDataChart=true).
- FACT — Chain TVL (DefiLlama, 04:46 UTC): Ethereum $53.65B; **Solana $6.40B (#2)**; Base $6.17B; BSC $5.83B; Tron $5.65B; Bitcoin $4.49B; Arbitrum $1.44B; Hyperliquid L1 $1.29B; Monad $1.02B; **Robinhood Chain $1.00B**; sum of all chains $95.1B (default DefiLlama TVL definition, excludes some categories) — [DefiLlama /v2/chains](https://api.llama.fi/v2/chains). The repo snapshot gives Solana TVL $6.401B (04:45 UTC), which agrees.
- FACT — Fees on Solana (all protocols, DefiLlama dailyFees): **$16.53M/24h** (−7.6% d/d), 7d $115.0M (+10.9% w/w), 30d $434.8M (+14.1% m/m). Top: PumpSwap $3.50M, Axiom $1.82M, pump.fun $1.59M, Raydium AMM $1.19M, Solana chain $1.01M (+34.7% w/w), Meteora DLMM $0.98M, **StonkFun $0.96M (+45.8% w/w)**, fomo $0.86M, **LaunchLab $0.64M (+219.9% w/w)**, Collector Crypt $0.58M, **BONK.fun $0.53M (+286% w/w)**, Orca $0.43M — [DefiLlama fees/solana](https://api.llama.fi/overview/fees/solana?excludeTotalDataChart=true&dataType=dailyFees).
- FACT — Launchpad fees, all chains, 24h (DefiLlama): total **$7.93M**; **Pons V2 (Robinhood Chain) $2.37M** (7d −1.8%); pump.fun $1.59M (+8.2% w/w); Flap.sh (BSC/X Layer/Monad) $1.04M; StonkFun $0.96M; LaunchLab $0.64M; BONK.fun $0.53M; Graphite $0.21M (+240% w/w); Argus World (Arc) $0.09M (−96% w/w); Pons V1 $0.07M; Meteora DBC $0.07M — [DefiLlama /overview/fees](https://api.llama.fi/overview/fees?excludeTotalDataChart=true). Solana launchpads listed sum to ≈$4.0M (≈50%); StonkFun deploys via LaunchLab, so some double-counting is possible.
- FACT — Top fee earners overall, 24h: Tether $17.2M, Circle $7.17M, PumpSwap $3.50M, Uniswap V4 $3.16M, Hyperliquid Perps $2.66M, Pons V2 $2.37M, Axiom $1.96M, Uniswap V3 $1.86M, Lido $1.84M, **Polymarket US $1.81M**, Canton $1.64M, pump.fun $1.59M — [DefiLlama /overview/fees](https://api.llama.fi/overview/fees?excludeTotalDataChart=true).
- FACT [OLDER, early Sept] — Robinhood Chain launchpads took close to 70% of launchpad fees, and Pons out-earned pump.fun daily since 08-29, with a record $5.95M day — [CoinDesk, 2026-09-03](https://www.coindesk.com/tech/2026/09/03/a-memecoin-making-app-becomes-crypto-s-top-fee-generators-as-robinhood-chain-activity-explodes); memecoins were 79.2% of Robinhood Chain DEX volume in July 2026 — [CoinGecko Learn](https://www.coingecko.com/learn/robinhood-chain-built-for-rwa-loved-for-memes).
- FACT [OLDER, Aug] — pump.fun took in >$10M in protocol fees in the week of 3–9 August, its first week above that mark — [CryptoTicker](https://cryptoticker.io/en/pump-fun-record-week-unlock-solana-memecoins/) (secondary).

### Inferences
- MARKET INTERPRETATION — The launchpad fee share has moved back toward Solana: Robinhood-chain launchpads went from ~70% in early September (CoinDesk) to ~31% now (Pons V1+V2 in DefiLlama). The definitions may differ, so treat the size of the move as approximate. The driver is StonkFun/LaunchLab/BONK.fun growth, not pump.fun, whose volume (PumpSwap −39% w/w) and token (PUMP −18.6% m/m) are fading.
- MARKET INTERPRETATION — Robinhood Chain is now a real competitor for memecoin attention and liquidity. It captures ~17% of 30-day DEX volume, and its meme category ($893M) is about 23% of Solana Meme's size.
- MARKET INTERPRETATION — PumpSwap's −57% d/d drop may partly be a DefiLlama adapter artefact, because several newer Solana venues (BisonFi, Scorch, GoonFi) show 0% change, which suggests fresh listings. The −39% w/w trend is more reliable than the 1-day figure.

### Gaps
- The Solana DEX volume of $2.683B from the chain endpoint differs from summing protocol breakdowns ($3.04B, which includes aggregator/trading-app double-counting). The chain endpoint figure is used.
- No Blockworks, Artemis or Dune cross-check of Solana DEX volume or fees in this pass.

## 5. Major crypto news, last ~7 days (09-17 → 09-24), plus key slightly-older context

### Takeaway
The dominant story is macro. The Fed hiked on 09-16 and US 10y yields broke 5.1% on 09-23, which reversed a rally built on a record $999M BTC-ETF day. In regulation, US legislation stalled (CLARITY cloture failed), so the SEC and CFTC are acting by rule and exemption instead. The most relevant rule for this report is the 09-17 SEC "Innovation Exemption" for on-chain trading of tokenized US stocks. Circle's Arc L1 launched. Hack headlines were bitcoin-infrastructure focused, not Solana.

### Cited Findings
**Macro**
- FACT [09-16, 8 days] — The FOMC raised the fed funds target by 25bp to **3.75–4.00%**, vote 12–0, released 2:00 p.m. EDT (18:00 UTC): "Inflation remains elevated. Today's policy action will support a timelier return to the Committee's 2 percent goal." — [Federal Reserve statement](https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm). It was the first hike since 2023; the dot plot is split on 2027 (8 hike / 6 hold / 4 cut) — [CNBC](https://www.cnbc.com/2026/09/16/fed-rate-decision-september-2026.html) (via search summary).
- FACT [09-23] — S&P Global flash US composite PMI rose to **58.4** from 56.0, a five-year high — [GN Crypto](https://www.gncrypto.news/news/bitcoin-falls-below-84000-us-pmi-pushes-treasury-yields/); [exchangerates.org.uk](https://www.exchangerates.org.uk/news/47262/2026-09-23-bitcoin-price-forecast-prediction-btc-falls-2-29-as-us-growth-accelerates.html).
- FACT [09-23] — US 10-year Treasury yield rose ~15bp to **5.11–5.12%**, the highest since 2007 — [CNN Business](https://www.cnn.com/2026/09/23/investing/us-bond-market-fed); [Yahoo Finance](https://finance.yahoo.com/markets/article/10-year-treasury-yield-hits-highest-level-since-2007-as-market-prices-in-another-fed-rate-hike-152744538.html). Cited drivers: strong activity surveys, hawkish comment from a top Fed official, a weak 5-year note auction, and oil (Brent Nov ≈$100) — [CNBC](https://www.cnbc.com/2026/09/23/treasury-yields-oil-inflation-fed.html) (page 403 on fetch; details from search snippet only). The S&P 500 was about −0.5% and the Nasdaq about −1% intraday — [Coinpaper](https://coinpaper.com/36179/sp-500-falls-as-10-year-treasury-yield-tops-5-after-five-year-pmi-high) (secondary).
- FACT (market pricing, reported) — Odds of another Fed hike in October rose to ~70% per coverage of 09-23 — [Yahoo Finance](https://finance.yahoo.com/markets/article/10-year-treasury-yield-hits-highest-level-since-2007-as-market-prices-in-another-fed-rate-hike-152744538.html) (via search summary; not verified against CME FedWatch).

**ETFs**
- FACT [session of Mon 09-21, reported 09-22] — US spot BTC ETFs had **+$998.9M** net inflows, the largest day of 2026 (previous high $844M on 01-14): IBIT $381M, ARKB $289M, FBTC ~$239M. The group is still about −$464M net YTD — [Bitcoin.com News](https://news.bitcoin.com/market-updates/bitcoin-etfs-hit-2026-high-with-999m-inflow-as-bitcoin-price-tops-86k/); [Bitbo](https://bitbo.io/news/bitcoin-etfs-999m-daily-inflow/). (Some summaries say "Monday Sept 22", but 09-22-2026 is a Tuesday, so the flow day is Monday 09-21.)
- FACT [week ending 09-18] — BTC ETFs net only **+$6.21M**, the smallest week in 141 weeks, on $1.5B gross movement (daily: 09-14 +$160M, 09-15 −$450M, 09-16 −$296M, 09-17 +$159M, 09-18 +$433M); BTC ETF net assets $102.5B. **SOL ETFs +$13.2M for the week, the 12th consecutive weekly inflow**, cumulative inflows $1.37B, net assets $1.42B; BSOL the only fund with disclosed inflows (SoSoValue data) — [24/7 Wall St., 2026-09-19](https://247wallst.com/investing/cryptocurrency/2026/09/19/solana-etfs-experience-12-consecutive-weeks-of-inflows-while-bitcoin-has-its-quietest-week-on-record/).
- FACT [OLDER, 09-08] — SOL ETF weekly inflows fell 96% (from $153.87M to $6.18M) in the week to 09-04 — [24/7 Wall St.](https://247wallst.com/investing/cryptocurrency/2026/09/08/solana-etf-inflows-fell-96-in-a-week-from-153-87-million-to-6-18-million-what-changed/).
- FACT — Nasdaq ISE filing SR-ISE-2026-42 (generic listing of options on crypto ETFs covering BTC, ETH, SOL, XRP, LINK, HBAR funds) reaches its 45-day SEC deadline on **09-27**. An extension to ~11-11 is the likely path — [CryptoTicker](https://cryptoticker.io/en/crypto-etf-options-sec-deadline-spread/).
- FACT — Grayscale and Bitwise spot TAO ETF applications are pending with the SEC — [KuCoin blog](https://www.kucoin.com/blog/which-cryptocurrency-etfs-are-most-likely-to-be-approved) (secondary; no dated decision found).

**US regulation**
- FACT [09-15, 9 days, OLDER than 7d but key] — The Senate cloture motion on the CLARITY Act (H.R. 3633) failed **49–50**. No Democrat voted yes; Collins, Hawley, Moran and Tillis voted no. The dispute was over ethics language on officials' crypto holdings — [CNBC](https://www.cnbc.com/2026/09/15/senate-cloture-vote-on-clarity-act-fails-dealing-regulatory-setback-to-crypto-industry.html); [Yahoo Finance](https://finance.yahoo.com/markets/crypto/articles/clarity-act-senate-vote-live-183611039.html). The next realistic window is the lame-duck session after the November elections; Tillis's motion to reconsider is the procedural option — [The Crypto Times](https://www.cryptotimes.io/2026/09/20/clarity-act-fails-49-50-in-us-senate-as-sec-cftc-move-ahead-on-crypto-rules-within-48-hours/).
- FACT [09-16] — CFTC Chair Michael Selig said the agency would use existing statutory authority and sent a preliminary crypto framework to the White House (OIRA, RIN 3038-AF80) for a 10-working-day review — [The Crypto Times](https://www.cryptotimes.io/2026/09/20/clarity-act-fails-49-50-in-us-senate-as-sec-cftc-move-ahead-on-crypto-rules-within-48-hours/).
- FACT [09-17] — **SEC Release 2026-90, "Innovation Exemption"**: two five-year exemptions (to 2031-09-17) that let "tokenized securities venues", including permissioned AMMs and liquidity pools, trade tokenized NMS stocks, and exempt their liquidity providers from "dealer" status. Tokens must carry the same rights as the underlying shares (dividends, voting), so purely synthetic price trackers are excluded — [SEC press release](https://www.sec.gov/newsroom/press-releases/2026-90-sec-issues-innovation-exemption-facilitate-trading-tokenized-nms-stock-request-comment); [Sidley](https://www.sidley.com/en/insights/newsupdates/2026/09/sec-issues-innovation-exemption-for-onchain-trading-of-tokenized-us-listed-stocks); [CNBC](https://www.cnbc.com/2026/09/17/sec-clears-path-for-tokenized-stocks-bringing-24/7-trading-closer.html). SEC Chair Atkins: "we will act decisively within the SEC's statutory authority to deliver certainty" — [The Crypto Times](https://www.cryptotimes.io/2026/09/20/clarity-act-fails-49-50-in-us-senate-as-sec-cftc-move-ahead-on-crypto-rules-within-48-hours/).
- FACT [09-16] — The House Financial Services Committee approved the American Reserve Modernization Act of 2026 (H.R. 8957, Strategic Bitcoin Reserve with a 20-year minimum hold) **28–21**. No floor vote is scheduled — [crypto.news](https://crypto.news/bitcoin-reserve-bill-clears-house-panel-28-21/); [BeInCrypto](https://beincrypto.com/house-committees-bitcoin-reserve-crypto-tax-bills/).
- FACT — GENIUS Act (stablecoin law): Treasury's August 2026 NPRM on issuance/offer/sale has comments due **10-19-2026**; the Act's expected effective date is **2027-01-18** — [Federal Register](https://www.federalregister.gov/documents/2026/08/18/2026-16796/genius-act-regulations-on-payment-stablecoin-issuance-offer-and-sale); [Treasury](https://home.treasury.gov/news/press-releases/sb0605).

**EU**
- FACT [OLDER, 07-01] — The MiCA transitional period expired; unlicensed CASPs must stop serving EU clients; 244 authorised CASPs at expiry — [ESMA statement](https://www.esma.europa.eu/sites/default/files/2026-06/ESMA75-113276571-1710_Public_Statement_MiCA_transitional_period_ends.pdf); [ForkLog](https://forklog.com/en/mica-transitional-period-expires-in-the-eu/). The European Commission's MiCA review consultation closes **09-30** (via search summary of [Sumsub](https://sumsub.com/blog/crypto-regulations-in-the-european-union-markets-in-crypto-assets-mica/) / related pages; not verified on the EC site).

**Infrastructure / protocol launches**
- FACT [09-16] — **Circle Arc mainnet** (USDC-gas, EVM L1). The 11 founding validators include BlackRock, DTCC, Galaxy, ICE, Mastercard, Visa, Standard Chartered and SBI; 100+ integrations at launch include Phantom, Coinbase, Binance, Aave and Uniswap. Jeremy Allaire: "the single most significant launch in Circle's history since USDC itself" — [Decrypt](https://decrypt.co/378374/circle-launches-arc-mainnet-with-blackrock-dtcc-and-visa-as-validators); [Blockhead](https://www.blockhead.co/2026/09/17/circle-launches-arc-mainnet-a-usdc-native-layer-1-backed-by-blackrock-visa-mastercard-as-validators/).
- FACT [09-18] — Solana changelog: Transaction V1, rent reduction to 5,080 lamports/byte and a 250ms slot-time reduction listed as mainnet feature gates; Agave v4.3.0-rc.1 and v4.4.0-alpha.4; Firedancer mainnet v26.08.5 — [Solana changelog](https://solana.com/news/solana-changelog-september-18-2026). Alpenglow activation is expected with v4.3 in October; a 09-28 mainnet update is tentative, not a confirmed Alpenglow date — [Phemex News](https://phemex.com/news/article/solana-to-activate-alpenglow-in-october-and-discontinue-frankendancer-96185) (secondary).

**Tokenized stocks / StonkFun**
- FACT [OLDER, ~09-06] — StonkFun moved its deployments to Raydium LaunchLab. STONK rose >250% to ~$140M mcap, RAY +~46% and JUP +~21% on 09-06; LaunchLab now supports any quote token — [The Block on X](https://x.com/TheBlockCo/status/2096704326232342748); [crypto.news](https://crypto.news/raydium-launchlab-adds-support-for-any-token-pair-on-solana/). StonkFun launched in late July 2026, has >105,000 coins, and pairs coins with tokenized stocks/ETFs such as SPYx (xStocks S&P 500) — [Bitquery](https://bitquery.io/investigations/is-stonkfun-dumping-on-holders); [Coinmonks/Medium](https://medium.com/coinmonks/stonk-surges-250-inside-the-raydium-x-stonkfun-integration-fb34fca0eb22).
- FACT — StonkFun added AAVE, AVAX and NEAR as launch pair assets — [AMBCrypto](https://ambcrypto.com/stonkfun-up-48-after-integrating-aave-avax-can-stonk-reach-500m-valuation/) (date not confirmed). HTX listed STONK — [Globe and Mail/Newsfile press release](https://www.theglobeandmail.com/investing/markets/markets-news/Newsfile/4503090/htx-opens-trading-for-stonk-stonkfun/) (press release; date not confirmed).
- FACT — CoinGecko Tokenized Stocks category $2.345B (24h −2.95%); xStocks ecosystem $867M (−3.11%); bStocks $652M; Robinhood Chain Stocks $163M (+2.1%) at 04:40 UTC — [CoinGecko categories](https://api.coingecko.com/api/v3/coins/categories).

**Hacks / exploits**
- FACT [OLDER, 09-07] — Liquid Network (Blockstream's bitcoin sidechain) exploited for ~$320M (~4,000 of 4,200 BTC in a wallet), attributed to an Elements software bug; attackers claimed to be white hats — [Bloomberg](https://www.bloomberg.com/news/articles/2026-09-07/bitcoin-network-says-320-million-stolen-in-latest-crypto-hack); [CoinDesk](https://www.coindesk.com/markets/2026/09/07/bitcoin-network-used-by-exchanges-hit-by-usd320-million-exploit-hackers-claim-they-re-the-good-guys).
- FACT [OLDER, 07-30→Aug] — Coldcard hardware-wallet exploit, ~1,816 BTC (~$116M) — [TRM Labs](https://www.trmlabs.com/resources/blog/the-largest-hardware-wallet-exploit-of-2026-inside-the-usd-116-million-coldcard-hack).
- FACT (secondary, ~09-21) — SingularityNET cross-chain infrastructure attacked; abnormal assets >$16M affecting Fetch.ai and NuNet — [KuCoin Crypto+AI weekly](https://www.kucoin.com/news/trends/BTC/6ab0ba8874fd460007c47017) (aggregator; not independently verified).
- FACT — Fraudsters attempted to steal at least $10M from Polymarket's US platform (per WSJ) — [Benzinga](https://www.benzinga.com/markets/prediction-markets/26/09/61909013/polymarket-cftc-probe-kalshi-crypto-volume).

**Prediction markets**
- FACT [OLDER, 09-10] — Polymarket hired its first CFO (Warren Jenson) to regain ground on Kalshi — [Bloomberg](https://www.bloomberg.com/news/articles/2026-09-10/polymarket-hires-first-cfo-in-push-to-regain-ground-on-kalshi). Riot Games held talks with both on esports sponsorships — [Bloomberg](https://www.bloomberg.com/news/articles/2026-09-10/riot-games-discussed-polymarket-kalshi-sponsorships-for-esports). Kalshi is contesting "fake volume" claims and faces scrutiny of its ETH perpetuals market; the headline also mentions a Polymarket CFTC probe — [Benzinga](https://www.benzinga.com/markets/prediction-markets/26/09/61909013/polymarket-cftc-probe-kalshi-crypto-volume).
- FACT (live) — Polymarket US fees $1.81M/24h (top-10 fee earner); Kalshi $437M 24h volume in DefiLlama's DEX dataset — [DefiLlama fees](https://api.llama.fi/overview/fees?excludeTotalDataChart=true); [DefiLlama dexs](https://api.llama.fi/overview/dexs?excludeTotalDataChart=true). CoinGecko Prediction Markets category $8.73B (24h −7.28%) — [CoinGecko categories](https://api.coingecko.com/api/v3/coins/categories).

**AI x crypto / DePIN**
- FACT (live 04:47 UTC) — NIL (Nillion) $0.1358, **24h +41.6%, 7d +228.6%**; TAO $286.12, 24h −9.1%, 7d +27.8% — [CoinGecko /coins/markets](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=nillion,bittensor&price_change_percentage=24h,7d,30d). Categories: AI $23.7B (−5.5%), AI Agents $3.97B (−4.6%), DePIN $10.19B (−5.9%) — [CoinGecko categories](https://api.coingecko.com/api/v3/coins/categories).
- FACT — Cardano joined the x402 agent-payment standard on 09-21; SAGA +~57%, LAT +~49%, VVV/ARC +15–16% in one 24h window (KuCoin weekly) — [KuCoin Crypto+AI weekly](https://www.kucoin.com/news/trends/BTC/6ab0ba8874fd460007c47017) (aggregator). Venice (VVV) is up ~54% since August and above $1B; "investors finally demanding more than just an AI narrative" — [Benzinga](https://www.benzinga.com/crypto/cryptocurrency/26/09/61884399/crypto-ai-token-hype).

**Corporate treasuries**
- Reported — Strategy bought 950 BTC for $75.7M between 09-14 and 09-20, per an SEC filing — reported only in a paid openpr press release ([openpr](https://www.openpr.com/news/4641814/crypto-market-news-september-2026-strategy-buys-950-btc-as)). **Unverified against the 8-K; treat with caution.**

#### SOCIAL-MEDIA SPECULATION / UNCONFIRMED
- Trump administration "crypto plan to reduce $40T debt": Bloomberg-reported (09-23) internal discussions about public-private partnerships to push dollar stablecoins abroad to lift Treasury demand. There is no policy document, no named partners and no funding; headlines oversell it — [BeInCrypto via Mitrade](https://www.mitrade.com/au/insights/Economics/news-of-the-day/beincrypto-TRUMPUSD-202609240926).
- Liquid Network attackers' "good guys" / white-hat claim is self-reported — [CoinDesk](https://www.coindesk.com/markets/2026/09/07/bitcoin-network-used-by-exchanges-hit-by-usd320-million-exploit-hackers-claim-they-re-the-good-guys).
- "Alpenglow on Sept 28" circulates, but the source itself says the date is tentative — [Phemex](https://phemex.com/news/article/solana-to-activate-alpenglow-in-october-and-discontinue-frankendancer-96185).
- Recycled or low-quality sources seen and **not** relied on for facts: homecryptoinvest.com, hokanews.com, spendnode.io, bitcoinethereumnews.com (re-posts), coinspectator (re-post), Fortune/Forbes daily "price of bitcoin" templated pages, exchange "academy/news" posts (BingX, BloFin, KCEX, OneBullEx, Phemex academy), and openpr.com (paid press releases).

### Inferences
- MARKET INTERPRETATION — The regime has changed from "rate cuts coming" to "the Fed is hiking and could hike again in October". That caps multiples on all risk assets. Crypto's 1–2 week rally was driven by flows (the $999M ETF day, a short squeeze) rather than macro, which makes it fragile to yield spikes like 09-23.
- MARKET INTERPRETATION — The SEC Innovation Exemption legitimises on-chain tokenized-stock trading. It supports the tokenized-stock narrative that StonkFun-style stock-paired memes feed on (STONK, RAY strength). However, the exemption covers compliant tokens with full shareholder rights on permissioned venues. It does not endorse memecoins paired to stock tokens, and it is unclear whether offshore tracker tokens like xStocks fit its terms.
- MARKET INTERPRETATION — The legislative stall (CLARITY) is mostly priced in. The market rallied after 09-15, so agency action is now the main regulatory channel. Expect incremental SEC/CFTC headlines rather than a single binary event.
- MARKET INTERPRETATION — I found no major Solana-specific exploit in the last 7 days. Security headlines are bitcoin-infrastructure hacks (Liquid, Coldcard) and cross-chain AI infrastructure (SingularityNET).

### Gaps
- BTC/SOL ETF flows for the 09-22 and 09-23 sessions were not found (Farside 403).
- I could not confirm major exchange listings (Coinbase, Binance, Upbit) in the last 7 days; only a press-release HTX/STONK listing of unknown date.
- No dated DePIN-specific news found.
- xStocks-specific news in the last 7 days not found.
- CME FedWatch odds not directly verified.
- The CNBC yields article returned 403, so the named "hawkish Fed official" is not identified.

## 6. Upcoming dated catalysts (next 1–3 weeks)

### Takeaway
The nearest hard catalysts are the Deribit Q3 expiry (Fri 09-25 08:00 UTC, max pain $75K versus spot ~$84K) and a heavy US data run: PCE 09-30, payrolls 10-02, FOMC minutes 10-07, CPI 10-14. With the market pricing another hike, each can move yields and therefore crypto.

### Cited Findings
- **Thu 09-24** — Treasury yield follow-through after the 09-23 spike (see Section 5). Weekly jobless claims usually print Thursdays at 12:30 UTC, but this is not confirmed in the calendar fetched (Gap).
- **Fri 09-25 00:00 UTC** — next daily Fear & Greed print — [alternative.me](https://api.alternative.me/fng/?limit=31) (daily cadence observed).
- **Fri 09-25 08:00 UTC** — Deribit quarterly expiry, $15.9B BTC plus $2.1B ETH notional; max pain $75K; P/C 0.69. Deribit CEO Luuk Strijers: "Once that gamma and hedging flow rolls off after settlement, the pinning effect fades, short-term volatility can increase, and the prevailing range can reset." — [CoinDesk](https://www.coindesk.com/markets/2026/09/23/bitcoin-s-usd16-billion-quarterly-options-settlement-arrives-with-a-call-heavy-book).
- **Sun 09-27** — 45-day SEC deadline for SR-ISE-2026-42 (options on crypto ETFs, including SOL funds); extension to ~11-11 likely — [CryptoTicker](https://cryptoticker.io/en/crypto-etf-options-sec-deadline-spread/).
- **Mon 09-28 (tentative)** — Solana mainnet update mentioned; not confirmed as Alpenglow — [Phemex](https://phemex.com/news/article/solana-to-activate-alpenglow-in-october-and-discontinue-frankendancer-96185).
- **Tue 09-29 14:00 UTC** — JOLTS (Aug) — [FedRateCalc calendar](https://fedratecalc.com/us-economic-calendar/).
- **Wed 09-30 12:30 UTC** — PCE inflation (Aug) and Q2 GDP third estimate — [FedRateCalc](https://fedratecalc.com/us-economic-calendar/). Same day: EU Commission MiCA consultation deadline — [Sumsub](https://sumsub.com/blog/crypto-regulations-in-the-european-union-markets-in-crypto-assets-mica/) (secondary).
- **~09-30** — CFTC crypto framework: the 10-working-day OIRA review that started 09-16 would end around here (derived from [The Crypto Times](https://www.cryptotimes.io/2026/09/20/clarity-act-fails-49-50-in-us-senate-as-sec-cftc-move-ahead-on-crypto-rules-within-48-hours/)).
- **Thu 10-01** — SUI unlock (~$180M) — [Crypto-Corner](https://crypto-corner.com/2026/09/22/upcoming-token-unlocks-sep-oct-2026/) / [KuCoin](https://www.kucoin.com/news/insight/SUI/6ab29fac74fd460007c4ca60) (aggregators; verify on [DefiLlama unlocks](https://defillama.com/unlocks/calendar)).
- **Fri 10-02 12:30 UTC** — US Employment Situation (Sept) — [FedRateCalc](https://fedratecalc.com/us-economic-calendar/); [BLS schedule](https://www.bls.gov/schedule/2026/10_sched_list.htm).
- **Mon 10-05** — ENA (~$212M, ~14.3% of circulating) and ASTER (~$504M) unlocks — [Crypto-Corner](https://crypto-corner.com/2026/09/22/upcoming-token-unlocks-sep-oct-2026/) (aggregator).
- **Wed 10-07 18:00 UTC** — FOMC minutes (09-15/16 meeting) — [FedRateCalc](https://fedratecalc.com/us-economic-calendar/).
- **Wed–Thu 10-07/08** — TOKEN2049 Singapore — [TOKEN2049](https://www.token2049.com/singapore).
- **October (unconfirmed day)** — expected Alpenglow activation with Agave v4.3 — [Phemex](https://phemex.com/news/article/solana-to-activate-alpenglow-in-october-and-discontinue-frankendancer-96185).
- **Sat 10-10** — RAIN unlock (~$683–785M) — [Crypto-Corner](https://crypto-corner.com/2026/09/22/upcoming-token-unlocks-sep-oct-2026/).
- **Wed 10-14 12:30 UTC** — CPI (Sept) — [Nowflation](https://nowflation.com/cpi-release-dates); [FedRateCalc](https://fedratecalc.com/us-economic-calendar/). Same day: **PUMP unlock (~$54.8M, ~1% of circulating)** — [Crypto-Corner](https://crypto-corner.com/2026/09/22/upcoming-token-unlocks-sep-oct-2026/).
- **Thu 10-15 12:30 UTC** — PPI and retail sales (Sept) — [FedRateCalc](https://fedratecalc.com/us-economic-calendar/).
- **Mon 10-19** — GENIUS Act Treasury NPRM comment deadline — [Federal Register](https://www.federalregister.gov/documents/2026/08/18/2026-16796/genius-act-regulations-on-payment-stablecoin-issuance-offer-and-sale).
- Beyond the window: FOMC 10-27/28 (decision 10-28 18:00 UTC); Q3 GDP and Sept PCE 10-29 — [FedRateCalc](https://fedratecalc.com/us-economic-calendar/); Solana Breakpoint, London, 11-15→17 — [solana.com/breakpoint](https://solana.com/breakpoint).

### Inferences
- MARKET INTERPRETATION — The Deribit expiry sits just before a launch window. Strikes clustered at $85K may have pinned BTC during the week. After 08:00 UTC 09-25, a range break in either direction becomes more likely, and meme tokens will amplify it.
- MARKET INTERPRETATION — PCE (09-30), then payrolls (10-02), then CPI (10-14) is the path that decides whether an October hike happens. Hot prints mean higher yields and weaker memes; soft prints could revive the risk-on flows of 09-18 to 09-22.
- MARKET INTERPRETATION — The PUMP unlock on 10-14 is small (~1% of circulating) but lands on CPI day, while pump.fun is already losing share to StonkFun, LaunchLab and Pons.

### Gaps
- Unlock figures come from aggregators and were not verified on Tokenomist or DefiLlama.
- No confirmed date for Alpenglow activation or for any SOL-ETF-specific decision in the window.
- Treasury auction calendar (for example a 7-year auction on 09-24) not verified.

## 7. What is driving sentiment — rising vs fading narratives

### Takeaway
Sentiment is being pulled two ways. Flows and positioning are bullish (record ETF day, Greed 71–78, stablecoins rising, a short squeeze to 8-month highs). Macro is bearish (Fed hike, 10y >5.1%, oil near $100, October hike odds ~70%). Within crypto, tokenized-stock and stock-paired memes, Solana launchpads other than pump.fun, Robinhood Chain memes, privacy/ZK and niche AI are rising. pump.fun's dominance, PolitiFi, and hopes for US legislation are fading.

### Cited Findings
- Drivers (facts): the Fed hike on 09-16 ([Fed](https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm)); the 10y at 5.11–5.12% on 09-23 ([CNN](https://www.cnn.com/2026/09/23/investing/us-bond-market-fed)); the $998.9M BTC ETF day ([Bitcoin.com](https://news.bitcoin.com/market-updates/bitcoin-etfs-hit-2026-high-with-999m-inflow-as-bitcoin-price-tops-86k/)); F&G at 78 on 09-22 and 71 on 09-24 ([alternative.me](https://api.alternative.me/fng/?limit=31)); ~$180M of long-heavy liquidations on 09-23 ([KuCoin](https://www.kucoin.com/news/flash/global-crypto-liquidations-reach-180m-in-one-hour-as-bitcoin-drops-below-85-000)).
- **Rising**, with live evidence:
  - Stock-paired and tokenized-stock launchpads: StonkFun fees +45.8% w/w; LaunchLab +219.9% w/w; BONK.fun +286% w/w ([DefiLlama fees](https://api.llama.fi/overview/fees?excludeTotalDataChart=true)). RAY 30d +138% and +9.3% on a red day; STONK +11.7% 24h ([CoinGecko](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=raydium&price_change_percentage=24h,7d,30d), GeckoTerminal via repo snapshot). SEC tokenized-stock exemption ([SEC](https://www.sec.gov/newsroom/press-releases/2026-90-sec-issues-innovation-exemption-facilitate-trading-tokenized-nms-stock-request-comment)).
  - Robinhood Chain memes: DEX volume +125% m/m ([DefiLlama](https://api.llama.fi/overview/dexs/robinhood?excludeTotalDataChart=true)); PONS +654% over 30d, though −11.7% in 24h ([CoinGecko](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=pons&price_change_percentage=24h,7d,30d)).
  - Privacy/ZK and "quantum-resistant": all six CoinGecko trending categories fall in this cluster, and ZEC is rank 9 with 0.89% dominance ([CoinGecko trending](https://api.coingecko.com/api/v3/search/trending), [/global](https://api.coingecko.com/api/v3/global)).
  - Niche AI: NIL +228% over 7d, TAO +28% over 7d ([CoinGecko](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=nillion,bittensor&price_change_percentage=24h,7d,30d)); VVV above $1B ([Benzinga](https://www.benzinga.com/crypto/cryptocurrency/26/09/61884399/crypto-ai-token-hype)).
  - Stablecoin and payments rails: USDC +3.8% w/w ([DefiLlama](https://stablecoins.llama.fi/stablecoins)); Circle Arc mainnet ([Decrypt](https://decrypt.co/378374/circle-launches-arc-mainnet-with-blackrock-dtcc-and-visa-as-validators)).
  - Cat-themed Solana memes (trending cluster, repo snapshot).
  - HYPE +15.7% over 7d; Hyperliquid Perps is a top-5 fee earner ([CoinGecko](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=hyperliquid&price_change_percentage=24h,7d,30d), [DefiLlama](https://api.llama.fi/overview/fees?excludeTotalDataChart=true)).
- **Fading:**
  - pump.fun and PumpSwap: PumpSwap volume −38.8% w/w; PUMP −18.6% over 30d ([DefiLlama](https://api.llama.fi/overview/dexs/solana?excludeTotalDataChart=true), [CoinGecko](https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=pump-fun&price_change_percentage=24h,7d,30d)).
  - PolitiFi: −11.2% over 24h; TRUMP only +1.3% over 7d while peers are up 20–37% ([CoinGecko categories](https://api.coingecko.com/api/v3/coins/categories)).
  - "Stock-market-themed" meme category: −16.6% over 24h, diverging from STONK.
  - Hyperliquid spot DEX volume: −43% m/m ([DefiLlama](https://api.llama.fi/overview/dexs/hyperliquid?excludeTotalDataChart=true)).
  - US legislative optimism after the CLARITY cloture failure ([CNBC](https://www.cnbc.com/2026/09/15/senate-cloture-vote-on-clarity-act-fails-dealing-regulatory-setback-to-crypto-industry.html)).
  - The rate-cut narrative, replaced by hikes ([Fed](https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm)).

### Inferences
- MARKET INTERPRETATION — For a Solana meme launch tomorrow, the narrative tailwind is strongest for concepts that ride tokenized-stock and "Wall Street on-chain" themes (StonkFun/LaunchLab/SPYx pairing, SEC exemption headlines). Next come cat-themed and AI-privacy angles. Political memes and generic pump.fun-only launches have the weakest tailwind.
- MARKET INTERPRETATION — The biggest risk to all of this is macro, not crypto-native. A further yield spike would hit memes about 2× as hard as BTC, as happened on 09-23.
- MARKET INTERPRETATION — Competition for meme liquidity is now multi-chain: Robinhood Chain/Pons, BSC/Flap.sh and Four.meme. Within Solana it is spread across launchpads (pump.fun, StonkFun/LaunchLab, BONK.fun, Meteora DBC), so attention per launch is more fragmented than in pump.fun's monopoly era.

### Gaps
- No direct measurement of Crypto Twitter or Telegram narrative share (no social API); narrative ranking relies on price, fee and trending proxies.

## 8. What could change overnight (from ~04:50 UTC 09-24 into the next session)

### Takeaway
Five things could change the picture before a launch tomorrow: (1) the US rates session on 09-24 (yield follow-through); (2) the first ETF-flow prints after the yield shock; (3) the Deribit expiry at 08:00 UTC 09-25, which ends strike pinning; (4) the next Fear & Greed print at 00:00 UTC 09-25; (5) crypto-native shocks on StonkFun/LaunchLab mechanics or a hack.

### Cited Findings
- FACT — 10y yield at 5.11–5.12% (a 19-year high) on 09-23, with October hike odds reported near 70% — [CNN](https://www.cnn.com/2026/09/23/investing/us-bond-market-fed); [Yahoo Finance](https://finance.yahoo.com/markets/article/10-year-treasury-yield-hits-highest-level-since-2007-as-market-prices-in-another-fed-rate-hike-152744538.html).
- FACT — Deribit expiry at 08:00 UTC 09-25, max pain $75K, heaviest strike $85K; Strijers expects pinning to fade after settlement — [CoinDesk](https://www.coindesk.com/markets/2026/09/23/bitcoin-s-usd16-billion-quarterly-options-settlement-arrives-with-a-call-heavy-book).
- FACT — Perp funding near neutral, BTC slightly negative on Hyperliquid, premiums slightly negative (04:47 UTC) — [OKX](https://www.okx.com/api/v5/public/funding-rate?instId=BTC-USDT-SWAP); [Hyperliquid](https://api.hyperliquid.xyz/info).
- FACT — The StonkFun reward-wallet design "sells into every chart, all day long"; 2,178 LaunchLab coins have mutable tax rates up to 100% — [Bitquery](https://bitquery.io/investigations/is-stonkfun-dumping-on-holders).
- FACT — STONK/SOL main pool liquidity is only 1.05% of FDV (thin) — repo snapshot via [GeckoTerminal](https://api.geckoterminal.com/api/v2).

### Inferences
- MARKET INTERPRETATION — **Bear case overnight:** yields push higher again (hot claims data, weak auction, oil, Fed-speak), BTC loses $83.6K (the 24h low), and the post-expiry range resets lower toward the $75–80K strikes and max pain. Solana memes would likely extend the −8–9% daily losses, and fresh launches would face weak follow-through.
- MARKET INTERPRETATION — **Bull case overnight:** yields retrace, ETF flows stay positive after the $999M day, and funding is clean (no crowded longs), so a squeeze back toward $85–87K is possible once expiry pinning ends. Meme beta would work in reverse, favouring momentum sectors (STONK/RAY, cats, PENGU/BONK).
- MARKET INTERPRETATION — **Idiosyncratic risk for stock-paired launches:** the paired assets (SPYx and similar) track US equities, which are closed overnight. Any equity-futures gap feeds into the pairs. Thin STONK liquidity (1% of FDV) means platform-token swings can be sharp. Tax-rate mutability on LaunchLab coins is a rug vector, so check that tax authority is renounced.
- MARKET INTERPRETATION — Re-check first thing: BTC vs $83.6K / $87.2K, the 10y yield, the F&G print at 09-25 00:00 UTC, SOL at $113–120, Solana Meme category 24h %, STONK and RAY relative strength, DexScreener paid boosts, and any exploit headlines. `npm run snapshot -- --json` refreshes most of these in about a minute.

### Gaps
- No live equity-futures or Treasury-yield feed was pulled (no free API tested), so current overnight yield levels are unknown from live data.
- US ETF flows for 09-22/09-23 are unavailable (Farside 403).
