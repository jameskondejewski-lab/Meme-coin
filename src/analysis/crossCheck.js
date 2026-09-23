/**
 * Compare one metric across independent sources. We never average away a
 * disagreement: the result reports the median, the spread, and whether the
 * sources agree within tolerance.
 *
 * @param {{source: string, value: number|null|undefined}[]} observations
 * @param {{maxDeviationPct?: number}} [opts]
 */
export function crossCheck(observations, { maxDeviationPct = 2 } = {}) {
  const valid = observations.filter((o) => Number.isFinite(o.value) && o.value > 0);
  const missing = observations.filter((o) => !valid.includes(o)).map((o) => o.source);

  if (valid.length === 0) {
    return { status: 'unavailable', median: null, maxDeviationPct: null, observations: valid, missing };
  }

  const sorted = valid.map((o) => o.value).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const withDeviation = valid.map((o) => ({ ...o, deviationPct: (Math.abs(o.value - median) / median) * 100 }));
  const maxDev = Math.max(...withDeviation.map((o) => o.deviationPct));

  let status;
  if (valid.length === 1) status = 'single-source';
  else if (maxDev > maxDeviationPct) status = 'divergent';
  else status = 'consistent';

  return { status, median, maxDeviationPct: maxDev, observations: withDeviation, missing };
}
