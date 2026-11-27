import {chunkKey, type ChunkCoord} from './infiniteChunkCoordinates.ts';

/** Deterministic base rock and spawn cavity. No pre-rolled mineral deposits. */
export const CHUNK_VOXELS_PER_AXIS = 32;
export const CHUNK_VOXEL_COUNT = CHUNK_VOXELS_PER_AXIS ** 3;
export const VOXEL_METERS = .5;
export function voxelIndex(x:number,y:number,z:number):number {
  if (![x,y,z].every(v=>Number.isInteger(v)&&v>=0&&v<CHUNK_VOXELS_PER_AXIS))
    throw Error('Invalid local voxel');
  return (y*CHUNK_VOXELS_PER_AXIS+z)*CHUNK_VOXELS_PER_AXIS+x;
}
function hash(seed:number,x:number,y:number,z:number):number {
  let h=(seed|0)^Math.imul(x,73856093)^Math.imul(y,19349663)^Math.imul(z,83492791);
  h=Math.imul(h^(h>>>16),0x7feb352d);
  h=Math.imul(h^(h>>>15),0x846ca68b);
  return (h^(h>>>16))>>>0;
}
export function generateInfiniteChunk(seed:number,coord:ChunkCoord):Uint8Array {
  if (!Number.isSafeInteger(seed)) throw Error('Invalid seed');
  chunkKey(coord);
  const data=new Uint8Array(CHUNK_VOXEL_COUNT).fill(1);
  for(let y=0;y<CHUNK_VOXELS_PER_AXIS;y++)
    for(let z=0;z<CHUNK_VOXELS_PER_AXIS;z++)
      for(let x=0;x<CHUNK_VOXELS_PER_AXIS;x++){
        const wx=coord[0]*32+x,wy=coord[1]*32+y,wz=coord[2]*32+z;
        if (![wx,wy,wz].every(Number.isSafeInteger)) throw Error('Voxel coordinate overflow');
        // Small safe starting chamber at the origin, across chunk boundaries.
        const spawn=wx*wx+wy*wy+wz*wz<=36;
        // Sparse reproducible natural pockets; rock otherwise remains solid.
        const cave=hash(seed,Math.floor(wx/4),Math.floor(wy/4),Math.floor(wz/4))%97===0;
        if(spawn||cave)data[voxelIndex(x,y,z)]=0;
      }
  return data;
}
