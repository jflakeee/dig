import {mines} from './mineProfile.ts';
import {caveCandidates} from './caves.ts';
import {veinHash} from './veins.ts';
export type Biome='soil'|'limestone'|'basalt'|'crystal'|'ancient';
export function biomeAt(id:number,x:number,y:number,z:number):Biome|null{
 const m=mines[id-1];if(!m||![x,y,z].every(Number.isInteger)||x<0||y<0||z<0||x>=m.n||y>=m.h||z>=m.n)return null;
 const d=(m.h-y-.5)*.5;
 if(id===1||d<3)return 'soil';
 const r=veinHash(id*7919+701,Math.floor(x/12),Math.floor(y/8),Math.floor(z/12));
 return d>=18&&r<.3?'ancient':d>=12&&r<.5?'crystal':d>=9?'basalt':'limestone';
}
export function caveBiomes(id:number){return caveCandidates(id).map(c=>({caveId:c.id,biome:biomeAt(id,c.x,c.y,c.z)!}))}
