import {rareInventory,rareKinds} from './rareResources.ts';
import type {ExpandedProfile} from './expandedProfile.ts';

export const legendaryRecipes={
 'seismic-shovel':{tool:0,cost:{'obsidian-heart':12,'ember-crystal':3,'ancient-core':1}},
 'ember-pickaxe':{tool:1,cost:{'obsidian-heart':16,'ember-crystal':4,'ancient-core':1}},
 'core-drill':{tool:2,cost:{'obsidian-heart':20,'ember-crystal':6,'ancient-core':2}},
} as const;
export type LegendaryId=keyof typeof legendaryRecipes;
export const legendaryIds=Object.keys(legendaryRecipes) as LegendaryId[];
export type LegendaryState={unlocked:LegendaryId[];equipped:LegendaryId|null};
type LegendaryProfile=ExpandedProfile&{legendary?:LegendaryState;ledger?:{levels:number[]}};
const validId=(v:unknown):v is LegendaryId=>typeof v==='string'&&Object.hasOwn(legendaryRecipes,v);
export function validateLegendary(p:LegendaryProfile):LegendaryState{
 const raw=p.legendary;
 if(raw===undefined)return {unlocked:[],equipped:null};
 if(!raw||!Array.isArray(raw.unlocked)||raw.unlocked.some(v=>!validId(v))||new Set(raw.unlocked).size!==raw.unlocked.length||!(raw.equipped===null||validId(raw.equipped))||(raw.equipped!==null&&!raw.unlocked.includes(raw.equipped)))throw Error('Invalid legendary state');
 const earned=rareInventory(p.mines[3]);
 for(const k of rareKinds){const spent=raw.unlocked.reduce((sum,id)=>sum+legendaryRecipes[id].cost[k],0);if(spent>earned[k])throw Error('Legendary resources overspent')}
 return {unlocked:[...raw.unlocked],equipped:raw.equipped};
}
export function legendaryAvailable(p:LegendaryProfile){const state=validateLegendary(p),earned=rareInventory(p.mines[3]);for(const id of state.unlocked)for(const k of rareKinds)earned[k]-=legendaryRecipes[id].cost[k];return earned}
export function craftLegendary(p:LegendaryProfile,id:LegendaryId):LegendaryProfile|null{
 if(p.version!==3||!validId(id))return null;
 const state=validateLegendary(p),recipe=legendaryRecipes[id];
 if(state.unlocked.includes(id)||(p.ledger?.levels?.[recipe.tool]??0)<5)return null;
 const available=legendaryAvailable(p);
 if(rareKinds.some(k=>available[k]<recipe.cost[k]))return null;
 return {...p,legendary:{unlocked:[...state.unlocked,id],equipped:id}};
}
export function equipLegendary(p:LegendaryProfile,id:LegendaryId|null):LegendaryProfile|null{
 const state=validateLegendary(p);if(id!==null&&!state.unlocked.includes(id))return null;
 return {...p,legendary:{...state,equipped:id}};
}
