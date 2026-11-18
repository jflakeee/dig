import {migrateProfile,parseProfile,PROFILE,mines} from './mineProfile.ts';
import {ledgerFor,type UnifiedProfile,type Ledger} from './profileEconomy.ts';
import {unlocked,terrainFor,travel} from './expedition.ts';
import {SAVE,type Store} from './save.ts';
export function openWorld(store:Store){
 const source=store.getItem(SAVE);migrateProfile(store);let baseline=store.getItem(PROFILE)!;let p=parseProfile(baseline) as UnifiedProfile;
 function validate(v:UnifiedProfile){ledgerFor(v);if(!unlocked(v,v.active)||v.mines.some((a,i)=>a.length&&!unlocked(v,i+1)))throw Error('Locked mine')}
 validate(p);
 function commit(next:UnifiedProfile){try{if(store.getItem(PROFILE)!==baseline||store.getItem(SAVE)!==source)return 'conflict';validate(next);const raw=JSON.stringify(next);parseProfile(raw);store.setItem(PROFILE,raw);baseline=raw;p=next;return 'saved'}catch{return 'failed'}}
 return {get profile(){return p},get shape(){return mines[p.active-1]},get ledger(){return ledgerFor(p)},terrain(){return terrainFor(p,p.active)},move(id:number,onSurface:boolean){const next=travel(p,id,onSurface);return next?commit(next):'failed'},write(data:Uint8Array,ledger:Ledger=ledgerFor(p)){
 try{const m=mines[p.active-1];if(data.length!==m.n*m.n*m.h||data.some(v=>v!==0&&v!==1))return 'failed';const removed=Array.from(data.keys()).filter(i=>data[i]===0),set=new Set(removed);if(p.mines[p.active-1].some(i=>!set.has(i)))return 'failed';
 const old=ledgerFor(p);if(Object.keys(old.sold).some(k=>ledger.sold[k as keyof typeof old.sold]<old.sold[k as keyof typeof old.sold])||old.levels.some((n,i)=>ledger.levels[i]<n)||old.crafted.some((n,i)=>ledger.crafted[i]<n))return 'failed';
 const next={...p,mines:p.mines.map((a,i)=>i===p.active-1?removed:a),ledger};if(p.active===1){const legacy=JSON.parse(p.legacy??'{"version":1,"removed":[]}');next.legacy=JSON.stringify({...legacy,removed})}return commit(next)}catch{return 'failed'}
 }};
}
