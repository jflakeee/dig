export const N=32,H=24,S=.5;
export type MineShape={n:number;h:number};
export const originalShape:MineShape={n:N,h:H};
export const index=(x:number,y:number,z:number)=>(y*N+z)*N+x;
export function solid(data:Uint8Array,x:number,y:number,z:number,shape:MineShape=originalShape){return x>=0&&x<shape.n&&z>=0&&z<shape.n&&y>=0&&y<shape.h&&data[(y*shape.n+z)*shape.n+x]===1}
export function decode(raw:string|null):Uint8Array{const data=new Uint8Array(N*N*H).fill(1);if(raw===null)return data;const v=JSON.parse(raw);if(v?.version!==1||!Array.isArray(v.removed)||!v.removed.every((i:unknown)=>typeof i==='number'&&Number.isInteger(i)&&i>=0&&i<data.length))throw Error('Invalid save');for(const i of v.removed)data[i]=0;return data}
export function encode(data:Uint8Array){const removed:number[]=[];data.forEach((v,i)=>{if(!v)removed.push(i)});return JSON.stringify({version:1,removed})}
export function excavate(data:Uint8Array,a:{x:number;y:number;z:number}){const dirty=new Set<string>();let removed=0;for(let x=a.x-1;x<=a.x+1;x++)for(let y=a.y-1;y<=a.y+1;y++)for(let z=a.z-1;z<=a.z+1;z++){if(!solid(data,x,y,z))continue;data[index(x,y,z)]=0;removed++;for(const [dx,dy,dz] of [[0,0,0],[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])dirty.add([Math.floor((x+dx)/8),Math.floor((y+dy)/8),Math.floor((z+dz)/8)].join(','))}return {dirty,removed}}

export function excavateSphere(data:Uint8Array,p:{x:number;y:number;z:number},radius=.85,shape:MineShape=originalShape){
 const {n:N,h:H}=shape;
 const dirty=new Set<string>();let removed=0;const indices:number[]=[];
 for(let y=Math.max(0,Math.floor((p.y-radius)/S));y<Math.min(H,Math.ceil((p.y+radius)/S));y++)for(let z=Math.max(0,Math.floor((p.z-radius)/S));z<Math.min(N,Math.ceil((p.z+radius)/S));z++)for(let x=Math.max(0,Math.floor((p.x-radius)/S));x<Math.min(N,Math.ceil((p.x+radius)/S));x++){
 if(!solid(data,x,y,z,shape)||((x+.5)*S-p.x)**2+((y+.5)*S-p.y)**2+((z+.5)*S-p.z)**2>radius**2)continue;
 const i=(y*N+z)*N+x;data[i]=0;indices.push(i);removed++;
 for(let dx=-1;dx<=0;dx++)for(let dy=-1;dy<=0;dy++)for(let dz=-1;dz<=0;dz++)dirty.add([Math.floor((x+dx)/8),Math.floor((y+dy)/8),Math.floor((z+dz)/8)].join(','));
 }return {dirty,removed,indices}
}
// Piecewise linear interpolation matching the six tetrahedra around the cube diagonal.
export function density(data:Uint8Array,x:number,y:number,z:number,shape:MineShape=originalShape){
 const X=x/S-.5,Y=y/S-.5,Z=z/S-.5;
 const i=Math.floor(X),j=Math.floor(Y),k=Math.floor(Z),a=X-i,b=Y-j,c=Z-k;
 const v=(dx:number,dy:number,dz:number)=>Number(solid(data,i+dx,j+dy,k+dz,shape));
 const low=v(0,0,0),high=v(1,1,1);
 if(a>=b){if(b>=c)return (1-a)*low+(a-b)*v(1,0,0)+(b-c)*v(1,1,0)+c*high;
 if(a>=c)return (1-a)*low+(a-c)*v(1,0,0)+(c-b)*v(1,0,1)+b*high;
 return (1-c)*low+(c-a)*v(0,0,1)+(a-b)*v(1,0,1)+b*high}
 if(a>=c)return (1-b)*low+(b-a)*v(0,1,0)+(a-c)*v(1,1,0)+c*high;
 if(b>=c)return (1-b)*low+(b-c)*v(0,1,0)+(c-a)*v(0,1,1)+a*high;
 return (1-c)*low+(c-b)*v(0,0,1)+(b-a)*v(0,1,1)+a*high;
}

export function surfaceSpawn(data:Uint8Array,shape:MineShape=originalShape){
 const {n:N,h:H}=shape;
 for(let z=1;z<N-1;z++)for(let x=1;x<N-1;x++){
 if(solid(data,x,H-1,z,shape)&&solid(data,x-1,H-1,z,shape)&&solid(data,x+1,H-1,z,shape)&&solid(data,x,H-1,z-1,shape)&&solid(data,x,H-1,z+1,shape))return {x:(x+.5)*S,y:H*S+1.65,z:(z+.5)*S};
 }return null;
}

// Permanent rescue platform outside the excavatable volume, on the north edge.
export function rescueSpawn(shape:MineShape=originalShape){return {x:shape.n*S/2,y:shape.h*S+1.65,z:-1.5}}
export function rescueFloor(x:number,z:number,shape:MineShape=originalShape){return x>=.25&&x<=shape.n*S-.25&&z>=-2.75&&z<=.25?shape.h*S:null}
