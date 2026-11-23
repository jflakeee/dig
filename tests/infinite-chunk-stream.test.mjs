import test from 'node:test';
import assert from 'node:assert/strict';
import {InfiniteChunkStream} from '../src/infiniteChunkStream.ts';
test('stream loads within budget and reuses retained terrain',()=>{
  const stream=new InfiniteChunkStream(123,2);
  assert.equal(stream.update([0,0,0]).loaded,2);
  assert.equal(stream.loaded.size,2);
  const [key,record]=stream.loaded.entries().next().value;
  stream.update([100,0,0]);
  assert.ok(!stream.loaded.has(key));
  assert.equal(stream.retained.get(key),record);
  for(let i=0;i<5;i++)stream.update([0,0,0]);
  assert.equal(stream.loaded.get(key),record);
});
test('chunks beyond 256m reset their retained state',()=>{
  const stream=new InfiniteChunkStream(2,1);
  stream.update([0,0,0]);
  const [key,record]=stream.loaded.entries().next().value;
  stream.update([400,0,0]);
  assert.equal(stream.retained.has(key),false);
  for(let i=0;i<100;i++){stream.update([0,0,0]);if(stream.loaded.has(key))break}
  assert.notEqual(stream.loaded.get(key),record);
});
test('invalid stream settings are rejected',()=>{
  assert.throws(()=>new InfiniteChunkStream(1,0));
  assert.throws(()=>new InfiniteChunkStream(NaN));
});
