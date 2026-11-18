export const N=32,H=24,S=.5;
export const index=(x:number,y:number,z:number)=>(y*N+z)*N+x;
export function solid(data:Uint8Array,x:number,y:number,z:number){return x>=0&&x<N&&z>=0&&z<N&&y>=0&&y<H&&data[index(x,y,z)]===1}
export function decode(raw:string|null):Uint8Array{const data=new Uint8Array(N*N*H).fill(1);if(raw===null)return data;const v=JSON.parse(raw);if(v?.version!==1||!Array.isArray(v.removed)||!v.removed.every((i:unknown)=>typeof i==='number'&&Number.isInteger(i)&&i>=0&&i<data.length))throw Error('Invalid save');for(const i of v.removed)data[i]=0;return data}
export function encode(data:Uint8Array){const removed:number[]=[];data.forEach((v,i)=>{if(!v)removed.push(i)});return JSON.stringify({version:1,removed})}
export function excavate(data:Uint8Array,a:{x:number;y:number;z:number}){const dirty=new Set<string>();let removed=0;for(let x=a.x-1;x<=a.x+1;x++)for(let y=a.y-1;y<=a.y+1;y++)for(let z=a.z-1;z<=a.z+1;z++){if(!solid(data,x,y,z))continue;data[index(x,y,z)]=0;removed++;for(const [dx,dy,dz] of [[0,0,0],[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])dirty.add([Math.floor((x+dx)/8),Math.floor((y+dy)/8),Math.floor((z+dz)/8)].join(','))}return {dirty,removed}}
