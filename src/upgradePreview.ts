import {craftedTool} from './craftEffects.ts';
import {cost,type Levels} from './upgrades.ts';
import type {Crafted} from './crafting.ts';
export function upgradePreview(i:number,levels:Levels,crafted:Crafted){const current=craftedTool(i,levels,crafted);if(levels[i]>=5)return null;const next=[...levels] as Levels;next[i]++;const improved=craftedTool(i,next,crafted);return {cost:cost(i,levels[i]),radius:current.radius,nextRadius:improved.radius,interval:current.interval,nextInterval:improved.interval}}
