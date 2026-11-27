import test from 'node:test';
import assert from 'node:assert/strict';
import {InfiniteMiningSave} from '../src/infiniteMiningSave.ts';
import {CHUNK_VOXEL_COUNT} from '../src/infiniteChunkTerrain.ts';
const storage=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)}};
test('mining edits persist and restore, including negative chunks',()=>{
 const store=storage(),save=new InfiniteMiningSave(store,7);
 save.mark([-1,0,2],42);save.mark([-1,0,2],42);save.flush();
 const restored=new InfiniteMiningSave(store,7);restored.load();
 const terrain=new Uint8Array(CHUNK_VOXEL_COUNT).fill(1);
 restored.apply([-1,0,2],terrain);
 assert.equal(terrain[42],0);assert.equal(terrain[43],1);
 assert.equal(restored.edits.get('-1,0,2').size,1);
});
test('seed mismatch and corrupt records are ignored',()=>{
 const store=storage(),save=new InfiniteMiningSave(store,7);
 save.mark([0,0,0],1);save.flush();
 const other=new InfiniteMiningSave(store,8);other.load();assert.equal(other.edits.size,0);
 store.setItem(InfiniteMiningSave.key,'{broken');
 const corrupt=new InfiniteMiningSave(store,7);corrupt.load();assert.equal(corrupt.edits.size,0);
});
test('invalid edits do not enter save',()=>{
 const save=new InfiniteMiningSave(storage(),7);
 assert.throws(()=>save.mark([0,0,0],CHUNK_VOXEL_COUNT));
 assert.throws(()=>save.mark([0,0,0],-1));
});
