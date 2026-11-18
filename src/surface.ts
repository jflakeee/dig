import {solid,N,H,S} from './terrain.ts';
type V=[number,number,number];
const corners:V[]=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
const tetra=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
const mid=(a:V,b:V):V=>a.map((v,i)=>(v+b[i])/2) as V;
export function meshChunk(data:Uint8Array,cx:number,cy:number,cz:number){
 const positions:number[]=[];
 const emit=(a:V,b:V,c:V,out:V)=>{const u=b.map((v,i)=>v-a[i]),v=c.map((v,i)=>v-a[i]);const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];if(n.reduce((s,q,i)=>s+q*out[i],0)<0)[b,c]=[c,b];positions.push(...a,...b,...c)};
 for(let y=cy*8-(cy===0?1:0);y<Math.min(H,(cy+1)*8);y++)for(let z=cz*8-(cz===0?1:0);z<Math.min(N,(cz+1)*8);z++)for(let x=cx*8-(cx===0?1:0);x<Math.min(N,(cx+1)*8);x++){
 const p=corners.map(([a,b,c])=>[(x+a+.5)*S,(y+b+.5)*S,(z+c+.5)*S] as V);
 const s=corners.map(([a,b,c])=>solid(data,x+a,y+b,z+c));
 if(s.every(v=>v===s[0]))continue;
 for(const t of tetra){const i=t.filter(k=>s[k]),o=t.filter(k=>!s[k]);if(!i.length||!o.length)continue;
 const out=o.map(k=>p[k]).reduce((a,b)=>a.map((v,j)=>v+b[j]/o.length) as V,[0,0,0] as V).map((v,j)=>v-i.reduce((a,k)=>a+p[k][j]/i.length,0)) as V;
 if(i.length===1)emit(mid(p[i[0]],p[o[0]]),mid(p[i[0]],p[o[1]]),mid(p[i[0]],p[o[2]]),out);
 else if(o.length===1)emit(mid(p[o[0]],p[i[0]]),mid(p[o[0]],p[i[1]]),mid(p[o[0]],p[i[2]]),out);
 else {const a=mid(p[i[0]],p[o[0]]),b=mid(p[i[0]],p[o[1]]),c=mid(p[i[1]],p[o[0]]),d=mid(p[i[1]],p[o[1]]);emit(a,b,c,out);emit(b,d,c,out)}
 }}
 return positions
}
