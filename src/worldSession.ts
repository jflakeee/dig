import {craftLegendary,equipLegendary,validateLegendary,type LegendaryId} from './legendary.ts';
import {openExpansionPreview,expandedTerrain,expandedTravel,expandedUnlocked} from './expandedWorld.ts';
import {expansionMine,type ExpandedProfile} from './expandedProfile.ts';
import {volcanicMask} from './volcanicTerrain.ts';
import {claimDiscovery,discoveries} from './journal.ts';
import {naturalVoidMask} from './caves.ts';
import {migrateProfile,parseProfile,PROFILE,mines} from './mineProfile.ts';
import {ledgerFor,type UnifiedProfile,type Ledger} from './profileEconomy.ts';
import {unlocked,terrainFor,travel} from './expedition.ts';
import {SAVE,type Store} from './save.ts';
export function openWorld(store:Store){
 const source=store.getItem(SAVE);if(store.getItem(PROFILE)===null)migrateProfile(store);let baseline=store.getItem(PROFILE)!;type SessionProfile=(UnifiedProfile| (ExpandedProfile&{ledger?:Ledger;legendary?:import('./legendary.ts').LegendaryState}));let p:SessionProfile=JSON.parse(baseline)?.version===3?openExpansionPreview(baseline):migrateProfile(store);if(p.legacySource!==undefined&&p.legacySource!==source)throw Error('Legacy source conflict');const can=(v:SessionProfile,id:number)=>v.version===3?expandedUnlocked(v,id):unlocked(v,id);
 function validate(v:SessionProfile){const ledger=ledgerFor(v);if(v.version===3){validateLegendary({...v,ledger});const previous=typeof committedLedger!=='undefined'&&p.version===3?validateLegendary({...p,ledger:committedLedger}):{unlocked:[] as LegendaryId[]};if(previous.unlocked.some(id=>!v.legendary?.unlocked.includes(id)))throw Error('Legendary regression');}if(discoveries().some(d=>v.journal?.includes(d.id)&&!can(v,d.mine)))throw Error('Locked discovery');if(!can(v,v.active)||v.mines.some((a,i)=>a.length&&!can(v,i+1)))throw Error('Locked mine');return ledger}
 let committedLedger:Ledger|undefined;committedLedger=validate(p);
 const copyLedger=():Ledger=>({sold:{...committedLedger!.sold},levels:[...committedLedger!.levels],crafted:[...committedLedger!.crafted]});
 function commit(next:SessionProfile){try{if(store.getItem(PROFILE)!==baseline||store.getItem(SAVE)!==source)return 'conflict';const checked=validate(next);next={...next,legacySource:source};const raw=JSON.stringify(next);if(next.version===3)openExpansionPreview(raw);else parseProfile(raw);store.setItem(PROFILE,raw);baseline=raw;p=next;committedLedger=checked;return 'saved'}catch{return 'failed'}}
 return {craftLegendary(id:LegendaryId){if(p.version!==3)return 'failed';try{const next=craftLegendary({...p,ledger:copyLedger()},id);return next?commit(next):'failed'}catch{return 'failed'}},equipLegendary(id:LegendaryId|null){if(p.version!==3)return 'failed';try{const next=equipLegendary({...p,ledger:copyLedger()},id);return next?commit(next):'failed'}catch{return 'failed'}},get profile(){return p},get shape(){return p.active===4?expansionMine:mines[p.active-1]},get ledger(){return copyLedger()},terrain(){return p.version===3?expandedTerrain(p,p.active):terrainFor(p,p.active)},claim(id:string){if(p.worldgen!==1)return 'failed';const claim=claimDiscovery(p.journal??[],p.active,id);return claim?commit({...p,journal:claim.ids}):'failed'},move(id:number,onSurface:boolean){const next=p.version===3?expandedTravel(p,id,onSurface):id===4&&onSurface?expandedTravel(openExpansionPreview(JSON.stringify(p)),id,true):travel(p,id,onSurface);return next?commit(next):'failed'},write(data:Uint8Array,ledger:Ledger=copyLedger()){
 try{const m=p.active===4?expansionMine:mines[p.active-1];if(data.length!==m.n*m.n*m.h||data.some(v=>v!==0&&v!==1))return 'failed';const mask=m.id===4?volcanicMask():p.worldgen===1?naturalVoidMask(m.id):null;if(mask?.some((v,i)=>v===1&&data[i]!==0))return 'failed';const removed=Array.from(data.keys()).filter(i=>data[i]===0&&!mask?.[i]),set=new Set(removed);if(p.mines[p.active-1].some(i=>!set.has(i)))return 'failed';
 const old=committedLedger!;if(Object.keys(old.sold).some(k=>ledger.sold[k as keyof typeof old.sold]<old.sold[k as keyof typeof old.sold])||old.levels.some((n,i)=>ledger.levels[i]<n)||old.crafted.some((n,i)=>ledger.crafted[i]<n))return 'failed';
 const next={...p,mines:p.mines.map((a,i)=>i===p.active-1?removed:a),ledger};if(p.active===1){const legacy=JSON.parse(p.legacy??'{"version":1,"removed":[]}');next.legacy=JSON.stringify({...legacy,removed})}return commit(next)}catch{return 'failed'}
 }};
}
