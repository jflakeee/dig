import test from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL_DRIFT,microGravityDrift} from '../src/microGravityDrift.ts';
test('microgravity drift stays bounded and deterministic',()=>{
  let a=INITIAL_DRIFT,b=INITIAL_DRIFT;
  for(let i=0;i<500;i++){
    const x=microGravityDrift(a,42,[5,7,9],0.04);
    const y=microGravityDrift(b,42,[5,7,9],0.04);
    assert.deepEqual(x,y);
    assert.ok(Math.hypot(...x.state.velocity)<=0.12+1e-12);
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

test('diagonal velocity is limited by total speed, not each axis',()=>{
  const result=microGravityDrift({velocity:[0.12,0.12,0.12]},42,[5,7,9],0.04);
  assert.ok(Math.hypot(...result.state.velocity)<=0.12+1e-12);
});

test('drift velocity is frame-rate independent under a constant gravity field',()=>{
  const run=dt=>{
    let state=INITIAL_DRIFT;
    for(let i=0;i<Math.round(2/dt);i++)
      state=microGravityDrift(state,42,[5,7,9],dt).state;
    return state.velocity;
  };
  const a=run(1/30),b=run(1/60),c=run(1/120);
  for(let axis=0;axis<3;axis++){
    assert.ok(Math.abs(a[axis]-b[axis])<1e-10);
    assert.ok(Math.abs(b[axis]-c[axis])<1e-10);
  }
});
