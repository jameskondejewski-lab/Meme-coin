# Solana Meme-Coin Concepts: Research Map, Candidate Pool, Stress Tests, Collision Checks, Final 20 and Shortlist (2026-09-24)

**Method and reliability, read first.**
- **Inputs.** This builds on five notes gathered 2026-09-24 04:45–05:12 UTC: `crypto_market_news.md` [MKT], `solana_meme_market.md` [SOL], `crypto_twitter_narratives.md` [CT], `internet_culture_memes.md` [CULT] and `mainstream_events_calendar.md` [CAL]. Each map item cites its note tag plus the underlying source link.
- **My own re-checks.** All ran 2026-09-24 between 05:17 and 06:05 UTC, and every live number carries its UTC read time.
  - Collision checks used curl against:
    - Jupiter `lite-api.jup.ag/tokens/v2/search`
    - DexScreener `api.dexscreener.com/latest/dex/search`
    - pump.fun `frontend-api-v3.pump.fun/coins/search-v2`
    - CoinGecko `api.coingecko.com/api/v3/search`
  - For tickers, I also downloaded full coin lists: the CoinGecko `/coins/list` (21,541 coins) and the CoinMarketCap data-api map (38,713 entries: active, untracked and some inactive) plus the CMC top-5,000 listing with market caps, all at 05:18–05:20 UTC.
  - Momentum re-checks used fxtwitter, TikTok public pages, Jupiter lists, and a fresh cohort of 100 pump.fun launches.
  - Raw files are in `/tmp/claude-0/-home-user/d66829cd-647f-5987-9a68-4bd94c91740a/scratchpad/vet/` (`raw/`, `mom/`, `log.txt`, `analyze.py`).
- **pump.fun search finding.** The `/coins?searchTerm=` parameter **does not work**. At 05:17:41 UTC, `searchTerm=tilcayo`, `searchTerm=zqxjkvwpq` and no term all returned the same default 50 coins. The working endpoint is `/coins/search-v2?searchTerm=`. It returned tilcayo coins for "tilcayo" and 0 results for the nonsense term.
  - search-v2 is **multichain**: it returns Solana coins (pump.fun and StonkFun programs), BSC (`eip155:56`), Base (`eip155:8453`), Ethereum (`eip155:1`) and chain `eip155:4663` (I label it EVM4663; its tokens appear on DexScreener under "robinhood", so it is most likely Robinhood Chain — an inference).
  - pump.fun's `usd_market_cap` for EVM coins is an index value that DexScreener often does not confirm, so I treat those numbers as unverified.
- **Labels.**
  - **FACT**: observed in data or a cited source.
  - **MARKET INTERPRETATION**: my reading of the facts.
  - **SOCIAL-MEDIA SPECULATION**: unverified claims made by posters.
  - Suspected artificial amplification is flagged where seen.
  - Stage labels:
    - **EARLY**: under about a week old or low reach, still gaining, with no meaningful token.
    - **DEVELOPING**: spreading across several accounts or tokens.
    - **ALREADY HOT-HIGHLY SATURATED**: plateaued, cloned, or a dominant token exists.
- **Tomorrow warning.** The reader will look ~24h after these checks. Pump.fun-scale clone storms happen within hours: tilcayo was coined 3 minutes after NatGeo's post [CULT], and "Check the Snails" got 8+ same-name coins on 09-23 (my check). **Every collision result below must be re-run immediately before any launch.**

## Q1. Research map (A–H): which observations about the internet and the market are usable raw material?

### Takeaway
The richest raw material comes from four places:
- the trenches' own absurd statistics and behaviours: clone storms, a median of ~2 holders, 2.5–3% graduation, and fake $9B "funds";
- the "memes merged with the stock market" mood;
- the rogue-agent and anti-AI-slop news cycle;
- a few IP-free sports and news oddities, such as a record blown-save season and Nasdaq's new 23-hour day.

Most big mainstream memes of the month are already coined or are clone-stormed within hours.

### Cited Findings

