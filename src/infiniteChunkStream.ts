import {chunkAt,chunkKey,chunkRange,distanceToChunk,type ChunkCoord,type WorldPosition} from './infiniteChunkCoordinates.ts';
import {generateInfiniteChunk} from './infiniteChunkTerrain.ts';

export type ChunkRecord={coord:ChunkCoord;terrain:Uint8Array};
/** Streaming cache for the new infinite mode; never touches legacy saves. */
export class InfiniteChunkStream {
  readonly loaded=new Map<string,ChunkRecord>();
  readonly retained=new Map<string,ChunkRecord>();
  readonly seed:number;
  readonly loadBudget:number;
  constructor(seed:number,loadBudget=2){
    if(!Number.isSafeInteger(seed)||!Number.isInteger(loadBudget)||loadBudget<1)throw Error('Invalid stream configuration');
    this.seed=seed;this.loadBudget=loadBudget;
  }
  /** Called each update. Visible chunks are loaded gradually, nearest first. */
  update(position:WorldPosition):{loaded:number;unloaded:number;reset:number}{
    const center=chunkAt(position);
    let unloaded=0,reset=0,loaded=0;
    for(const [key,record] of this.loaded){
      if(chunkRange(distanceToChunk(position,record.coord))!=='active'){
        this.loaded.delete(key);if(chunkRange(distanceToChunk(position,record.coord))==='reset')reset++;else this.retained.set(key,record);unloaded++;
      }
    }
    for(const [key,record] of this.retained){
      if(chunkRange(distanceToChunk(position,record.coord))==='reset'){
        this.retained.delete(key);reset++;
      }
    }
    const candidates:{coord:ChunkCoord;distance:number}[]=[];
    // 32m activation radius can intersect chunks up to three indices away.
    for(let y=center[1]-3;y<=center[1]+3;y++)
      for(let z=center[2]-3;z<=center[2]+3;z++)
        for(let x=center[0]-3;x<=center[0]+3;x++){
          const coord:ChunkCoord=[x,y,z];
          const distance=distanceToChunk(position,coord);
          if(distance>32||this.loaded.has(chunkKey(coord)))continue;
          candidates.push({coord,distance});
        }
    candidates.sort((a,b)=>a.distance-b.distance);
    for(const {coord} of candidates){
      if(loaded>=this.loadBudget)break;
      const key=chunkKey(coord);
      const record=this.retained.get(key)??{coord,terrain:generateInfiniteChunk(this.seed,coord)};
      this.retained.delete(key);this.loaded.set(key,record);loaded++;
    }
    return {loaded,unloaded,reset};
  }
}
