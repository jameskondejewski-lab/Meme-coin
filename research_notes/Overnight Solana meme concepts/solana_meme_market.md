# Solana Meme-Coin Market Map — live on-chain/aggregator data, 2026-09-24 (04:45–05:08 UTC)

Method note (read first). All numbers come from live public APIs pulled with curl. Pull times (UTC):
- **T0 (earlier snapshots, reused and labelled):** pump.fun newest-coin sample `sample.json` (398 coins created 03:09:34–03:34:22); Jupiter lists `top_1h.json` (03:35), `tt_1h.json` (04:30), `trend1h.json` (04:39).
- **T1:** 04:45:53–04:46:12. Jupiter toptrending, toptraded and toporganicscore lists for 5m/1h/6h/24h, plus recent; pump.fun coin lists sorted by created, last trade and market cap; DexScreener boosts and profiles; GeckoTerminal trending and new pools; StonkFun stats and launches.
- **Deep-dives:** 04:48–05:02. pump.fun single-coin, RugCheck, DexScreener token-pairs and Jupiter search calls; a re-fetch of 120 random coins from the 03:09–03:34 sample at 04:49–04:50; Jupiter theme searches at ~05:00.
- **T2:** 05:04:36–05:04:56, 18.7 min after T1 and 25–35 min after the 04:30/04:39 snapshots. GeckoTerminal `new_pools` returned HTTP 429 at T2, so there is no T2 for that endpoint.
- Raw files are in `/tmp/claude-0/-home-user/d66829cd-647f-5987-9a68-4bd94c91740a/scratchpad/mkt/` (`t1/`, `t2/`, `surv/`, `inv/`, `det/`, `rc/`, `srch/`, `sf_*.json`).
- Labels: **[FACT]** means directly observed in API data or a cited article. **[INTERPRETATION]** means my market reading of those facts. **[SPECULATION]** means a social-media or narrative claim I did not verify.
- "New token" means the first pool is under 30 days old. Jupiter `mcap` and `liquidity` are USD. `vol1h` is Jupiter `stats1h` buy+sell volume.
- Jupiter lists include majors (RAY, JUP, TRUMP, ZEC…) and "Backpack Securities" tokenized stocks (HIMS, NKE, DJT, CRWV…). The meme analysis filters to new, non-stock tokens.

## 1. What is trending / most traded right now (1h / 6h / 24h), and what are the tokens about?

