import {decode,encode} from './terrain.ts';
import {emptyInventory,type Inventory} from './inventory.ts';
import {validateSold} from './economy.ts';
export const SAVE='dig-p0-v1';
export type Store={getItem(key:string):string|null;setItem(key:string,value:string):void};
export function openSave(store:Store){
 let baseline:string|null=null, readable=true, data=decode(null),sold=emptyInventory();
 try{baseline=store.getItem(SAVE);data=decode(baseline);if(baseline!==null){const v=JSON.parse(baseline);if(v.sold!==undefined)sold=validateSold(data,v.sold)}}catch{readable=false;data=decode(null);sold=emptyInventory()}
 return {data,sold,readable,write(next:Uint8Array,ledger:Inventory=sold):'saved'|'conflict'|'failed'|'protected'{
 if(!readable)return 'protected';
 try{if(store.getItem(SAVE)!==baseline)return 'conflict';const valid=validateSold(next,ledger);const raw=JSON.stringify({...JSON.parse(encode(next)),sold:valid});store.setItem(SAVE,raw);baseline=raw;Object.assign(sold,valid);return 'saved'}catch{return 'failed'}
 }};
}
