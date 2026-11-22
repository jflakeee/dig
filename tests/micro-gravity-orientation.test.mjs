import test from 'node:test';
import assert from 'node:assert/strict';
import {faceMicroGravity} from '../src/microGravityOrientation.ts';
test('turns toward gravity along negative X',()=>{
  const v=faceMicroGravity({yaw:0,pitch:0},[-0.1,0,0],0.04);
  assert.ok(v.yaw>0);
  assert.equal(v.pitch,0);
});
test('positive Y gravity raises pitch',()=>{
  const v=faceMicroGravity({yaw:0,pitch:0},[0,0.1,0],0.04);
  assert.ok(v.pitch>0);
});
test('near-zero gravity and zero time preserve orientation',()=>{
  const old={yaw:1,pitch:0.3};
  assert.equal(faceMicroGravity(old,[0,0,0],0.04),old);
  assert.equal(faceMicroGravity(old,[0.1,0,0],0),old);
});
test('wraps yaw along shortest path',()=>{
  const v=faceMicroGravity({yaw:Math.PI-0.02,pitch:0},[0.001,0,0.1],0.04);
  assert.ok(Math.abs(v.yaw-(Math.PI-0.02))<0.1);
});
test('rejects invalid input',()=>assert.throws(()=>faceMicroGravity({yaw:0,pitch:0},[0,0,0],-1)));

test('near-vertical gravity preserves yaw instead of spinning',()=>{
  const v=faceMicroGravity({yaw:1.2,pitch:0},[0.00001,0.1,0.00001],0.04);
  assert.equal(v.yaw,1.2);
  assert.ok(v.pitch>0);
});
test('rotation converges toward gravity without overshoot',()=>{
  let facing={yaw:0,pitch:0};
  for(let i=0;i<300;i++)facing=faceMicroGravity(facing,[-0.1,0.02,0],0.04);
  assert.ok(Math.abs(facing.yaw-Math.PI/2)<0.001);
  assert.ok(Math.abs(facing.pitch-Math.asin(0.02/Math.hypot(0.1,0.02)))<0.001);
});
