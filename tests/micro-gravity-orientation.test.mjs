import test from 'node:test';
import assert from 'node:assert/strict';
import {faceMicroGravity} from '../src/microGravityOrientation.ts';
import {lookDirection} from '../src/zeroGravityMovement.ts';
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
  const start=Math.PI-0.02;
  const v=faceMicroGravity({yaw:start,pitch:0},[0.001,0,0.1],0.04);
  assert.ok(v.yaw>start, 'should turn through +π rather than rotating almost 2π backward');
  assert.ok(v.yaw-start<0.01);
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

test('auto-facing is stable across mobile frame rates',()=>{
  const simulate=dt=>{
    let facing={yaw:0,pitch:0};
    for(let i=0;i<Math.round(2/dt);i++)
      facing=faceMicroGravity(facing,[-0.1,0.02,0],dt);
    return facing;
  };
  const a=simulate(1/30),b=simulate(1/60),c=simulate(1/120);
  for(const axis of ['yaw','pitch']){
    assert.ok(Math.abs(a[axis]-b[axis])<0.002);
    assert.ok(Math.abs(b[axis]-c[axis])<0.002);
  }
});

test('abrupt gravity change cannot spin camera faster than 0.9 rad/s',()=>{
  const start={yaw:0,pitch:0};
  const dt=0.04;
  const next=faceMicroGravity(start,[0,0,0.1],dt);
  assert.ok(Math.abs(next.yaw-start.yaw)<=0.9*dt+1e-12);
  const vertical=faceMicroGravity(start,[0,0.1,0],dt);
  assert.ok(Math.abs(vertical.pitch-start.pitch)<=0.9*dt+1e-12);
});

test('camera forward vector converges to gravity direction in all octants',()=>{
  const vectors=[
    [-0.1,0.02,0.04],[0.1,-0.02,0.04],
    [-0.1,-0.02,-0.04],[0.1,0.02,-0.04],
    [0,0,-0.1],[0,0,0.1],
  ];
  for(const gravity of vectors){
    let facing={yaw:0,pitch:0};
    for(let i=0;i<600;i++)facing=faceMicroGravity(facing,gravity,0.04);
    const forward=lookDirection(facing.yaw,facing.pitch);
    const magnitude=Math.hypot(...gravity);
    const dot=forward.reduce((sum,v,i)=>sum+v*gravity[i]/magnitude,0);
    assert.ok(dot>0.999, 'forward direction should align with local gravity');
  }
});

test('automatic orientation never exceeds the safe pitch range',()=>{
  for(const gravity of [[0,0.1,0],[0,-0.1,0]]){
    let facing={yaw:0,pitch:0};
    for(let i=0;i<400;i++)facing=faceMicroGravity(facing,gravity,0.04);
    assert.ok(facing.pitch<=1.5&&facing.pitch>=-1.5);
  }
});

test('combined yaw and pitch rotation stays within the angular speed cap',()=>{
  const start={yaw:0,pitch:0};
  for(const gravity of [[0.1,0.1,0.1],[-0.1,-0.1,0.1],[0.1,0.1,-0.1]]){
    const dt=0.04;
    const next=faceMicroGravity(start,gravity,dt);
    assert.ok(Math.hypot(next.yaw-start.yaw,next.pitch-start.pitch)<=0.9*dt+1e-12);
  }
});

test('near-vertical target converges to safe pitch without wasting yaw turn budget',()=>{
  let facing={yaw:0,pitch:0};
  const gravity=[0.004,0.1,-0.004];
  for(let i=0;i<600;i++)facing=faceMicroGravity(facing,gravity,0.04);
  assert.ok(Math.abs(facing.pitch-1.5)<1e-4);
  assert.ok(Math.abs(facing.yaw+Math.PI/4)<1e-4);
});

test('rejects finite components whose combined gravity magnitude overflows',()=>{
  const state={yaw:0,pitch:0};
  assert.throws(()=>faceMicroGravity(state,[1.1e308,1.1e308,1.1e308],0.04));
  assert.throws(()=>faceMicroGravity(state,[1.1e308,1.1e308,1.1e308],0));
});
