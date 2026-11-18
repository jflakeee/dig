import {emptyInventory,type Inventory} from './inventory.ts';
import {oreKeys} from './economy.ts';
export const recipes=[{name:'Coal fuel',coal:3,copper:0,iron:0,gold:0,gem:0},{name:'Copper alloy',coal:1,copper:3,iron:0,gold:0,gem:0},{name:'Steel ingot',coal:2,copper:0,iron:3,gold:0,gem:0},{name:'Gem core',coal:0,copper:0,iron:2,gold:2,gem:1}] as const;
export type Crafted=number[];
export function initialCrafted():Crafted{return recipes.map(()=>0)}
export function consumed(c:Crafted):Inventory{const out=emptyInventory();recipes.forEach((r,i)=>{for(const k of oreKeys)out[k]+=r[k]*c[i]});return out}
export function remaining(total:Inventory,sold:Inventory,c:Crafted){const used=consumed(c),out=emptyInventory();for(const k of oreKeys)out[k]=total[k]-sold[k]-used[k];return out}
export function validateCrafted(v:unknown,total:Inventory,sold:Inventory):Crafted{if(!Array.isArray(v)||v.length!==recipes.length||!v.every(n=>Number.isSafeInteger(n)&&n>=0&&n<=24576))throw Error('Invalid crafting');if(Object.values(remaining(total,sold,v)).some(n=>n<0))throw Error('Insufficient ore');return [...v]}
export function craft(i:number,total:Inventory,sold:Inventory,c:Crafted){if(!Number.isInteger(i)||i<0||i>=recipes.length)return null;const next=[...c];next[i]++;try{return validateCrafted(next,total,sold)}catch{return null}}
