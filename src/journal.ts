import {caveCandidates} from './caves.ts';
import {crystalClusters} from './crystals.ts';
import {relics} from './relics.ts';
import {treasureCaches} from './caches.ts';
export type Discovery={id:string;mine:number;category:'cave'|'crystal'|'relic'|'cache';reward:number};
export function discoveries():Discovery[]{return [2,3].flatMap(mine=>[
 ...caveCandidates(mine).map(c=>({id:c.id,mine,category:'cave' as const,reward:0})),
 ...crystalClusters(mine).map(c=>({id:c.id,mine,category:'crystal' as const,reward:0})),
 ...relics(mine).map(c=>({id:c.id,mine,category:'relic' as const,reward:0})),
 ...treasureCaches(mine).map(c=>({id:c.id,mine,category:'cache' as const,reward:c.reward}))
])}
export function validateJournal(ids:unknown):ids is string[]{const known=new Set(discoveries().map(d=>d.id));return Array.isArray(ids)&&ids.every(i=>typeof i==='string'&&known.has(i))&&new Set(ids).size===ids.length}
export function claimDiscovery(ids:readonly string[],mine:number,id:string){
 if(!validateJournal(ids))return null;
 const d=discoveries().find(d=>d.id===id&&d.mine===mine);if(!d||ids.includes(id))return null;
 return {ids:[...ids,id],reward:d.reward};
}
export function journalProgress(ids:readonly string[]){if(!validateJournal(ids))throw Error('Invalid journal');const all=discoveries();return {found:ids.length,total:all.length,categories:['cave','crystal','relic','cache'].map(category=>{const items=all.filter(d=>d.category===category);return {category,total:items.length,found:items.filter(d=>ids.includes(d.id)).length}})}}