### Takeaway
There are three distinct leaderboards:
- **24h volume** among new tokens belongs to StonkFun's tokens paired with stocks, crypto or other memes. The RuneScape-gold economy (GP $26–27M) leads, followed by NVDAX-paired "Super Inu", SpaceX-paired "Grokification", ZEC-paired cats and cats paired with HYPE.
- **1h volume** belongs to pump.fun tokens under 6 hours old, each riding news or a single joke: NPCs, familiars.family (AI agents), Super Intelligence (Trump's AI rename), Mr Least / MrPedo (MrBeast smear coins), goon (paired with HIMS), Shartcoin.
- **The pump.fun market-cap leaderboard** is dominated by a coordinated cluster of fake "sovereign fund / oil reserve" tokens.

### Cited Findings
- [FACT] **T1 Jupiter top-traded 1h, new tokens ranked by volume.** Stocks and majors are excluded.
  - NPCs (pump.fun, 2.3h old, $555k mcap, $1.4M vol1h, 3,261 traders/1h)
  - RuneScape Gold GP (StonkFun, 16d, $26.2M, $860k, 1,541 traders)
  - MrPedo (pump.fun, 25 min, $30k, $768k, 2,651 traders)
  - Shartcoin (no launchpad tag, 3.2h, $2.4M, $499k)
  - familiars.family (pump.fun, 5.4h, $2.0M, $462k)
  - Super Intelligence SI (pump.fun, 55 min, $107k, $452k)
  - Mr Least (pump.fun, 22 min, $37k, $330k)
  - WoW Gold (StonkFun, 10d, $2.7M, $273k)
  - JOSHUA (pump.fun, 1.1h, $111k, $265k)
  - embercurve (ember, 14d, $16.4M)
  - Jean Phil (pump.fun, 4d, $4.1M)
  - goon (pump.fun, 7.2h, $673k)
  - Grokification (StonkFun, 2d, $5.5M)
  - [Jupiter toptraded/1h, 04:45:53Z](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100)
- [FACT] **T1 Jupiter top-traded 24h, new tokens.**
  - GP: $22.9M vol24h
  - familiars: $9.4M
  - Super Inu: StonkFun, NVDAX-paired, $6.5M mcap, $8.2M vol24h
  - Christmas Cracker: $7.5M
  - Paid: $6.8M
  - embercurve: $6.6M
  - Jean Phil: $6.4M
  - Bluf: $5.9M vol24h on only $150k mcap
  - Anonymous Cat ZCAT: $73.8M mcap, $5.8M vol24h
  - Shartcoin: $5.0M
  - goon: $4.5M
  - Grokification: $4.1M
  - SCHLONG: $3.1M
  - HYPERCAT: $3.0M
  - WALTER WORM: $3.0M
  - Archibald Brown: $2.8M
  - NPCs: $2.6M
  - Gigacat: $2.6M
  - Nullmask: $2.1M
  - [Jupiter toptraded/24h](https://lite-api.jup.ag/tokens/v2/toptraded/24h?limit=100)
- [FACT] **T1 Jupiter top-trending 1h, new tokens.** Duel Arena, Gnome Child, Pokémon Dollar (₽), Galway Metals (GAYMF), Beer, HYPERCAT, purrpetual, Zcash Burrito, Runescape Bond, 3RD AGE, V-BUCKS, Asmongold, Monero-Chan, Leveraged Cat, NearKat, Karate Cat, CALI, pill, Methane Capital, Trader, Hotel Lobby and Gourmet appear alongside the top-traded names. [Jupiter toptrending/1h](https://lite-api.jup.ag/tokens/v2/toptrending/1h?limit=100)
- [FACT] **What the leaders are, from token metadata.**
  - Pump.fun tokens ([pump.fun coin endpoint, e.g. /coins/{mint}](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)):
    - familiars.family: "Like @fomo, but for AI agents. Integrated with @OpenRouter"
    - Super Intelligence: "Artificial Intelligence has officially been renamed to Super Intelligence, as stated by Trump. All official government documents will refer to SI."
    - Methane Capital: "Hold METHANE, collect Fartcoin. Powered by Pump.fun Holder Rewards." It is quote-paired to Fartcoin.
    - parafactual: "Fees to @parafactual via UsePaid"
    - CALI: "The dog of Maye Musk. All fees go directly to Maye Musk via X money"
    - Bluf: "Short any pump coin, or back the ones you believe in"
    - Untaxed App: "Trade on every Solana terminal at 0% fees"
    - Mr Least: "Deployed using https://j7tracker.io"
    - goon and jorkin are quote-paired to HIMS (Hims & Hers tokenized stock)
    - "number go up" is quote-paired to SPYx
    - JOSHUA is quote-paired to Jotchua
  - StonkFun tokens ([StonkFun /tokens/{mint}](https://www.stonkfun.xyz/api/public/v1/tokens/HTmQz7My6MehV7bjhJ6jde8nDND1yvsz68d24LP7YgUQ)): no descriptions, but each has a quote pair, and the pair carries the joke.
    - RuneScape items paired with GP: Duel Arena, Beer, Christmas Cracker, Wise Old Man, Gnome Child, 3RD AGE, Runescape Bond
    - Game money paired with commodity/stock tokens: WoW Gold and Asmongold (GLDX), V-BUCKS (SILVER), Minecoin (MSFTX), Pokémon Dollar (CARDS)
    - HYPERCAT, purrpetual, SCHLONG, LeverHyppo and Max Leveraged are paired with XHYPE
    - Anonymous Cat, Nullmask, Zcash Burrito and DigiCash are paired with ZEC
    - Other pairs: Super Inu / NVDAX, Grokification / SPCXX, ALLINU / DKNG, Grindr Mascot / GRND, Galway Metals / GLDX, Lily and museinu / METAX, Feels Good Man / PEPE, Yellow Partyhat / CRACKER
- [FACT] **Cultural drivers verified off-chain.**
  - Trump announced at the UN General Assembly on 22 Sep 2026 that the federal government will call AI "super intelligence" in all official documents. [Washington Times](https://www.washingtontimes.com/news/2026/sep/22/trump-renames-artificial-intelligence-super-intelligence/); [Axios](https://www.axios.com/2026/09/22/trump-ai-super-intelligence-rebrand)
  - MrBeast faces a former employee's sexual-harassment/retaliation lawsuit, which Beast Industries denies. [Variety](https://variety.com/2026/digital/news/mrbeast-sued-former-employee-sexual-harassment-retaliation-1236728069/); [NBC](https://www.nbcnews.com/pop-culture/pop-culture-news/mrbeast-former-staffer-allegations-company-sexism-rcna341473). No source I found supports the "pedo" framing used by the MrPedo / "MrBeast Files" / "Jimmy Beastein" coins.
  - GP "trades against GLDx… 3% of every transfer goes to holders in GLDx." [gp.gold](https://gp.gold/)
  - "Every StonkFun token paired with RuneScape Gold ($GP)" is aggregated on grandexchange.gold. [grandexchange.gold](https://grandexchange.gold/)
- [FACT] **Change from T1 (04:45:53) to T2 (05:04:36).** Values are mcap, 1h vol and traders/1h, from Jupiter lists at each time.
  - Super Intelligence (pump.fun): $66k (04:30) → $76k (04:39) → $104k (T1) → $342k (T2); traders/1h 1,709 → 2,232; liquidity $10k → $26k. DexScreener showed +758% h1 and $395k at T2. [Jupiter toptraded/1h T2](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100); [DexScreener boosts/latest](https://api.dexscreener.com/token-boosts/latest/v1)
  - Grokification: $4.36M (03:35) → $5.03M (04:30) → $6.20M (04:39) → $5.51M (T1) → $5.79M (T2); vol1h $73k → $312k.
  - Super Inu (StonkFun): $6.15M → $7.0M.
  - NearKat: $6.9M → $8.1M.
  - NPCs: $243k (03:35) → $556k (T1) → $441k (T2); vol1h $1.69M (04:30) → $656k (T2).
  - familiars: $1.70M → $2.07M → $1.88M.
  - Shartcoin: $1.22M → $2.50M → $2.34M.
  - goon: $991k (03:35) → $671k → $717k.
  - Duel Arena: $2.60M → $2.18M.
  - Beer: $762k → $670k.
  - purrpetual: $523k → $413k.
  - Mr Least: $64k (04:39) → $43k → $6.3k. Liquidity $10k → $2k.
  - MrPedo: $205k (04:30) → $38k → $19k.
  - JOSHUA: $103k → $60k → $111k → $44k.
  - Methane Capital: $42k → $27k.
- [FACT] **New entrants to the 1h top-traded list at T2**, all pump.fun and under 40 min old:
  - funkos ("pump.fun, but for AI agents"; ATH $108k, $52–63k at T2)
  - Ethernity Chain ERN (ATH $55k → $9k)
  - Slop Records
  - "frog has hat" HAS ("Deployed using j7tracker.io"; ATH $55k → $19k)
  - Brood
  - Christopher Rufo coin ("Fees to @christopherrufo via UsePaid"; ATH $385k → $71–77k)
  - Sources: [Jupiter toptraded/1h T2](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100); [pump.fun /coins/{mint}](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)

### Inferences
- [INTERPRETATION] Short-window leadership (1h, 5m) is almost entirely pump.fun news or joke coins under 6h old. 24h leadership is StonkFun's longer-lived tokens paired with other assets. Use 1h lists to read memes that are forming right now, and 24h lists to read which structures keep attention.
- [INTERPRETATION] Of the tokens pulled at T1, the only clearly accelerating fresh narrative at T2 was Super Intelligence. It is news-driven (2 days old), its ticker is simple ("SI"), and it can be both pump.fun-native and NVDAX-paired. Most other hot 1h names were flat or down across the 19 minutes.

### Gaps
- No direct read of X/Telegram. Social momentum (KOL posts, reply counts) was not measured; pump.fun `reply_count` was 0 on nearly every coin, so replies appear disabled or unused.
- I did not verify who "Jean Phil", "Archibald Brown", "Hotel Lobby", "Karate Cat" or "Look Up" are beyond their metadata links (linktr.ee/JeanPhilanthrope; Instagram look_uplive "550M+ views").

## 2. Which themes are metas (several unrelated tokens) vs single breakouts, and which are EARLY / DEVELOPING / SATURATED / fading?

### Takeaway
The strongest multi-token meta is **"pair the joke with the right asset"** (StonkFun, and pump.fun since its Custom Pairs feature). Inside it, three themes are clearly multi-token:
- **video-game currencies**, led by the RuneScape GP economy (714 GP-paired tokens)
- **cats paired with an ecosystem token** (on HYPE, ZEC, NEAR and more)
- **gooning / sexual jokes paired with HIMS or TSLAX**

Fresh multi-token news metas are Super Intelligence (EARLY→DEVELOPING), MrBeast smear coins (SATURATED/dead within an hour), NPCs (single breakout plus clones, now cooling) and "X, but for AI agents" launchpad/agent coins (DEVELOPING, cloning fast).

### Cited Findings
- **Video-game currency / RuneScape nostalgia.** Status: GP core MATURE; RuneScape derivatives SATURATED; other-game currencies DEVELOPING.
  - [FACT] GP: $26.2–27.3M mcap, 20.8k holders, organic score 93, created ~8 Sep, paired with GLDX. [Jupiter toptraded/24h](https://lite-api.jup.ag/tokens/v2/toptraded/24h?limit=100)
  - [FACT] StonkFun lists 714 tokens with GP as the quote asset. The first page shows 58 "new" and 42 "graduated". [StonkFun /tokens?quoteMint=GP](https://www.stonkfun.xyz/api/public/v1/tokens?quoteMint=HTmQz7My6MehV7bjhJ6jde8nDND1yvsz68d24LP7YgUQ&pageSize=100)
  - [FACT] The GP-paired tokens are deep lore: Party Hat, Halloween Mask, Zezima, Durial321, Bob the Jagex Cat, Fire Cape, "Lvl 3", "99 PRAYER", "Doubling Money", "BUYING GF", "follow me" (the lure scam), Ranarr Weed, 2147m (the max cash stack), Grand Exchange-Traded Fund and more.
  - [FACT] Several graduated in a burst on 17–18 Sep, and new ones are still spawning on 23–24 Sep.
  - [FACT] Partyhat colours are paired to Christmas Cracker (the in-game item they drop from): Blue $418k, Red $158k, Yellow $190k, Purple $177k. [Jupiter search "partyhat"](https://lite-api.jup.ag/tokens/v2/search?query=partyhat)
  - [FACT] New GP-paired launches in the last hour include SAILING, ZULRAH, KBD, DWARF, CABBAGE, MOLE, LOOT, MINER and STAFF. WoW-themed launches on the WOW quote include ARTHAS, THRALL and SIPHONLIFE. [StonkFun launches](https://www.stonkfun.xyz/api/public/v1/launches?pageSize=100)
  - [FACT] The theme is spreading to other games and platforms:
    - "RuneScape Classic" (1h old, DexScreener-boosted: "The Solana RuneScape meta is real")
    - RuneBot on pump.fun
    - V-BUCKS / SILVER
    - Minecoin / MSFTX
    - Pokémon Dollar / CARDS
    - Minecraft Gold
    - a "Gil" (Final Fantasy) profile
    - "LEEEEROY JENKINS"
    - Auction House
    - Sources: [DexScreener token-profiles](https://api.dexscreener.com/token-profiles/latest/v1); [Jupiter toporganicscore/1h T2](https://lite-api.jup.ag/tokens/v2/toporganicscore/1h?limit=100)
  - [FACT] Velocity is flat to down: GP 1h −4% at T2; Duel Arena $2.60M → $2.18M; Beer $762k → $670k; Christmas Cracker $4.04M → $3.90M.
- **Super Intelligence (Trump's AI rename).** Status: EARLY→DEVELOPING.
  - [FACT] Jupiter search shows at least 10 matching tokens under 24h old; the search caps at 20 results. [Jupiter search](https://lite-api.jup.ag/tokens/v2/search?query=super%20intelligence)
  - [FACT] An earlier pump.fun "Super Inu" (launched ~03:1x, Truth Social link) graduated with a $606k ATH and was ~$2.1k by 04:49. [pump.fun coin re-fetch](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)
  - [FACT] The current leader went from $104k to $342k between T1 and T2.
- **NPCs.** Status: single breakout plus clones, cooling.
  - [FACT] NPCs (wenpc.family) hit a $1.018M ATH on pump.fun, then $441k at T2. [pump.fun last-trade list](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=last_trade_timestamp&order=DESC&includeNsfw=false)
  - [FACT] Two same-ticker PumpSwap clones had ~$0.9–1.0M vol24h each within about an hour of creation. [DexScreener tokens](https://api.dexscreener.com/tokens/v1/solana/5tYKsG8jhMVGfhhfSWqDAsLYXmDRB5qewYcDRo26Hip3,h8aUjirc7iT8Um9jj6Nr8pHSbCvL8EGwom7Ux5wM6Kg)
- **AI-agent platforms and "X, but for AI agents".** Status: DEVELOPING, cloning fast.
  - [FACT] familiars.family runs "a public board where AI agents trade Solana with real money… pick a brain, name it, fund it". [familiars.family](https://familiars.family/)
  - [FACT] Agent child tokens link to familiars agent pages: Trader ($78–81k) and Familiarscat.
  - [FACT] Copycats appeared within hours: funkos ("pump.fun, but for AI agents"), Gourmet ("Launch a token. Give it a brain"), done.fun, "The Launchpad" ($140k), Brood.
  - [FACT] A same-name "familiars.family" pump.fun clone was 29 minutes old at T1 with a $4.6M "mcap". A separate PumpSwap familiars clone did $3.78M volume within ~20 minutes of creation. [DexScreener tokens](https://api.dexscreener.com/tokens/v1/solana/GnujopSi5kwAAgF4sdGW29eHsXH1hTEsiZhpK1nowcc6)
  - [FACT] An adjacent micro-theme is coins named after AI-Twitter personalities or artifacts: parafactual (links repligate), Computer-10 (Hugging Face cosmicoptima/computer-10), Lysios (links elder_plinius). [Jupiter toptrending/5m T1](https://lite-api.jup.ag/tokens/v2/toptrending/5m?limit=100)
- **Fee-routing to a real person ("Fees to @X via UsePaid").** Status: DEVELOPING; the infrastructure token holds up while each person-coin fades fast.
  - [FACT] Paid (usepaid.app): $7.9–8.3M, stable, 32k holders.
  - [FACT] CALI (fees to Maye Musk): $1.52M → $1.61M.
  - [FACT] parafactual: $210k → $148–174k.
  - [FACT] Christopher Rufo: ATH $385k → $77k.
  - [FACT] Methane Capital (holder rewards in Fartcoin): $42k → $27k.
  - [FACT] "Double" ("Hold $DOUBLE. Earn $PUMP… 3% tax redistributed in $PUMP").
  - Sources: [Jupiter lists T0–T2](https://lite-api.jup.ag/tokens/v2/toptrending/1h?limit=100); [DexScreener token-profiles](https://api.dexscreener.com/token-profiles/latest/v1)
- **Cats paired with an ecosystem token (on HYPE, ZEC, NEAR and more).** Status: template SATURATED; the perps variant is fading.
  - [FACT] StonkFun top-by-volume includes Raydium Cat / RAY, Hypurr / HYPE, NearKat / NEAR, Ape Cat / APE, ninjacat / INJ, CypherCat / CYPH, Buy The Cat / WBTC, SOMETHING THE CAT / SPX, Gigacat / GIGA and Anonymous Cat / ZEC ($73.6M). [StonkFun /tokens?sort=volume](https://www.stonkfun.xyz/api/public/v1/tokens?sort=volume&pageSize=50)
  - [FACT] The XHYPE-paired leverage batch (HYPERCAT, LeverHyppo, purrpetual, SCHLONG) was created on 2026-09-23 between 17:33 and 17:41 UTC, an eight-minute burst.
  - [FACT] HYPERCAT is flat at ~$1.5M, and RugCheck flags a single holder with 40.24%. purrpetual, LeverHyppo and Max Leveraged are down T1→T2. [RugCheck HYPERCAT](https://api.rugcheck.xyz/v1/tokens/7Qy2cXpdj4Fu2DUPVWdN3oogM3JSwLUV2LZaKVgVcPZh/report/summary)
- **Privacy coins / Zcash.** Status: DEVELOPING/maturing, anchored by ZEC's own flow.
  - [FACT] ZEC trades $77M/24h on Solana. Anonymous Cat is at $73.6M; Nullmask is $3.9M at 20h old (+43,077% in 24h).
  - [FACT] Smaller names: Zcash Shielded Assets ($0.5M, pump.fun, ZEC quote), Monero-Chan ($0.64M), Fedora Cat (XMR quote), Zcash Burrito ($29–40k).
  - [FACT] Jupiter search "zcash" shows at least 15 tokens under 24h old. [Jupiter search zcash](https://lite-api.jup.ag/tokens/v2/search?query=zcash)
- **Gooning / sexual humour paired with sexual-health or Tesla stock.** Status: SATURATED (spam).
  - [FACT] goon paired with HIMS reached ~$0.7M with $4.5M vol24h.
  - [FACT] Jupiter search shows at least 18 "goon" tokens under 24h old. [Jupiter search goon](https://lite-api.jup.ag/tokens/v2/search?query=goon)
  - [FACT] StonkFun's last 100 launches (04:14–04:45) included 10+ PENIS / PENIS42069 / CyberPenis / Cockla / tesladick tokens on TSLAX, and ORGY / edge / HIM / Goonette / GOONINU on HIMS or PTN. [StonkFun launches](https://www.stonkfun.xyz/api/public/v1/launches?pageSize=100)
- **MrBeast smear coins.** Status: SATURATED/dead within an hour; high legal risk.
  - [FACT] Jupiter search shows at least 18 "mrbeast"-matching tokens under 24h old, including "The MrBeast Files" ×2 at ~$3.3–5.6k mcap with ~$140k volume each. [Jupiter search mrbeast](https://lite-api.jup.ag/tokens/v2/search?query=mrbeast)
  - [FACT] Mr Least and MrPedo each lost about 90% within 40–60 minutes of launch (figures in section 1).
- **Food and drink.** Not a standalone meta.
  - [FACT] "Beer" is a RuneScape item paired with GP. "Zcash Burrito" is ZEC-paired. A "glizzy" hot-dog cluster (glizzuck, glizzy, glucc, GLIZZIES) appeared on METAX at T2. Jupiter search finds at least 16 "beer" and 19 "burrito" tokens under 24h old, most tiny. [StonkFun launches T2](https://www.stonkfun.xyz/api/public/v1/launches?pageSize=100); [Jupiter search burrito](https://lite-api.jup.ag/tokens/v2/search?query=burrito)
- **Phrase / "number go up" coins.** Status: fading.
  - [FACT] "number go up" (paired with SPYx): $96k → $68k → $55k.
  - [FACT] Get Rich Overnight (QQQX): $39.5k.
  - [FACT] Boosted "PEPEUP" is dead at a $2.5k mcap with $1.04M vol24h.
- **Characters and personas.**
  - [FACT] Jean Phil: $4.1–4.4M, 4 days old, rising at T2.
  - [FACT] Archibald Brown: a derivative "rival" whose description reads "Jean's got a croissant, I've got hands". $338k → $378k.
  - [FACT] Official Jean Coin: ~$0.67–0.80M.
  - [FACT] Baby Jean: dead at $2.3k.
  - [FACT] Other single-character coins: BIKE TYSON (ATH $12.1M → $1.7M), BAKARI "The Disney Gorilla" (news link; ATH $493k → $67k), CALI (Maye Musk's dog).
- **Bodily humour / Fartcoin derivatives.**
  - [FACT] Shartcoin: launched via kids.fun, links a YokaiCapital tweet; $2.3–2.5M mcap with ~$408–422k liquidity; ≥18 "shart" clones under 24h old.
  - [FACT] Queefcoin paired with Fartcoin ($530k). Methane Capital paired with Fartcoin.
  - Sources: [DexScreener tokens](https://api.dexscreener.com/tokens/v1/solana/UpBBfyC75u3kxDGWmmmW2yauk9YY3CqZhdt1KUDkids); [Jupiter search shart](https://lite-api.jup.ag/tokens/v2/search?query=shart)

### Inferences
- [INTERPRETATION] The mechanism that recurs is **"the joke is the pair"**. The meme's meaning comes from what it is priced in:
  - game gold priced in real gold
  - a partyhat priced in the cracker it drops from
  - gooning priced in HIMS
  - AI "super intelligence" priced in NVIDIA
  - Grok priced in SpaceX
  - a USEFUL coin priced in USELESS
  This lets a meme borrow the attention and liquidity of an existing community. It is the richest vein for new concepts, but plain "cat-of-X" and "penis-on-TSLA" pairs are exhausted.
- [INTERPRETATION] **Nested lore works when the fandom is real and deep.** RuneScape has hundreds of in-jokes (Zezima, Durial321, "buying gf", doubling money), so each child token is recognisable to the same audience. That is why the GP economy has kept spawning for ~16 days. Look for other deep-lore, nostalgic, adult-gamer universes with native currencies that are not yet saturated. WoW, V-Bucks, Minecraft, Pokémon and FF Gil have been touched but are still small.
- [INTERPRETATION] Timing classification:
  - **EARLY:** Super Intelligence (news 2 days old, leader 1h old and accelerating); AI-Twitter-personality coins; non-RuneScape game currencies.
  - **DEVELOPING:** AI-agent launchpads/boards (familiars-style); fee-routing person-coins (Paid); Zcash/privacy; Grokification/SpaceX pairs; character universes (Jean Phil).
  - **SATURATED:** RuneScape child tokens; cat-of-ecosystem pairs; goon/penis pairs; MrBeast smear; NPC clones; "fund/reserve" names (scam cluster).
  - **FADING:** cats on perps (PURRP, LeverHyppo), number-go-up phrase coins, "Methane"-style reward wrappers, JOSHUA.

### Gaps
- Jupiter search returns at most 20 results, so the counts of tokens under 24h per theme are lower bounds, not totals.
- No social-volume data (X mentions, Telegram sizes) was available to confirm which metas are growing off-chain.

## 3. Launchpad landscape: pump.fun vs StonkFun vs letsbonk.fun vs Meteora DBC vs others

### Takeaway
pump.fun is still the volume engine for new launches (~1,000–1,150 non-NSFW launches/h; ~73% of Jupiter's "recent" feed) and dominates 1h volume. StonkFun (Raydium LaunchLab, stock/asset-paired) launches ~140–190 tokens/h but owns 24h staying power: it has the most new tokens in the 24h top lists and 41–60% of their 24h volume. letsbonk.fun is effectively absent. Meteora DBC, ember, bags.fun, jup-studio and the new kids.fun are niche. pump.fun has copied StonkFun's model with "Custom Pairs", and ~7–8% of its launches now use non-SOL quotes.

### Cited Findings
- [FACT] **pump.fun launch rate** (non-NSFW only; the `includeNsfw=false` filter, so the true total is higher):
  - 100 newest over 5.4 min (04:40:34–04:45:56) → ~1,118/h
  - 200 newest over 10.4 min ending 05:04 → ~1,152/h
  - the 03:09–03:34 sample: 398 in 24.8 min → ~963/h
  - Sources: [pump.fun created list](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false); sample.json (03:34)
- [FACT] **Jupiter "recent" feed.** T1: 30 tokens in 1.2 min — pump.fun 22, StonkFun 5, met-dbc 2, untagged 1. T2: 30 in 1.3 min — pump.fun 22, untagged 4, StonkFun 3, met-dbc 1. letsbonk.fun: 0 in both. [Jupiter recent](https://lite-api.jup.ag/tokens/v2/recent?limit=100)
- [FACT] **StonkFun activity** (all from [StonkFun stats](https://www.stonkfun.xyz/api/public/v1/stats) and [StonkFun launches](https://www.stonkfun.xyz/api/public/v1/launches?pageSize=100)):
  - Stats generated 04:41:57: 123,924 total launches; 3,694 graduated (2.98% lifetime); 93,061 "reward" launches (75%); total mcap $1.009B; 24h volume $65.5M; graduation mcap $40k; `launchLabEnabled: true`; `pumpLaunchesEnabled: false`.
  - Stats generated 05:04:46: 123,977 total, i.e. +53 in 22.8 min → ~140/h. Graduated was unchanged at 3,694.
  - Launch feed at T1: 100 launches over 31.0 min → ~193/h. All `launchpad: launchlab`, 80% reward mode, transfer fees of 100 bps (49) or 300 bps (31).
  - Most-used quotes at T1: TSLAX 16, GP 13, SOL 9, HIMS 6, METAX 5, WOW 5, GLDX 4.
- [FACT] **StonkFun daily revenue.** It was $31–186k/day in late July through 5 Sep, jumped to $1.51M on 6 Sep, peaked at $2.21M on 11 Sep and $2.11M on 21 Sep, and was ~$1.5M/day on 22–23 Sep. The platform is not fading. [StonkFun revenue/history](https://www.stonkfun.xyz/api/public/v1/revenue/history)
- [FACT] **StonkFun background.** It integrated Raydium LaunchLab and "lets users launch memecoins paired with tokenized stocks and other assets". STONK rose more than 250% to ~$140M at the time; it is now $295M mcap and $57.5M vol24h on Jupiter. [The Block on X](https://x.com/TheBlockCo/status/2096704326232342748); [Jupiter toptrending/1h](https://lite-api.jup.ag/tokens/v2/toptrending/1h?limit=100)
- [FACT] **pump.fun Custom Pairs** (reported ~10 Sep 2026):
  - 93 quote assets, including tokenized NVDA, TSLA and the S&P 500, plus Backpack Securities stocks via Sunrise/Wormhole
  - creator fees of 0.05–1% paid in the quote asset
  - 50% of revenue to the PUMP buy-and-burn
  - Sources: [FXStreet](https://www.fxstreet.com/cryptocurrencies/news/pumpfun-launches-custom-pairs-for-tokenized-stocks-and-real-world-assets-on-solana-202609100558); [The Defiant](https://thedefiant.io/news/defi/pump-fun-lets-creators-launch-coins-priced-in-tokenized-stocks)
  - Observed quote mix: non-SOL quotes were 8% of the 100 newest pump.fun coins at T1 and 7% of the 200 newest at T2. Seen quotes include USDC, PUMP, ZEC, Fartcoin, Jotchua, LMAO!, SPYx, PLTRx, MCDx, UBERx, MSFTx, HIMS, NKE and SUI. [pump.fun created list](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false); [Jupiter search of quote mints](https://lite-api.jup.ag/tokens/v2/search?query=HiMSSzzwkZkrXJ4PGVJRdtfLaANeAztjjcgk5Dxe7Lwx)
- [FACT] **Launchpad share among new tokens in Jupiter top-100 lists.** Counts, then volume share of those new tokens:

  | List | Counts | Volume share |
  |---|---|---|
  | T1 toptraded 1h | pump.fun 16, StonkFun 16, untagged 6, ember 1, met-dbc 1 | pump.fun 48%, StonkFun 25%, untagged 24% |
  | T1 toptraded 24h | StonkFun 14, pump.fun 10, untagged 8, ember 2, raydium-launchlab 1 | StonkFun 41%, pump.fun 27%, untagged 25%, ember 6% |
  | T1 toptrending 24h | StonkFun 38, pump.fun 18 | StonkFun 60%, pump.fun 25% |
  | T2 toptrending 1h | StonkFun 19, pump.fun 17 | pump.fun 71%, StonkFun 19% |

  - letsbonk.fun had zero tokens under 30 days old in any T1 or T2 list. [Jupiter toptraded/24h](https://lite-api.jup.ag/tokens/v2/toptraded/24h?limit=100)
- [FACT] **Other launchpads seen:**
  - ember: embercurve $16.4M, WALTER WORM, sally the sloth, Met, Ember5 Index, Flame, This is Fine
  - met-dbc: 牛来 $0.96M, metball, MrLeast clones on Meteora
  - bags.fun: SALVOR
  - jup-studio: 1 token
  - raydium-launchlab direct: RUNUP, LESGO
  - kids.fun: Shartcoin; mint suffix "kids", website kids.fun
  - Sources: [Jupiter lists](https://lite-api.jup.ag/tokens/v2/toptraded/5m?limit=100); [DexScreener tokens](https://api.dexscreener.com/tokens/v1/solana/UpBBfyC75u3kxDGWmmmW2yauk9YY3CqZhdt1KUDkids)
- [FACT] **Graduation within the ~90-minute sample.** Of 119 re-fetched pump.fun coins, 3 (2.5%) had `complete=true`. [pump.fun /coins/{mint} re-fetch 04:49Z](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)
- [FACT] **Cross-chain competition for boosts.** Robinhood chain held 16 of the 30 DexScreener top boosts and 7–8 of the 30 latest boosts; Solana held 11 top and 18–19 latest. [DexScreener boosts/top](https://api.dexscreener.com/token-boosts/top/v1)

### Inferences
- [INTERPRETATION] Where to launch depends on the concept. A news-reactive joke wants pump.fun's retail and bot flow and its 1h discovery. A concept whose joke is a pairing, or that needs a multi-day community economy, fits StonkFun (or pump.fun Custom Pairs). StonkFun's 24h leaders are older (days to weeks) and hold $1–30M. Many StonkFun tokens also carry 1–3% transfer fees that reward holders in the quote asset.
- [INTERPRETATION] letsbonk.fun's absence from every top list suggests the BONK-launchpad cycle has passed. Meteora DBC appears mainly as a venue for clones.

### Gaps
- No graduation rate for pump.fun as a whole: its API has no aggregate stats, and the trade-history endpoint (`/trades/all/{mint}`) kept rejecting the chainId parameter with HTTP 400. Live data unavailable — this is an analytical assumption rather than current market data. Endpoint: https://frontend-api-v3.pump.fun/trades/all/{mint}
- No per-hour launch counts for letsbonk.fun, Meteora DBC, ember or kids.fun from their own APIs; the only view is Jupiter's recent feed (30 tokens, ~1.2 min).

## 4. Market-cap ranges and ages that attract volume; how fast tokens die; what share of launches get outside buyers

### Takeaway
Two bands attract volume:
- tokens **0–6h old at $10k–$600k**, the 1h flow on pump.fun
- tokens **1–30 days old at $1–30M**, the 24h flow, mostly StonkFun

The median new token in the 1h top-traded list has a ~$1.3–1.4M mcap. About 82% of pump.fun launches trade with at least one other wallet, but only ~37% reach 10 traders and ~8% reach 100. About 17% ever reach a $10k ATH, ~2% are above $10k 1.5 hours later, and 95% have stopped trading within ~1.5 hours.

### Cited Findings
- [FACT] **Mcap buckets of new, non-stock tokens.** Share of the list's volume in brackets.
  - **T1 toptraded 1h** (37 tokens):
    - <$50k: 5 (14%)
    - $50–300k: 6 (11%)
    - $300k–1M: 7 (22%)
    - $1–3M: 6 (17%)
    - $3–10M: 8 (12%)
    - $10–100M: 4 (15%)
    - >$100M: 1 (9%, GETTR, a fake-mcap token)
    - Median $1.40M. Ages: <1h 4, 1–6h 9, 6–24h 1, 1–3d 7, 3–7d 3, 7–30d 13.
  - **T2 toptraded 1h:** median $1.26M; 7 tokens under 1 hour old.
  - **T1 toptraded 24h** (30 tokens): median $1.34M; the $3–10M bucket took 28% of volume and $10–100M took 26%.
  - **T1 toptrending 1h** (53 tokens): median $469k; the $1–3M bucket and the <$50k bucket each took 28% of volume.
  - Sources: [Jupiter toptraded/1h](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100); [Jupiter toptraded/24h](https://lite-api.jup.ag/tokens/v2/toptraded/24h?limit=100); [Jupiter toptrending/1h](https://lite-api.jup.ag/tokens/v2/toptrending/1h?limit=100)
- [FACT] **pump.fun launch baseline.** Median mcap of the newest coins was ~$3.2–3.3k. Within ~5 minutes of creation, 21–22% were above $5k and 10–13% above $10k; 37–38% already had an ATH above $5k. 28–34% set a Twitter/X link and 23% a website. [pump.fun created list T1/T2](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false)
- [FACT] **Survival sample, pump.fun only.** 119 random coins created 03:09–03:34, re-fetched at 04:49 when they were ~75–100 min old:
  - ATH >$5k: 34%
  - ATH >$10k: 17%
  - ATH >$20k: 6%
  - ATH >$50k: 3%
  - graduated: 3 (2.5%)
  - current mcap >$5k: 3%; >$10k: 2%
  - current mcap below launch (~$3.1k): 23%
  - traded in the last 15 minutes: 5%
  - any trade more than 10 minutes after creation: 47%
  - time from creation to last trade: median 6.7 min, p75 30 min, p90 62 min
  - reply_count >0: 0%
  - Source: [pump.fun /coins/{mint}](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)
- [FACT] **Outside-buyer proxy from Jupiter trader counts** for the same 120 coins (all 120 were indexed):
  - ≥2 traders: 82%
  - ≥5: 52%
  - ≥10: 37%
  - ≥20: 22%
  - ≥50: 10%
  - ≥100: 8%
  - Median 6 traders; median current holder count 2; only 5 of 120 had ≥10 holders.
  - Source: [Jupiter search, batched mints](https://lite-api.jup.ag/tokens/v2/search?query=E8czQWra3eBvewng1AEmJoi26JXkJicptnvgKcgWpump)
- [FACT] **What the sample's winners looked like.** All three graduated coins peaked at $338k–$607k and were ~$2.1k within ~70–90 min (about −99.6%): "Super Inu" (a Truth Social link), "Starbucks Corporation" (links x.com/Starbucks) and "Pokemon". The next tier had 10–35k ATHs; a 25-minute window produced 47 launches all named GROKPOD. [pump.fun re-fetch](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)
- [FACT] **Turnover in the top lists.** Of 53 new tokens in T1's toptrending 1h, 27 (51%) had left it 18.7 min later. The toptraded 1h list changed less: 8 left and 9 entered, out of ~40. Fresh-launch half-lives:
  - Mr Least: $64k → $6k in ~20 min (liquidity $10k → $2k)
  - MrPedo: ATH $230k → $19k in ~45 min
  - funkos: ATH $108k → $63k in ~20 min
  - Ethernity Chain: ATH $55k → $9k in ~25 min
  - Sources: [Jupiter toptrending/1h T1 vs T2](https://lite-api.jup.ag/tokens/v2/toptrending/1h?limit=100); [pump.fun /coins/{mint}](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)

### Inferences
- [INTERPRETATION] A new pump.fun launch has roughly a 1-in-6 chance of briefly touching $10k and about a 1-in-50 chance of holding above $10k after 90 minutes. Most "outside buyers" in the first minutes are sniper or bundle bots. Launching is not the bottleneck; the first 10–30 minutes of attention are.
- [INTERPRETATION] Fresh tokens that make the 1h top lists typically trade at $20k–$350k with 700–2,700 traders/h. Anything that survives past about 6h and $1M tends to migrate into the multi-day $1–10M band, where the 24h volume sits.

### Gaps
- Trader counts include the creator, bundlers and snipers; no per-wallet trade data was available (see the pump.fun trades endpoint gap above).
- The survival sample covers ~90 minutes of age. No multi-day cohort was measured.

## 5. Red flags and false signals: wash volume, bots, paid boosts, fake market caps, brand impersonation

### Takeaway
The biggest false signal is the **pump.fun market-cap leaderboard**. 50 of the 55 coins in its top 100 that were under 14 days old belong to one cluster of "Fund / Reserve / Oil Supply / Dividend" tokens. Together they show $9.0–9.3B of "market cap", driven by one-directional buying from correlated wallets, not by fake quote mints. The parent's hypothesis that these came from custom quote mints is **wrong for USDF and TDOF**: they are quoted in native SOL. A separate custom-quote display artifact does exist (EATS / UBERx).

Other red flags:
- **volume far above liquidity:** 50–450× vol24h/liquidity on many fresh tokens
- **boosts on dead tokens**
- **same-ticker clone pools:** multi-million volume within minutes, with liquidity above market cap
- **brand-impersonation coins that graduate within minutes and then go to zero**

### Cited Findings
- [FACT] **The fund/reserve cluster.**
  - Tickers in the pump.fun top 100 by mcap (T1): USDF, TDOF, VSOF, AROS, WOTF, WSOS, ECTF, NTDA, USWR, WWR, OURA, USMS, UDR, FAIR, SAI. Many tickers appear several times.
  - 50 of 55 top-100 coins under 14 days old are in this cluster. Aggregate "mcap" was $9.02B at T1 and $9.29B at T2; 7 of them were created within the hour before T2.
  - All have `complete=true`, quote = native SOL, virtual reserves exactly 115.005 SOL / 279.9M tokens (the graduation constants), reply_count 0, and almost no Twitter links. Websites include usdf.live, tdof.live, aros.help, uswr.ai and wotf.site.
  - Source: [pump.fun sort=market_cap](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=market_cap&order=DESC&includeNsfw=false)
- [FACT] **Deep-dive at 04:48 UTC.** Pool data from DexScreener; holders and organic score from Jupiter.

  | Token | Mcap | PumpSwap pool | 24h buys vs sells | 24h vol | Holders | Organic score | Other |
  |---|---|---|---|---|---|---|---|
  | USDF "United States Dividend Fund" (AHG5Jm…pump) | $687M | $2.36M liq (10,249 SOL + 1.72M tokens) | 22,633 vs 5,075 | $1.62M | 2,593 | 0 | Website usdf.live |
  | TDOF "Trump Digital Oil Fund" (JSRJiK…pump) | $341.6M | $1.66M liq (7,216 SOL) | 31,544 vs 615 | $0.98M | 1,942 | 0 | Twitter field = a Solscan link |
  | AROS "American Reserved Oil Supply" (12PUFA…pump) | $3.26B | $5.14M liq (22,323 SOL vs 789,612 tokens left) | 83,607 vs 1,455 | $1.12M | 2,124 | 0 | Description "3477719" |
  | VSOF (gBii…pump) | $1.96B | $3.99M liq | 83,638 vs 1,424 | not recorded | 2,143 | 0 | — |

  - RugCheck flags every one with "High market cap per holder" and "High holder correlation".
  - Sources: [DexScreener token-pairs USDF](https://api.dexscreener.com/token-pairs/v1/solana/AHG5JmpeXhbKss3bDzhzA9C7iTkq7CxgeXuYGNtXpump); [DexScreener token-pairs TDOF](https://api.dexscreener.com/token-pairs/v1/solana/JSRJiKV6M1HcrQRkEDEd98XsdX6C59ibrdmSW9mpump); [DexScreener token-pairs AROS](https://api.dexscreener.com/token-pairs/v1/solana/12PUFAUzgLj1onv3wSqX9ZagZBiaxofEjTd24CnQpump); [Jupiter search](https://lite-api.jup.ag/tokens/v2/search?query=AHG5JmpeXhbKss3bDzhzA9C7iTkq7CxgeXuYGNtXpump); [RugCheck](https://api.rugcheck.xyz/v1/tokens/AHG5JmpeXhbKss3bDzhzA9C7iTkq7CxgeXuYGNtXpump/report/summary); [pump.fun coin TDOF](https://frontend-api-v3.pump.fun/coins/JSRJiKV6M1HcrQRkEDEd98XsdX6C59ibrdmSW9mpump)
- [FACT] **Custom-quote mcap artifact (separate issue).** pump.fun lists "Uber Eats" (EATS, quote UBERx) at a $38.97M mcap. Jupiter shows a $68k mcap, $0 liquidity, 1 holder and $0 vol24h. [pump.fun sort=market_cap](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=market_cap&order=DESC&includeNsfw=false); [Jupiter search](https://lite-api.jup.ag/tokens/v2/search?query=8dJpCw1JurBZQGNeYwqVJkqs3DTjtYW5wcFXzCpmpump)
- [FACT] **Other fake-mcap tokens in Jupiter lists.**
  - GETTR Token: $2.0B mcap on $298k liquidity (mcap/liquidity 6,776×), organic volume 1.2%. It was #4–9 in toptraded 1h/5m.
  - DexFun: 2,784×.
  - Clanker (StonkFun): 102×.
  - Source: [Jupiter toptraded/5m](https://lite-api.jup.ag/tokens/v2/toptraded/5m?limit=100)
- [FACT] **Volume far above liquidity** (vol24h ÷ liquidity, T1):
  - Computer-10: 445×
  - GOWF: 368× ($2.0M vol, $5.5k liquidity, $10k mcap)
  - SCHLONG: 290×
  - Bluf: 267× ($5.9M vol on $22k liquidity)
  - jorkin: 232×
  - Max Leveraged: 204×
  - goon (StonkFun): 202×
  - Gigacat: 183×
  - DigiCash: 171×
  - Untaxed App: 169×
  - CoreWeave tokenized stock: 163×
  - Source: [Jupiter lists T1](https://lite-api.jup.ag/tokens/v2/toptraded/24h?limit=100)
- [FACT] **Organic share is low even for the leaders.** Jupiter's organic buy+sell share of 24h volume was 2–5% for most fresh leaders: NPCs 4.7%, familiars 4.3%, Super Intelligence 3.4%, MrPedo 2.5%, "number go up" 2.1%. [Jupiter toptraded/1h](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100)
- [FACT] **Clone pools.** Same-ticker pools created directly on PumpSwap or Meteora, without a bonding curve:
  - familiars clone: $3.78M volume, $167k liquidity, $97k mcap, created ~20 min before
  - goon clone: $2.57M volume, $163k liquidity, $95k mcap, created minutes before
  - Mr Least clones on Meteora: $828k and $121k volume; one had $2.74 of liquidity
  - Source: [DexScreener tokens](https://api.dexscreener.com/tokens/v1/solana/GnujopSi5kwAAgF4sdGW29eHsXH1hTEsiZhpK1nowcc6,BedeHX6sUjNe1En64232sxgxVmhLFai3gqwWpXsSNzeT,9auytGey22kgBGhckgSDU9TnX8gYso949iHcdjJMxkja,SLWQ4WsqnCKdoGap6BLHkLbGk72u7ZEuYt95LgN3y5e)
- [FACT] **Paid DexScreener boosts on dead or near-dead tokens.**
  - Baby Jean: 100 boosts; $2.4k mcap, $1.53M vol24h
  - Hyper Inu: 50 boosts; $2.6k, $1.38M
  - PEPEUP: 30 boosts; $2.5k, $1.04M
  - INU TOWN: 150 boosts; $5.8k, liquidity $0
  - Just Wuf: $3.4k
  - The boost feed barely changed between T1 and T2: GAS, Gigacat and a second 30-boost for Super Intelligence were the only additions.
  - Source: [DexScreener token-boosts/top](https://api.dexscreener.com/token-boosts/top/v1)
- [FACT] **Brand and celebrity impersonation.**
  - 12 coins in pump.fun's last-traded list had graduated within 1 hour of creation, all with 0 replies. Among them:
    - "fomo" (Twitter x.com/fomo): $720k at 22 min
    - "BMW Web3" (x.com/BMW): $363k at 6 min
    - "Samsung Group Global": $871k at 25 min
    - "MrBeast": $377k at 1 min
    - "UNITED DIVIDEND RESERVE": $6.45M at 1 min
    - "NTDA": $62.6M at 11 min
    - "AROS": $31.5M at 17 min
    - a "familiars.family" clone: $4.6M at 29 min
  - "Hermes" (Twitter x.com/Hermes_Paris) was "Deployed using j7tracker.io".
  - "Starbucks Corporation" (Twitter x.com/Starbucks) peaked at $535k and fell to $2k.
  - McDonald's appears as parody pairing rather than impersonation: RONALD paired with MCDX on StonkFun, and SIDE EYE HORSE paired with MCDx on pump.fun.
  - Sources: [pump.fun last-trade list](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=last_trade_timestamp&order=DESC&includeNsfw=false); [StonkFun launches](https://www.stonkfun.xyz/api/public/v1/launches?pageSize=100)
- [FACT] **RugCheck flags on current leaders.**
  - HYPERCAT: single holder 40.24% (danger)
  - Duel Arena: LP 100% unlocked, single holder 20%
  - Beer: LP 100% unlocked; liquidity $1,291 in the pool RugCheck reads
  - GP and NPCs: "Copycat token" warnings
  - Mr Least: liquidity $2,174
  - Source: [RugCheck summaries](https://api.rugcheck.xyz/v1/tokens/12PUFAUzgLj1onv3wSqX9ZagZBiaxofEjTd24CnQpump/report/summary)

### Inferences
- [INTERPRETATION] The fund/reserve cluster's prices are "real": they are set by real SOL in constant-product PumpSwap pools. But the buying is one-directional (buys outnumber sells up to ~57:1) and comes from ~2,000 correlated wallets per token. The operator controls most of the float and can withdraw the pooled SOL by selling. That pattern fits chart-painting that makes a fake fund look like a steadily rising asset, plausibly as a lure for victims sent off-platform to the fund-style websites (a pig-butchering-style funnel). These tokens should be excluded from any market-cap or "what's working" analysis. **Never** name a concept "Fund", "Reserve", "Dividend" or "Oil Supply": that aesthetic is now linked to a scam cluster.
- [INTERPRETATION] Filters to use before trusting any token on a list:
  - **Volume:** discount volume when vol24h/liquidity is above 50×, organic share is under 5%, or buys outnumber sells by more than 10:1.
  - **Liquidity:** discount a pool whose liquidity is larger than its market cap.
  - **Graduation speed:** treat a graduation in under 30 minutes with zero social links as a bundle.
  - **Market cap:** ignore pump.fun mcap for non-SOL-quoted coins unless it is cross-checked with Jupiter or DexScreener.
  - **Boosts:** a paid DexScreener boost is not evidence of survival.

### Gaps
- I could not see where proceeds from the fund cluster go, or whether victims are being solicited off-platform. That would need wallet tracing and off-platform evidence, and remains speculation.
- The organic-volume metric is Jupiter's proprietary score; its method is not public.

## 6. Which meme structures worked recently and which failed (ticker/name styles, character vs phrase, CTO)?

### Takeaway
What works now:
- **(a)** a structural pun on the quote asset ("joke = pair"), with lore depth
- **(b)** fast news hooks with a short, official-sounding ticker (SI, NPC, GROK)
- **(c)** product or "app" tokens that give a reason to hold: AI-agent boards, fee-routing, shorting, 0%-fee trading
- **(d)** character universes with a derivative cast (Jean Phil → Archibald Brown)

What fails:
- same-ticker clone storms
- smear coins
- brand impersonation
- generic phrase or "up only" coins
- "reward wrapper" coins
- fake-fund names

Community takeovers (CTOs) exist but are not a leading structure right now.

### Cited Findings
- [FACT] **Pair-pun successes** (mcap at T1/T2):
  - GP (game gold / GLDX): $26–27M
  - Anonymous Cat (ZEC): $73.6M
  - ALLINU (DKNG): $8.3–8.5M
  - NearKat (NEAR): $8.1M
  - Super Inu (NVDAX): $6.2–7.0M
  - Grokification (SPCXX): $5.5–5.8M
  - Christmas Cracker (GP): $3.9–4.0M
  - Nullmask (ZEC): $3.9M
  - WoW Gold (GLDX): $2.4–2.7M
  - V-BUCKS (SILVER): $1.5M
  - Minecoin (MSFTX): $0.5M
  - Sources: [StonkFun /tokens?sort=volume](https://www.stonkfun.xyz/api/public/v1/tokens?sort=volume&pageSize=50); [Jupiter toptraded/24h](https://lite-api.jup.ag/tokens/v2/toptraded/24h?limit=100)
- [FACT] **App or "reason-to-hold" tokens among the leaders:**
  - Paid, fee routing: $8.1–8.3M
  - familiars, an AI-agent trading board: $1.9–2.1M
  - Bluf ("short any pump coin"): $150–187k and rising at T2
  - Untaxed App (0% fees): $60k
  - fomocard (gift cards paid from a fomo balance): $79–125k
  - OTC (earn stocks, pre-IPO): $5.9–6.0M
  - apeonfone: $3.6M
  - Source: [pump.fun /coins/{mint}](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)
- [FACT] **Character and persona coins that held:**
  - Jean Phil: $4.1–4.4M, 4 days old
  - Archibald Brown: $338–378k
  - CALI: $1.5–1.6M
  - Karate Cat: ~$0.3M
  - Hotel Lobby: $0.31M
  - Look Up: $42k ("550M+ views on Instagram")
  - Source: [Jupiter toptrending lists](https://lite-api.jup.ag/tokens/v2/toptrending/5m?limit=100)
- [FACT] **Clone storms fail.**
  - A 25-minute window produced 47 GROKPOD launches, from a tweet titled "check his x replies". The winner peaked at $98.7k and was $6.7k about an hour later.
  - "Hot weather" (HW) was relaunched 25 times at 03:09–03:34 and 6+ times per 100 launches later.
  - "MAYHEM" / VENOM: 7–11 per 100–200 launches.
  - Sources: sample.json (03:34); [pump.fun created list T2](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false); [pump.fun last-trade list](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=last_trade_timestamp&order=DESC&includeNsfw=false)
- [FACT] **Smear coins and impersonations failed within an hour:** Mr Least, MrPedo, "The MrBeast Files", Starbucks, Pokemon and the early "Super Inu" all fell 90–99.6% (figures above).
- [FACT] **Phrase and reward-wrapper coins faded:**
  - number go up: $96k → $55k
  - Get Rich Overnight: $39.5k
  - Methane Capital: $42k → $27k
  - PEPEUP: $2.5k
  - Uptober: $151–156k, 1h −8.7%
  - Source: [DexScreener boosts/top](https://api.dexscreener.com/token-boosts/top/v1)
- [FACT] **Community takeovers.** Tokens with "cto" in their socials were present but mid-tier: pill (x.com/ctopill; $1.8M, 10d, 1h +5%), baton (x.com/batonpumpcto; $1.2M, 14d, −33% 24h), Bertram the Pomeranian (bertcoincto; older, $15.2M). [Jupiter toptrending/5m](https://lite-api.jup.ag/tokens/v2/toptrending/5m?limit=100); [pump.fun sort=market_cap](https://frontend-api-v3.pump.fun/coins?offset=0&limit=50&sort=market_cap&order=DESC&includeNsfw=false)
- [FACT] **Ticker style of the 1h/24h leaders.** Mostly the plain word or name:
  - ALL CAPS, 2–4 letters: NPC, GP, SI, GROK, WOW, DUEL, BEER
  - lowercase single word: goon, familiars, suit, pill
  - the name spelled out: SHARTCOIN, HYPERCAT, ARCHIBROWN
  - Rare: $-prefixed tickers, emoji, and number-suffixed spam (PENIS42069) all rank low.
  - Source: [Jupiter toptraded/1h](https://lite-api.jup.ag/tokens/v2/toptraded/1h?limit=100)
- [SPECULATION] Metadata links point to tweets that probably seeded launches: YokaiCapital for Shartcoin, gum_xbt for Super Intelligence, repligate for parafactual, jackdogwater for GROKPOD. The same X account (igetsjiggy6767) is linked from two launches (JOSHUA and Get Rich Overnight), which suggests serial deployers. I did not open these tweets or verify authorship. [pump.fun /coins/{mint}](https://frontend-api-v3.pump.fun/coins/HALWgHU8ZhXiQQwuERNbxhXDAX7WzypiYYi5buMnpump)

### Inferences
- [INTERPRETATION] **Concept rules of thumb from this data:**
  1. **Make the pairing the punchline**, and pick a quote asset with an existing holder community that the meme flatters or teases. Examples: a game currency priced in a commodity token, a lore item priced in its parent item, an AI concept priced in NVDAX or METAX. Avoid the exhausted pairs: cat + chain token, penis + TSLAX, goon + HIMS.
  2. **Pick a universe with deep lore**, where one meme can spawn dozens of recognisable children. RuneScape proved the model; untouched nostalgic game or internet universes are the gap.
  3. **For news coins, use the official-sounding noun as the ticker** (SI for Super Intelligence) and be early; these peak within 1–3 hours.
  4. **Give holders a mechanic or a story**, such as fees routed to a person or cause, holder rewards in a desirable asset, or a game or agent. Pure phrases fade.
  5. **Never use** real brands, real people's defamation, or fund/reserve naming.
- [INTERPRETATION] Everything that trends gets 10–50 same-ticker copies within an hour, often including high-volume bot pools. A distinctive, hard-to-clone name plus a verifiable home (a site or X account linked from the metadata) helps a concept stand out.

### Gaps
- No systematic CTO dataset: DexScreener profiles do not flag CTOs in a queryable field, so CTO success rates were not measured.
- Ticker-style effects are descriptive only (n≈40 leaders); no control group of equally promoted tokens was available.
