import {openExpansionPreview,expandedTravel,expandedTerrain} from './expandedWorld.ts';
import {PROFILE} from './mineProfile.ts';
import {SAVE,type Store} from './save.ts';
import {volcanicMask} from './volcanicTerrain.ts';
import type {ExpandedProfile} from './expandedProfile.ts';
// Staged writer: caller must hold the existing SAVE Web Lock.
export function openExpansionSession(store:Store){
 let baseline=store.getItem(PROFILE);if(baseline===null)throw Error('Missing profile');
 const source=store.getItem(SAVE);let p=openExpansionPreview(baseline);
 if(p.legacySource!==undefined&&p.legacySource!==source)throw Error('Legacy source conflict');
 function commit(next:ExpandedProfile){try{if(store.getItem(PROFILE)!==baseline||store.getItem(SAVE)!==source)return 'conflict';const raw=JSON.stringify({...next,legacySource:source});const valid=openExpansionPreview(raw);store.setItem(PROFILE,raw);baseline=raw;p=valid;return 'saved'}catch{return 'failed'}}
 return {get profile(){return structuredClone(p)},activate(){return commit(p)},move(id:number,surface:boolean){const next=expandedTravel(p,id,surface);return next?commit(next):'failed'},terrain(){return expandedTerrain(p,p.active)},writeFourth(data:Uint8Array){if(p.active!==4)return 'failed';const mask=volcanicMask();if(data.length!==mask.length||data.some((v,i)=>(v!==0&&v!==1)||(mask[i]===1&&v!==0)))return 'failed';const removed=Array.from(data.keys()).filter(i=>!data[i]&&!mask[i]);const set=new Set(removed);if(p.mines[3].some(i=>!set.has(i)))return 'failed';return commit({...p,mines:[...p.mines.slice(0,3),removed]})}};
}
