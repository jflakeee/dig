// Gambling (docs/dig-upgrades-camera-automation-trade-gamble.md 6). Pick a
// target and a multiple; the stake is the target's base value times the
// multiple, pledged from free credits first, then minerals at base value.
// A win keeps the pledge and pays the target times the multiple. Trial values.
import { valueOf } from './trade.js';
import { finds } from './finds.js';
import { automations, automationIds } from './automation.js';
import { craftRecipes } from './craft.js';
export const winChance = 0.48;
export const maxMultiple = 10000;
export const maxPieces = 20;            // pieces paid out in kind; the rest as credits
export const categories = {mineral: '광물', equipment: '장비', research: '연구', item: '아이템'};
const items = finds.filter(f => ['household', 'artifact', 'alien'].includes(f.category));
// Targets of a category as [id, base value].
export function targets(category, mineralIds = []) {
  if (category === 'mineral') return mineralIds.map(id => [id, valueOf({mineral: id}).base]);
  if (category === 'equipment') return Object.keys(craftRecipes).map(id => [id, Math.round(valueOf({kind: id, durability: 100}).base)]);
  if (category === 'research') return automationIds.map(id => [id, automations[id].credits]);
  if (category === 'item') return items.map(f => [f.id, valueOf({kind: f.id, variant: f.variants[0].variant}).base]);
  return [];
}
export const baseValue = (category, id, mineralIds) => targets(category, mineralIds).find(([t]) => t === id)?.[1] ?? null;
export const validMultiple = m => Number.isSafeInteger(m) && m >= 1 && m <= maxMultiple;
export const validGambleLog = log => Array.isArray(log) && log.length <= 10 && log.every(e => e && typeof e.win === 'boolean' &&
  categories[e.category] && typeof e.id === 'string' && validMultiple(e.multiple) && Number.isSafeInteger(e.stake) && e.stake > 0);
