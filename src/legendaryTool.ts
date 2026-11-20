import {craftedTool} from './craftEffects.ts';import type {Levels} from './upgrades.ts';import type {Crafted} from './crafting.ts';import type {LegendaryState} from './legendary.ts';
export function legendaryTool(i:number,levels:Levels,crafted:Crafted,state?:LegendaryState){const tool=craftedTool(i,levels,crafted);if(!state||!state.equipped||!state.unlocked.includes(state.equipped))return tool;
 if(i===0&&state.equipped==='seismic-shovel')return {...tool,radius:tool.radius*1.25,interval:Math.round(tool.interval*1.2)};
 if(i===1&&state.equipped==='ember-pickaxe')return {...tool,reach:tool.reach*1.25,interval:Math.round(tool.interval*1.1)};
 if(i===2&&state.equipped==='core-drill')return {...tool,radius:tool.radius*.9,interval:Math.max(1,Math.round(tool.interval*.8))};return tool}
