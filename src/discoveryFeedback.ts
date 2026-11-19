import {caveCandidates} from './caves.ts';
import {crystalClusters} from './crystals.ts';
import {relics} from './relics.ts';
import {treasureCaches} from './caches.ts';
export function discoveryFeedback(mine:number,id:string){
 const crystal=crystalClusters(mine).find(d=>d.id===id);if(crystal)return {title:crystal.kind+' crystal cluster',detail:'Discovery recorded',rare:crystal.kind==='golden'||crystal.kind==='rainbow'};
 const relic=relics(mine).find(d=>d.id===id);if(relic)return {title:relic.kind.replaceAll('-',' '),detail:'Relic recorded',rare:true};
 const cache=treasureCaches(mine).find(d=>d.id===id);if(cache)return {title:cache.kind+' treasure cache',detail:'+'+cache.reward+' Gold',rare:cache.kind!=='small'};
 if(caveCandidates(mine).some(d=>d.id===id))return {title:'Hidden cave discovered',detail:'Exploration recorded',rare:false};
 return null;
}
