import {oreAt,type Ore} from './ores.ts';
import {mines,type Profile} from './mineProfile.ts';
import {veinDensity,veinHash} from './veins.ts';
import {emptyInventory} from './inventory.ts';
export function mineOre(id:number,x:number,y:number,z:number):Ore|null{
 const m=mines[id-1];if(!m||![x,y,z].every(Number.isInteger)||x<0||z<0||y<0||x>=m.n||z>=m.n||y>=m.h)return null;
 if(id===1)return oreAt(x,y,z);
 const depth=(m.h-y-.5)*.5,seed=id*7919,v=veinDensity(seed,x,y,z),r=veinHash(seed+5,Math.floor(x/6),Math.floor(y/6),Math.floor(z/6));
 if(v<.28)return null;
 if(depth>=12&&r<.08)return 'gem';
 if(depth>=8&&r<.25)return 'gold';
 if(depth>=4&&r<.55)return 'iron';
 return depth>=2&&r<.8?'copper':depth>=1?'coal':null;
}
export function profileInventory(p:Profile){const total=emptyInventory();for(let a=0;a<mines.length;a++){const m=mines[a];for(const i of p.mines[a]){const ore=mineOre(m.id,i%m.n,Math.floor(i/(m.n*m.n)),Math.floor(i/m.n)%m.n);if(ore)total[ore]++}}return total}
