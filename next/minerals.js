import { roll } from './roll.js';
import { fractionsFromUnits } from './composition.js';
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
// Sub-species of each mineral from docs/dig-element-coverage-plan.md section 1:
// [variant id, display name, share per 10,000, element units from one decomposition].
// The first entry is the default; existing quantities count as it.
export const variants = {
  rock: [['granite', '화강암', 3500, {K: 1, Al: 1, Si: 3, O: 8}], ['basalt', '현무암', 3000, {Ca: 1, Mg: 1, Si: 2, O: 6}],
    ['limestone', '석회암', 2000, {Ca: 1, C: 1, O: 3}], ['arkose', '장석질 사암', 1500, {Na: 1, Al: 1, Si: 3, O: 8}]],
  coal: [['coal', '석탄', 10000, {C: 1}]],
  iron: [['hematite', '적철석', 6000, {Fe: 2, O: 3}], ['magnetite', '자철석', 4000, {Fe: 3, O: 4}]],
  gold: [['native', '자연금', 9000, {Au: 1}], ['electrum', '일렉트럼', 1000, {Au: 1, Ag: 1}]],
  quartz: [['quartz', '석영', 10000, {Si: 1, O: 2}]],
  kaolinite: [['kaolinite', '고령석', 10000, {Al: 2, Si: 2, O: 9, H: 4}]],
  copper_ore: [['chalcopyrite', '황동석', 5000, {Cu: 1, Fe: 1, S: 2}], ['malachite', '공작석', 3000, {Cu: 2, C: 1, O: 5, H: 2}],
    ['native', '자연동', 2000, {Cu: 1}]],
  graphite: [['graphite', '흑연', 10000, {C: 1}]],
  pyrite: [['pyrite', '황철석', 10000, {Fe: 1, S: 2}]],
  nickel_ore: [['pentlandite', '펜틀란다이트', 6000, {Fe: 4, Ni: 5, S: 8}], ['millerite', '침니켈석', 4000, {Ni: 1, S: 1}]],
  chromite: [['chromite', '크롬철석', 10000, {Fe: 1, Cr: 2, O: 4}]],
  silver_ore: [['acanthite', '휘은석', 7000, {Ag: 2, S: 1}], ['native', '자연은', 3000, {Ag: 1}]],
  ilmenite: [['ilmenite', '티탄철석', 10000, {Fe: 1, Ti: 1, O: 3}]],
  wolframite: [['ferberite', '철중석', 5000, {Fe: 1, W: 1, O: 4}], ['huebnerite', '망간중석', 5000, {Mn: 1, W: 1, O: 4}]],
  platinum: [['native', '자연백금', 7000, {Pt: 1}], ['sperrylite', '스페릴라이트', 3000, {Pt: 1, As: 2}]],
  diamond: [['diamond', '다이아몬드', 10000, {C: 1}]],
};
export const defaultVariant = id => variants[id][0][0];
export const variantName = (id, variant) => variants[id]?.find(v => v[0] === variant)?.[1] ?? variant;
// Element units released by decomposing one piece of a mineral sub-species.
export const elementUnits = (id, variant) => variants[id]?.find(v => v[0] === variant)?.[3] ?? null;
// One mined piece weighs 100 g in the decomposer (trial value).
export const mineralGrams = 100;
export function mineralPiece(id, variant) {
  const units = elementUnits(id, variant);
  return units && {grams: mineralGrams, fractions: fractionsFromUnits(units)};
}
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
// Sub-species are separate samples, so adding them left base and companion rolls unchanged.
export function blockYield(seed, chunk, epoch, index, random = key => roll(seed, key)) {
  const key = cellKey(chunk, epoch, index);
  const row = table[band(table.map(r => r[0]), random(key + 'base'))];
  const entries = row[2];
  const pick = entries[band(entries.map(e => e[1]), random(key + 'companion'))]?.[0] ?? null;
  const base = row[1] === null ? pick : row[1], companion = row[1] === null ? null : pick;
  return {base, companion, baseVariant: variantOf(base, random(key + 'variant')),
    companionVariant: companion && variantOf(companion, random(key + 'companion-variant'))};
}
const cellKey = (chunk, epoch, index) => chunk.join(',') + ':' + epoch + ':cell' + index + ':minerals' + catalogVersion + ':';
export function variantOf(id, sample) {
  const list = variants[id];
  return list[Math.max(0, band(list.map(v => v[2]), sample))][0];
}
// The rock sub-species of a cell, for the laser before the first drill.
export function rockVariantAt(seed, chunk, epoch, index, random = key => roll(seed, key)) {
  return variantOf('rock', random(cellKey(chunk, epoch, index) + 'variant'));
}
