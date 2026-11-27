// Building a portal at the end of research (docs/dig-self-identity-lore.md 7-6).
// Once every analysis and every automation study is done, the last design left
// is the portal. Building one plays the portal ending: all of this began when
// I built a portal. Costs are trial values.
import { studies } from './research.js';
import { automationIds } from './automation.js';
export const portalCost = {credits: 10000, elements: {Fe: 50, Si: 30, W: 10, Pt: 5}};
// How far research has come toward the portal design.
export function researchProgress(s) {
  const analyses = Object.keys(studies).filter(k => s?.research?.includes(k)).length;
  const automations = automationIds.filter(id => s?.automation?.unlocked.includes(id)).length;
  return {analyses, automations, done: analyses === Object.keys(studies).length && automations === automationIds.length};
}
