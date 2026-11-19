import {mines} from './mineProfile.ts';
import {veinHash} from './veins.ts';
export type Cave={id:string;x:number;y:number;z:number;rx:number;ry:number;rz:number};
export function caveCandidates(id:number):Cave[]{
 const m=mines[id-1];if(!m||id===1)return [];
 const result:Cave[]=[];
 for(let k=0;k<(id===2?4:8);k++){
 const seed=id*7919+k*101, h=(a:number)=>veinHash(seed,a,0,0);
 const rx=3+Math.floor(h(1)*3),ry=2+Math.floor(h(2)*2),rz=3+Math.floor(h(3)*3);
 const x=rx+3+Math.floor(h(4)*(m.n-2*rx-6)),z=rz+3+Math.floor(h(5)*(m.n-2*rz-6));
 const y=ry+2+Math.floor(h(6)*(m.h-2*ry-14));
 const c={id:'cave-'+id+'-'+k,x,y,z,rx,ry,rz};
 if(result.every(b=>Math.hypot(b.x-x,b.z-z,b.y-y)>Math.max(b.rx,b.ry,b.rz)+Math.max(rx,ry,rz)+2))result.push(c);
 }return result;
}
export function naturalVoidMask(id:number):Uint8Array{
 const m=mines[id-1];if(!m)return new Uint8Array(0);const mask=new Uint8Array(m.n*m.n*m.h);
 for(const c of caveCandidates(id))for(let y=c.y-c.ry;y<=c.y+c.ry;y++)for(let z=c.z-c.rz;z<=c.z+c.rz;z++)for(let x=c.x-c.rx;x<=c.x+c.rx;x++)if(((x-c.x)/c.rx)**2+((y-c.y)/c.ry)**2+((z-c.z)/c.rz)**2<=1)mask[x+z*m.n+y*m.n*m.n]=1;
 return mask;
}
