import * as T from 'three';
import {InfiniteChunkStream} from './infiniteChunkStream.ts';
import {infiniteChunkMesh,disposeInfiniteChunkMesh} from './infiniteChunkMesh.ts';
import type {WorldPosition} from './infiniteChunkCoordinates.ts';

/** Owns only infinite-mode render meshes. Does not alter legacy terrain or saves. */
export class InfiniteChunkScene {
  readonly stream:InfiniteChunkStream;
  readonly meshes=new Map<string,T.Mesh>();
  constructor(readonly scene:T.Scene,seed:number,loadBudget=2){
    this.stream=new InfiniteChunkStream(seed,loadBudget);
  }
  update(position:WorldPosition):void {
    this.stream.update(position);
    for(const [key,mesh] of this.meshes){
      if(this.stream.loaded.has(key))continue;
      this.scene.remove(mesh);
      disposeInfiniteChunkMesh(mesh);
      this.meshes.delete(key);
    }
    for(const [key,record] of this.stream.loaded){
      if(this.meshes.has(key))continue;
      const mesh=infiniteChunkMesh(record.terrain,record.coord);
      this.scene.add(mesh);
      this.meshes.set(key,mesh);
    }
  }
  dispose():void {
    for(const mesh of this.meshes.values()){
      this.scene.remove(mesh);
      disposeInfiniteChunkMesh(mesh);
    }
    this.meshes.clear();
    this.stream.loaded.clear();
    this.stream.retained.clear();
  }
}
