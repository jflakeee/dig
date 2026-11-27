import test from 'node:test';
import assert from 'node:assert/strict';
import {generateInfiniteChunk,voxelIndex,CHUNK_VOXEL_COUNT} from '../src/infiniteChunkTerrain.ts';

test('chunk generation is repeatable and full size',()=>{
  const a=generateInfiniteChunk(123,[0,0,0]),b=generateInfiniteChunk(123,[0,0,0]);
  assert.equal(a.length,CHUNK_VOXEL_COUNT);
  assert.deepEqual(a,b);
  assert.equal(a[voxelIndex(0,0,0)],0);
  assert.equal(a[voxelIndex(3,0,0)],0);
});
test('spawn cavity continues across negative chunk coordinates',()=>{
  const a=generateInfiniteChunk(123,[-1,0,0]);
  assert.equal(a[voxelIndex(31,0,0)],0);
  assert.equal(a[voxelIndex(26,0,0)],0);
});
test('generated chunks contain only rock and void, no preassigned ores',()=>{
  const a=generateInfiniteChunk(77,[2,-3,1]);
  assert.ok(a.every(v=>v===0||v===1));
  assert.ok(a.some(v=>v===1));
});
test('invalid local coordinates and overflow fail closed',()=>{
  assert.throws(()=>voxelIndex(-1,0,0));
  assert.throws(()=>voxelIndex(32,0,0));
  assert.throws(()=>generateInfiniteChunk(0,[Number.MAX_SAFE_INTEGER,0,0]));
});
