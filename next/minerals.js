import { roll } from './roll.js';
// Mining catalog from docs/dig-mineral-catalog-expansion.md. Bump the version
// whenever the table changes so already-rolled blocks keep their key space.
export const catalogVersion = 1;
// id, display name, tint [r, g, b] multipliers applied to lit stone.
export const minerals = [
  ['rock', '일반 암석', [1, 1, 1]],
  ['coal', '석탄', [0.45, 0.45, 0.5]],
  ['iron', '철광', [1.25, 0.82, 0.62]],
  ['gold', '금', [1.45, 1.18, 0.45]],
  ['quartz', '석영', [1.25, 1.25, 1.3]],
  ['kaolinite', '고령석', [1.3, 1.24, 1.12]],
  ['copper_ore', '구리광', [0.7, 1.15, 0.95]],
  ['graphite', '흑연', [0.62, 0.66, 0.72]],
  ['pyrite', '황철석', [1.35, 1.15, 0.6]],
  ['nickel_ore', '니켈광', [1.08, 1.1, 1.05]],
  ['chromite', '크롬철석', [0.55, 0.56, 0.6]],
  ['silver_ore', '은광', [1.3, 1.32, 1.38]],
  ['ilmenite', '티탄철석', [0.5, 0.48, 0.5]],
  ['wolframite', '철망간중석', [0.85, 0.62, 0.45]],
  ['platinum', '백금', [1.22, 1.24, 1.3]],
  ['diamond', '다이아몬드', [1.5, 1.6, 1.75]],
];
export const mineralIds = minerals.map(([id]) => id);
export const mineralName = id => minerals.find(m => m[0] === id)?.[1] ?? id;
export const mineralTint = id => minerals.find(m => m[0] === id)?.[2] ?? [1, 1, 1];
// [base share, base id, [[companion id, conditional share], ...]] in parts
// per 10,000 so band edges are exact. A rare row picks one entry as its yield.
export const table = [
  [6500, 'rock', [['quartz', 1000], ['kaolinite', 800], ['copper_ore', 600]]],
  [1800, 'coal', [['graphite', 1000], ['pyrite', 500]]],
  [1000, 'iron', [['nickel_ore', 1200], ['chromite', 800]]],
  [500, 'gold', [['silver_ore', 2000]]],
  [200, null, [['ilmenite', 4000], ['wolframite', 3000], ['platinum', 2000], ['diamond', 1000]]],
];
// Index of the band holding a sample in [0, 1).
function band(shares, sample) {
  const point = Math.floor(sample * 10000);
  let edge = 0;
  for (let i = 0; i < shares.length; i++) {
    edge += shares[i];
    if (point < edge) return i;
  }
  return -1;
}
// Yield of one block, fixed by world seed, chunk coordinate, generation and
// cell index. Base and companion use separate samples.
export function blockYield(seed, chunk, epoch, index, random = key => roll(seed, key)) {
  const key = chunk.join(',') + ':' + epoch + ':cell' + index + ':minerals' + catalogVersion + ':';
  const row = table[band(table.map(r => r[0]), random(key + 'base'))];
  const entries = row[2];
  const pick = entries[band(entries.map(e => e[1]), random(key + 'companion'))]?.[0] ?? null;
  return row[1] === null ? {base: pick, companion: null} : {base: row[1], companion: pick};
}
