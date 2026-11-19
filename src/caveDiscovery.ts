import {caveCandidates} from './caves.ts';
export function enteredCave(mine:number,x:number,y:number,z:number,claimed:readonly string[]){
 return caveCandidates(mine).find(c=>!claimed.includes(c.id)&&((x-c.x)/c.rx)**2+((y-c.y)/c.ry)**2+((z-c.z)/c.rz)**2<=.75)?.id??null;
}
