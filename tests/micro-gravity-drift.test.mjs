import test from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL_DRIFT,microGravityDrift} from '../src/microGravityDrift.ts';
test('microgravity drift stays bounded and deterministic',()=>{
  let a=INITIAL_DRIFT,b=INITIAL_DRIFT;
  for(let i=0;i<500;i++){
    const x=microGravityDrift(a,42,[5,7,9],0.04);
    const y=microGravityDrift(b,42,[5,7,9],0.04);
    assert.deepEqual(x,y);
    assert.ok(x.state.velocity.every(v=>Math.abs(v)<=0.12));
    a=x.state;b=y.state;
  }
});
test('zero delta causes no drift and no state mutation',()=>{
  const a=microGravityDrift(INITIAL_DRIFT,42,[0,0,0],0);
  assert.deepEqual(a.displacement,[0,0,0]);
  assert.deepEqual(INITIAL_DRIFT.velocity,[0,0,0]);
});
test('bad delta rejected',()=>{
  assert.throws(()=>microGravityDrift(INITIAL_DRIFT,42,[0,0,0],-1));
  assert.throws(()=>microGravityDrift(INITIAL_DRIFT,42,[0,0,0],1));
});
