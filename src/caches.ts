import {caveCandidates} from './caves.ts';
import {mines} from './mineProfile.ts';
import {veinHash} from './veins.ts';
export type CacheTier='small'|'rare'|'ancient';
export function treasureCaches(id:number){
 const m=mines[id-1];if(!m)return [];
 return caveCandidates(id).flatMap(c=>{
 const y=c.y-c.ry+1,depth=(m.h-y-.5)*.5;
 if(depth<6)return [];
 const r=veinHash(id*7919+313,c.x,c.y,c.z);if(r>=.7)return [];
 const tier:CacheTier=depth>=18&&r<.12?'ancient':depth>=12&&r<.35?'rare':'small';
 const base={small:15,rare:45,ancient:100}[tier];
 const reward=base+Math.floor(veinHash(id*7919+317,c.x,c.y,c.z)*base);
 return [{id:c.id+'-cache',caveId:c.id,tier,x:c.x-1,y,z:c.z,reward}];
 });
}
