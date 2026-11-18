import {decode,encode} from './terrain.ts';
export const SAVE='dig-p0-v1';
export type Store={getItem(key:string):string|null;setItem(key:string,value:string):void};
export function openSave(store:Store){
 let baseline:string|null=null, readable=true, data=decode(null);
 try{baseline=store.getItem(SAVE);data=decode(baseline)}catch{readable=false}
 return {data,readable,write(next:Uint8Array):'saved'|'conflict'|'failed'|'protected'{
 if(!readable)return 'protected';
 try{if(store.getItem(SAVE)!==baseline)return 'conflict';const raw=encode(next);store.setItem(SAVE,raw);baseline=raw;return 'saved'}catch{return 'failed'}
 }};
}
