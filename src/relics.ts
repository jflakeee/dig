import {caveCandidates} from './caves.ts';
import {mines} from './mineProfile.ts';
import {veinHash} from './veins.ts';
export type RelicKind='tablet'|'idol'|'ancient-compass';
export function relics(id:number){
 const m=mines[id-1];if(!m)return [];
 return caveCandidates(id).flatMap(c=>{
 const y=c.y-c.ry+1,depth=(m.h-y-.5)*.5;
 if(depth<9)return [];
 const r=veinHash(id*7919+101,c.x,c.y,c.z);if(r>=.65)return [];
 const kind:RelicKind=depth>=18&&r<.15?'ancient-compass':depth>=12&&r<.4?'idol':'tablet';
 return [{id:c.id+'-relic',caveId:c.id,kind,x:c.x+1,y,z:c.z}];
 });
}
