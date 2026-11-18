import {initialCrafted,validateCrafted,type Crafted} from './crafting.ts';
import {initialLevels,validateLevels,type Levels} from './upgrades.ts';
import {decode,encode} from './terrain.ts';
import {emptyInventory,inventoryFromTerrain,type Inventory} from './inventory.ts';
import {validateSold,wallet} from './economy.ts';
export const SAVE='dig-p0-v1';
export type Store={getItem(key:string):string|null;setItem(key:string,value:string):void};
export function openSave(store:Store){
 let baseline:string|null=null, readable=true, data=decode(null),sold=emptyInventory(),levels=initialLevels(),crafted=initialCrafted();
 try{baseline=store.getItem(SAVE);data=decode(baseline);if(baseline!==null){const v=JSON.parse(baseline);if(v.sold!==undefined)sold=validateSold(data,v.sold);if(v.levels!==undefined)levels=validateLevels(v.levels,wallet(sold));if(v.crafted!==undefined)crafted=validateCrafted(v.crafted,inventoryFromTerrain(data),sold)}}catch{readable=false;data=decode(null);sold=emptyInventory();levels=initialLevels();crafted=initialCrafted()}
 return {data,sold,levels,crafted,readable,write(next:Uint8Array,ledger:Inventory=sold,nextLevels:Levels=levels,nextCrafted:Crafted=crafted):'saved'|'conflict'|'failed'|'protected'{
 if(!readable)return 'protected';
 try{if(store.getItem(SAVE)!==baseline)return 'conflict';const valid=validateSold(next,ledger);const validLevels=validateLevels(nextLevels,wallet(valid));if(validLevels.some((n,i)=>n<levels[i])||Object.keys(sold).some(k=>valid[k as keyof Inventory]<sold[k as keyof Inventory]))return 'failed';const validCrafted=validateCrafted(nextCrafted,inventoryFromTerrain(next),valid);if(validCrafted.some((n,i)=>n<crafted[i]))return 'failed';const raw=JSON.stringify({...JSON.parse(encode(next)),sold:valid,levels:validLevels,crafted:validCrafted});store.setItem(SAVE,raw);baseline=raw;Object.assign(sold,valid);Object.assign(levels,validLevels);Object.assign(crafted,validCrafted);return 'saved'}catch{return 'failed'}
 }};
}
