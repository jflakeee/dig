import { atomicMass, dalton } from './elements.js';
import { roll } from './roll.js';
// Element masses released by decomposing a piece. Inputs are either molar
// units ({Fe: 2, O: 3}) or mass fractions ([[formula, fraction], ...]).
export function parseFormula(formula) {
  const units = {};
  for (const [, symbol, n] of formula.matchAll(/([A-Z][a-z]?)([\d.]*)/g))
    units[symbol] = (units[symbol] ?? 0) + (n === '' ? 1 : Number(n));
  return units;
}
export function fractionsFromUnits(units) {
  const total = Object.entries(units).reduce((n, [e, k]) => n + k * atomicMass[e], 0);
  return Object.fromEntries(Object.entries(units).map(([e, k]) => [e, k * atomicMass[e] / total]));
}
// [[formula, mass share of the piece], ...] -> element mass fractions.
// Shares are rescaled to sum to one, so rounded recipes stay consistent.
export function fractionsFromParts(parts) {
  const out = {};
  const total = parts.reduce((n, [, share]) => n + share, 0);
  for (const [formula, share] of parts)
    for (const [e, f] of Object.entries(fractionsFromUnits(parseFormula(formula)))) out[e] = (out[e] ?? 0) + share / total * f;
  return out;
}
// Mass fraction that holds `atoms` atoms of an element in a piece of `grams`.
export const atomsShare = (symbol, atoms, grams) => atoms * atomicMass[symbol] * dalton / grams;
// The decomposer returns less than goes in. The share it keeps is fixed per
// decomposition from the running count, so a preview always matches the result.
export const feeRange = [0.12, 0.28];
export const decompositionFee = (count, key) => feeRange[0] + (feeRange[1] - feeRange[0]) * roll(count, 'decompose:' + key);
// Element grams out. Amounts below a million atoms are whole atoms; an element
// whose share rounds to no atom does not come back.
export function decompose(grams, fractions, fee) {
  const out = {};
  for (const [e, f] of Object.entries(fractions)) {
    let mass = grams * f * (1 - fee);
    const atoms = mass / (atomicMass[e] * dalton);
    if (atoms < 1e6) mass = Math.floor(atoms + 1e-9) * atomicMass[e] * dalton;
    if (mass > 0) out[e] = mass;
  }
  return out;
}
const prefixes = [[1e3, 'kg'], [1, 'g'], [1e-3, 'mg'], [1e-6, 'µg'], [1e-9, 'ng'], [1e-12, 'pg']];
// "12.3 g", "4.1 µg", or "원자 7개" below a picogram.
export function massText(grams, symbol) {
  if (grams < 1e-12 && symbol) return '원자 ' + Math.round(grams / (atomicMass[symbol] * dalton)).toLocaleString('ko-KR') + '개';
  const [scale, unit] = prefixes.find(([s]) => grams >= s) ?? prefixes.at(-1);
  const v = grams / scale;
  return (v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2)) + ' ' + unit;
}
