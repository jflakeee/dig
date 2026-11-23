import {chunkKey,type ChunkCoord} from './infiniteChunkCoordinates.ts';
import {CHUNK_VOXEL_COUNT} from './infiniteChunkTerrain.ts';

/** Isolated infinite-preview save namespace; never reads or changes legacy saves. */
export class InfiniteMiningSave {
  static readonly key='dig:infinite-preview:v1';
  readonly edits=new Map<string,Set<number>>();
  constructor(readonly storage:Pick<Storage,'getItem'|'setItem'>,readonly seed:number){
    if(!Number.isSafeInteger(seed))throw Error('Invalid seed');
  }
  load():void {
    const raw=this.storage.getItem(InfiniteMiningSave.key);
    if(!raw)return;
    try {
      const value:unknown=JSON.parse(raw);
      if(!value||typeof value!=='object')return;
      const save=value as {version?:unknown;seed?:unknown;chunks?:unknown};
      if(save.version!==1||save.seed!==this.seed||!Array.isArray(save.chunks))return;
      const next=new Map<string,Set<number>>();
      for(const entry of save.chunks){
        if(!Array.isArray(entry)||entry.length!==2||typeof entry[0]!=='string'||!Array.isArray(entry[1]))return;
        const key=entry[0];
        const parts=key.split(',').map(Number);
        if(parts.length!==3||parts.some(n=>!Number.isSafeInteger(n))||chunkKey([parts[0],parts[1],parts[2]])!==key)return;
        const indices=new Set<number>();
        for(const index of entry[1]){
          if(!Number.isInteger(index)||index<0||index>=CHUNK_VOXEL_COUNT)return;
          indices.add(index);
        }
        next.set(key,indices);
      }
      this.edits.clear();
      for(const [key,indices] of next)this.edits.set(key,indices);
    }catch{ /* Corrupt preview saves are ignored without touching legacy storage. */ }
  }
  mark(coord:ChunkCoord,index:number):void {
    if(!Number.isInteger(index)||index<0||index>=CHUNK_VOXEL_COUNT)throw Error('Invalid voxel index');
    const key=chunkKey(coord);
    let indices=this.edits.get(key);
    if(!indices){indices=new Set();this.edits.set(key,indices)}
    indices.add(index);
  }
  apply(coord:ChunkCoord,terrain:Uint8Array):void {
    for(const index of this.edits.get(chunkKey(coord))??[])terrain[index]=0;
  }
  flush():void {
    const chunks=[...this.edits].map(([key,indices])=>[key,[...indices].sort((a,b)=>a-b)]);
    this.storage.setItem(InfiniteMiningSave.key,JSON.stringify({version:1,seed:this.seed,chunks}));
  }
}
