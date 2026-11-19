import {naturalVoidMask} from './caves.ts';
import {openSave,SAVE,type Store} from './save.ts';
export const PROFILE='dig-mines-v2';
export const mines=[{id:1,n:32,h:24},{id:2,n:48,h:36},{id:3,n:64,h:48}] as const;
export type Profile={version:2;legacy:string|null;legacySource?:string|null;worldgen?:1;active: number;mines:number[][]};
export function parseProfile(raw:string):Profile{
 const p=JSON.parse(raw);if(p?.version!==2||!Number.isInteger(p.active)||p.active<1||p.active>3||!Array.isArray(p.mines)||p.mines.length!==3||(p.legacy!==null&&typeof p.legacy!=='string'))throw Error('Invalid profile');
 if(p.legacySource!==undefined&&p.legacySource!==null&&typeof p.legacySource!=='string')throw Error('Invalid legacy source');
 const old=openSave({getItem:()=>p.legacy,setItem:()=>{throw Error('Read only')}});if(!old.readable)throw Error('Invalid legacy');
 for(let i=0;i<3;i++){const m=mines[i],a=p.mines[i];if(!Array.isArray(a)||!a.every((v:unknown)=>typeof v==='number'&&Number.isInteger(v)&&v>=0&&v<m.n*m.n*m.h)||new Set(a).size!==a.length)throw Error('Invalid mine');}
 if(p.worldgen!==undefined&&p.worldgen!==1)throw Error('Invalid worldgen');
 if(p.worldgen===1)for(let i=0;i<3;i++){const mask=naturalVoidMask(i+1);if(p.mines[i].some((n:number)=>mask[n]))throw Error('Natural void in excavation');}
 const original=Array.from(old.data.keys()).filter(i=>old.data[i]===0);const originalSet=new Set<number>(p.mines[0]);if(original.length!==originalSet.size||original.some(i=>!originalSet.has(i)))throw Error('Legacy mismatch');
 return p;
}
export function migrateProfile(store:Store):Profile{
 const existing=store.getItem(PROFILE);if(existing!==null){const p=parseProfile(existing);const source=store.getItem(SAVE);if(p.legacySource!==undefined&&p.legacySource!==source)throw Error('Legacy source conflict');return p}
 const legacy=store.getItem(SAVE);const old=openSave({getItem:()=>legacy,setItem:()=>{throw Error('Read only')}});if(!old.readable)throw Error('Invalid legacy');
 const p:Profile={version:2,legacy,legacySource:legacy,active:1,mines:[Array.from(old.data.keys()).filter(i=>old.data[i]===0),[],[]]};
 const raw=JSON.stringify(p);parseProfile(raw);if(store.getItem(SAVE)!==legacy||store.getItem(PROFILE)!==null)throw Error('Migration conflict');store.setItem(PROFILE,raw);return p;
}
