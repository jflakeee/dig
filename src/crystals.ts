import {caveCandidates} from './caves.ts';
import {mines} from './mineProfile.ts';
import {veinHash} from './veins.ts';
export type CrystalKind='amethyst'|'azure'|'golden'|'rainbow';
export function crystalClusters(id:number){
 const m=mines[id-1];if(!m)return [];
 return caveCandidates(id).flatMap(c=>{
 const y=c.y-c.ry,depth=(m.h-y-.5)*.5;if(depth<6)return [];
 const r=veinHash(id*7919,c.x,c.y,c.z);
 const kind:CrystalKind=depth>=18&&r<.08?'rainbow':depth>=12&&r<.25?'golden':depth>=9&&r<.55?'azure':'amethyst';
 return [{id:c.id+'-crystal',caveId:c.id,kind,x:c.x,y,z:c.z,count:3+Math.floor(r*5)}];
 });
}
