import test from 'node:test';
import assert from 'node:assert/strict';
import {chunkMicroGravity,microGravityAt,MICRO_GRAVITY_MAX} from '../src/chunkMicroGravity.ts';
test('seeded fields are stable and magnitude bounded',()=>{
  const a=chunkMicroGravity(42,-12,3,7);
  assert.deepEqual(a,chunkMicroGravity(42,-12,3,7));
  assert.ok(Math.hypot(...a)<=MICRO_GRAVITY_MAX+1e-12);
  assert.notDeepEqual(a,chunkMicroGravity(42,-11,3,7));
});
test('field remains continuous across positive and negative chunk boundaries',()=>{
  for(const x of [-16,0,16,32]){
    const a=microGravityAt(42,[x-0.0001,2,7]);
    const b=microGravityAt(42,[x+0.0001,2,7]);
    assert.ok(Math.hypot(...a.map((v,i)=>v-b[i]))<0.0001);
  }
});
test('invalid positions and coordinates fail safely',()=>{
  assert.throws(()=>microGravityAt(42,[Infinity,0,0]));
  assert.throws(()=>chunkMicroGravity(42,0.1,0,0));
});
