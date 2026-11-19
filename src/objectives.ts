import {mines,type Profile} from './mineProfile.ts';
import {unlockThresholds} from './expedition.ts';
import {discoveries} from './journal.ts';
export function objectives(p:Profile){
 const result:{label:string;current:number;target:number}[]=[];
 for(let i=0;i<2;i++){const m=mines[i],target=Math.ceil(m.n*m.n*m.h*unlockThresholds[i+1]);result.push({label:'Unlock mine '+(i+2),current:Math.min(p.mines[i].length,target),target})}
 if(p.worldgen===1){const ids=new Set(p.journal??[]);for(const category of ['cave','crystal','relic','cache'] as const){const all=discoveries().filter(d=>d.category===category);if(all.length)result.push({label:'Discover '+category+' sites',current:all.filter(d=>ids.has(d.id)).length,target:all.length})}}
 return result;
}