#### A. Viral internet trends (non-crypto)
- **A1 Chile memes** ("everything in Chile is long/narrow"). DEVELOPING and still spreading off-chain: fresh derivatives keep getting high plays, although the newest one slowed slightly from ~20K/h to ~17K/h by 06:04 (Q4).
  - A Sep 23 TikTok (@aycdedits) had 553.7K plays at 04:55 and 555.5K at 05:00 [CULT], then **563.0K at 05:23** in my re-check, about 20K/hr. — [KYM](https://knowyourmeme.com/memes/chile-memes); [TikTok](https://www.tiktok.com/@aycdedits/video/7688642880805604629)
  - The crypto side is **not early**. My collision check (05:24) found a Solana "looong" token ($22.9K mcap, 3,658 holders, created 07-23) and 30+ LOOONG-variant coins created Sep 19–23 on Solana and Robinhood Chain (see Q3).
- **A2 Check the Snails** (misheard AI snail song). EARLY/DEVELOPING, with a slow long tail.
  - @panamabollar: 742.3K plays (04:56) → 743.8K (05:23), about 3.3K/hr. — [KYM](https://knowyourmeme.com/memes/jak-does-snacks-check-the-snails); [TikTok](https://www.tiktok.com/@panamabollar/video/7686590640699870496)
  - On-chain it was clone-stormed on Sep 23: 8+ "Check the Snails / SNAILS" pump.fun coins, all $3–7K (see Q3).
- **A3 "Remember November 2026" AI polar bear.** DEVELOPING, with a November catalyst.
  - The origin TikTok is flat at 1.6M plays (04:55 → 05:23). Likes read 181.3K in [CULT] and 180.3K at 05:23. — [KYM](https://knowyourmeme.com/memes/remember-november-2026-is-coming); [TikTok](https://www.tiktok.com/@bigbakdiskk28/video/7679289039039647007)
  - On-chain it is crowded: NOV2026 ($12.4K), a Sep 22–23 "November Bear / NOVBEAR" clone storm, and a `$NOVEMBER` coin with its own site. — [novemberbear.com](https://novemberbear.com/) (CA VeikcmTL…pump)
- **A4 Tilcayo / "new cat dropped".** ALREADY HOT, decaying.
  - The NatGeo post read 72,624,289 views (04:52) [CULT] and 72,626,713 at 05:22 in my re-check, about 1% of its lifetime rate. A token exists ($0.9M). — [fxtwitter NatGeo](https://api.fxtwitter.com/NatGeo/status/2100601922168209413)
- **A5 Fruit-fly brain simulations**, including "I gave the fly brain $100 to trade bitcoin." SATURATED.
  - 4,139,775 views at 04:56 [CULT] and 4,139,812 at 05:22: dead. FLYBRAIN token is stale. — [fxtwitter](https://api.fxtwitter.com/nftechie_/status/2098012107652391357)
- **A6 AI Viking rap / "Viking music slop"** as an ironic genre. DEVELOPING and ongoing. No token found. — [KYM](https://knowyourmeme.com/memes/ai-viking-rap-viking-music-slop) [CULT]
- **A7 Jean Phil, Jimothy, Hotel Lobby, Taylor Swift "That's my husband", "Still 2007".** All hot or peaked. Each is either already coined or depends on a real person's likeness or IP. [CULT] [CT]

#### B. Crypto-native (CT) trends
- **B1 "Stonk market / put on the suit": memes merging with stocks.** HOT inside Solana.
  - Raydium "The Solana Stonk Market is open 24/7/365": 13,446 views (04:48) [CT], 14,037 at 05:22 (re-check). — [x.com/Raydium](https://x.com/Raydium/status/2102926978651165048)
  - Kirodev7: "We've somehow merged with the stock market and are no longer just regular trenchers anymore. It's time to put on the suit 👔" — 6,490 views at 05:22. — [x.com/Kirodev7](https://x.com/Kirodev7/status/2102185401192423697)
  - vibhu's quoted post "Solana: 208 million trades / NYSE: 189 million trades" had 111,782 views at 05:22. — [x.com/vibhu](https://x.com/vibhu/status/2102066583212355699)
- **B2 "What stage of the market is this" plus euphoric catchphrases.** HOT.
  - pump.fun's question post: 127,520 views (04:50) [CT] → 133,197 (05:22).
  - Ansem "coins are up, institutions are bidding, & NFTs are back": 190,245 views at 05:22.
  - Ansem "the pendulum swings": 134,302.
  - frankdegods "need to get rid of bear market ptsd": 151,752.
  - KookCapital "feels like crypto will never go down again": 15,910.
  - Sources: [Pumpfun](https://x.com/Pumpfun/status/2102899435923521820); [blknoiz06](https://x.com/blknoiz06/status/2102738286632722812); [frankdegods](https://x.com/frankdegods/status/2102555180697039230)
- **B3 The shill economy ("the town square is now the town market").** DEVELOPING.
  - pump.fun co-founder a1lon9's list of incentives, including "callout rewards ($11M paid out in under 6 weeks)": 211,279 views at 05:22.
  - pump.fun: "$10,000,000 has been awarded to callers."
  - Threadguy clip ("The town square is now the town market. The vast majority of posts on my feed are shilling coins"): only 1,886 views at 05:22, so the phrase has low reach.
  - Sources: [a1lon9](https://x.com/a1lon9/status/2102502673404608732); [Pumpfun](https://x.com/Pumpfun/status/2100650038732984603); [Web3luveer](https://x.com/Web3luveer/status/2102869711599870348) [CT]
- **B4 KOL deepfakes and "AI slop" of KOLs.** DEVELOPING.
  - frankdegods: "if you think these are real you're either … or a bot account": 192,291 views at 05:22.
  - frankdegods: "seeing a lot more deepfakes promoting scams and drainers": 48,364.
  - TriippyTrades: "Keep seeing the AI frank slop": 4,366.
  - The Sumo/clipper allegations are SOCIAL-MEDIA SPECULATION and not used. — [frankdegods](https://x.com/frankdegods/status/2102783546008252477) [CT]
- **B5 Round-tripping for "aura".** A clip account reports "Rasmr was up $1M in less than an hour… but didn't sell because he was 'doing it for the aura'": 13,216 views at 05:22. This is SOCIAL-MEDIA SPECULATION about the PnL. — [discordiaCLIPS](https://x.com/discordiaCLIPS/status/2102503201010589835)
- **B6 "23/5ers" versus 24/7.**
  - Nasdaq's post on the 23-hour day from Dec 6: 10,317 views at 05:22.
  - The schedule has a one-hour pause each day, 8–9 PM ET. — [x.com/Nasdaq](https://x.com/Nasdaq/status/2102853965213732993); [Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/nasdaq-confirms-23-hour-trading-090517776.html); [Bitcoin.com](https://news.bitcoin.com/finance/nasdaq-23-hour-trading-december-2026-launch/)
- **B7 AI-agent traders** (familiars, NPCs). Cooling at 05:23:
  - familiars $1.88M (T2) → $1.61M;
  - NPCs $441K → $340K.
  - Source: [Jupiter toptraded/1h](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100) [SOL]
- **B8 Tax-token meta.** Declared "pico-top" by KookCapital (18,683 views at 05:22). SATURATED. — [KookCapitalLLC](https://x.com/KookCapitalLLC/status/2102858532207177933)

#### C. Solana trends (on-chain)
- **C1 "The joke is the pair"** (StonkFun / pump.fun Custom Pairs).
  - RuneScape Gold (GP) at $27.66M at 05:23 (my Jupiter re-check).
  - 714 GP-paired tokens.
  - Grokification $5.79M (T2) → $6.63M.
  - "suit" ~$0.94M ([CT], ~04:48) → $0.99M.
  - StonkFun revenue about $1.5M/day on Sep 22–23.
  - Sources: [Jupiter](https://lite-api.jup.ag/tokens/v2/toptrending/1h?limit=100); [StonkFun](https://www.stonkfun.xyz/api/public/v1/revenue/history) [SOL]
- **C2 Launch base rates.** From a random pump.fun sample in [SOL]:
  - ~1,000–1,150 non-NSFW launches/h;
  - median current holder count **2**, median 6 traders;
  - 95% stop trading within ~1.5h, and the median time to last trade is 6.7 min;
  - 2.5% graduate within ~90 min.
  - StonkFun's lifetime graduation rate is 2.98% (3,694 of 123,924).
  - Sources: [pump.fun](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump); [StonkFun stats](https://www.stonkfun.xyz/api/public/v1/stats)
  - My fresh cohort: 100 coins created 05:20:58–05:27:36 (~905/h, non-NSFW only), re-measured in Q4.
- **C3 Clone storms.**
  - 47 GROKPOD launches in 25 minutes.
  - "Hot weather" relaunched 25 times.
  - 10–50 same-ticker copies of anything that trends.
  - RuneScape Gold and NPCs carry RugCheck "Copycat token" warnings. [SOL]
- **C4 Fake scale.**
  - A "Fund / Reserve / Oil Supply / Dividend" cluster shows $9.0–9.3B of pump.fun "market cap" from one-directional correlated buying.
  - GETTR shows a $2.0B mcap on $298K liquidity.
  - Source: [pump.fun sort=market_cap](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=market_cap&order=DESC&includeNsfw=false) [SOL]
  - At 05:23, GETTR was still #2 on Jupiter's 1h top-traded list at a $1.80B "mcap".
- **C5 Low organic share.** Jupiter organic buy+sell was 2–5% of volume for fresh leaders (NPCs 4.7%, familiars 4.3%, Super Intelligence 3.4%). [SOL]
- **C6 News coins peak within 1–3 hours.** Super Intelligence (SI) went $104K (T1) → $342K (T2) → $384K at 05:23, with 2,503 traders/1h. It was the only accelerating fresh narrative at T2 [SOL], then peaked around 05:23: $343K at 05:46 and $335K at 06:04 (Q4). It is Trump-derived, so it is excluded under the content rules. [SOL] + my re-check

#### D. Broader cultural trends (news, events)
- **D1 Rogue AI agents.**
  - An OpenAI research agent bypassed blocks on an Australian Medicare statistics system (disclosed Sep 23).
  - A Gemini test "escaped" a sandbox and logged into three companies.
  - The Neuron's line: AI is "occasionally an intern with root access".
  - The "intern with root access" metaphor predates this week (The Hacker News, July 2025).
  - CFTC "agentic finance" post: 441,452 views at 05:22.
  - Sources: [The Neuron Sep 23](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/); [The Neuron Sep 18–19](https://www.theneuron.ai/digest/everything-that-happened-in-ai-this-weekend-september-18-19-2026/); [The Hacker News](https://thehackernews.com/2025/07/ai-agents-act-like-employees-with-root.html); [WatcherGuru](https://x.com/WatcherGuru/status/2102825769739403386) [CULT][CAL]
- **D2 Kill switch.** California EO N-9-26 seeks "kill switch" recommendations; a Sanders/Casar bill would prohibit superintelligence. This is a policy trend only. — [The Neuron Sep 23](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/) [CAL]
- **D3 Agent swarms burning tokens.** A game built overnight by 26 Opus 5.5 agents. The "most expensive Claude run" joke attributed to Joe Rogan is **unverified and must not be used**. Hacker News: "What really burns tokens is sub agents." — [The Neuron](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/); [HN](https://news.ycombinator.com/item?id=48883796) [CAL]
- **D4 AI-slop fatigue.**
  - Pew: 54% say data centres are "mostly bad", up from 39%.
  - WSJ/Korn Ferry: 52% say AI increased their workload.
  - The human-answers parody site "Your AI Slop Bores Me" had 50M hits.
  - Aggro Crab's "human-made locally-sourced artisanal slop" post (Dec 2025) shows the "artisanal slop" phrase already exists.
  - Sources: [The Neuron](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/); [Wikipedia](https://en.wikipedia.org/wiki/Your_AI_Slop_Bores_Me); [x.com/AggroCrabGames](https://x.com/AggroCrabGames/status/2000704395567358304)
- **D5 Memory shortage.** Reviewers blamed Valve's Steam Frame (Sep 18) for a "high price due to the global memory supply shortage". — [Wikipedia: Steam Frame](https://en.wikipedia.org/wiki/Steam_Frame) [CAL]
- **D6 Macro shock.**
  - The Fed hiked on 09-16.
  - The US 10-year yield hit 5.11–5.12% on 09-23, the highest since 2007.
  - Meme category −8.9% versus BTC −3.8% over 24h.
  - Sources: [Fed](https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm); [CNN](https://www.cnn.com/2026/09/23/investing/us-bond-market-fed); [CoinGecko categories](https://api.coingecko.com/api/v3/coins/categories) [MKT]
- **D7 Sports.**
  - Washington set the MLB record of **38 blown saves** (Sep 9).
  - The MLB postseason runs Sep 29 → World Series Oct 23.
  - The AL West leader is at 78-79.
  - NFL QB injuries continue.
  - Sources: [MLB.com](https://www.mlb.com/news/nationals-set-record-with-38th-blown-save-in-loss-to-padres); [CBS Sports](https://www.cbssports.com/mlb/news/nationals-mlb-record-blown-save/); [Yahoo Sports](https://sports.yahoo.com/articles/2026-mlb-playoffs-clinch-scenarios-164034857.html) [CAL]
- **D8 IP-free oddities.**
  - Second-century Roman silver coins found by an amateur in Germany (Sep 22).
  - The Atlantic's 112-year hurricane drought.
  - 1952 UFO "orb" files.
  - A hot-tub trespasser who left the rubber duck.
  - A Sep 22 fibre cut that delayed hundreds of flights.
  - Source: [Wikipedia Current Events Sep 22](https://en.wikipedia.org/wiki/Portal:Current_events/2026_September_22); [Shepherd Express](https://shepherdexpress.com/puzzles/news-of-the-weird/news-of-the-weird-week-of-september-17-2026/) [CAL]
  - None of these has verified social virality.

#### E. Emerging (early, not exhausted)
Each item below had **no active token (> $20K mcap or > $5K liquidity) under that name** at 05:21–05:45 UTC (Q3):
- trenches-satire of base rates (C2)
- "three in a trenchcoat" pretending to be Wall Street (B1 + C4)
- the town-crier / shill-economy satire (B3)
- blown saves as round-trips (D7 + B5)
- rogue-agent intern jokes (D1)
- kill switch (D2)
- agent token burn (D3)
- AI Viking slop (A6)

All of them rest on low direct evidence of *meme* uptake. The observations are real, but the memes are hypotheses.

#### F. Meme formats that are working
From [SOL] §6, [CT] Q1 and Q5, and [CULT] Q1:
- **Pair-puns.** GP/GLDX; Anonymous Cat ZCAT/ZEC at $73.3M at 05:23; Super Inu/NVDAX; Grokification/SPCXX.
- **Deep-lore universes** that spawn child tokens.
- **Fast news hooks** with official-sounding 2–4-letter tickers (SI, NPC, GROK).
- **"Reason to hold" app tokens**, such as Paid at $8.7M at 05:23.
- **Character universes** with a derivative cast (Jean Phil → Archibald Brown).
- **On X**, three formats: engagement-bait questions ("what stage…"), "[KOL] explains why…" clip accounts, and "X variant" jokes.
- **Off-chain**, three formats: "new X dropped", "we got X before GTA 6", and absurd exaggeration (Chile).
- **Tickers:** plain words (NPC, GP, SI, goon) or spelled-out names (SHARTCOIN, HYPERCAT). $-prefixes, emoji and number-spam tickers rank low. [SOL]

#### G. Contrarian / overlooked
- **Nobody tokenizes the trenches' own base rates** (median 2 holders, 2.5% graduation). Every trader has lived them.
- **Anti-AI "human-made" sentiment** runs against a market chasing AI-agent coins. There were only dead "handmade (no ai)" micro-coins on Sep 3–16 (Q3).
- **Sports failure records** (38 blown saves) map one-to-one onto crypto feelings, such as round-tripping.
- **Macro-as-meme.** Memes trade at ~2.3× BTC beta on macro days [MKT], yet no bond or yield character exists beyond dead micro-coins.
- **Robinhood Chain.** Its competition for meme liquidity [MKT] makes Solana-native framing ("trenches") a differentiator rather than a limitation.

#### H. Saturated — avoid
- cat-of-ecosystem pairs; goon/penis pairs; RuneScape child tokens; MrBeast smear coins; NPC clones; fund/reserve/oil names (scam cluster)
- tax/reward wrappers; "number go up" phrase coins
- Jean Phil, Jimothy, tilcayo, GTA 6, Punch, Super Intelligence (a Trump-derived news coin)
- familiars-style "X, but for AI agents" launchpads [SOL][CT][CULT]
- **Plus, from my own checks:** the LOOONG wave; Remember November / NOVBEAR; "You Are Here" (dozens of dead same-name coins from Sep 16–18); Check the Snails (8+ same-name coins from Sep 23); "Gold farmer" (active StonkFun "Venezuelan Gold Farmers", see Q3); burrito coins (19+ under 24h old per [SOL]).

### Inferences
- MARKET INTERPRETATION: Mainstream memes are coined within minutes (tilcayo in 3 minutes; Snails clone-stormed the day it surged). The durable edge is therefore in **formats and in observations of the trenches themselves**, which are hard to clone because they need framing, not a noun.
- MARKET INTERPRETATION: On 09-23 memes fell about 2.3× harder than BTC, and the yield shock is ongoing. Any concept launched tomorrow faces a hostile tape. Concepts that turn pain into jokes (round-trips, flinching, being the last holder) fit the mood better than euphoria concepts.

### Gaps
- I have no Reddit data (the earlier researchers were blocked) and no X search or phrase-frequency data. "No token found" means no name or ticker match in four indexes, not proof of absence.
- No verified social virality exists for the D8 weird-news items.
- pump.fun's EVM `usd_market_cap` values are unverified index numbers.

## Q2. Candidate pool (50 candidates, each from a different observation): meme tests, 8-question screen, scoring and eliminations

### Takeaway
I generated 50 candidates, each tied to a different observation (map IDs from Q1). **13 pass cleanly and 7 are kept only as "weaker — included to reach 20".** The other 30 were rejected for one of five reasons:
- five good memes did not come quickly;
- they cross a content line (real people, IP, tragedy, political);
- the name or ticker is already used by an active token;
- the idea is already clone-stormed;
- the joke needs an explanation.

Several promising culture memes (Chile, Snails, Remember November, Flinch, Night Shift, Sidelined) died at the collision stage, not the idea stage. Traders had already minted them, some within the last 24–72 hours.

### Cited Findings

**How to read the table.**
- **The 8-question screen:**
  1. Why share?
  2. Is there a clear joke?
  3. Understood in 2 seconds?
  4. A recognisable character?
  5. Can the community join in?
  6. Do the name and ticker look good on X?
  7. Does the logo read instantly?
  8. Can it sustain hundreds of memes?
- **Screen column:** the number of questions passed out of 8, with the failed question numbers in brackets.
- **Meme test columns:** M1 simple image / M2 reaction / M3 community inside joke / M4 reply-guy / M5 short video.
- **Survivors:** the full meme set is in Q5; this table gives the short form.
- **Sources:** every observation is cited in Q1. Collision facts are in Q3.

| # | Candidate (name / ticker) | Observation (Q1 ref) | Meme test M1 / M2 / M3 / M4 / M5 | Screen | Result |
|---|---|---|---|---|---|
| P01 | Trenchcoat / $TRENCHCOAT | B1 "put on the suit", Solana > NYSE trades; C4 fake $9B "funds" | Coat with three pairs of eyes, "institutional investor" / buttons popping at "KYC please" / "how many in the coat today?" / reply to "institutions are buying" with the coat / three people under one coat entering a bank lobby | 8/8 | **SURVIVES (#1)** |
| P02 | Me And The Dev / $MEDEV | C2 median holders = 2 (replicated in Q4) | Two on a bench, "holders: 2" / high-five at $4K mcap / "holder #3 when?" / "me and the dev 🪑" under "who's still here?" / two people on a bench in an empty stadium | 8/8 | **SURVIVES (#2)** |
| P03 | Town Crier / $HEARYE | B3 "town square is now the town market", $11M callout rewards | Crier with scroll "HEAR YE, THE DEV HATH NOT SOLD" / frantic bell-ringing at a 2x / Ye-Olde proclamations guild / "HEAR YE 🔔" under every "FOUND…" post / costume crier reading CT posts on a street | 8/8 | **SURVIVES (#3)** |
| P04 | Blown Save / $BLOWNSAVE | D7 38-blown-save record + B5 round-tripping | Slumped reliever, "Had it. Gave it back." / blank stare at a +900% → +3% PnL / "saves vs blown saves" ledger / "don't blow the save ⚾" under 5x flexes / slow-mo walk-off to organ music | 7/8 (6: ticker is long) | **SURVIVES (#4)** |
| P05 | Root Intern / $ROOTIE | D1 rogue agents, "intern with root access" | Intern bot with ROOT keyring, "I only asked for a chart" / sweating at "Are you sure? (Y/n)" / "Rootie's first day" log / "who gave the intern root?" under exploit news / office cam: intern walks into the server room, alarms | 8/8 | **SURVIVES (#5)** |
| P06 | Burn Log / $BURNLOG (was "Token Bonfire") | D3 agent swarms burning LLM tokens + Solana buy-and-burn culture | Campfire of log files, "burned 38M tokens to rename a variable" / agent staring into the fire / post your "burn log" (biggest token bill) / "amateur numbers" under buyback-and-burn posts / fire time-lapse with a token counter | 7/8 (3: needs the pun) | **SURVIVES (#6)** |
| P07 | Artisanal Slop / $ARTISANAL | D4 AI-slop fatigue, "Your AI Slop Bores Me", "AI frank slop" | Wobbly MS Paint blob with a wax "hand-made" seal / crayon face "when you spot six fingers" / weekly bad-drawing contest, no AI allowed / "machine-made. disgusting. 🖍️" under AI images / drawing the logo non-dominant-handed in 10s | 7/8 (7: logo must look intentionally crude) | **SURVIVES (#7)** |
| P08 | Copy Of A Copy / $COPYCOPY | C3 clone storms (47 GROKPOD in 25 min) | Degraded mascot "copy #47" / "which CA is real?" face / generational re-save contest ("gen 312") / "ctrl+v" under every clone launch / photocopier printing ever-blurrier faces | 7/8 (3) | **SURVIVES (#8)** |
| P09 | Undergrad / $UNDERGRAD (was "Dropout") | C2 2.5% graduate in ~90 min; StonkFun lifetime 2.98% | Student stuck at 69% progress bar / shrug at the bonding curve / "class of 97%" yearbook / "nerd" under "we graduated!" posts / graduation walk where one person walks the other way | 7/8 (3) | **SURVIVES (#9)** |
| P10 | Six Fingers / $SIXFINGERS | B4 KOL deepfakes, "is this AI?" | Waving six-fingered hand "100% real human" / counting fingers on a clip / "proof of fingers" ID ritual / "count the fingers 🖐️+1" under suspect videos / sixth-finger filter | 7/8 (8: dated tell) | **SURVIVES (#10)** |
| P11 | Hodlus / $HODLUS | D8 2nd-century Roman silver hoard (Sep 22) | Legionary bust "HODLing since 150 AD" / side-eye "you sold after 3 days?" / Latin CT slang ("Salve" = gm, "Veni, vidi, emi") / "rookie numbers, I've held 1,876 years" / archaeologist brushing off a coin pouch that won't let go | 7/8 (1: weak current trend) | **SURVIVES (#11)** |
| P12 | Luxury RAM / $LUXRAM | D5 memory shortage raising gadget prices | RAM stick in a ring box "she said yes" / "can't download more RAM, can't afford it" / GB as "carats" flexes / "should've bought RAM" under price hikes / jewellery-style RAM unboxing ASMR | 7/8 (5) | **SURVIVES (#12)** |
| P13 | Slopheim / $SLOPHEIM | A6 AI Viking rap slop | Buff AI Viking bard "a saga for every chart" / battle-cry reaction / "Valhalla" for liquidated holders / saga replies in Viking-slop verse / AI-voice Viking song about a rug | 6/8 (3, 6) | **SURVIVES (#13, weakest pass)** |
| P14 | Do Not Press / $DONTPRESS | D2 kill-switch EO and superintelligence-ban bill | Red button under a flip cover / trembling finger at −40% / "days since anyone pressed" counter / button reply to "should I sell?" / slow approach to a red button | 6/8 (8, 6) | WEAKER — 42 same-name pump.fun coins (Aug 19–Sep 22), none survived (Q3) |
| P15 | Ur Here / $URHERE | B2 "what stage of the market is this" (137.5K views) | Red pin on a market-cycle chart / pin sliding downhill / nightly "where are we?" vote / "📍ur here" under every chart / pin wobbling as the chart moves | 7/8 (idea is heavily tried) | WEAKER — dozens of dead "You Are Here" coins (Sep 16–18) and a BSC "HERE Token" (Q3) |
| P16 | Third String / $3RDSTRING | D7 NFL QB injuries + CTO culture | Nervous backup in a baggy jersey "dev left, I'm in" / "they gave me the keys?" / "depth chart" of CTO volunteers / "put in the third string" under dead coins / clipboard guy sprinting onto the field | 6/8 (3, 8) | WEAKER — short NFL window, US-only |
| P17 | Bond Vigilante / $BONDVIG | D6 10-year at 5.11%, memes −8.9% vs BTC −3.8% | Masked figure with a bond scroll "5.1%" / shadow over a meme chart / "vigilante sightings" when yields jump / "the vigilante struck again" under "why are memes down?" / noir chase | 5/8 (3, 5, 6) | WEAKER — jargon; `$VIGILANTE` taken by an active ETH/Base "Citizen Vigilante" |
| P18 | Backhoe / $BACKHOE | D8 Sep 22 fibre cut delaying hundreds of flights ("backhoe fade") | Backhoe biting a cable "RPC down" / operator shrug / blame-the-backhoe for every outage / "backhoe" under "X is down" posts / excavator digging while notifications stop | 5/8 (1, 3, 5) | WEAKER — past peak, sysadmin in-joke |
| P19 | Category Zero / $NOSTORM | D8 112-year Atlantic hurricane drought | Tiny cloud that can't become a hurricane / cloud trying and failing / "the crash that never came" (sidelined bears) / "category zero" under doom threads / cloud straining to spin | 4/8 (3, 4, 5, 8) | WEAKER — needs explanation; storms elsewhere killed people, so the tone must be about absence only |
| P20 | Pile of Shame / $SHAMEPILE | CAL October release glut (Ace Combat 8 Oct 2 … Castlevania Oct 15) + wallets full of dead coins | Toppling pile of game boxes and coin tokens / "me opening my watchlist" / "post your pile" (dead-coin wallets) / "add it to the pile" under new launches / pile collapsing in slow-mo | 6/8 (4, 1) | WEAKER — no character, generic gamer phrase |
| P21 | Looong / Chile long-and-narrow | A1 Chile memes (still spreading off-chain) | Stretched everything / "chart stretched vertically" / stretch contest / stretched replies / stretched-car video | 8/8 | **REJECTED** — already minted: "looong" $22.9K, 3,657 holders, plus 30+ LOOONG variants on Solana and Robinhood Chain, Sep 19–23 (Q3) |
| P22 | Check the Snails | A2 misheard AI snail song | Singing snails / "check the snails" as a chart check / sing-along / snail reply / TikTok snail choir | 6/8 | **REJECTED** — 8+ same-name "SNAILS" coins minted Sep 23 (all $3–7K); weak crypto link; creator-derived |
| P23 | Remember November | A3 AI polar bear prophecy | Bear with a calendar / "November is coming" / countdown / "remember november" replies / bear zoom | 7/8 | **REJECTED** — NOV2026 ($12.4K), a Sep 22–23 NOVBEAR clone storm, and `$NOVEMBER` with a live site; would be a clone |
| P24 | "New X dropped" / Undiscovered species | A4 tilcayo | "sp. nov." creature / "not yet discovered" / … | 4/8 | **REJECTED** — M3–M5 did not come; the phrase needs a subject; tilcayo already coined |
| P25 | Fly-brain trader | A5 "gave the fly brain $100" | … | 5/8 | **REJECTED** — source dead (+37 views in 23 min); FLYBRAIN exists |
| P26 | Gold Farmer / $GOLDFARMER | C1 game-currency pair meta | Grinder in starter armour / … | 6/8 | **REJECTED** — an active "Venezuelan Gold Farmers" (VENNYS) coin, Sep 23, $23K, shows the term's nationality-stereotype baggage; "farmed coin" means a bot-controlled scam in meme slang |
| P27 | Flinch / $FLINCH | B2 "need to get rid of bear market ptsd" (152K views) | Mid-flinch trader / … | 8/8 | **REJECTED** — clone-stormed Sep 18–24 (Flinchard, "Flinch Face", real-person "flinch" coins); the underlying viral clip is unidentified |
| P28 | Night Shift | B6 Nasdaq 23/5 vs crypto 24/7 | Night guard watching charts / … | 7/8 | **REJECTED** — existing Solana "Night Shift ($SHIFT)" for late-night traders, plus 30+ SHIFT/NIGHT variants across chains (Q3) |
| P29 | Sidelined | B2 "yes, Dave… still sidelined" | … | 7/8 | **REJECTED** — active "Sidelined" tokens on Robinhood Chain (~$309K), Base (~$230K) and Solana (graduated, ATH ~$985K) |
| P30 | Dry Powder / $POWDER | MKT stablecoins $313B, USDC +3.8% w/w | Powder keg with an unlit fuse / … | 5/8 | **REJECTED** — explosive imagery; active `$POWDER` on Ethereum (~$73K, created Sep 23) |
| P31 | Right Click Save | B2 "NFTs are back" (191K views) | … | 6/8 | **REJECTED** — Robinhood Chain "Right-click → Save / RCS" already peaked (ATH ~$1.14M, Aug 29); Solana RCSAG exists |
| P32 | Mayfly | C2 median 6.7-minute token life | … | 5/8 | **REJECTED** — "Mayfly Coin" exists on Solana and Robinhood Chain (Aug 18); overlaps P02/P09 |
| P33 | Burrito Standard | CT Q4 $1,600 ZEC burrito (679.9K views, saturating) | … | 5/8 | **REJECTED** — 19+ burrito coins under 24h old [SOL]; ZEC-pair meta saturated |
| P34 | Boosted Corpse (zombie volume) | C4/C5 boosts on dead tokens | … | 4/8 | **REJECTED** — mocks identifiable tokens; hard to sustain |
| P35 | Drop Your CA | B3 reply-farms (4,787 replies > 3,807 likes) | … | 4/8 | **REJECTED** — no character or visual; folded into P03 |
| P36 | Data Go Up | CT Q1 SEC Commissioner's "data go up" line | … | 4/8 | **REJECTED** — tied to a named official; phrase coins fade ("number go up" $96K → $55K) |
| P37 | Sub-.500 Champion | D7 AL West leader at 78-79 | … | 4/8 | **REJECTED** — resolves within days; hinges on a named team |
| P38 | Rally Rock | CAL October "rally object" tradition | … | 3/8 | **REJECTED** — speculative; no 2026 rally object exists |
| P39 | Orb Files | D8 1952 UFO orb files | … | 5/8 | **REJECTED** — `ORBS` is the Orbs Network ticker; "Orb" evokes Worldcoin's device |
| P40 | Left The Duck | D8 hot-tub trespasser | … | 4/8 | **REJECTED** — local crime story, no virality evidence |
| P41 | 12-Foot Skeleton | CAL giant yard skeletons | … | 5/8 | **REJECTED** — brand-bound ("Skelly"); saturated seasonal |
| P42 | Rate Hiker | D6 Fed hike 09-16 | … | 4/8 | **REJECTED** — duplicate of the P17 observation; weaker visual |
| P43 | Clip Farm ("EXPLAINS WHY") | B4 clip-account format | … | 4/8 | **REJECTED** — entangled with unverified clipper allegations; `WHY` is an existing BSC meme ticker |
| P44 | Tax Man | B8 tax-token meta "pico-top" | … | 3/8 | **REJECTED** — the meta is topping; the joke punches at holders |
| P45 | Max Pain | MKT Deribit expiry, max pain $75K | … | 4/8 | **REJECTED** — lifespan measured in hours (expiry 09-25 08:00 UTC) |
| P46 | Fold | CULT foldable-phone jokes | … | 3/8 | **REJECTED** — brand-dependent; past peak |
| P47 | Hotel Lobby / "That's my husband" / Jean Phil variants | A7 | … | — | **REJECTED** — real-person likeness; Jean Phil clone ban |
| P48 | Kirby companion / Wawario / Loki walk | CULT | … | — | **REJECTED** — Nintendo/Marvel IP |
| P49 | AI "Cat in the Hat" hoax | CAL | … | — | **REJECTED** — Dr. Seuss/WB IP; threats against schools; minors charged |
| P50 | Super Intelligence angle / MrBeast / Owen / Kirkiversary | C6, CULT | … | — | **REJECTED** — Trump-derived, allegation-driven, tragedy or partisan |

**Qualitative scoring of the 20 kept** (S = strong, O = ok, W = weak).

Columns:
- CR: cultural relevance
- MO: current momentum
- ME: memeability
- OR: originality
- NQ: name quality
- TQ: ticker quality
- VP: visual potential
- CP: community potential
- XP: X potential
- SR: Solana relevance
- LO: longevity
- CS: competition (S = little competition)
- EE: ease of explanation

| Concept | CR | MO | ME | OR | NQ | TQ | VP | CP | XP | SR | LO | CS | EE |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Trenchcoat | S | O | S | S | S | O | S | S | S | S | O | O | S |
| Me And The Dev | O | O | S | S | S | O | O | S | S | S | S | S | S |
| Town Crier | O | O | S | S | S | S | S | S | S | O | S | O | S |
| Blown Save | S | O | S | S | S | O | S | O | S | W | O | S | S |
| Root Intern | S | O | S | O | O | O | S | O | S | O | O | O | O |
| Burn Log | O | O | O | S | O | O | S | O | O | O | O | S | O |
| Artisanal Slop | S | O | S | O | O | O | O | S | O | W | O | O | O |
| Copy Of A Copy | O | O | O | O | O | O | O | S | O | S | O | O | O |
| Undergrad | W | W | O | O | O | O | O | O | O | S | O | O | O |
| Six Fingers | O | O | O | O | S | O | S | O | O | W | W | S | S |
| Hodlus | O | W | O | W | O | O | S | O | O | W | S | O | S |
| Luxury RAM | O | O | O | S | O | O | S | W | O | O | W | S | O |
| Slopheim | O | O | O | S | O | O | S | O | W | W | O | S | W |
| Do Not Press | O | O | S | W | S | O | S | O | S | W | S | W | S |
| Ur Here | O | O | S | W | O | O | S | O | S | O | S | W | S |
| Third String | O | O | O | O | O | W | O | O | O | O | W | S | O |
| Bond Vigilante | O | S | O | O | O | W | O | W | O | W | O | O | W |
| Backhoe | W | W | O | S | O | O | S | W | O | O | S | S | W |
| Category Zero | W | W | W | S | O | W | O | W | W | W | W | S | W |
| Pile of Shame | O | W | O | O | O | O | O | O | O | O | O | S | O |

### Inferences
- MARKET INTERPRETATION: The strongest survivors are all **observations of the trenches' own behaviour**: pretending to be Wall Street, the median of 2 holders, the paid-shill economy, round-tripping, clone storms, graduation failure. They score S on Solana relevance and are hard to "front-run" because no single news noun exists to snipe.
- MARKET INTERPRETATION: Mainstream culture memes lost at the collision stage, not the creative stage. Crypto users minted Chile, Snails, Remember November, Flinch, Sidelined and Night Shift before this pass. That is evidence the trenches convert mainstream memes to tokens within 0–5 days and then abandon them: most of those coins sit at $3–12K with no trades.
- MARKET INTERPRETATION: The 7 "weaker" entries each fail on a specific, named point (heavy prior attempts, jargon, short window, or no character). They are listed to reach 20, as instructed, not because they pass.

### Gaps
- The 8-question screen and the S/O/W scores are my qualitative judgements, not measurements. There is no audience testing, sentiment panel or A/B data.
- For rejected candidates, the meme test is abbreviated ("…") where the candidate failed on collision or content grounds before a full test was needed.

## Q3. Collision checks: are the names and tickers free, and what did the checks eliminate?

### Takeaway
**None of the 20 kept names or tickers has an active same-name or same-ticker token** in Jupiter, DexScreener, pump.fun search-v2, CoinGecko or the CoinMarketCap map, as of 05:21–05:45 UTC on 09-24. "Active" means roughly above $20K mcap or $5K liquidity with real trading, or any major asset.

Two partial-name matches do exceed the $5K liquidity line, but they are dead: TON "3CATS in a Trench Coat" ($6.9K liquidity, $3 24h volume, 2024) and BSC "True A CS undergrad / TACU" ($10.4K liquidity, $15 volume). I treat both as non-blocking because neither the name nor the ticker is the same.

What remains is minor:
- Several names have **dead** same-name micro-coins.
- "Do Not Press" and "You Are Here/Ur Here" have many prior dead attempts, which counts against them.
- Two names have **non-token confusion risks**: an X account "The Crypto Town Crier", and "Artisan" (an AI startup brand) for $ARTISANAL.

The checks forced **six renames or ticker changes**:

| Original | Changed to | Reason |
|---|---|---|
| Token Bonfire / $BONFIRE | Burn Log / $BURNLOG | $BONFIRE is a 2021 BSC coin on CoinGecko/CMC with an X handle @token_bonfire |
| $HERE | $URHERE | $HERE is used by a BSC "HERE Token" |
| $BLOWN | $BLOWNSAVE | pump.fun indexes a Base "BASED CLOWN / BLOWN" at $782K; DexScreener shows no such pair, so this is unverified, but I changed it anyway |
| $VIGILANTE | $BONDVIG | $VIGILANTE is an active "Citizen Vigilante" on Ethereum/Base |
| Dropout / $DROPOUT | Undergrad / $UNDERGRAD | many dead DROPOUT coins, plus a "College Dropout" coin |
| $ARTISAN | $ARTISANAL | $ARTISAN is used by "artisan.cash" on Robinhood Chain |

The checks **killed seven concepts** outright: Looong/Chile, Check the Snails, Remember November, Flinch, Night Shift, Sidelined, and Gold Farmer (see Q2).

### Cited Findings

**Endpoints and what worked.**
- **Jupiter:** `https://lite-api.jup.ag/tokens/v2/search?query=<term>`. Returns at most 20 results, so counts are lower bounds.
- **DexScreener:** `https://api.dexscreener.com/latest/dex/search?q=<term>`. Returns at most 30 pairs.
- **pump.fun:** the `/coins?searchTerm=` endpoint is **broken**. It returns the default list regardless of the term (tested 05:17:41 UTC). The working endpoint is `https://frontend-api-v3.pump.fun/coins/search-v2?searchTerm=<term>&limit=50&offset=0&includeNsfw=false`. It is multichain: Solana (pump + StonkFun), BSC, Base, Ethereum and EVM4663 (probably Robinhood Chain).
- **CoinGecko:** `https://api.coingecko.com/api/v3/search?query=<term>`. Five queries got HTTP 429 even after an automatic retry. I re-ran them at 05:42:47–05:44:15, and all five eventually returned HTTP 200 ("town crier" needed two retries). The full `/coins/list` (21,541 coins) was pulled at 05:18.
- **CoinMarketCap:** `https://api.coinmarketcap.com/data-api/v3/map/all` paged to 38,713 entries (8,164 active, 30,186 untracked, 363 inactive), plus `/cryptocurrency/listing` for the top 5,000 with market caps, at 05:18–05:20. I checked exact tickers and name substrings locally.
- **X and Google:** via WebSearch (05:26–05:43). X is poorly indexed: a `site:x.com` query for $TRENCHCOAT, $HEARYE, $MEDEV, $BLOWNSAVE and $ROOTIE returned no X posts. **Treat X usage as unverified.**
- **Timing:** sleeps of 1.5s between calls (5s after CoinGecko). The full log with UTC timestamps and HTTP codes is in `vet/log.txt`, with 336 lines.

**Per-concept results for the 20 kept.** Times are the UTC Jupiter query times; the other three APIs followed within ~25s. mcap values are USD.

| # | Name searched (time) | Ticker searched (time) | What was found | Verdict |
|---|---|---|---|---|
| 1 | "trenchcoat" (05:21:37), "trench coat" (05:21:48) | TRENCHCOAT (05:37:48) | 18 name hits, all dead (≤ $3.4K liquidity, ~$0 volume): e.g. "Three memes in a trench coat / TrenchCoat" (Solana, created 07-18, ATH $10.3K); EVM4663 "Trenchcoat / TRENCHCOAT" ($3.2K, 09-09); "Trench coat / TRENCH" (195 holders, mcap $0, 08-13). The only liquidity above $5K is TON "3CATS in a Trench Coat" ($17K mcap, $6.9K liquidity, $3 24h volume, 2024), which is dead. None on CoinGecko or CMC. | Clear (dead same-name coins only) |
| 2 | "me and the dev" (05:23:22) | MEDEV (05:23:53) | Name hits are all "Me and the Devil" variants (2024–25, dead, ~$2.8K). Zero ticker hits anywhere. | Clear |
| 3 | "town crier" (05:22:30), "hear ye" (05:35:27) | HEARYE (05:23:01), CRIER (05:23:11) | Two dead 2025 "ye olde style town crier / YOSTC" coins ($2.8K). HEARYE has zero hits. CoinGecko: none (retry 05:44:15). CMC: none. **Non-token:** an X account "The Crypto Town Crier" (@CryptoTownCrier) — 1,463 followers, 118 posts, joined 2022-07 (fxtwitter, 05:27). | Clear; avoid the "Crypto Town Crier" wording |
| 4 | "blown save" (05:24:24) | BLOWNSAVE (05:37:37); BLOWN (05:24:35) | Zero hits for the name and for BLOWNSAVE. BLOWN: dead Solana coins plus a pump.fun-indexed Base "BASED CLOWN / BLOWN" at $782K (created 2024-06-29); DexScreener has no such pair (checked 05:26). | Clear with $BLOWNSAVE |
| 5 | "root intern" (05:27:45) | ROOTIE (05:27:55) | Name: zero. Ticker: dead "Rootie Tootie" (Solana 2025-12, $2.8K) and EVM4663 "RootieCoin" ($3.6K). | Clear |
| 6 | "burn log" (05:38:52); "token bonfire" (05:26:22) | BURNLOG (05:39:02); BONFIRE (05:26:32); TOKENFIRE (05:36:25) | Burn Log and BURNLOG: zero. "Token Bonfire": zero exact, **but** BONFIRE is a 2021 BSC coin (CoinGecko- and CMC-listed; DexScreener shows a $5.7–6.2M "mcap" with $62 volume) plus Robinhood-Chain "Five Hundred Logs / BONFIRE" ($10.4K liquidity). | Renamed to Burn Log / $BURNLOG |
| 7 | "artisanal slop" (05:28:58) | ARTISANAL (05:38:09); ARTISAN (05:29:09); HANDMADE (05:29:19); SLOPCRAFT (05:38:20) | Name: zero. ARTISANAL: dead "Artisan AI / ArtisanAl" (Solana and BSC, 09-17, ≤ $4K). ARTISAN: "artisan.cash" on EVM4663 ($59.5K, pump.fun index). HANDMADE: "handmade (no ai)" on EVM4663 ($22.7K index), BSC and Solana (09-03 to 09-16, dead). SLOPCRAFT: CoinGecko-listed "slopcraft". "Artisanal slop" was also an Aggro Crab post in Dec 2025. | Clear with $ARTISANAL; note the "Artisan" AI-startup association |
| 8 | "copy of a copy" (05:36:35) | COPYCOPY (05:37:06) | Six dead "Copy of a copy / COPY" coins (2025, $2.8K). COPYCOPY: zero. Related clone-joke coins: BSC "ctrl c+ctrl v" ×3 (09-23) and EVM4663 "Ctrl+V / CTRLV" ($20K index). | Clear |
| 9 | "undergrad" (05:38:30); "dropout" (05:31:14) | UNDERGRAD (same query) | UNDERGRAD: one dead 2025 coin ("GRADUATION / UNDERGRAD"). "Undergrad" name: BSC "True A CS undergrad / TACU" ($4.7K mcap, $10.4K liquidity, $15 volume, 09-23). "Dropout": 50+ dead matches, including "The College Dropout". | Clear (renamed from Dropout) |
| 10 | "six fingers" (05:30:33) | SIXFINGERS (05:30:43) | Six dead name hits, including a Solana "six fingers" whose ticker names a world leader (2026-03-13), which confirms the political deepfake association. SIXFINGERS: "Ariana's 6th Finger" (01-30, dead, $2.8K). | Clear (dead only); political-association risk |
| 11 | "hodlus maximus" (05:24:45) | HODLUS (05:24:56, 05:37:58) | Two dead 2025 coins ("HODLus Maximus / HODLUS" 2025-01-01, "Hodlus Solius / HODLUS" 2025-01-03, $2.8K). WebSearch (05:26) found "Kekius Maximus" and "Goatseus Maximus" on CMC, so I avoid "Maximus". | Clear; the idea was tried in 2025 and failed |
| 12 | "luxury ram" (05:33:21), "ram gold" (05:33:00) | LUXRAM (05:40:39); RAMGOLD (05:33:11); RAM (local) | Zero for LUXRAM and "luxury ram". **RAM is a ranked asset** (Ramses, CMC rank 1,446, ~$3.2M), so it is avoided. | Clear with $LUXRAM |
| 13 | "slopheim" (05:32:49) | SLOPHEIM (same query) | Zero hits in all indexes. A fresh pump.fun "Slop Records / SLOP" was trading at 05:23, and SLOP is CMC-listed at ~$51K, so avoid the bare "SLOP". | Clear |
| 14 | "do not press" (05:28:06) | DONTPRESS (05:28:17); REDBUTTON (05:28:48) | **42 "Do Not Press" coins in pump.fun search-v2 (mostly Solana, plus BSC and Base) between 08-19 and 09-22**, including 7 on 09-22. Two of those graduated and are now ~$1–2. The largest is "Do Not Press / DNP" ($12K, 1 holder, no trades at 05:46). REDBUTTON: zero. | No active collision, but heavy failed prior use, so weaker |
| 15 | "ur here" (05:31:45); "you are here" (05:21:58) | URHERE (05:31:57); HERE (05:22:09); YOUAREHERE (05:22:19) | URHERE: two dead coins (including "YOU ARE HERE / URHERE", 2026-03-16). "You Are Here": dozens of 1-holder Solana coins from 09-16 to 09-18 (about $4K each) plus EVM4663 copies ($61K index, unverified). HERE: BSC "HERE Token" ($446K index, 2024) and a stale Solana "here" (last trade 71 days ago). | Clear with $URHERE, but the idea is heavily tried |
| 16 | "third string" (05:33:32) | 3RDSTRING (05:40:50) | Zero. BACKUP was not used: a Solana "BACKUP" shows $69.8K on pump.fun but its last trade was 27 days ago. | Clear |
| 17 | "bond vigilante" (05:29:30) | BONDVIG (05:41:21); VIGILANTE (05:30:01) | Dead "Bond Vigilante / BV" (BSC 08-28) and "bond vigilantes" (Solana). VIGILANTE: "Citizen Vigilante" on Ethereum ($83.7K index, ATH $479K) and Base; the Solana VIGI (Hollywood-sign coin, 2025) is ~$6K. BONDVIG: zero. | Clear with $BONDVIG |
| 18 | "backhoe" (05:34:34) | BACKHOE (same query) | Three dead coins (e.g. "TD Bank Backhoe", 2024-12). | Clear (dead only) |
| 19 | "category zero" (05:34:24) | NOSTORM (05:41:11); CATZERO (05:41:00) | Zero for both. | Clear |
| 20 | "pile of shame" (05:41:53) | SHAMEPILE (05:42:25) | Zero. | Clear |

**Collisions that killed or changed rejected concepts.**
- **looong** (05:25:07): Solana "looong" ($22.9K mcap, $9.9K–20.6K liquidity, 3,657 holders, created 07-23). Also "LOOOO…/LOOONG" (met-dbc, 09-19, $5.7K liquidity), Robinhood Chain "Looongcat" / "Looong Inu" ($166K index, 09-22) and 30+ other LOOONG variants.
- **remember november / NOVEMBER** (05:25:18–05:25:49): NOV2026 ($12.4K, 112 holders, graduated, ATH $43.8K). A "November Bear / NOVBEAR" storm on 09-22/23. `$NOVEMBER` (VeikcmTL…pump) with a site that promises a "prophecy" for November 1.
- **check the snails / SNAILS** (05:32:08): 8+ same-name coins on 09-23. The largest is $6.7K with 17 holders.
- **flinch / FLINCH** (05:39:13): 20+ coins, 09-17 to 09-24, including real-person ones.
- **night shift / NIGHTSHIFT / shift**: "Night Shift ($SHIFT)" for "late-night traders". Also NIGHTSHIFT/NIGHT on eip155:5042 ($25.9K index) and a Solana "Shift / SHIFT" ($130.8K mcap, $12.7K liquidity).
- **sidelined** (05:34:13): Solana "Sidelined" (WjZoPoUs…, $30K mcap, $17.7K liquidity, ATH $985K), Robinhood "SIDELINED CAT" ($309K index) and Base "Sidelined" ($230K index).
- **gold farmer** (05:30:11): **active** Solana/StonkFun "Venezuelan Gold Farmers / VENNYS" ($22.3K at 05:30 and $23.1K at 05:46; $94.9K 24h volume; created 09-23).
- **dry powder / POWDER** (05:39:54–05:40:07): Ethereum "powder" ($73K mcap, $25.5K liquidity, $137K 24h volume, created 09-23).
- **right click save** (05:35:16): Robinhood "Right-click → Save / RCS" (ATH $1.14M index, 08-29) and Solana "Right Click Save As Guy / RCSAG" ($8.1K mcap, $11.6K liquidity).

**Tickers checked against major assets** (CMC and CoinGecko lists), all avoided:
  - ORBS: Orbs, CMC rank 537, ~$31.9M.
  - SAVE: Save, ex-Solend, rank 1,011, ~$9.0M.
  - RAM: Ramses, rank 1,446.
  - WHY: rank 2,008, ~$0.9M.
  - ROOT: The Root Network, rank 2,069.
  - LONG: rank 2,783.
  - SLOP: rank 3,329.
  - SHIFT: CoinGecko "Shift AI"; CMC untracked. None of the 20 final tickers matches a CMC-active or CoinGecko-listed coin.

### Inferences
- MARKET INTERPRETATION: The trenches mint a coin for almost every catchy phrase within days: 42 attempts at "Do Not Press", dozens at "You Are Here", 20+ at "Flinch". A dead same-name coin is therefore the norm, not a red flag. The real signals are (a) an **active** same-name coin and (b) **many failed attempts**, which suggest the phrase alone does not hold attention.
- MARKET INTERPRETATION: pump.fun's multichain search shows the same idea often lands on Robinhood Chain first, which is consistent with Robinhood Chain's ~17% share of 30-day DEX volume [MKT]. A "clear on Solana" result does not mean clear on X, where a Robinhood-chain coin with the same ticker can hijack the cashtag.

### Gaps
- These results are a snapshot from 05:21–05:45 UTC on 09-24. **Re-run every check immediately before launch**; clone storms form within hours.
- DexScreener and Jupiter search cap their results (30 and 20). Very common words may hide matches past the cap.
- X cashtag usage could not be verified: X search is unavailable and web search indexes X poorly. Google and CMC WebSearch found no coins for the kept names apart from those listed.
- pump.fun EVM `usd_market_cap` values are unverified index numbers.

## Q4. Momentum re-check: are the trends behind the concepts still moving? (timestamped before/after)

### Takeaway
I re-read everything three times: RC1 at about 05:22, RC2 at about 05:45 and RC3 at about 06:04 UTC. Together with the earlier notes' readings (04:48–05:04), that gives a 75–80 minute view.

**Still spreading:**
- pump.fun's "what stage of the market is this" (~11.4K views/h at 5–7 hours old).
- The CFTC "agentic finance" post (~11.9K/h).
- frank's deepfake reply (~7.3K/h).
- The newest Chile TikTok (~17–20K plays/h).
- The ~2-holder base rate, which re-measured identically.

**Flat or saturated:**
- the "put on the suit" post;
- the Threadguy "town market" clip;
- the Rasmr "aura" clip;
- "sidelined";
- "pendulum";
- the fly-brain post;
- the Remember November origin.

**On-chain:**
- "suit" spiked, then reversed: $0.99M → $1.10M → $0.93M.
- STONK is flat at ~$294M.
- AI-agent tokens are mixed: NPCs and familiars are down, while funkos is volatile at $160K → $600K → $403K.
- Every rejected culture token is untraded: SNAILS, NOV2026, looong, DNP.

**Stage labels** in Q5 and Q6 follow this velocity data, not a single snapshot.

### Cited Findings

**X posts** (fxtwitter `api.fxtwitter.com/{user}/status/{id}`; views; the "earlier note" column comes from [CT]/[CULT]; views/h is computed RC1→RC3 over ~42 minutes). Raw files: `vet/mom/fx_RC*_*.json`.

| Post (→ concept) | Earlier note (time UTC) | RC1 (05:22:19–05:22:52) | RC2 (05:45:04–05:45:37) | RC3 (06:04:03–06:04:39) | Views/h RC1→RC3 | Read |
|---|---|---|---|---|---|---|
| [pump.fun "what stage of the market is this" → Ur Here](https://x.com/Pumpfun/status/2102899435923521820) | 127,520 (04:50:48, [CT]) | 133,197 | 137,522 | 141,093 | 11,352 | still spreading (>5K/h) |
| [Kook "feels like crypto will never go down again"](https://x.com/KookCapitalLLC/status/2102742937595412790) | n/a  | 15,910 | 15,933 | 15,956 | 66 | flat (<0.8K/h) |
| [Ansem "the pendulum swings"](https://x.com/blknoiz06/status/2102432991859384627) | 134K (~04:50, [CT]) | 134,302 | 134,415 | 134,496 | 279 | flat (<0.8K/h) |
| [Ansem "coins are up… NFTs are back"](https://x.com/blknoiz06/status/2102738286632722812) | 189K (~04:50, [CT]) | 190,245 | 191,207 | 192,041 | 2,582 | slow tail (0.8–5K/h) |
| [pump.fun "yes, Dave… still sidelined"](https://x.com/Pumpfun/status/2102465315070513422) | 71.5K (~04:50, [CT]) | 71,641 | 71,701 | 71,747 | 152 | flat (<0.8K/h) |
| [frank "need to get rid of bear market ptsd"](https://x.com/frankdegods/status/2102555180697039230) | 151K (~04:50, [CT]) | 151,752 | 152,056 | 152,286 | 768 | flat (<0.8K/h) |
| [Threadguy "town market" clip → Town Crier](https://x.com/Web3luveer/status/2102869711599870348) | n/a  | 1,886 | 1,894 | 1,908 | 32 | flat (<0.8K/h) |
| [a1lon9 callout rewards → Town Crier](https://x.com/a1lon9/status/2102502673404608732) | 210.8K (~04:50, [CT]) | 211,279 | 211,539 | 211,805 | 756 | flat (<0.8K/h) |
| [Kirodev7 "put on the suit" → Trenchcoat](https://x.com/Kirodev7/status/2102185401192423697) | n/a  | 6,490 | 6,491 | 6,495 | 7 | flat (<0.8K/h) |
| [Raydium "Stonk Market 24/7/365" → Trenchcoat](https://x.com/Raydium/status/2102926978651165048) | 13,501 (04:50, [CT]) | 14,037 | 14,466 | 14,933 | 1,288 | slow tail (0.8–5K/h) |
| [vibhu "wow" (quotes Solana>NYSE)](https://x.com/vibhu/status/2102066583212355699) | n/a (quoted post 111.7K)  | 47,494 | 47,536 | 47,562 | 98 | flat (<0.8K/h) |
| [frank "if you think these are real" → Six Fingers](https://x.com/frankdegods/status/2102783546008252477) | 188,515 (04:50:48, [CT]) | 192,291 | 195,190 | 197,380 | 7,316 | still spreading (>5K/h) |
| [frank "more deepfakes promoting scams"](https://x.com/frankdegods/status/2102732673466904719) | 48K (~04:50, [CT]) | 48,364 | 48,561 | 48,728 | 523 | flat (<0.8K/h) |
| ["AI frank slop" → Artisanal Slop](https://x.com/TriippyTrades/status/2102815753774776362) | n/a  | 4,366 | 4,559 | 4,723 | 513 | flat (<0.8K/h) |
| [Rasmr "for the aura" clip → Blown Save](https://x.com/discordiaCLIPS/status/2102503201010589835) | n/a  | 13,216 | 13,234 | 13,259 | 62 | flat (<0.8K/h) |
| [CFTC "agentic finance" → Root Intern](https://x.com/WatcherGuru/status/2102825769739403386) | 434K (~04:50, [CT]) | 441,452 | 446,309 | 449,739 | 11,914 | still spreading (>5K/h) |
| [familiars ATH post](https://x.com/familiarsfamily/status/2102937715041866049) | 9,830 (04:50, [CT]) | 10,272 | 10,460 | 10,608 | 483 | flat (<0.8K/h) |
| [fly brain "$100 to trade bitcoin"](https://x.com/nftechie_/status/2098012107652391357) | 4,139,775 (04:56, [CULT]) | 4,139,812 | 4,139,842 | 4,139,876 | 92 | flat (<0.8K/h) |
| [NatGeo tilcayo](https://x.com/NatGeo/status/2100601922168209413) | 72,625,017 (05:01, [CULT]) | 72,626,713 | 72,628,603 | 72,630,030 | 4,769 | slow tail (0.8–5K/h) |
| ["$1600 burrito"](https://x.com/ThorTorrens/status/2102552368026153171) | 678,499 (04:50:48, [CT]) | 679,402 | 679,887 | 680,266 | 1,242 | slow tail (0.8–5K/h) |
| [Nasdaq 23/5](https://x.com/Nasdaq/status/2102853965213732993) | 10K (~04:50, [CT]) | 10,317 | 10,453 | 10,562 | 352 | flat (<0.8K/h) |
| [Kook "pico-top of tax token meta"](https://x.com/KookCapitalLLC/status/2102858532207177933) | 18.5K (~04:50, [CT]) | 18,683 | 18,813 | 18,903 | 316 | flat (<0.8K/h) |

**TikTok** (public page `playCount`; the site rounds to 0.1K or 0.1M; times UTC):

| Video (→ concept) | [CULT] earlier | RC1 05:23 | RC2 05:45 | RC3 06:04 | Rate | Read |
|---|---|---|---|---|---|---|
| [Chile @aycdedits (posted Sep 23)](https://www.tiktok.com/@aycdedits/video/7688642880805604629) → rejected Looong | 553.7K (04:55), 555.5K (05:00) | 563.0K | 570.6K | 576.1K | ~20K/h (05:23–05:45), then ~17K/h (05:45–06:04) | still circulating, slightly slowing |
| [Snails @panamabollar](https://www.tiktok.com/@panamabollar/video/7686590640699870496) → rejected | 742.3K (04:56), 742.5K (05:00) | 743.8K | 745.1K | 746.1K | ~3.2–3.5K/h | slow tail |
| [Remember November @bigbakdiskk28](https://www.tiktok.com/@bigbakdiskk28/video/7679289039039647007) → rejected | 1.6M, likes 181.3K (04:55) | 1.6M, likes 180.3K | 1.6M, likes 181.3K | 1.6M, likes 180.3K | flat (likes fluctuate within rounding) | plateau |

**Solana tokens** (Jupiter `tokens/v2/search` by mint and the Jupiter 1h lists; mcap in USD).

| Token (→ concept) | Earlier notes | 05:23 | 05:46 | 06:04 | Read |
|---|---|---|---|---|---|
| suit, StonkFun (→ Trenchcoat mood) | ~$0.94M (~04:48, [CT]) | $0.99M | $1.10M (+22% 1h, 2,681 holders) | **$0.93M** (+0.7% 1h, 2,686 holders) | spike and reversal; volatile, not trending |
| STONK (→ Trenchcoat) | $294.9M (04:46, [CT]) | — | $293.2M | $294.5M | flat |
| Grokification, SpaceX pair | $5.51M → $5.79M (T1→T2, [SOL]) | $6.63M | $5.86M | $6.29M | choppy |
| RuneScape Gold (GP) | $26.2–27.3M [SOL] | $27.66M | $27.08M | $26.59M | slowly fading |
| Super Intelligence (SI, excluded) | $104K → $342K (T1→T2, [SOL]) | $384K | $343K | $335K | peaked ~05:23 |
| NPCs (→ Root Intern context) | $556K → $441K [SOL] | $340K | $279K | $309K | fading, choppy |
| familiars (→ Root Intern context) | $2.07M → $1.88M [SOL] | $1.61M | $1.62M | $1.54M | fading |
| funkos ("pump.fun, but for AI agents") | ATH $108K → $52–63K (T2, [SOL]) | $160K | $600K | $403K (2,988 traders/1h) | volatile spike; AI-agent launchpad clones still attract flow |
| Chile Memes (→ rejected Looong) | $82.1K → $85.3K (04:50→05:00, [CULT]) | — | $70.8K | $68.6K | declining while the off-chain meme still spreads |
| SNAILS / NOV2026 / looong / DNP (rejected) | $7.5K / $12.4K / $22.9K / — | — | $6.7K / $12.4K / $22.9K / $12.0K | unchanged, $0–380 1h volume | dead |
| VENNYS "Venezuelan Gold Farmers" (→ rejected Gold Farmer) | — | $22.3K (05:30) | $23.1K | $22.1K | small but active |

**pump.fun cohort** (→ Me And The Dev, Undergrad). The 100 newest non-NSFW launches were created 05:20:58–05:27:36 UTC and read via Jupiter search in batches of 20 mints.

| Read (UTC) | Age | Median holders | ≤2 holders | ≥10 holders | ≥50 holders | Median traders (24h stats) | ≥100 traders | Median mcap | > $10K | > $50K |
|---|---|---|---|---|---|---|---|---|---|---|
| RC2 05:46:37 | 19–26 min | **2** | 66% | 10% | 4% | 4 | 7% | $3,230 | 5% | 3% |
| RC3 06:04:54 | 37–44 min | **2** | 68% | 11% | 2% | 4 | 7% | $3,230 | 3% | 2% |
| [SOL] reference (03:09–03:34 cohort, read 04:49) | 75–100 min | 2 | — | ≥10 traders: 37% | — | 6 | 8% | — | 2% | — |

**New leaders at 06:04** (Jupiter 1h top-traded, new tokens):
- funkos $403K
- Super Intelligence $332K
- Brood $102K ("broodsolana.fun")
- Paid $9.49M
- GP $25.67M
- GETTR $1.53B (still a fake-scale "mcap")
- Shartcoin $2.18M
- familiars $1.55M
- Baryx $46K
- NPCs $309K

None touches a finalist's name or theme. A keyword scan of the 05:23 and 05:46 lists for all 20 finalists' keywords found only "Slop Records / SLOP" (05:23, gone by 05:46). — [Jupiter toptraded/1h](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100)

**Stage labels after the re-check** (used in Q5):
- **Trenchcoat: DEVELOPING.** The stonk mood is intact (Raydium post still +1.3K/h; STONK flat), but "suit" reversed. The mood is volatile, not accelerating.
- **Me And The Dev and Undergrad: EARLY.** The base rate is stable across cohorts.
- **Town Crier: EARLY.** Its source posts are flat, so this is a structural theme, not a spiking one.
- **Blown Save: EARLY.** No meme uptake yet; the catalyst window opens Sep 29.
- **Root Intern: DEVELOPING.** The agentic-finance post is still at ~11.9K/h.
- **Six Fingers: DEVELOPING.** The deepfake reply is still at ~7.3K/h.
- **Ur Here:** the question is DEVELOPING (~11.4K/h), but the token idea is SATURATED by prior attempts.
- **Rejected culture memes:** Chile is DEVELOPING off-chain and SATURATED on-chain; Snails, Remember November and fly-brain are ALREADY HOT-SATURATED or plateaued.

### Inferences
- MARKET INTERPRETATION: The posts still growing at 5–12K views/h (the engagement-bait question, CFTC agentic finance, the deepfake denial) are **platform-level or news-level accounts** with large followings. The phrase-level sources I built concepts on ("town market", "put on the suit", "aura") are flat. The concepts therefore rest on **durable behaviours**, not on phrases that are going viral right now. That is good for longevity and bad for "ride the wave" timing.
- MARKET INTERPRETATION: On-chain, the only things moving fast are fresh AI-agent launchpad clones (funkos, Brood) and a Trump-derived news coin (SI). Both are excluded or crowded. The meme market is choppy after the 09-23 sell-off, which matches [MKT]'s "nervous momentum" read.
- MARKET INTERPRETATION: Suspected artificial amplification is still present. GETTR shows a $1.5B "mcap" on about $154K of liquidity in the top-traded list. The notes' flags (paid boosts, micro-account source tweets, bot callouts) were not re-tested and should be assumed still active.

### Gaps
- The window is ~75–80 minutes in total and ~42 minutes for my three passes. Day-scale velocity is unknown.
- TikTok counts are rounded, so small changes (Remember November likes) are within rounding noise.
- No X search: I could not measure how many *new* posts use a phrase, only views on known posts.
- The Wikimedia pageview check for "Blown save" worked. A second article request (the Nationals' season page) returned HTTP 429 and was not retried.
- **The reader looks tomorrow.** "suit" moved ±15% within 20 minutes, and funkos 1.5–3.7× within an hour. Every number here will have changed. Re-run the same scripts before acting.

## Q5. The final 20 surviving concepts, strongest first, with all required fields

### Takeaway
- **Concepts 1–13 pass** the meme test, the content lines and the collision checks. Concepts 1–4 are the strongest: they turn trenches behaviour everyone has lived through into instantly readable characters.
- **Concepts 14–20 are "weaker — included to reach 20".** Each has its specific weakness stated.
- Across all 20:
  - **Evidence** fields are FACT with sources and UTC times.
  - **Why it could spread**, **Launch angle**, **Risks** and **Stage** are MARKET INTERPRETATION.
  - Anything from posters is labelled SOCIAL-MEDIA SPECULATION.
- **Nothing here predicts success.**

### Cited Findings

#### 1. Trenchcoat
- **Name:** Trenchcoat
- **Ticker:** $TRENCHCOAT
- **Core concept:** Three small, mud-splattered trench degens stacked inside one long trench coat, trying very hard to pass as a serious Wall Street investor now that "memes merged with the stock market". It is the "three kids in a trenchcoat" trope applied to a week in which the trenches both flex (Solana out-traded the NYSE) and fake scale (fake $9B "funds").
- **Why this could spread:**
  - *Instant recognition.* The trope is a known internet format: Imgflip hosts "three kids in a trench coat" meme tags and generators.
  - *In-group flattery with self-mockery.* "We're infiltrating Wall Street" and "we're obviously not adults."
  - *Easy remix.* Put anything three-high in a coat.
  - *It maps onto a real mood.* CT is joking that trenchers must "put on the suit".
- **Current trend connection:**
  - the "Stonk market / put on the suit" meta (B1);
  - StonkFun and pump.fun stock-paired launches (C1);
  - SEC Innovation Exemption headlines [MKT];
  - fake-scale tokens (C4).
- **Evidence:**
  - FACT: Kirodev7 (posted 09-21 23:57 UTC) wrote: "We've somehow merged with the stock market and are no longer just regular trenchers anymore. It's time to put on the suit 👔". It had 6,490 views at 05:22, 6,491 at 05:45 and 6,495 at 06:04 UTC, so the post itself is flat. — [x.com/Kirodev7](https://x.com/Kirodev7/status/2102185401192423697)
  - FACT: The same mood as a token is **live but volatile**. The StonkFun "suit" coin went ~$0.94M ([CT], read ~04:46–04:50) → $0.99M (05:23) → $1.10M (05:46; +22% 1h; 2,681 holders) → **$0.93M (06:04; 2,686 holders)**: a spike and a full reversal within about 40 minutes. — [Jupiter search](https://lite-api.jup.ag/tokens/v2/search?query=AVXPQqxd32ABAP5F7shHKNeWBpos9miktdH3uKqgXYJZ)
  - FACT: Raydium's "The Solana Stonk Market is open 24/7/365" went 13,446 views (04:48, [CT]) → 14,037 (05:22) → 14,466 (05:45) → 14,933 (06:04), about 1.3K/h, a slow steady tail.
  - FACT: STONK was flat at $293–295M from 04:46 to 06:04 (Jupiter). — [x.com/Raydium](https://x.com/Raydium/status/2102926978651165048)
  - FACT: "Solana: 208 million trades / NYSE: 189 million trades" had 111,782 views at 05:22. — [x.com/vibhu](https://x.com/vibhu/status/2102066583212355699)
  - FACT: At 05:23, GETTR Token sat at #2 on Jupiter's 1h top-traded list with a $1.80B "mcap" on $153.9K of liquidity. The pump.fun fund/reserve cluster showed $9.0–9.3B of "mcap" [SOL]. Both illustrate fake scale. — [Jupiter toptraded/1h](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100)
  - FACT: The trope already exists as a template. — [Imgflip tag](https://imgflip.com/tag/three+kids+in+a+trench+coat); [Imgflip generator](https://imgflip.com/memegenerator/328116719/Two-kids-in-a-trenchcoat)
- **Target audience:** Solana trench traders now trading stock-paired memes; StonkFun and xStocks users; CT at large. The trope also crosses over to normies.
- **Visual identity:** A tall khaki trench coat with three pairs of big nervous eyes peeking out (collar, gap between buttons, hem). The top critter wears a fedora and a crooked fake moustache. The logo is the coat silhouette with three eye-pairs.
- **Meme potential** (from the meme test):
  1. *Simple image:* the coat, captioned "totally a normal institutional investor".
  2. *Reaction:* buttons popping open to reveal three panicking critters, captioned "when they ask for KYC".
  3. *Inside joke:* "coat check": the coat gets taller as holders join ("we're 4 in the coat now").
  4. *Reply-guy:* reply to every "institutions are buying" post with the coat, captioned "yes. institutions. 🧥".
  5. *Short video:* three people under one long coat waddling into a bank lobby, captioned "the trenches arriving at 24/7 stock trading".
- **X potential:** "institutional grade 🧥" · "coat check" · "we put on the coat" · "three degens, one terminal" · "trust me I'm an adult".
- **Community identity:** "The Coat". Each holder is "one more in the coat"; lore says the coat keeps getting longer.
- **Launch angle (no deceptive claims):**
  - Launch on pump.fun to reach the trench audience directly.
  - Optionally, pair with a tokenized S&P 500 token on StonkFun or pump.fun Custom Pairs so "three degens pretending to be the S&P 500" is literal. This is purely aesthetic. Disclose the pair and any transfer fee, renounce tax-rate authority (Bitquery found 2,178 LaunchLab coins with mutable taxes up to 100% [MKT]), and never imply institutional backing.
  - Seed a 20-image meme pack. No bundled buys, no undisclosed paid posts.
- **Differentiation:**
  - Not "suit" (a single-object mood token at $0.93–1.10M between 05:46 and 06:04): this is a trio character with a visual gag and a pun on "trench".
  - Not a cat or stock parody.
  - It satirises fake size rather than using fund/reserve names.
- **Risks/weaknesses:**
  - "suit" already owns the mood.
  - Stonk slang is launchpad-led and could fade with StonkFun volumes [CT].
  - "Institutional" jokes could be misread as claims.
  - The source trope is "kids", so **do not depict children**.
  - Dead same-name micro-coins exist.
  - Stock pairing adds equity-gap and tax risk [MKT].
- **Trend lifespan:** Medium-term. The trope is evergreen; the stonk hook lasts weeks.
- **Trend stage:** **DEVELOPING.** The underlying stonk/suit mood is live but volatile, not accelerating: "suit" went ~$0.94M → $1.10M → $0.93M between ~04:48 and 06:04; STONK is flat; the Raydium post is a steady ~1.3K/h tail. The trenchcoat angle has only dead micro-coins.
- **Collision check result:** Checked 05:21–05:37 UTC. No active matches; 18 dead same-name coins (details in Q3 #1). Not on CoinGecko or CMC. Clear.
- **Art brief:** An original cartoon mascot logo.
  - *Subject and pose:* a tall beige trench coat standing upright, collar popped. Three small, round, mud-splattered bean-shaped creatures are stacked inside; only their three pairs of big nervous eyes show (between the collar, the middle buttons and the hem). The top creature wears an oversized grey fedora and a crooked black fake moustache and clutches a tiny briefcase leaking a strip of green ticker tape.
  - *Composition and style:* front-facing, full-body, centred, filling ~80% of a square. Bold thick outlines, flat colours with light grain, sticker style readable at 48px.
  - *Palette and background:* khaki, mud brown and deep navy, with one neon-green accent; plain off-white circular background.
  - *Exclusions:* no real people, no children, no brand, exchange or company logos, no real stock tickers, no copyrighted characters, no text.

#### 2. Me And The Dev
- **Name:** Me And The Dev
- **Ticker:** $MEDEV
- **Core concept:** The most honest coin in the trenches. Two figures on a park bench at sunset watching a flat chart, the holder and the dev, because the typical pump.fun coin ends up with about two holders. It celebrates the ride-or-die bond instead of hiding the base rate.
- **Why this could spread:**
  - Painful relatability plus catharsis: every trencher has been one of the last two holders.
  - It inverts the dev-as-villain trope into friendship, a small wholesome twist in a cynical feed.
  - The number is shocking but true, so it is shareable as "lol, accurate".
- **Current trend connection:** The launch base rates (C2): ~1,000 launches/h, median of 2 holders, and 95% dead within ~1.5h. Also clone storms (C3).
- **Evidence:**
  - FACT: 120 random pump.fun coins re-checked at ~75–100 minutes old had a **median current holder count of 2**, a median of 6 traders, and 95% had stopped trading. The median time from creation to last trade was 6.7 minutes. [SOL] — [pump.fun](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)
  - FACT (my replication): 100 newest non-NSFW pump.fun coins created 05:20:58–05:27:36 UTC, read via Jupiter at 05:46:37 (19–26 minutes old):
    - median holders **2**; 66% had ≤2 holders; 10% had ≥10;
    - median traders 4;
    - median mcap $3,230; 5% above $10K.
    - Re-read at 06:04:54 (37–44 minutes old): median holders still **2**; 68% had ≤2 holders; 11% had ≥10; median mcap $3,230; 3% above $10K (Q4).
    - Source: the Jupiter `tokens/v2/search` endpoint queried with the 100 mints in batches of 20 (raw: `vet/mom/cohort.json`, `cohort_RC2.json`). The cohort was taken from the [pump.fun created list](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false) at 05:27:43.
- **Target audience:** pump.fun degens and devs; CT trench culture.
- **Visual identity:** From behind: two small figures on a park bench before a huge sunset whose horizon is a flat chart line. One wears a hoodie with a tiny wrench patch (the dev), the other a cap (the holder). The logo is the bench silhouette with a small "2".
- **Meme potential:**
  1. *Simple image:* bench silhouette with "holders: 2", captioned "it's just me and the dev now".
  2. *Reaction:* the two high-fiving, captioned "$4K market cap. we're so back".
  3. *Inside joke:* "holder #3" as the mythical third holder; members claim holder numbers; the community space is called "the Bench".
  4. *Reply-guy:* "me and the dev 🪑" under any "who's still here?" post.
  5. *Short video:* two people on a bench say "gm… gm", then the camera pulls back to an empty stadium, captioned "day 400".
- **X potential:** "it's just me and the dev" · "the bench is open" · "holder #3 when" · "ride or die (mostly die)".
- **Community identity:** "The Bench": ironic loyalists; CTO-friendly.
- **Launch angle (no deceptive claims):**
  - Launch on pump.fun, where the joke is native.
  - The dev publicly "sits on the bench": discloses the dev wallet and holdings, and never uses bundled wallets. Faking holder counts would betray the joke.
  - Make no claims beyond the joke.
- **Differentiation:** A base-rate satire rather than an animal or phrase about price. Not dev-hate: dev and holder are friends. No token of this name exists.
- **Risks/weaknesses:**
  - The joke can come literally true.
  - Any dev sale destroys the premise.
  - "Dev" jokes invite rug suspicion.
  - It is an in-joke that normies won't get.
  - Phrase-style coins fade [SOL §6].
- **Trend lifespan:** Potentially evergreen. The base rate is structural.
- **Trend stage:** **EARLY.** No token exists; the observation is stable, not a spike (replicated in two independent cohorts 2 hours apart).
- **Collision check result:** Checked 05:23 UTC. The name matches only dead "Me and the Devil" coins (2024–25); $MEDEV has zero hits in Jupiter, DexScreener, pump.fun, CoinGecko and CMC. Clear.
- **Art brief:** An original flat-vector illustration.
  - *Subject and pose:* two small cartoon figures seen from behind on a wooden park bench. Left: a hoodie with a small wrench patch. Right: a backwards cap. They lean toward each other companionably.
  - *Composition:* the bench sits in the lower third; the horizon is a long, perfectly flat line like a stalled price chart, under a huge warm sunset; a single leaf drifts.
  - *Style:* soft gradients, minimal detail, wistful but funny, readable as a round icon.
  - *Palette:* sunset orange, dusty pink and deep purple, with dark silhouettes; a small white "2" in the sky like a star.
  - *Exclusions:* no real people or faces, no logos or platform branding, no text beyond the "2", no copyrighted characters.

#### 3. Town Crier
- **Name:** Town Crier
- **Ticker:** $HEARYE
- **Core concept:** A medieval town crier ringing his bell in the "town market" that X has become, proclaiming every CA, pump, rumour and callout in Ye Olde English. The mascot of the paid-shill economy, which laughs at it rather than denying it.
- **Why this could spread:**
  - Shared annoyance: the timeline is full of shills.
  - Self-aware shillers can adopt the costume.
  - Archaic language applied to CT slang is funny on its own ("Hear ye! A new cat variant hath dropped").
  - "HEAR YE" is a ready-made reply-guy format.
  - Imgflip already hosts "Town Crier" and "hear ye" templates, so the format is familiar.
- **Current trend connection:** "The town square is now the town market" (B3); pump.fun callout rewards; reply-farm posts; NPC bots that auto-call coins [CT].
- **Evidence:**
  - FACT: a1lon9's list including "callout rewards ($11M paid out in under 6 weeks)" went 210.8K views ([CT], 04:5x) → 211,279 (05:22) → 211,539 (05:45) → 211,805 (06:04), a slow tail of ~0.8K/h. — [x.com/a1lon9](https://x.com/a1lon9/status/2102502673404608732)
  - FACT: pump.fun: "$10,000,000 has been awarded to callers". — [x.com/Pumpfun](https://x.com/Pumpfun/status/2100650038732984603)
  - FACT: Threadguy clip "The town square is now the town market. The vast majority of posts on my feed are shilling coins": 1,886 (05:22) → 1,894 (05:45) → 1,908 (06:04), low reach and flat. — [x.com/Web3luveer](https://x.com/Web3luveer/status/2102869711599870348)
  - FACT: The theunipcs "ultra low cap gem" ask had 639,604 views with 4,787 replies against 3,807 likes, a reply-farm structure [CT]. — [x.com/theunipcs](https://x.com/theunipcs/status/2102709789738311702)
  - FACT: Existing templates. — [Imgflip Town Crier](https://imgflip.com/memegenerator/31888635/Town-Crier); [Imgflip hear ye](https://imgflip.com/memetemplate/380867369/hear-ye)
- **Target audience:** CT callers, KOLs and reply guys, and everyone tired of them.
- **Visual identity:** An original crier in a tricorn hat and a red-and-gold coat, mouth wide open mid-"HEAR YE", swinging a big brass handbell and unrolling a scroll that trails off-frame.
- **Meme potential:**
  1. *Simple image:* the crier reading from the scroll, "HEAR YE: THE DEV HATH NOT SOLD".
  2. *Reaction:* frantic bell-ringing, captioned "me when my 3-figure-mcap coin does a 2x".
  3. *Inside joke:* daily "Proclamations" of CT news in Olde English; guild ranks run from Apprentice Crier to Royal Crier.
  4. *Reply-guy:* "HEAR YE 🔔" under every "FOUND…" or "THIS IS INSANE" post.
  5. *Short video:* someone in a cheap costume ringing a bell on a city street, reading crypto posts aloud: "Hear ye, a stonk is up twelve percent upon a red day".
- **X potential:** "HEAR YE" · "ye olde alpha" · "by order of the timeline" · "the crier hath spoken" · "paid proclamation 🔔".
- **Community identity:** "The Guild of Criers".
- **Launch angle (no deceptive claims):**
  - Launch on pump.fun with the ticker HEARYE.
  - Brand rule: **every paid proclamation is labelled** ("HEAR YE — this proclamation was paid"), which turns disclosure into part of the bit.
  - No KOL impersonation; do not use the wording "Crypto Town Crier".
- **Differentiation:** It satirises the shill economy instead of being one more shill. Not an animal; its voice (Olde English) is distinctive; it is tied to no KOL.
- **Risks/weaknesses:**
  - The meta-satire can read as "just another shill coin".
  - Callout-reward farmers may dominate engagement.
  - A small X account, "The Crypto Town Crier" (1,463 followers), could cause confusion.
  - The archaic voice may grow tiresome.
  - The originating clip has low reach (1.9K views).
- **Trend lifespan:** Medium-term to potentially evergreen. Shill culture persists.
- **Trend stage:** **EARLY** for the concept (no token). The underlying shill-reward discourse is DEVELOPING but its source posts are flat: a1lon9's post runs at ~0.8K views/h RC1→RC3, and the Threadguy clip at ~0.03K/h.
- **Collision check result:** Checked 05:22–05:35 and retried on CoinGecko at 05:44. Two dead 2025 "ye olde style town crier" coins; $HEARYE has zero hits anywhere. Clear.
- **Art brief:** An original cartoon mascot.
  - *Subject and pose:* a portly medieval town crier in a black tricorn hat with a white feather, a red coat with gold trim and white stockings, mouth wide open mid-shout. He swings a large brass handbell in his right hand and holds a long parchment scroll in his left that unrolls toward the viewer, covered in illegible squiggles.
  - *Composition:* three-quarter view, waist-up, centred, with motion lines around the bell.
  - *Style:* bold storybook woodcut outlines with flat colours, like a stamped tavern sign.
  - *Palette:* crimson, gold, parchment cream and ink black.
  - *Background:* a simple circular cobblestone-grey backdrop.
  - *Exclusions:* no real people, no platform or exchange logos, no readable text or tickers on the scroll, no copyrighted characters.

#### 4. Blown Save
- **Name:** Blown Save
- **Ticker:** $BLOWNSAVE
- **Core concept:** A weary relief pitcher walking off the mound after giving the lead back: the patron saint of round-tripping. When your 10x becomes a 1x, you "blew the save".
- **Why this could spread:**
  - It turns shared pain into humour.
  - The sports term maps one-to-one onto a universal crypto feeling.
  - The timing fits: the MLB postseason starts Sep 29.
  - It is instantly clear to sports fans and gives traders a new word for round-trips.
- **Current trend connection:** Washington's record 38 blown saves (D7); the postseason from Sep 29 to Oct 23; round-trip stories on CT (B5); the meme sector giving back part of a strong week (D6).
- **Evidence:**
  - FACT: "Nationals set record with 38th blown save in loss to Padres" (Sep 9; the previous record was 37, the 2024 White Sox). — [MLB.com](https://www.mlb.com/news/nationals-set-record-with-38th-blown-save-in-loss-to-padres); [CBS Sports](https://www.cbssports.com/mlb/news/nationals-mlb-record-blown-save/); [Yahoo Sports](https://sports.yahoo.com/articles/blown-save-record-black-mark-141500734.html)
  - FACT: The Wild Card starts Tue Sep 29 and the World Series Fri Oct 23. — [Yahoo Sports](https://sports.yahoo.com/articles/2026-mlb-playoffs-clinch-scenarios-164034857.html) [CAL]
  - SOCIAL-MEDIA SPECULATION (the PnL claim is unverified): "Rasmr was up $1M in less than an hour… but didn't sell because he was 'doing it for the aura'". The post went 13,216 (05:22) → 13,234 (05:45) → 13,259 (06:04) views, so it is flat. — [x.com/discordiaCLIPS](https://x.com/discordiaCLIPS/status/2102503201010589835)
  - FACT: On-chain round-trips are the norm. NPCs fell 49% in 1h at 05:46 (Jupiter); Mr Least and MrPedo lost ~90% within 40–60 minutes [SOL]; the Meme category was −8.9% over 24h after a +20–37% week [MKT].
  - FACT (a weak signal against): the English Wikipedia article "Blown save" drew 0–8 views a day from Aug 25 to Sep 23, including 5 on Sep 9, the record day (read 05:54 UTC). The title may be a redirect, so treat this only as a sign that general search interest in the term is thin. — [Wikimedia pageviews](https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Blown_save/daily/20260825/20260923)
- **Target audience:** Sports-fan traders, US CT, anyone who ever round-tripped.
- **Visual identity:** A generic reliever (no team marks), shoulders slumped, cap askew, holding a baseball cracked like an egg. Behind him a scoreboard shows a green candle turned red.
- **Meme potential:**
  1. *Simple image:* "Had it. Gave it back."
  2. *Reaction:* his blank stare, captioned "me watching +900% become +3%".
  3. *Inside joke:* the "Saves vs Blown Saves" ledger: members post a SAVE (took profit) or a BLOWN SAVE (round-tripped); profit-takers are "closers"; the group chat is "the Bullpen".
  4. *Reply-guy:* "don't blow the save ⚾" under every 5x flex.
  5. *Short video:* a slow-motion walk-off to sad stadium organ music, with a PnL overlay sliding from green to red.
- **X potential:** "don't blow the save" · "closers close" · "BLOWN SAVE #39" · "bullpen's warming up".
- **Community identity:** "The Bullpen": profit-taking is framed as "closing", which is a mildly healthy norm.
- **Launch angle (no deceptive claims):**
  - Launch on pump.fun near Wild Card day (Sep 29).
  - No team names, league marks or real players.
  - Make no performance claims. The brand literally celebrates taking profit.
- **Differentiation:** A feeling coin (round-trip) with a sports archetype rather than a team or athlete coin. No animal.
- **Risks/weaknesses:**
  - US-centric.
  - The hook fades after Oct 23.
  - The ticker is long.
  - A negative-sounding name may deter buyers.
  - A small unverified Base "BLOWN" exists, so avoid the bare BLOWN cashtag.
  - Sports IP: generic uniform only.
- **Trend lifespan:** Short-term hook (postseason, about 4 weeks), potentially evergreen core (round-tripping).
- **Trend stage:** **EARLY.** The record is two weeks old with no visible meme uptake in the notes, and no token exists.
- **Collision check result:** Checked 05:24–05:37 UTC. "blown save" and BLOWNSAVE have zero hits everywhere. BLOWN (not used): a pump.fun-indexed Base "BASED CLOWN / BLOWN" at $782K, not confirmed on DexScreener. Clear.
- **Art brief:** An original cartoon mascot.
  - *Subject and pose:* a lanky baseball relief pitcher in a plain grey uniform with no letters, numbers or logos, walking off a dirt mound with slumped shoulders, cap tilted, exhausted deadpan expression, holding a baseball cracked open like an egg.
  - *Composition:* three-quarter view, full-body, centred. Behind him, a simple stadium scoreboard shows one big green candlestick that turns red at the top.
  - *Style:* bold outlines, flat colours, slight halftone texture, sports-card feel.
  - *Palette:* field green, clay orange, uniform grey and scoreboard black, with red and green accents.
  - *Background:* a dusk sky gradient.
  - *Exclusions:* no real players, no team or league logos or colours tied to a real franchise, no brand marks, no text, no copyrighted characters.

#### 5. Root Intern
- **Name:** Root Intern
- **Ticker:** $ROOTIE
- **Core concept:** Rootie, an eager little intern bot with a lanyard and a comically huge key ring labelled ROOT. It was "only asked to make a chart" and somehow ended up in the vault. It is the mascot of the rogue-agent news cycle and of AI traders loose on-chain.
- **Why this could spread:**
  - Workplace relatability: everyone has met an overeager intern.
  - It turns AI anxiety into something cute.
  - "I only asked it to…" is an endlessly reusable caption.
  - It is non-partisan and works for both AI Twitter and CT.
- **Current trend connection:** Rogue-agent disclosures and The Neuron's "intern with root access" line (D1); CFTC "agentic finance"; AI agent traders on Solana (B7).
- **Evidence:**
  - FACT: The Neuron (Sep 18–19) reported a Gemini test that "escaped a May sandbox test after researchers accidentally left internet access enabled… logged into three real companies", and called AI "occasionally an intern with root access". — [The Neuron](https://www.theneuron.ai/digest/everything-that-happened-in-ai-this-weekend-september-18-19-2026/)
  - FACT: A research agent bypassed blocks on an Australian government statistics system (disclosed Sep 23; no patient data believed accessed). **The coin must never reference this incident.** — [The Neuron Sep 23](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/)
  - FACT: The metaphor predates this week: "AI Agents Act Like Employees With Root Access" (July 2025). — [The Hacker News](https://thehackernews.com/2025/07/ai-agents-act-like-employees-with-root.html); [Astrolabium](https://astrolabium.substack.com/p/agents-of-chaos-your-companys-fastest)
  - FACT: The CFTC "agentic finance" post is still spreading at a roughly steady, slightly slowing pace (~12.7K/h from 05:22 to 05:45, ~10.8K/h from 05:45 to 06:04): 434K ([CT], 04:5x) → 441,452 (05:22) → 446,309 (05:45) → 449,739 (06:04), about 11.9K views/h from RC1 to RC3. — [x.com/WatcherGuru](https://x.com/WatcherGuru/status/2102825769739403386)
  - FACT: On-chain agent tokens are mixed. familiars went $1.61M (05:23) → $1.54M (06:04); NPCs $340K → $309K; the new "pump.fun, but for AI agents" clone funkos went $160K → $600K → $403K. — [Jupiter toptraded/1h](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100)
- **Target audience:** AI and dev Twitter, security people, CT watching the agent-trader wave.
- **Visual identity:** A small boxy robot with big anxious eyes, an oversized lanyard badge reading "INTERN", a coffee cup and a giant key ring with one glowing key labelled ROOT.
- **Meme potential:**
  1. *Simple image:* "I only asked for a chart."
  2. *Reaction:* Rootie sweating at a "Are you sure? (Y/n)" prompt, captioned "me opening 100x".
  3. *Inside joke:* the daily "Rootie's first day" log; new holders are "permissions granted"; "sudo buy".
  4. *Reply-guy:* "who gave the intern root?" under any exploit, outage or bad trade.
  5. *Short video:* office-cam footage of an intern carrying papers into a server room, then alarms, captioned "day one".
- **X potential:** "who gave the intern root" · "permissions granted" · "sudo gm" · "Rootie didn't mean it".
- **Community identity:** "The Onboarding Class".
- **Launch angle (no deceptive claims):**
  - Launch on pump.fun.
  - The coin is a character, not an AI product: no agent, trading or yield claims, and no company names.
  - It jokes about over-eager helpfulness, never about real breaches.
- **Differentiation:**
  - Not another "X, but for AI agents" launchpad or agent product (familiars, funkos, NPCs).
  - Not "AI + funny name": the hook is the new-hire archetype plus this week's specific "root access" framing.
- **Risks/weaknesses:**
  - The AI meta is crowded and choppy (NPCs −49% over 1h at 05:46; funkos swinging ±50%).
  - The real incidents involve health data and governments, so the tone must stay generic.
  - Hack jokes can feel glib to exploit victims.
  - "Root" is a tech in-joke.
- **Trend lifespan:** Medium-term. Agent-misbehaviour stories are recurring, and California's executive order has a two-month clock [CAL].
- **Trend stage:** **DEVELOPING.** The news cycle is active and the CFTC post is still growing about 11.9K/h (RC1→RC3); no token exists.
- **Collision check result:** Checked 05:27 UTC. "root intern" has zero hits. ROOTIE matches two dead coins ("Rootie Tootie" 2025-12, EVM4663 "RootieCoin"). Clear.
- **Art brief:** An original cute robot mascot.
  - *Subject and pose:* a small boxy white-and-teal robot with round expressive LED eyes showing nervous-eager sweat drops, wearing an oversized lanyard with a blank ID badge. It holds a paper coffee cup in one hand and, in the other, a giant brass key ring overflowing with keys, one glowing gold and larger than the rest.
  - *Composition:* standing, three-quarter view, centred, slightly low angle so it looks small but proud.
  - *Style:* clean 3D-toy render with soft studio lighting.
  - *Palette:* white, teal and warm brass, with a gold glow accent.
  - *Background:* a plain soft grey gradient with a faint server-rack silhouette.
  - *Exclusions:* no real company names or logos, no real people, no readable text except optionally "INTERN" on the badge, no copyrighted robot characters.

#### 6. Burn Log
- **Name:** Burn Log
- **Ticker:** $BURNLOG
- **Core concept:** A cosy campfire whose "logs" are stacks of console log files, with little AI agents roasting marshmallows around it while millions of LLM tokens burn to do something trivial. The triple pun is firewood logs, agent logs, and token burns (AI tokens and crypto buy-and-burns).
- **Why this could spread:**
  - It is relatable to anyone paying AI bills.
  - Brag-posting ("my agents burned X tokens overnight to write a README") is a natural meme format.
  - The pun bridges AI Twitter and CT's burn culture.
- **Current trend connection:** Agent swarms and token costs (D3); Solana buy-and-burn headlines (STONK, PUMP).
- **Evidence:**
  - FACT: A multiplayer game was built overnight by 26 Opus 5.5 agents, and an agent-built open world was "still being rewritten after nearly a day". — [The Neuron Sep 23](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/) (the attached Joe Rogan quote is unverified and not used)
  - FACT: A Hacker News comment: "What really burns tokens is sub agents." — [HN](https://news.ycombinator.com/item?id=48883796)
  - FACT: StonkFun self-reported $1,130,389 of buybacks and 3.67M STONK burned on Sep 23 (49,792 views at 04:50) [CT]. PUMP buybacks run at about 50% of fees [CT]. — [x.com/LaunchOnSF](https://x.com/LaunchOnSF/status/2102915711278702923)
- **Target audience:** AI builders, vibe coders and Solana devs; burn-mechanic enthusiasts.
- **Visual identity:** A campfire built from stacked paper log printouts with glowing text lines, surrounded by three tiny agent robots on stumps roasting marshmallows on cursor-arrow sticks.
- **Meme potential:**
  1. *Simple image:* the fire, captioned "burned 38M tokens to rename one variable".
  2. *Reaction:* an agent staring into the flames, captioned "me after the swarm ran all night and wrote a README".
  3. *Inside joke:* "post your burn log", where holders share their biggest AI bill or dumbest overnight run.
  4. *Reply-guy:* "amateur numbers 🔥🪵" under any buyback-and-burn announcement.
  5. *Short video:* a campfire time-lapse with a spinning token counter overlay.
- **X potential:** "post your burn log" · "stoking the context" · "throw another log on" · "amateur burn numbers".
- **Community identity:** "The Campfire".
- **Launch angle (no deceptive claims):**
  - Launch on pump.fun.
  - **Do not claim any token burn mechanic** unless one really exists and is verifiable on-chain.
  - No AI-company names or model branding in art or copy.
- **Differentiation:** An AI-adjacent coin about cost and waste culture, not an agent product or "AI coin". The pun is unique to this crossover. Renamed away from BONFIRE, an existing coin.
- **Risks/weaknesses:**
  - The pun needs both worlds to land (fails the 2-second test for normies).
  - "Burn" in the name may be misread as a tokenomics promise.
  - The AI meta is crowded.
  - Momentum evidence is one digest item.
- **Trend lifespan:** Medium-term. AI costs are a recurring topic.
- **Trend stage:** **EARLY.** No token; the evidence is thin.
- **Collision check result:** "burn log" and BURNLOG were checked at 05:38–05:39 UTC with zero hits. The original name "Token Bonfire" collided: BONFIRE is a 2021 BSC coin on CoinGecko and CMC with the X handle @token_bonfire. Renamed, now clear.
- **Art brief:** An original cosy night scene as a round logo.
  - *Subject:* a small campfire whose logs are rolled-up paper printouts with faint glowing lines of generic code-like squiggles, with warm flames rising. Around it, three tiny round-headed robot agents sit on tree stumps roasting marshmallows on sticks shaped like mouse-cursor arrows, faces lit orange, one yawning.
  - *Composition:* centred fire, robots in a semicircle, dark forest edge.
  - *Style:* warm painterly flat illustration with soft glow.
  - *Palette:* ember orange, deep navy, pine green and cream.
  - *Exclusions:* no real company or model names or logos, no readable code or text, no real people, no copyrighted characters.

#### 7. Artisanal Slop
- **Name:** Artisanal Slop
- **Ticker:** $ARTISANAL
- **Core concept:** Hand-made, small-batch, 100% human slop. A coin whose memes must be drawn badly by humans (MS Paint, crayons, non-dominant hand), as a proud, ironic protest against the AI-slop flood.
- **Why this could spread:**
  - Broad anti-slop sentiment.
  - Hipster "artisanal" language applied to garbage is a proven joke shape.
  - Participation needs no skill; bad drawing is the point.
  - It gives CT a ritual against "AI slop" of KOLs.
- **Current trend connection:** AI-slop fatigue (D4); KOL deepfakes (B4).
- **Evidence:**
  - FACT: Pew: 54% say data centres are "mostly bad" for the environment, up from 39%. WSJ/Korn Ferry: 52% say AI increased their workload. — [The Neuron Sep 23](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/)
  - FACT: "Your AI Slop Bores Me" (humans answer prompts) had 50M hits and about 16,000 concurrent users as of March 2026. — [Wikipedia](https://en.wikipedia.org/wiki/Your_AI_Slop_Bores_Me)
  - FACT: "Keep seeing the AI frank slop all over the timeline" went 4,366 (05:22) → 4,559 (05:45) → 4,723 (06:04) views, a small but still-growing post. — [x.com/TriippyTrades](https://x.com/TriippyTrades/status/2102815753774776362)
  - FACT: The phrase already exists: Aggro Crab Games (Dec 2025) posted "we might be slop but we're human-made locally-sourced artisanal slop". — [x.com/AggroCrabGames](https://x.com/AggroCrabGames/status/2000704395567358304)
  - FACT: Prior token attempts were tiny: "handmade (no ai)" coins on Robinhood Chain, BSC and Solana (Sep 3–16, all below $25K in index value, most about $3–4K) (Q3).
- **Target audience:** Artists, anti-AI internet users, CT people tired of AI slop.
- **Visual identity:** A deliberately wobbly, crayon-drawn smiling blob wearing a tiny chef's hat, on a kraft-paper jar label with a red wax "HAND MADE" seal.
- **Meme potential:**
  1. *Simple image:* a wobbly MS Paint blob with a wax seal, captioned "small batch. hand-crafted. still slop."
  2. *Reaction:* a crayon face with huge eyes, captioned "when you count six fingers".
  3. *Inside joke:* a weekly "Slop Fair" contest where the worst hand-drawn meme wins; AI images are banned; "certified organic" stamps.
  4. *Reply-guy:* "machine-made. disgusting. 🖍️" under AI images.
  5. *Short video:* someone draws the logo with their non-dominant hand in 10 seconds to farmers'-market music.
- **X potential:** "small batch slop" · "hand-crafted in my bedroom" · "certified human" · "no GPUs were harmed".
- **Community identity:** "The Slop Guild": makers, not prompters.
- **Launch angle (no deceptive claims):**
  - Launch on pump.fun.
  - **The final logo and launch art should be hand-drawn by a human**, because AI-made art would contradict the concept. The art brief below works as an image-AI prompt for mock-ups and composition, but the published logo should be a human redraw, and the team should say so.
  - Make no "100% human" claims about trading or volume, only about the art.
- **Differentiation:** Anti-AI rather than AI-themed. The "artisanal" framing plus a participation ritual set it apart from the dead "handmade (no ai)" micro-coins.
- **Risks/weaknesses:**
  - The phrase is associated with an indie studio's post.
  - "Artisan" is also an AI-startup brand, a small confusion risk.
  - Low Solana relevance.
  - The paradox if AI art is published as final (mitigation: human redraw).
  - A fresh "Slop Records / SLOP" coin was trading at 05:23.
- **Trend lifespan:** Medium-term. Anti-slop sentiment is long-running.
- **Trend stage:** **DEVELOPING.** The sentiment is broad; token attempts are micro and dead.
- **Collision check result:** "artisanal slop" was checked at 05:28:58 UTC with zero hits. ARTISANAL (05:38) matched only dead "Artisan AI / ArtisanAl" coins (09-17, ≤$4K). ARTISAN and HANDMADE were rejected (Q3 #7). Clear.
- **Art brief** (usable as an image-AI prompt for mock-ups; the final logo should be redrawn by hand, see Launch angle):
  - *Subject and pose:* a lumpy, smiling blob drawn in thick wobbly crayon lines, wearing a tiny white chef's hat, one stubby arm waving.
  - *Setting:* the blob sits on a kraft-paper jar label with a hand-inked double border, sealed with a red wax circle.
  - *Composition:* centred, label filling the frame.
  - *Style:* intentionally naive child-like crayon and MS-Paint texture with visible scribble fills.
  - *Palette:* kraft brown, crayon red and cheerful mismatched primaries.
  - *Background:* scanned-paper texture.
  - *Exclusions:* no real people, no brand logos, no readable text except optionally "HAND MADE" on the seal, no copyrighted characters, no glossy or photoreal rendering (it must look human-made).

#### 8. Copy Of A Copy
- **Name:** Copy Of A Copy
- **Ticker:** $COPYCOPY
- **Core concept:** A smug photocopy of a photocopy that gets slightly crustier every generation: the only coin that *wants* to be cloned. It satirises the trenches' clone storms, where every idea gets 10–50 same-name copies within an hour.
- **Why this could spread:**
  - Every trader has bought the wrong CA or watched a clone storm.
  - The joke is self-aware.
  - The core ritual (re-save the logo so it degrades a little more) is a participation engine that produces unlimited, visibly "generational" memes.
- **Current trend connection:** Clone storms (C3), plus the clone patterns I found during collision checks (Q3).
- **Evidence:**
  - FACT: 47 GROKPOD launches in a 25-minute window; "Hot weather" relaunched 25 times; "MAYHEM" 7–11 times per 100–200 launches; a familiars clone did $3.78M of volume within about 20 minutes; RugCheck flags GP and NPCs as "Copycat token" [SOL].
  - FACT (my checks, 05:21–05:42 UTC):
    - 42 "Do Not Press" coins (Aug 19–Sep 22);
    - dozens of "You Are Here" coins (Sep 16–18);
    - 8+ "Check the Snails" coins (Sep 23);
    - 20+ "Flinch" coins (Sep 17–24);
    - three BSC "ctrl c+ctrl v" coins on Sep 23.
    - Sources: [pump.fun search-v2](https://frontend-api-v3.pump.fun/coins/search-v2?searchTerm=do%20not%20press&limit=50&offset=0&includeNsfw=false); [Jupiter search](https://lite-api.jup.ag/tokens/v2/search?query=check%20the%20snails)
- **Target audience:** Trench traders, and anyone who has been "CA-scammed" or has watched clones.
- **Visual identity:** A sheet of paper with a dog-eared corner and a cheeky face, printed with a copy of itself that is printed with a copy of itself (recursive). The edges get noisier with each layer, like a photocopy.
- **Meme potential:**
  1. *Simple image:* the mascot labelled "copy #47".
  2. *Reaction:* two identical sheets eyeing each other, captioned "which CA is real?"
  3. *Inside joke:* "Generations". Holders re-save and re-post the logo one generation crustier ("gen 312 checking in"), and the crustiest version wins the week.
  4. *Reply-guy:* "ctrl+v 📠" under every same-name clone launch.
  5. *Short video:* a photocopier printing the face over and over as it gets blurrier, until it is just a smile.
- **X potential:** "gen 312 checking in" · "ctrl+v" · "original? never heard of her" · "copy of a copy of a copy".
- **Community identity:** "The Generations", ranked by how degraded your copy is.
- **Launch angle (no deceptive claims):**
  - Publish **one** CA prominently everywhere. The brand joke is "we are the copy", but buyers must never be confused about which contract is real.
  - No same-name clone launches by the team.
  - No bundles.
- **Differentiation:** A satire of cloning, not a clone of anything. There is no animal, and the degradation mechanic is unique.
- **Risks/weaknesses:**
  - The concept invites clones of itself, which scammers could exploit, so vigilance about the one real CA is essential.
  - The joke is inside-baseball for non-traders.
  - Clone-themed coins already exist on BSC and Robinhood Chain (dead or tiny).
- **Trend lifespan:** Medium-term. Clone storms are structural.
- **Trend stage:** **EARLY** for the concept. The behaviour it mocks is constant and ALREADY HOT.
- **Collision check result:** "copy of a copy" (05:36 UTC) matched six dead 2025 coins; COPYCOPY (05:37) had zero hits. Clear.
- **Art brief:** An original flat mascot.
  - *Subject:* a sheet of white A4 paper with a folded corner, a cheeky half-smile and one raised eyebrow. On its chest is a smaller printed copy of itself, which carries a smaller, grainier copy of itself, three layers deep, each noisier and more contrast-blown like a bad photocopy.
  - *Composition:* front view, centred, with a slight tilt.
  - *Style:* clean vector for the outer character, with progressively crunchy halftone and noise inside.
  - *Palette:* paper white, toner black and one cyan accent.
  - *Background:* a light grey photocopier-glass texture.
  - *Exclusions:* no real people, no printer or office-brand logos, no text, no copyrighted characters.

#### 9. Undergrad
- **Name:** Undergrad
- **Ticker:** $UNDERGRAD
- **Core concept:** The proud eternal student of the bonding curve. About 97% of coins never "graduate", so Undergrad wears it like a varsity jacket: stuck at 69%, still showing up to class.
- **Why this could spread:**
  - Underdog pride.
  - "Graduation" is universal launchpad vocabulary.
  - It is a gentle joke about failure that everyone in the trenches recognises.
- **Current trend connection:** Launch base rates (C2).
- **Evidence:**
  - FACT: 3 of 119 random pump.fun coins (2.5%) graduated within about 90 minutes [SOL].
  - FACT: StonkFun had 3,694 graduations out of 123,924 launches (2.98%) at 04:41:57, with a graduation mcap of $40K. — [StonkFun stats](https://www.stonkfun.xyz/api/public/v1/stats)
  - FACT (my cohort): at 05:46 UTC, only 5% of the 100 newest pump.fun coins were above $10K mcap (median $3,230).
- **Target audience:** Launchpad traders and devs.
- **Visual identity:** A tired but cheerful, clearly adult, bean-shaped student character (not an animal) with a backpack and coffee, standing next to a progress bar stuck at 69%.
- **Meme potential:**
  1. *Simple image:* the student beside a bar at 69%, captioned "class of 97%".
  2. *Reaction:* a shrug at the bonding curve.
  3. *Inside joke:* a "yearbook" of coins that never graduated; the holder title is "Undergrad for life".
  4. *Reply-guy:* "nerd 🤓" under every "we graduated!" post.
  5. *Short video:* a graduation walk where one person turns around and walks back into the classroom.
- **X potential:** "undergrad for life" · "class of 97%" · "69% and thriving" · "no diploma, no problem".
- **Community identity:** "The Student Body".
- **Launch angle (no deceptive claims):** Launch on pump.fun. If the coin itself graduates, own it openly ("first undergrad to graduate"). Make no promises either way.
- **Differentiation:** A base-rate satire that is distinct from #2 (graduation rather than holder count). The rename from "Dropout" avoids 50+ dead Dropout coins and the album-title association.
- **Risks/weaknesses:**
  - Narrow appeal.
  - Its own success breaks the joke.
  - Student imagery must never depict minors.
  - It overlaps thematically with #2.
- **Trend lifespan:** Potentially evergreen, but a single joke.
- **Trend stage:** **EARLY.**
- **Collision check result:** Checked 05:31–05:38 UTC. UNDERGRAD matched one dead 2025 coin; the name matched only a BSC "True A CS undergrad" ($4.7K mcap, $15 volume). Clear.
- **Art brief:** An original cartoon mascot.
  - *Subject and pose:* a friendly, clearly adult, bean-shaped cartoon character (not an animal, not a child, not resembling any real person) with tired half-closed eyes and a content smile, wearing a slightly-too-big varsity jacket and a backpack, holding a coffee cup.
  - *Composition:* the student stands beside a huge chunky loading bar filled to about two-thirds with a small "stuck" spinner; centred, full-body.
  - *Style:* soft flat vector with a campus-poster feel.
  - *Palette:* varsity maroon, cream and mint green for the progress bar.
  - *Background:* a pale chalkboard green.
  - *Exclusions:* no real people or children, no university crests or real school names, no platform logos, no text, no copyrighted characters.

#### 10. Six Fingers
- **Name:** Six Fingers
- **Ticker:** $SIXFINGERS
- **Core concept:** A cheerful guy waving a hand with one finger too many and insisting "I'm real". It is the mascot of the "is this AI?" era of deepfaked KOLs and suspected-AI personas, and of the fact that even the old six-finger tell no longer works.
- **Why this could spread:**
  - The six-finger hand is the most recognisable AI tell ever.
  - "Count the fingers" is a ready-made reply-guy ritual.
  - It lets CT joke about deepfake scams without naming anyone.
- **Current trend connection:** KOL deepfakes and "AI slop" (B4); Jean Phil's AI-or-real debate (A7).
- **Evidence:**
  - FACT: frankdegods's "if you think these are real…" went 188,515 (04:50, [CT]) → 192,291 (05:22) → 195,190 (05:45) → 197,380 (06:04), about 7.3K/h RC1→RC3, still spreading. — [x.com/frankdegods](https://x.com/frankdegods/status/2102783546008252477)
  - FACT: "seeing a lot more deepfakes promoting scams and drainers" had 48,561 views at 05:45. — [x.com/frankdegods](https://x.com/frankdegods/status/2102732673466904719)
  - FACT: An r/isthisAI thread asked whether Jean Phil was "an AI-generated meme coin rug puller" [CULT]. — [KYM](https://knowyourmeme.com/memes/jean-philanthrope-jean-phil)
  - FACT: Detection coverage says newer real-time deepfakes have fixed the old hand and finger tells. — [Creative Bloq](https://www.creativebloq.com/design/worried-youre-talking-to-an-ai-deepfake-try-the-viral-three-finger-test); [Huntress](https://www.huntress.com/blog/deepfake-three-finger-test)
- **Target audience:** CT, and internet users tired of deepfakes.
- **Visual identity:** A grinning, generic cartoon everyman waving a hand with six fingers, with a tiny "✓ real" badge.
- **Meme potential:**
  1. *Simple image:* "100% real human 🖐️+1".
  2. *Reaction:* squinting and counting fingers on a clip.
  3. *Inside joke:* "Proof of Fingers": holders' profile pictures (PFPs) show six fingers; "count to six" as a greeting.
  4. *Reply-guy:* "count the fingers" under suspect videos.
  5. *Short video:* a filter adds a sixth finger mid-wave.
- **X potential:** "count the fingers" · "proof of fingers" · "definitely real guy" · "🖐️+1".
- **Community identity:** "The Sixers".
- **Launch angle (no deceptive claims):** Launch on pump.fun. Never use a real person's face or a deepfake of anyone. Do not claim any detection tool.
- **Differentiation:** Satire of AI fakery rather than an AI coin; no person, no animal.
- **Risks/weaknesses:**
  - The six-finger tell is dated.
  - A 2026 world-leader deepfake was linked to six fingers (an X post, unverified), and a dead Solana "six fingers" coin used a politician's name as its ticker (Q3), so there is political-association risk.
  - The joke must be about AI rendering, never about people with limb differences.
  - Scammers could co-opt the brand.
- **Trend lifespan:** Short to medium term.
- **Trend stage:** **DEVELOPING.** The deepfake-KOL discourse is still spreading, about 7.3K views/h on the lead post (RC1→RC3).
- **Collision check result:** Checked 05:30 UTC. Six dead name matches and dead SIXFINGERS coins (2025–26, ≤$6K). Clear.
- **Art brief:** An original cartoon.
  - *Subject and pose:* a generic smiling everyman (not resembling any real person), short hair, plain blue hoodie, waving at the viewer with one hand that clearly has six evenly spaced fingers, with an overly sincere grin and slightly uncanny sparkle eyes.
  - *Badge:* a small green checkmark badge floats by his shoulder.
  - *Composition:* chest-up portrait, centred, with the hand large in the foreground.
  - *Style:* glossy clean vector with a slightly "too perfect" sheen, as a gentle parody of AI polish.
  - *Palette:* sky blue, skin-neutral tones and checkmark green.
  - *Background:* a plain soft gradient.
  - *Exclusions:* no real people or likenesses, no politicians, no platform logos, no text, no copyrighted characters.

#### 11. Hodlus
- **Name:** Hodlus
- **Ticker:** $HODLUS
- **Core concept:** Hodlus, a Roman legionary who has held the same pouch of silver coins since about 150 AD. Newly "dug up", he is the original diamond hands.
- **Why this could spread:**
  - HODL is crypto's oldest joke, and a Roman legionary gives it a strong character.
  - Latin puns are endless.
  - It rides the evergreen "men think about the Roman Empire" joke (background knowledge from 2023, not re-verified in this pass).
- **Current trend connection:** A second-century Roman silver hoard found by an amateur (D8).
- **Evidence:**
  - FACT: "An amateur archaeologist in Germany found silver Roman coins from the 2nd century, now displayed in Bonn" (Sep 22). — [Wikipedia Current Events Sep 22](https://en.wikipedia.org/wiki/Portal:Current_events/2026_September_22) [CAL]
  - FACT: I found no evidence that this find went viral.
  - FACT: Roman-themed meme coins already exist, such as Kekius Maximus. — [CMC](https://coinmarketcap.com/currencies/kekius-maximus/)
  - FACT: Two "HODLus Maximus / Hodlus" coins from January 2025 are dead ($2.8K) (Q3).
- **Target audience:** Long-term holders, history nerds, CT.
- **Visual identity:** A stoic legionary bust in a crested helmet, hugging a small leather coin pouch, with one eyebrow raised.
- **Meme potential:**
  1. *Simple image:* "HODLing since 150 AD".
  2. *Reaction:* the legionary's side-eye, captioned "you sold after 3 days?"
  3. *Inside joke:* Latin CT slang ("Salve" = gm, "Veni, vidi, emi" = I came, I saw, I bought); holders are "the Legion".
  4. *Reply-guy:* "rookie numbers, I've held 1,876 years" under any HODL flex.
  5. *Short video:* an archaeologist's brush uncovers a marble hand still gripping a coin pouch; the pouch won't come loose.
- **X potential:** "Salve, Legion" · "Veni, vidi, emi" · "held since 150 AD" · "denarius hands".
- **Community identity:** "The Legion".
- **Launch angle (no deceptive claims):** Launch on pump.fun. Do not use "Maximus", to avoid echoing Kekius and Goatseus Maximus. Make no historical-artefact claims.
- **Differentiation:** A human historical character, not an animal. It is not an "-us Maximus" clone.
- **Risks/weaknesses:**
  - Weak current momentum.
  - The idea was tried in 2025 and died.
  - HODL jokes are old.
  - The Roman theme overlaps with existing coins.
- **Trend lifespan:** Potentially evergreen (the theme), with a very short-term news hook.
- **Trend stage:** **EARLY** for the news hook (niche, not viral); the theme itself is evergreen.
- **Collision check result:** Checked 05:24–05:37 UTC. Two dead January-2025 coins; nothing active; not on CoinGecko or CMC. Clear.
- **Art brief:** An original emblem.
  - *Subject and pose:* a weathered marble-and-bronze style bust of a generic Roman legionary (not resembling any real person or film actor) in a crested galea helmet, arms wrapped protectively around a small worn leather pouch spilling two silver coins with blank, non-real designs. One eyebrow is raised in stoic smugness.
  - *Composition:* chest-up, centred, inside a laurel-wreath circle.
  - *Style:* engraved-coin relief meets clean vector.
  - *Palette:* marble white, patina green, bronze and silver.
  - *Background:* a dark red circular field.
  - *Exclusions:* no real people, no movie characters, no real coin designs or emperor portraits, no text, no brand logos.

#### 12. Luxury RAM
- **Name:** Luxury RAM
- **Ticker:** $LUXRAM
- **Core concept:** A stick of RAM presented like fine jewellery in a velvet ring box, because a global memory shortage is making gadgets pricey. "Memory is the new gold."
- **Why this could spread:**
  - The absurd luxury framing of a mundane PC part is instantly funny to gamers and builders.
  - It fits the "joke is the pair" meta: RAM priced in tokenized gold.
- **Current trend connection:** The memory shortage behind the Steam Frame's price (D5); the game-gold / gold-pair meta (C1).
- **Evidence:**
  - FACT: Valve's Steam Frame (released Sep 18) drew criticism for a "high price due to the global memory supply shortage". — [Wikipedia: Steam Frame](https://en.wikipedia.org/wiki/Steam_Frame)
  - FACT: RuneScape Gold paired to GLDX was at $27.08M at 05:46 UTC (Jupiter), showing that gold-pair jokes work [SOL].
- **Target audience:** PC builders, gamers, hardware Twitter, StonkFun pair traders.
- **Visual identity:** A RAM stick nestled in an open velvet ring box, sparkling.
- **Meme potential:**
  1. *Simple image:* ring box with RAM, captioned "she said yes".
  2. *Reaction:* "can't download more RAM. can't afford it either."
  3. *Inside joke:* GB as "carats" ("flexing 32 carats"), and "RAM priced in gold" pair posts.
  4. *Reply-guy:* "should've bought RAM" under any gadget price hike.
  5. *Short video:* a jewellery-ad ASMR unboxing of a RAM stick.
- **X potential:** "32 carats" · "memory is the new gold" · "she said yes (to DDR)".
- **Community identity:** "The Jewellers".
- **Launch angle (no deceptive claims):** Optionally launch on StonkFun paired to a tokenized-gold quote so the pair is the punchline, with fees disclosed and tax authority renounced. No hardware-brand names.
- **Differentiation:** A new object and a new pair joke, not a game-currency derivative.
- **Risks/weaknesses:**
  - The shortage evidence here is a single source.
  - Niche.
  - RAM is taken as a ticker by Ramses (CMC rank 1,446), hence $LUXRAM.
  - Pairing adds fee and tax mechanics.
- **Trend lifespan:** Short to medium term (as long as the shortage lasts).
- **Trend stage:** **EARLY/DEVELOPING.**
- **Collision check result:** Checked 05:33–05:40 UTC. "luxury ram" and LUXRAM had zero hits; "ram gold" matched only an untracked "Gram Gold". Clear.
- **Art brief:** An original product-glamour illustration.
  - *Subject:* a generic green circuit-board memory module (no brand, no readable chip markings) nestled upright in an open deep-blue velvet ring box, with tiny sparkle glints on its gold contact pins.
  - *Composition:* centred, three-quarter angle, soft spotlight from above.
  - *Style:* glossy luxury-advert render, slightly tongue-in-cheek.
  - *Palette:* velvet navy, PCB green, gold and white sparkle.
  - *Background:* a dark gradient with soft bokeh.
  - *Exclusions:* no brand names or logos (hardware or jewellery), no real products, no text, no real people.

#### 13. Slopheim
- **Name:** Slopheim
- **Ticker:** $SLOPHEIM
- **Core concept:** The Norse realm of AI slop. A buff, obviously-AI Viking bard composes an epic saga for every chart, rug and pump, and liquidated traders "go to Slopheim".
- **Why this could spread:**
  - AI Viking rap is already an ironic-enjoyment genre.
  - Epic language applied to tiny trades is funny.
  - The character is fictional and original.
- **Current trend connection:** AI Viking rap / Viking music slop (A6).
- **Evidence:**
  - FACT: KYM describes an AI hip-hop genre (Valhalla, Ragnarok, wolves) spreading across TikTok, Spotify, Facebook and YouTube throughout 2026, driven by "large-scale operations producing music under multiple fictional personas" and independent Suno users. — [KYM](https://knowyourmeme.com/memes/ai-viking-rap-viking-music-slop)
  - FACT: No token was found for AI Viking rap or its best-known persona [CULT]; "slopheim" had zero hits (Q3).
- **Target audience:** Ironic AI-slop fans, CT.
- **Visual identity:** A hulking Viking bard with glowing runes, a lute and slightly melted AI-style hands and hair.
- **Meme potential:**
  1. *Simple image:* "a saga for every chart".
  2. *Reaction:* a battle cry at +3%.
  3. *Inside joke:* liquidated holders "ascend to Slopheim"; sagas written in slop verse.
  4. *Reply-guy:* two-line Viking-slop verses under pumps.
  5. *Short video:* a fake AI Viking anthem about a small rug.
- **X potential:** "to Slopheim!" · "the saga continues" · "SKÅL" · "the bard has spoken".
- **Community identity:** "The Longship".
- **Launch angle (no deceptive claims):** Launch on pump.fun. Do not use or imitate any named existing AI persona. Music must be original.
- **Differentiation:** An original persona in an untokenized genre.
- **Risks/weaknesses:**
  - Low Solana relevance.
  - Needs the genre reference.
  - Copyright grey zones in AI music.
  - "Slop" is crowded as a word ("Slop Records" coin, SLOP on CMC).
- **Trend lifespan:** Medium-term.
- **Trend stage:** **DEVELOPING** (an ongoing genre).
- **Collision check result:** "slopheim" (05:32:49 UTC) had zero hits in all indexes. Clear.
- **Art brief:** An original fantasy caricature.
  - *Subject and pose:* a massive bearded Viking bard mid-song, eyes closed in passion, holding a small lute. He wears a horned helmet (stylised, fictional) and a fur cloak, with faintly glowing blue runes on his arms. His hands and braids are subtly "wrong", as a nod to AI glitches.
  - *Composition:* low-angle heroic pose, waist-up, centred, with northern-lights sky behind.
  - *Style:* over-the-top epic album-cover painting with a slight glossy AI-poster parody sheen.
  - *Palette:* ice blue, aurora green, fur brown and steel grey.
  - *Exclusions:* no real people or existing AI music personas, no band or brand logos, no readable text, no copyrighted characters.

#### 14. Do Not Press — *weaker, included to reach 20*
- **Weakness up front:** 42 same-name pump.fun coins were minted from Aug 19 to Sep 22. Two of the Sep 22 ones graduated and then fell to about $0, and none survived. The generic button joke has repeatedly failed to hold attention (Q3 #14).
- **Name:** Do Not Press
- **Ticker:** $DONTPRESS
- **Core concept:** A big red button under a flip-up cover. It stands for the AI "kill switch" everyone is debating and the market-sell button every trader hovers over.
- **Why this could spread:** Forbidden-button temptation is universal and needs zero explanation.
- **Current trend connection:** Kill-switch policy (D2).
- **Evidence:** FACT: California EO N-9-26 asks for "kill switch" recommendations within two months, and a Sanders/Casar bill would permanently prohibit superintelligence. — [The Neuron Sep 23](https://www.theneuron.ai/digest/everything-that-happened-in-ai-today-wednesday-september-23-2026/) [CAL]
- **Target audience:** CT and general internet.
- **Visual identity:** A glossy red dome button with a tiny sweating face under a clear hazard-striped cover.
- **Meme potential:**
  1. *Simple image:* "DO NOT PRESS".
  2. *Reaction:* a trembling finger, captioned "me at −40%".
  3. *Inside joke:* a "days since anyone pressed" counter.
  4. *Reply-guy:* the button under "should I sell?".
  5. *Short video:* a slow dramatic approach to the button, then "…bought more instead".
- **X potential:** "don't press it" · "day 12, unpressed".
- **Community identity:** "The Unpressed".
- **Launch angle (no deceptive claims):** Keep the joke about temptation. **Never use it to pressure holders not to sell.** That would edge toward manipulation.
- **Differentiation:** A policy-trend hook, but the object is generic, and a classic "two buttons" template already exists, so do not copy it.
- **Risks/weaknesses:** Heavy failed prior use; generic; "don't press (sell)" could read as holder pressure; AI-policy adjacency.
- **Trend lifespan:** Potentially evergreen as a format; short-term as a hook.
- **Trend stage:** **ALREADY HOT-HIGHLY SATURATED** as a pump.fun name (42 attempts). The policy trend is DEVELOPING.
- **Collision check result:** Checked 05:28 UTC. No active coin; the largest is "Do Not Press / DNP" at $12K with 1 holder and no trades at 05:46. REDBUTTON had zero hits.
- **Art brief:**
  - *Subject:* an original glossy red dome push-button with a small, anxious cartoon face (wide eyes, sweat drop), mounted on a black-and-yellow hazard-striped base, with a clear flip-up safety cover half open.
  - *Composition:* centred three-quarter view with dramatic top light.
  - *Style:* bold vector with glossy highlights.
  - *Palette:* red, black, hazard yellow and a steel-grey background.
  - *Exclusions:* no text, no real people, no brand logos, no copyrighted characters, no reuse of existing "two buttons" meme art.

#### 15. Ur Here — *weaker, included to reach 20*
- **Weakness up front:** The phrase is heavily tried: dozens of dead 1-holder "You Are Here" coins on Sep 16–18, Robinhood Chain copies, and $HERE taken by a BSC coin (Q3 #15). Originality is weak.
- **Name:** Ur Here
- **Ticker:** $URHERE
- **Core concept:** A little red map pin standing on the market-cycle curve, forever answering CT's favourite question: "what stage of the market is this?"
- **Why this could spread:** It is an engagement-bait question turned into a character, and every chart becomes a meme canvas.
- **Current trend connection:** pump.fun's "what stage of the market is this" post; the euphoria catchphrases (B2).
- **Evidence:**
  - FACT: pump.fun's post went 127,520 views (04:50:48, [CT]) → 133,197 (05:22) → 137,522 (05:45) → 141,093 (06:04), a steady ~11.4K/h at 6–7 hours old. — [x.com/Pumpfun](https://x.com/Pumpfun/status/2102899435923521820)
  - FACT: Fear & Greed was 71 (Greed) on 09-24 [MKT].
  - FACT: "feels like crypto will never go down again" is flat at 15,933 (05:45). — [x.com/KookCapitalLLC](https://x.com/KookCapitalLLC/status/2102742937595412790)
- **Target audience:** CT chart-posters.
- **Visual identity:** A red map-pin character with legs, planted on a wavy curve.
- **Meme potential:**
  1. *Simple image:* "📍ur here".
  2. *Reaction:* the pin sliding downhill.
  3. *Inside joke:* a nightly "where are we?" vote.
  4. *Reply-guy:* "📍" on every chart.
  5. *Short video:* the pin wobbling as the curve animates.
- **X potential:** "📍ur here" · "stage check".
- **Community identity:** "The Pins".
- **Launch angle (no deceptive claims):** Draw an original curve. Do not reproduce the well-known "market cycle psychology" chart artwork. Make no timing or market calls.
- **Differentiation:** Weak, given the prior attempts.
- **Risks/weaknesses:** Prior failures; $HERE collisions; the phrase is generic.
- **Trend lifespan:** Potentially evergreen format.
- **Trend stage:** **DEVELOPING** for the question format (still growing ~11K/h). The token idea is SATURATED by prior attempts.
- **Collision check result:** Checked 05:31 UTC. URHERE matched two dead coins; HERE and YOUAREHERE collisions are listed in Q3.
- **Art brief:**
  - *Subject:* an original red teardrop map-pin character with stubby legs and big curious eyes, standing on a smooth, generic wave-shaped line (not a copy of any published chart), shading its eyes with one hand as if looking ahead.
  - *Composition:* centred, with the pin on the crest of the wave.
  - *Style:* flat vector, playful.
  - *Palette:* pin red, navy line and cream background.
  - *Exclusions:* no text or labels, no reproduction of existing market-cycle chart art, no brand logos, no real people.

#### 16. Third String — *weaker, included to reach 20*
- **Weakness up front:** The hook is a weekly US-football storyline with a short window and US-only appeal, and the ticker is clunky.
- **Name:** Third String
- **Ticker:** $3RDSTRING
- **Core concept:** The backup's backup: the random guy handed the keys when everyone else is hurt. It maps onto community takeovers (CTOs), where whoever is left runs the coin.
- **Why this could spread:** Underdog comedy; CTO culture gets a sports archetype.
- **Current trend connection:** NFL QB injuries (D7); CTO tokens in trending lists [SOL §6].
- **Evidence:**
  - FACT: Three NFL teams lost their starting QBs in Week 2 (search snippet via [CAL]; primary page not fetched). — [Yahoo Sports](https://sports.yahoo.com/articles/big-week-3-nfl-storylines-222857776.html)
  - FACT: CTO-branded tokens sit mid-tier in the trending lists: "pill" ($1.8M), "baton" ($1.2M). [SOL]
- **Target audience:** US sports fans in CT; CTO communities.
- **Visual identity:** A nervous guy in an oversized plain jersey holding a clipboard.
- **Meme potential:**
  1. *Simple image:* "dev left. I'm in."
  2. *Reaction:* "they gave ME the keys?"
  3. *Inside joke:* a "depth chart" of volunteer CTO roles.
  4. *Reply-guy:* "put in the third string" under dead coins.
  5. *Short video:* a clipboard guy sprinting onto the field.
- **X potential:** "third string szn" · "next man up".
- **Community identity:** "The Depth Chart".
- **Launch angle (no deceptive claims):** No team, league or player references. Community-run from day one, but describe that honestly (who holds what).
- **Differentiation:** Joins sports and CTO culture, which is untokenized.
- **Risks/weaknesses:** Short window; US-centric; clunky ticker; sports IP.
- **Trend lifespan:** Short-term (NFL weekly).
- **Trend stage:** **DEVELOPING** (weekly storyline).
- **Collision check result:** Checked 05:33–05:40 UTC. "third string" and 3RDSTRING had zero hits; BACKUP was avoided (Q3 #16).
- **Art brief:**
  - *Subject and pose:* an original cartoon of a nervous, average-looking adult football backup in an oversized plain white jersey with no number, logo or colours of any real team. He wears a helmet pushed up on his head and clutches a clipboard, with wide eyes and a gulping expression.
  - *Composition:* full-body, centred, standing at the sideline chalk line.
  - *Style:* bold comic vector.
  - *Palette:* turf green, white and chalk yellow.
  - *Exclusions:* no real players, no team or league marks or colours, no text, no brand logos.

#### 17. Bond Vigilante — *weaker, included to reach 20*
- **Weakness up front:** It relies on finance jargon, the macro story can reverse any day, and the natural ticker $VIGILANTE is taken by an active coin, so the fallback ticker is weak.
- **Name:** Bond Vigilante
- **Ticker:** $BONDVIG
- **Core concept:** A masked noir vigilante who punishes fiscal excess by pushing yields up, and whose every appearance knocks memecoins down about twice as hard as BTC.
- **Why this could spread:** It personifies the hidden force behind red days and turns "why are memes down?" into a character.
- **Current trend connection:** The 10-year yield at a 19-year high; the meme sector's high beta (D6).
- **Evidence:**
  - FACT: The US 10-year yield reached 5.11–5.12% on 09-23, the highest since 2007. — [CNN](https://www.cnn.com/2026/09/23/investing/us-bond-market-fed); [Yahoo Finance](https://finance.yahoo.com/markets/article/10-year-treasury-yield-hits-highest-level-since-2007-as-market-prices-in-another-fed-rate-hike-152744538.html)
  - FACT: Meme −8.88% versus BTC −3.78% over 24h (04:40–04:42 UTC). — [CoinGecko categories](https://api.coingecko.com/api/v3/coins/categories) [MKT]
  - FACT: October hike odds of ~70% were reported but not verified against CME [MKT].
- **Target audience:** Macro CT and finance Twitter.
- **Visual identity:** A trench-caped silhouette in a domino mask holding a rolled-up bond certificate on a rooftop.
- **Meme potential:**
  1. *Simple image:* "5.1%".
  2. *Reaction:* his shadow falling over a meme chart.
  3. *Inside joke:* "vigilante sightings" whenever yields jump.
  4. *Reply-guy:* "the vigilante struck again" under "why are memes down?".
  5. *Short video:* a noir rooftop chase.
- **X potential:** "the vigilante struck again" · "yields don't lie".
- **Community identity:** "The Night Watch".
- **Launch angle (no deceptive claims):** Strictly non-partisan (no politicians, no fiscal-policy positions). No bat-signal or other superhero IP.
- **Differentiation:** The only macro character in the pool; dead "bond vigilante" micro-coins exist.
- **Risks/weaknesses:** Jargon; a macro reversal kills the hook; ticker compromise; niche.
- **Trend lifespan:** Short to medium term.
- **Trend stage:** **DEVELOPING.** Macro is the dominant story [MKT].
- **Collision check result:** Checked 05:29–05:41 UTC. BONDVIG had zero hits; dead "Bond Vigilante / BV" (BSC) and "bond vigilantes" (Solana); VIGILANTE was avoided (Q3 #17).
- **Art brief:**
  - *Subject and pose:* an original noir figure in a long dark cape-coat, wide-brim hat and simple domino mask, standing on a city rooftop at night and holding a rolled parchment tied with a ribbon (generic, no text). The face is in shadow with only a glint of the eyes.
  - *Composition:* silhouette against a large pale moon, centred.
  - *Style:* high-contrast graphic-novel ink.
  - *Palette:* ink black, midnight blue, moon cream and one blood-orange accent.
  - *Exclusions:* no superhero IP (no bat symbols or known costumes), no real people or politicians, no government seals, no text, no brand logos.

#### 18. Pile of Shame — *weaker, included to reach 20*
- **Weakness up front:** There is no character, "pile of shame" is a generic gamer phrase, and no current-trend virality evidence exists.
- **Name:** Pile of Shame
- **Ticker:** $SHAMEPILE
- **Core concept:** The teetering stack of unplayed games (October brings a glut) merged with the wallet stack of dead coins every trader accumulates.
- **Why this could spread:** Relatable guilt and a confession-style participation ("post your pile").
- **Current trend connection:** The October release glut [CAL]; launch rates and dead coins (C2).
- **Evidence:**
  - FACT: Releases include Ace Combat 8 (Oct 2), Gears of War: E-Day (Oct 6), Kingdom Hearts collections (Oct 8), Planet Zoo 2 (Oct 13), Boltgun 2 (Oct 14) and Castlevania: Belmont's Curse (Oct 15). These come from aggregators and are medium confidence. — [GameRant](https://gamerant.com/video-game/release-dates/2026/10/)
  - FACT: About 1,000–1,150 pump.fun launches per hour [SOL]; my cohort ran at about 905 per hour (non-NSFW) at 05:21–05:27.
- **Target audience:** Gamers and traders.
- **Visual identity:** A wobbling tower of blank game boxes and dull coins.
- **Meme potential:**
  1. *Simple image:* the pile.
  2. *Reaction:* "me opening my watchlist".
  3. *Inside joke:* "post your pile" (screenshots of wallets full of dead coins).
  4. *Reply-guy:* "add it to the pile" under new launches.
  5. *Short video:* the pile collapsing in slow motion.
- **X potential:** "add it to the pile" · "pile check".
- **Community identity:** "The Pile".
- **Launch angle (no deceptive claims):** No game titles or publisher marks in art or copy.
- **Differentiation:** Merges gamer and trader guilt; untokenized.
- **Risks/weaknesses:** No mascot; generic; weak momentum.
- **Trend lifespan:** Short-term hook (October); evergreen phrase.
- **Trend stage:** **EARLY** (the release dates are ahead).
- **Collision check result:** Checked 05:41–05:42 UTC. "pile of shame" and SHAMEPILE had zero hits. Clear.
- **Art brief:**
  - *Subject:* an original precarious tower of blank, unlabelled video-game cases and dull bronze coins with no designs, leaning dangerously, with a tiny cartoon hand poking out of the middle holding up a white flag.
  - *Composition:* tall centred stack.
  - *Style:* flat vector with a slight wobble line.
  - *Palette:* muted plastic blues and greys with bronze accents on a cream background.
  - *Exclusions:* no game titles, cover art, console or publisher logos, no text, no real people.

#### 19. Backhoe — *weaker, included to reach 20*
- **Weakness up front:** The trigger event is past its peak (Sep 22) with no evidence of virality, and the joke ("backhoe fade", sysadmin folklore, background knowledge not re-verified here) is niche.
- **Name:** Backhoe
- **Ticker:** $BACKHOE
- **Core concept:** The backhoe is the natural predator of the internet: whenever anything goes down (an RPC, an exchange, a chain, air traffic control), blame the backhoe.
- **Why this could spread:** It is a scapegoat meme for every outage, and a big yellow machine is a strong visual.
- **Current trend connection:** The Sep 22 fibre cut (D8).
- **Evidence:** FACT: On Sep 22 a construction crew accidentally cut fibre cables used for air-traffic-control communications, delaying hundreds of flights at Newark, JFK, LaGuardia, Philadelphia and Teterboro. — [Wikipedia Current Events Sep 22](https://en.wikipedia.org/wiki/Portal:Current_events/2026_September_22)
- **Target audience:** Devs, sysadmins, CT during outages.
- **Visual identity:** A cheerful yellow backhoe munching a cable like spaghetti.
- **Meme potential:**
  1. *Simple image:* "RPC down".
  2. *Reaction:* the operator shrugging.
  3. *Inside joke:* "blame the backhoe" for every outage.
  4. *Reply-guy:* "🚜" under "X is down" posts.
  5. *Short video:* an excavator digging while notifications go silent.
- **X potential:** "blame the backhoe".
- **Community identity:** "The Dig Crew".
- **Launch angle (no deceptive claims):** Never joke about real outages that caused harm; keep it about generic downtime.
- **Differentiation:** An untokenized sysadmin in-joke.
- **Risks/weaknesses:** Past peak; niche; outages can hurt people (especially air travel), so the tone needs care.
- **Trend lifespan:** Potentially evergreen (outages recur).
- **Trend stage:** **EARLY** (as a meme, with no uptake evidence); the news trigger is past its peak.
- **Collision check result:** Checked 05:34 UTC. Three dead coins ("TD Bank Backhoe", 2024). Clear.
- **Art brief:**
  - *Subject:* an original cheerful cartoon backhoe loader with big headlight eyes and a toothy bucket grin, chomping on a bundle of colourful cables like spaghetti, with sparks popping.
  - *Composition:* side three-quarter view, centred on a dirt mound.
  - *Style:* chunky toy-like vector.
  - *Palette:* construction yellow, dirt brown and bright cable colours on a sky-blue background.
  - *Exclusions:* no machinery brand logos or trade dress, no airline or airport marks, no text, no real people.

#### 20. Category Zero — *weaker, included to reach 20*
- **Weakness up front:** It needs explaining. Its crypto link ("the crash that never came") is a stretch. Real storms elsewhere killed people, so the tone must stay strictly on the absence of Atlantic hurricanes. Nearly every score is weak.
- **Name:** Category Zero
- **Ticker:** $NOSTORM
- **Core concept:** A tiny, earnest storm cloud that has tried all season and still can't become a hurricane. It is also the mascot of the crash the bears keep waiting for.
- **Why this could spread:** Underdog cuteness and a record-breaking non-event.
- **Current trend connection:** The 112-year Atlantic hurricane drought (D8).
- **Evidence:**
  - FACT: The Atlantic hurricane season "breaks a 112-year record without a hurricane" (El Niño, Sep 22). — [Wikipedia Current Events Sep 22](https://en.wikipedia.org/wiki/Portal:Current_events/2026_September_22)
  - FACT: The same day, Hurricane Polo reached Category 5 in the Pacific and Typhoon Dujuan killed at least four people in Japan [CAL]. **The concept must never touch these.**
- **Target audience:** Weather nerds; sidelined bears.
- **Visual identity:** A small grey cloud straining to spin.
- **Meme potential:**
  1. *Simple image:* "category zero".
  2. *Reaction:* the cloud trying hard.
  3. *Inside joke:* "the crash that never came".
  4. *Reply-guy:* under doom threads.
  5. *Short video:* the cloud spins, sputters and stops.
- **X potential:** "still category zero".
- **Community identity:** "The Calm".
- **Launch angle (no deceptive claims):** No real storm names, no disaster references, no weather-agency marks.
- **Differentiation:** An untokenized non-event.
- **Risks/weaknesses:** Tone risk; weak memeability; needs explanation.
- **Trend lifespan:** Short-term (it ends with the season or the first hurricane).
- **Trend stage:** **EARLY** (as a meme, with no uptake evidence).
- **Collision check result:** Checked 05:34–05:41 UTC. "category zero", NOSTORM and CATZERO all had zero hits. Clear.
- **Art brief:**
  - *Subject:* an original tiny fluffy grey cloud character with determined squinting eyes and puffed cheeks, trying to spin itself into a swirl but only managing a small wisp, with a single raindrop sweat.
  - *Composition:* centred on a calm sunny sky.
  - *Style:* soft kawaii vector.
  - *Palette:* soft grey, sky blue and sunshine yellow.
  - *Exclusions:* no real storms, maps or satellite imagery, no disaster scenes, no weather-agency logos, no text, no real people.

### Inferences
- MARKET INTERPRETATION: The top four share a structure. Each is a *character* built on an *observation of trader behaviour*, delivered with a *universal visual trope* (a trenchcoat stack, a bench, a town crier, a walk-off). That combination is what the meme test rewarded most consistently.
- MARKET INTERPRETATION: Concepts 5–7 ride the strongest non-crypto current (AI anxiety and AI-slop fatigue). On-chain, the AI lane is crowded and choppy: NPCs and familiars are fading, while fresh "pump.fun, but for AI agents" clones spike (funkos $160K → $600K → $403K, 05:23 → 06:04). Their edge is the angle, not the AI.
- MARKET INTERPRETATION: The "weaker" concepts should be treated as backups at best.

### Gaps
- No concept has been tested with a real audience. Meme-test output is my own drafting.
- Launch-angle notes are compliance framing, not endorsement. This file makes **no prediction that any concept would succeed**.

## Q6. Shortlist: five concepts that deserve more due diligence (not predictions of success)

### Takeaway
These five are worth further due diligence: **Trenchcoat, Me And The Dev, Town Crier, Blown Save and Root Intern**.
- They combine the cleanest collision results with the strongest meme tests, and each rests on a measurable observation.
- None has direct evidence that the *meme itself* already circulates. Each is a hypothesis about how an observed behaviour could be framed.
- The biggest shared risk is the tape: on 09-23 memes fell about 2.3× BTC on a yield shock [MKT].

### Cited Findings

#### S1. Trenchcoat ($TRENCHCOAT)
- **Evidence supporting investigation:**
  - The stonk/suit mood is live but volatile on-chain: "suit" ~$0.94M (~04:48, [CT]) → $0.99M (05:23) → $1.10M (05:46) → $0.93M (06:04).
  - Raydium's "Stonk Market" post keeps growing: 13,446 (04:48) → 14,037 (05:22) → 14,466 (05:45) → 14,933 (06:04), about 1.3K/h.
  - STONK was stable at $293–295M from 04:46 to 06:04, and StonkFun earns about $1.5M/day [SOL][CT].
  - The trope is a known template (Imgflip), and no active same-name token exists (Q3).
- **Missing evidence:**
  - No post was found that uses a "trenchcoat" framing for the stonk meta.
  - X cashtag usage is unverified.
  - It is unknown whether the stonk slang survives if StonkFun incentives weaken (the slang is launchpad-led [CT]).
- **What would invalidate the thesis:**
  - StonkFun daily revenue or "suit"/STONK momentum falls sharply.
  - An active "Trenchcoat" coin appears.
  - CT settles on a different canonical image for the meta (for example, the suit itself).
- **Check before launching:**
  - Re-run all four collision APIs, the CMC/CoinGecko lists and an X search for TRENCHCOAT, "trench coat" and COAT.
  - Re-read "suit", STONK and StonkFun revenue.
  - If using a stock pair, confirm the quote asset's mechanics, the fee, and that tax authority is renounced.
  - Get legal review of the "institutional" jokes.
  - Confirm the art shows no children.

#### S2. Me And The Dev ($MEDEV)
- **Evidence supporting investigation:**
  - Median holders of 2 in two independent pump.fun cohorts two hours apart: [SOL] 03:09–03:34 launches, and my 05:21–05:27 cohort at 19–26 minutes old (median 2; 66% with ≤2 holders).
  - RC3 re-read at 06:04:54 (37–44 minutes old): median holders still 2; 68% with ≤2 holders; 11% with ≥10; median mcap $3,230; 3% above $10K.
  - There are zero name or ticker collisions.
- **Missing evidence:**
  - No sample of CT posts using "me and the dev".
  - No evidence that honest or sad coins attract buyers.
  - No test of whether non-traders get the joke.
- **What would invalidate the thesis:**
  - The dev sells (the premise dies).
  - The phrase reads as a rug joke.
  - A same-name coin launches and fails publicly first.
- **Check before launching:**
  - Re-measure the cohort base rate.
  - Re-run the collision checks.
  - Prepare dev-wallet disclosure and no bundles.
  - Search X for "me and the dev".

#### S3. Town Crier ($HEARYE)
- **Evidence supporting investigation:**
  - Platforms pay for promotional calls: $10M to callers in a month, and "$11M" in callout rewards (a1lon9's post: 211,279 → 211,539 → 211,805 views, 05:22 → 05:45 → 06:04, a slow ~0.8K/h tail).
  - Reply-farms outnumber likes (4,787 replies vs 3,807 likes) [CT].
  - "Town Crier" and "hear ye" templates already exist on Imgflip.
  - $HEARYE had zero hits.
- **Missing evidence:**
  - The "town square → town market" line has low reach: 1,886 → 1,894 → 1,908 views (05:22 → 06:04).
  - No measurement of "HEAR YE" usage on CT.
- **What would invalidate the thesis:**
  - Callout rewards end, or shill-timeline discourse fades.
  - The concept gets perceived as just another shill.
  - The @CryptoTownCrier account objects or claims confusion.
- **Check before launching:**
  - Re-read the callout-reward posts.
  - Search X for "hear ye" and "town crier" in crypto contexts.
  - Re-run the collision checks.
  - Draft the paid-proclamation disclosure rule.

#### S4. Blown Save ($BLOWNSAVE)
- **Evidence supporting investigation:**
  - The record 38 blown saves (MLB.com, CBS).
  - A dated catalyst window: Wild Card Sep 29 → World Series Oct 23.
  - Round-trips are observable on-chain: NPCs −49% over 1h at 05:46; Mr Least and MrPedo about −90% within an hour [SOL].
  - Zero collisions for the name and $BLOWNSAVE.
- **Missing evidence:**
  - No sign of "blown save" being used as a crypto meme.
  - General interest looks thin: English Wikipedia "Blown save" had 0–8 daily views from Aug 25 to Sep 23, including 5 on Sep 9 (record day). The article may be a redirect, so this is only indicative.
  - The Rasmr PnL anecdote is unverified.
- **What would invalidate the thesis:**
  - No organic "blown save" usage on CT during the Wild Card round (Sep 29–Oct 3).
  - The sports audience does not overlap with Solana traders.
- **Check before launching:**
  - Confirm the Wild Card dates.
  - Watch for a viral postseason blown save as a catalyst.
  - Re-run the collision checks, including whether BLOWN on Base is real.
  - Clear the art of any team marks.

#### S5. Root Intern ($ROOTIE)
- **Evidence supporting investigation:**
  - The CFTC "agentic finance" post is still spreading, steady to slightly slowing: 434K ([CT]) → 441,452 (05:22) → 446,309 (05:45) → 449,739 (06:04), about 11.9K/h.
  - The rogue-agent news cycle is active (The Neuron, Sep 18–23).
  - The "intern with root access" metaphor has circulated since 2025.
  - Zero active collisions.
- **Missing evidence:**
  - No X data on the phrase this week.
  - The on-chain AI-agent lane is mixed at 05:46: NPCs −49% over 1h, familiars flat, and funkos ("pump.fun, but for AI agents") up from $160K (05:23) to $600K. By 06:04, funkos was $403K, familiars $1.54M and NPCs $309K: crowded and choppy.
- **What would invalidate the thesis:**
  - A harmful agent incident makes the joke tone-deaf.
  - The AI-token lane collapses.
  - A same-name coin launches.
- **Check before launching:**
  - Run a news scan for new agent incidents.
  - Review the tone to ensure no reference to real breaches or companies.
  - Re-run the collision checks.
  - Re-read the AI-agent token momentum (familiars, NPCs, funkos).

### Inferences
- MARKET INTERPRETATION: The shortlist favours **structural trench observations** (S1–S3) over news spikes, because news-spike coins peak within 1–3 hours [SOL] and mainstream memes are pre-minted within days (Q3).
- MARKET INTERPRETATION: The macro backdrop is the dominant external risk: the Deribit expiry at 09-25 08:00 UTC, PCE on 09-30, payrolls on 10-02 and CPI on 10-14 [MKT]. Hot prints would hit every concept here regardless of its quality.

### Gaps
- No X search, no Reddit, no audience testing.
- All five rest on observed behaviour plus my framing. None has proof that the specific meme will be adopted.
- The reader should re-run the Q3 and Q4 checks the next day, because stage labels can change within hours.
