export const N=32,H=24,S=.5;
export const index=(x:number,y:number,z:number)=>(y*N+z)*N+x;
export function solid(data:Uint8Array,x:number,y:number,z:number){return x>=0&&x<N&&z>=0&&z<N&&y>=0&&y<H&&data[index(x,y,z)]===1}
export function decode(raw:string|null):Uint8Array{const data=new Uint8Array(N*N*H).fill(1);if(raw===null)return data;const v=JSON.parse(raw);if(v?.version!==1||!Array.isArray(v.removed)||!v.removed.every((i:unknown)=>typeof i==='number'&&Number.isInteger(i)&&i>=0&&i<data.length))throw Error('Invalid save');for(const i of v.removed)data[i]=0;return data}
export function encode(data:Uint8Array){const removed:number[]=[];data.forEach((v,i)=>{if(!v)removed.push(i)});return JSON.stringify({version:1,removed})}
export function excavate(data:Uint8Array,a:{x:number;y:number;z:number}){const dirty=new Set<string>();let removed=0;for(let x=a.x-1;x<=a.x+1;x++)for(let y=a.y-1;y<=a.y+1;y++)for(let z=a.z-1;z<=a.z+1;z++){if(!solid(data,x,y,z))continue;data[index(x,y,z)]=0;removed++;for(const [dx,dy,dz] of [[0,0,0],[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])dirty.add([Math.floor((x+dx)/8),Math.floor((y+dy)/8),Math.floor((z+dz)/8)].join(','))}return {dirty,removed}}

export function excavateSphere(data:Uint8Array,p:{x:number;y:number;z:number},radius=.85){
 const dirty=new Set<string>();let removed=0;
 for(let y=Math.max(0,Math.floor((p.y-radius)/S));y<Math.min(H,Math.ceil((p.y+radius)/S));y++)for(let z=Math.max(0,Math.floor((p.z-radius)/S));z<Math.min(N,Math.ceil((p.z+radius)/S));z++)for(let x=Math.max(0,Math.floor((p.x-radius)/S));x<Math.min(N,Math.ceil((p.x+radius)/S));x++){
 if(!solid(data,x,y,z)||((x+.5)*S-p.x)**2+((y+.5)*S-p.y)**2+((z+.5)*S-p.z)**2>radius**2)continue;
 data[index(x,y,z)]=0;removed++;
 for(let dx=-1;dx<=0;dx++)for(let dy=-1;dy<=0;dy++)for(let dz=-1;dz<=0;dz++)dirty.add([Math.floor((x+dx)/8),Math.floor((y+dy)/8),Math.floor((z+dz)/8)].join(','));
 }return {dirty,removed}
}
// Piecewise linear interpolation matching the six tetrahedra around the cube diagonal.
export function density(data:Uint8Array,x:number,y:number,z:number){
 const q=[x/S-.5,y/S-.5,z/S-.5],b=q.map(Math.floor),f=q.map((v,i)=>v-b[i]);
 const order=[0,1,2].sort((a,c)=>f[c]-f[a]);const v=b.slice();
 const sample=()=>Number(solid(data,v[0],v[1],v[2]));
 let d=(1-f[order[0]])*sample();v[order[0]]++;
 d+=(f[order[0]]-f[order[1]])*sample();v[order[1]]++;
 d+=(f[order[1]]-f[order[2]])*sample();v[order[2]]++;
 return d+f[order[2]]*sample();
}
