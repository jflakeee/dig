import test from 'node:test';
import assert from 'node:assert/strict';
import {microGravityWorldSeed} from '../src/microGravitySeed.ts';

test('same world ID always gives the same seed',()=>{
  assert.equal(microGravityWorldSeed('world-alpha'),microGravityWorldSeed('world-alpha'));
  assert.equal(microGravityWorldSeed(17),microGravityWorldSeed(17));
});
test('non-numeric world IDs no longer collapse to one seed',()=>{
  assert.notEqual(microGravityWorldSeed('alpha'),microGravityWorldSeed('beta'));
  assert.notEqual(microGravityWorldSeed('world-1'),microGravityWorldSeed('world-2'));
});
test('seed stays in safe unsigned 32-bit range',()=>{
  for(const id of ['world-1','한글',0,999999]){
    const seed=microGravityWorldSeed(id);
    assert.ok(Number.isSafeInteger(seed)&&seed>=0&&seed<=0xffffffff);
  }
});
test('invalid identifiers are rejected',()=>{
  for(const id of ['',NaN,Infinity,1.2,null])assert.throws(()=>microGravityWorldSeed(id));
});
