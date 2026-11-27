import * as T from 'three';
import {CHUNK_VOXELS_PER_AXIS as N,VOXEL_METERS as S} from './infiniteChunkTerrain.ts';
import type {ChunkCoord} from './infiniteChunkCoordinates.ts';

/** Only emit faces exposed to air, never one mesh per voxel. */
export function infiniteChunkMesh(data:Uint8Array,coord:ChunkCoord):T.Mesh {
  if(data.length!==N*N*N)throw Error('Invalid chunk terrain length');
  const vertices:number[]=[];
  const normals:number[]=[];
  const faces=[
    {d:[1,0,0],corners:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]]},
    {d:[-1,0,0],corners:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]]},
    {d:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]]},
    {d:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]},
    {d:[0,0,1],corners:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]]},
    {d:[0,0,-1],corners:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]]}
  ] as const;
  const solid=(x:number,y:number,z:number)=>x>=0&&y>=0&&z>=0&&x<N&&y<N&&z<N&&data[(y*N+z)*N+x]===1;
  for(let y=0;y<N;y++)for(let z=0;z<N;z++)for(let x=0;x<N;x++){
    if(!solid(x,y,z))continue;
    for(const face of faces){
      const [dx,dy,dz]=face.d;
      const nx=x+dx,ny=y+dy,nz=z+dz;
      // Neighbor chunk boundary faces are resolved when adjacent chunks load.
      if(solid(nx,ny,nz))continue;
      for(const index of [0,1,2,0,2,3]){
        const c=face.corners[index];
        vertices.push((x+c[0])*S,(y+c[1])*S,(z+c[2])*S);
        normals.push(dx,dy,dz);
      }
    }
  }
  const geometry=new T.BufferGeometry();
  geometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
  geometry.setAttribute('normal',new T.Float32BufferAttribute(normals,3));
  const mesh=new T.Mesh(geometry,new T.MeshStandardMaterial({color:0x6d7476,roughness:1,side:T.FrontSide}));
  mesh.position.set(coord[0]*N*S,coord[1]*N*S,coord[2]*N*S);
  return mesh;
}
export function disposeInfiniteChunkMesh(mesh:T.Mesh):void {
  mesh.geometry.dispose();
  const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
  for(const material of materials)material.dispose();
}
