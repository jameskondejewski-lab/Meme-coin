const UNAVAILABLE = 'Live data unavailable';

export function usd(n) {
  if (n === null || n === undefined || !Number.isFinite(n)) return 'n/a';
  const abs = Math.abs(n);
  if (abs >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  if (abs >= 1) return `$${n.toFixed(2)}`;
  return `$${n.toPrecision(3)}`;
}

export function age(hours) {
  if (hours === null || hours === undefined) return '?';
  return hours < 48 ? `${hours}h` : `${Math.round(hours / 24)}d`;
}

export function pct(n) {
  if (n === null || n === undefined || !Number.isFinite(n)) return 'n/a';
  return `${n > 0 ? '+' : ''}${n.toFixed(2)}%`;
}

// Reasons are SourceError messages, already prefixed with the source name.
const unavailable = (x) => `${UNAVAILABLE} (${x.reason})`;
const src = (x) => `[${x.source} @ ${x.asOf ?? x.fetchedAt}]`;

function line(label, x, fmt) {
  return `  ${label.padEnd(22)} ${x.unavailable ? unavailable(x) : `${fmt(x)}  ${src(x)}`}`;
}

function crossCheckLine(label, cc) {
  if (cc.status === 'unavailable') return `  ${label.padEnd(22)} ${UNAVAILABLE} (no source returned a price)`;
  const per = cc.observations.map((o) => `${o.source} ${usd(o.value)}`).join(', ');
  const missing = cc.missing.length ? `; missing: ${cc.missing.join(', ')}` : '';
  return `  ${label.padEnd(22)} ${usd(cc.median)} median — ${cc.status}, max dev ${cc.maxDeviationPct.toFixed(2)}% (${per}${missing})`;
}

export function renderReport(s) {
  const out = [];
  if (s.mode === 'fixtures') {
    out.push('!'.repeat(72), '!! SYNTHETIC FIXTURE DATA — NOT REAL MARKET DATA. For testing only.', '!'.repeat(72));
  }
  out.push(`Solana market snapshot — generated ${s.generatedAt}`, '');

  const failed = Object.entries(s.sources).filter(([, v]) => !v.ok);
  out.push(`Sources: ${Object.keys(s.sources).length - failed.length}/${Object.keys(s.sources).length} responded`);
  for (const [name, v] of failed) out.push(`  ✗ ${name}: ${v.error}`);
  out.push('');

  out.push('MARKET');
  out.push(crossCheckLine('SOL price', s.market.solPrice));
  out.push(line('SOL (coingecko)', s.market.sol, (x) => `mcap ${usd(x.marketCapUsd)}, 24h ${pct(x.change24hPct)}, vol ${usd(x.volume24hUsd)}`));
  out.push(line('BTC', s.market.btc, (x) => `${usd(x.priceUsd)} (24h ${pct(x.change24hPct)})`));
  out.push(line('ETH', s.market.eth, (x) => `${usd(x.priceUsd)} (24h ${pct(x.change24hPct)})`));
  out.push(line('Fear & Greed', s.market.fearGreed, (x) => `${x.value} — ${x.classification}`));
  out.push('');

  out.push('SOLANA ECOSYSTEM');
  out.push(line('TVL', s.ecosystem.tvl, (x) => usd(x.tvlUsd)));
  out.push(line('DEX volume', s.ecosystem.dexVolume, (x) => `24h ${usd(x.volume24hUsd)} (${pct(x.change1dPct)} d/d), 7d ${usd(x.volume7dUsd)}`));
  out.push(line('Stablecoin supply', s.ecosystem.stablecoins, (x) => usd(x.stablecoinsUsd)));
  out.push('');

  out.push('SOLANA MEME SECTOR');
  out.push(line('Sector', s.memeSector.category, (x) => `mcap ${usd(x.marketCapUsd)} (${pct(x.marketCapChange24hPct)} 24h), vol ${usd(x.volume24hUsd)}`));
  if (s.memeSector.leaders.unavailable) out.push(`  ${unavailable(s.memeSector.leaders)}`);
  else {
    for (const c of s.memeSector.leaders.coins.slice(0, 10)) {
      out.push(`    ${c.symbol.padEnd(10)} ${usd(c.marketCapUsd).padStart(9)} mcap  ${pct(c.change24hPct).padStart(8)} 24h  ${pct(c.change7dPct).padStart(8)} 7d  vol ${usd(c.volume24hUsd)}`);
    }
  }
  out.push('');

  out.push('TRENDING POOLS (GeckoTerminal) — flags are indicators, not proof');
  if (s.trending.unavailable) out.push(`  ${unavailable(s.trending)}`);
  else {
    if (s.trending.paidBoostCheck !== 'checked') out.push(`  (paid-promotion check ${s.trending.paidBoostCheck})`);
    for (const p of s.trending.pools.slice(0, 15)) {
      const flags = p.flags.map((f) => f.id).join(', ') || '—';
      out.push(`    ${String(p.baseSymbol ?? '?').padEnd(10)} liq ${usd(p.liquidityUsd).padStart(9)}  fdv ${usd(p.fdvUsd).padStart(9)}  vol24 ${usd(p.volumeUsd.h24).padStart(9)}  24h ${pct(p.priceChangePct.h24).padStart(9)}  age ${age(p.metrics.ageHours).padStart(5)}  flags: ${flags}`);
    }
  }
  out.push('');

  if (s.watchlist.length) {
    out.push('WATCHLIST');
    for (const w of s.watchlist) {
      out.push(`  ${w.symbol ?? '?'} ${w.mint}`);
      out.push(crossCheckLine('  price', w.price));
      out.push(line('  top pool', w.market, (m) => `liq ${usd(m.liquidityUsd)} (${m.dexId}), mcap ${usd(m.marketCapUsd)}, vol24 ${usd(m.volumeUsd.h24)}, 24h buys/sells ${m.txns.h24.buys ?? 'n/a'}/${m.txns.h24.sells ?? 'n/a'}`));
      const l = w.liquidity;
      out.push(`    ${'total liquidity'.padEnd(20)} dexscreener ${usd(l.dexscreenerPoolsUsd)} over ${l.dexscreenerPoolCount ?? '?'} pools${l.dexscreenerCapped ? ' (capped at 30: lower bound)' : ''}; jupiter aggregate ${usd(l.jupiterAggregateUsd)}`);
      if (w.safety.unavailable) out.push(`    safety: ${unavailable(w.safety)}`);
      else {
        const partial = w.safety.partial ? ` — PARTIAL, not checked: ${w.safety.missingChecks.join(', ')}` : '';
        out.push(`    safety: ${w.safety.verdict.toUpperCase()} (${w.safety.program})${partial}`);
        out.push(`      ${w.safety.note}`);
        if (!w.safety.rugcheck.unavailable) {
          const rc = w.safety.rugcheck;
          out.push(`      rugcheck: risk score ${rc.scoreNormalised}/100 (lower is better), holders ${rc.totalHolders ?? 'n/a'}${rc.launchpad ? `, launchpad ${rc.launchpad}` : ''}${rc.deepestMarket ? `, deepest LP locked ${rc.deepestMarket.lpLockedPct ?? 'n/a'}%` : ''}`);
        }
        if (w.safety.concentration) out.push(`      concentration (${w.safety.concentration.source}): top1 ${w.safety.concentration.top1Pct}%, top10 ${w.safety.concentration.top10Pct}%`);
        for (const f of w.safety.findings) out.push(`      [${f.severity}] ${f.message}`);
        for (const reason of w.safety.unavailableReasons) out.push(`      ${UNAVAILABLE} (${reason})`);
      }
    }
  }
  return out.join('\n');
}
