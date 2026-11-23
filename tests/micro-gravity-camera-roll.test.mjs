import test from 'node:test';
import assert from 'node:assert/strict';
import {gravityLevelRoll} from '../src/microGravityCameraRoll.ts';

test('screen down already follows gravity',()=>{
  assert.equal(gravityLevelRoll(0,0,-0.1,0.04),0);
});
test('gravity right rolls camera toward right',()=>{
  const next=gravityLevelRoll(0,0.1,0,0.04);
  assert.ok(next>0&&next<=0.9*0.04);
});
test('gravity left rolls camera toward left',()=>{
  const next=gravityLevelRoll(0,-0.1,0,0.04);
  assert.ok(next<0&&next>=-0.9*0.04);
});
test('near zero gravity and paused frame preserve roll',()=>{
  assert.equal(gravityLevelRoll(0.6,0.001,0,0.04),0.6);
  assert.equal(gravityLevelRoll(0.6,0.1,0,0),0.6);
});
test('roll converges to gravity in every screen quadrant',()=>{
  for(const [x,y] of [[0.1,0],[0,-0.1],[-0.1,0],[0,0.1],[0.1,0.1],[-0.1,-0.1]]){
    let roll=0;
    for(let i=0;i<250;i++)roll=gravityLevelRoll(roll,x,y,0.04);
    const target=Math.atan2(x,-y);
    assert.ok(Math.abs(Math.atan2(Math.sin(roll-target),Math.cos(roll-target)))<1e-9);
  }
});
test('shortest rotation crosses the wrap boundary',()=>{
  const next=gravityLevelRoll(Math.PI-0.01,-0.001,0.1,0.04);
  assert.ok(next>Math.PI-0.01);
});
test('invalid and overflowing inputs are rejected',()=>{
  assert.throws(()=>gravityLevelRoll(0,Infinity,0,0.04));
  assert.throws(()=>gravityLevelRoll(0,1.4e308,1.4e308,0.04));
  assert.throws(()=>gravityLevelRoll(0,0.1,0,-0.1));
});
