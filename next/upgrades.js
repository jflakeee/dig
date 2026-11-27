// Upgrades bought with minerals (docs/dig-upgrades-camera-automation-trade-gamble.md 2).
// The next level costs the base cost times that level. All numbers are trial values.
export const upgrades = {
  body: {label: '기체 확장', max: 5, cost: {iron: 4, copper_ore: 2, rock: 10}, effect: '기체 반지름 +20% · 기체 적재 +60'},
  wagon: {label: '화물칸 확장', max: 5, cost: {iron: 3, rock: 8}, effect: '화물칸 한 량 적재 +40'},
  drills: {label: '드릴 추가', max: 3, cost: {iron: 5, wolframite: 1, rock: 10}, effect: '드릴 +1개'},
  bore: {label: '드릴 확대', max: 3, cost: {iron: 3, graphite: 2, rock: 6}, effect: '드릴 크기 +35% · 드릴당 블록 +1'},
};
export const upgradeIds = Object.keys(upgrades);
export const level = (s, id) => s?.upgrades?.[id] ?? 0;
// Cost of the next level, or null at the top.
export function upgradeCost(s, id) {
  const next = level(s, id) + 1;
  if (next > upgrades[id].max) return null;
  return Object.fromEntries(Object.entries(upgrades[id].cost).map(([k, n]) => [k, n * next]));
}
export const baseRadius = 0.92;
export const bodyRadius = s => baseRadius * (1 + 0.2 * level(s, 'body'));
export const drillCount = s => 1 + level(s, 'drills');
export const drillSize = s => 1 + 0.35 * level(s, 'bore');
// Blocks cut in one stroke: every drill takes one, plus one more per bore level.
export const cellsPerStroke = s => drillCount(s) * (1 + level(s, 'bore'));
export const validUpgrades = u => u && typeof u === 'object' && Object.keys(u).length === upgradeIds.length &&
  upgradeIds.every(id => Number.isSafeInteger(u[id]) && u[id] >= 0 && u[id] <= upgrades[id].max);
