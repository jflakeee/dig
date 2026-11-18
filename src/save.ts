import {initialLevels,validateLevels,type Levels} from './upgrades.ts';
import {decode,encode} from './terrain.ts';
import {emptyInventory,type Inventory} from './inventory.ts';
import {validateSold,wallet} from './economy.ts';
export const SAVE='dig-p0-v1';
export type Store={getItem(key:string):string|null;setItem(key:string,value:string):void};
export function openSave(store:Store){
 let baseline:string|null=null, readable=true, data=decode(null),sold=emptyInventory(),levels=initialLevels();
 try{baseline=store.getItem(SAVE);data=decode(baseline);if(baseline!==null){const v=JSON.parse(baseline);if(v.sold!==undefined)sold=validateSold(data,v.sold);if(v.levels!==undefined)levels=validateLevels(v.levels,wallet(sold))}}catch{readable=false;data=decode(null);sold=emptyInventory();levels=initialLevels()}
 return {data,sold,levels,readable,write(next:Uint8Array,ledger:Inventory=sold,nextLevels:Levels=levels):'saved'|'conflict'|'failed'|'protected'{
 if(!readable)return 'protected';
 try{if(store.getItem(SAVE)!==baseline)return 'conflict';const valid=validateSold(next,ledger);const validLevels=validateLevels(nextLevels,wallet(valid));if(validLevels.some((n,i)=>n<levels[i])||Object.keys(sold).some(k=>valid[k as keyof Inventory]<sold[k as keyof Inventory]))return 'failed';const raw=JSON.stringify({...JSON.parse(encode(next)),sold:valid,levels:validLevels});store.setItem(SAVE,raw);baseline=raw;Object.assign(sold,valid);Object.assign(levels,validLevels);return 'saved'}catch{return 'failed'}
 }};
}
