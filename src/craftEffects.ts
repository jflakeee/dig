import {upgradedTool,type Levels} from './upgrades.ts';
import type {Crafted} from './crafting.ts';
export function craftEffects(c:Crafted){return {speed:1+Math.min(c[0]??0,10)*.02,reach:1+Math.min(c[1]??0,10)*.025,radius:1+Math.min(c[2]??0,10)*.025,lamp:1+Math.min(c[3]??0,5)*.15}}
export function craftedTool(i:number,levels:Levels,c:Crafted){const t=upgradedTool(i,levels),e=craftEffects(c);return {...t,interval:Math.round(t.interval/e.speed),reach:t.reach*e.reach,radius:t.radius*e.radius}}
