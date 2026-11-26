import { senseHazard, cargoLoss } from '../next/hazards.js';
import { contactDamage } from '../next/debris.js';
import { commit, readSave, saveKey } from '../next/save.js';
import { hitHull } from '../next/debris.js';
import { intersectStone } from '../next/rock-shapes.js';
import assert from 'node:assert/strict';
import { createWorld } from '../next/world.js';
import { portalMarker } from '../next/view.js';
import { test } from 'node:test';

test('excavation, ray hits and hull clearance cross each chunk face', () => {
  for (let axis = 0; axis < 3; axis++)
    for (const sign of [-1, 1]) {
      const world = createWorld(false, () => 0);
      const direction = [0, 0, 0];
      direction[axis] = sign;
      for (let i = 0; i < 140; i++) {
        const p = [0.5, 0.5, 0.5];
        p[axis] += sign * i;
        world.stream(p);
        const next = p.map((x, j) => x + direction[j]);
        for (const cell of world.blockers(next)) world.dig(...cell);
        assert.deepEqual(world.blockers(next), []);
        const hit = world.trace(next, ...direction);
        assert.ok(hit && hit.t > 0 && hit.t < 3);
      }
    }
});
test('sensor projects ahead and points toward off-screen portals on both axes', () => {
  const project = (p) => portalMarker(p, [0, 0, 0], 0, 0, 390, 844);
  assert.deepEqual(project([0, 0, 4]), {
    x: 195,
    y: 422,
    angle: 0,
    offscreen: false,
  });
  for (const target of [
    [5, 0, 1],
    [-5, 0, 1],
    [0, 5, 1],
    [0, -5, 1],
    [0, 0, -3],
  ]) {
    const mark = project(target);
    assert.ok(
      mark.offscreen &&
        mark.x > 0 &&
        mark.x < 390 &&
        mark.y > 0 &&
        mark.y < 844,
    );
    if (target[0]) assert.equal(Math.sign(mark.x - 195), Math.sign(target[0]));
    if (target[1]) assert.equal(Math.sign(mark.y - 422), -Math.sign(target[1]));
  }
});

function clearFace(world, axis, sign, skipCorner = false) {
  for (let a = -15; a <= 16; a++)
    for (let b = -15; b <= 16; b++) {
      if (skipCorner && a === 16 && b === 16) continue;
      const cell = [];
      cell[axis] = sign > 0 ? 16 : -15;
      cell[(axis + 1) % 3] = a;
      cell[(axis + 2) % 3] = b;
      world.dig(...cell);
    }
}

test('only the last solid cell schedules a face and gravity begins on opening', () => {
  const w = createWorld(false, () => 0);
  clearFace(w, 2, 1, true);
  w.dig(0, 0, 16);
  w.advance(500);
  assert.equal(w.portals().filter(p => !p.exit).length, 0);
  w.dig(16, 16, 16);
  w.advance(300);
  assert.deepEqual(w.gravity([0,0,0], w.portals().filter(p => !p.exit)), [0,0,0]);
  w.advance(1);
  const gate = w.portals().find(p => !p.exit);
  assert.equal(gate.radius, 0.5);
  assert.equal(gate.point[2], 17);
  assert.ok(w.gravity([-14,-14,-14], [gate])[2] > 0);
  assert.deepEqual(w.gravity([0,0,18]), [0,0,0]);
});

test('six faces connect six neighbours within the inclusive deadline', () => {
  for (const seconds of [299.999, 300, 300.001]) {
    const w = createWorld(false, () => 0.999999, undefined, undefined, undefined, () => 0);
    w.dig(0,0,18);
    clearFace(w, 0, -1);
    w.advance(seconds);
    for (let axis = 0; axis < 3; axis++)
      for (const sign of [-1,1])
        if (axis !== 0 || sign !== -1) clearFace(w, axis, sign);
    assert.equal(w.hasChunk(-1,0,0), seconds <= 300);
    assert.equal(w.solid(0,0,18), false);
    w.advance(361);
    assert.equal(w.portals().filter(p => !p.exit).length, 6);
    assert.ok(w.portals().filter(p => !p.exit).every(p => p.radius === 16));
  }
});

test('starter attraction is weak and ordinary portal strength is sampled once', () => {
  const starter = createWorld(true);
  assert.equal(starter.portals().length, 1);
  const first = starter.portals()[0];
  assert.equal(first.exit, false);
  assert.equal(first.strength, 0.6);
  assert.ok(starter.gravity([0.5,0.5,6])[2] > 0);
  for (const roll of [0, 0.9]) {
    let sample = roll;
    const world = createWorld(false, () => sample, undefined, undefined, undefined, () => 0);
    clearFace(world, 2, 1);
    world.advance(361);
    sample = 0.5;
    const gate = world.portals().find(p => !p.exit);
    assert.equal(gate.strength, 0.8 + roll * 4);
    const exit = createWorld(false, () => 0, gate.radius, gate.strength);
    assert.equal(exit.portals()[0].strength, gate.strength);
    assert.ok(exit.gravity([0.5,0.5,0])[2] > 0);
  }
});

test('visual rays follow fractured silhouettes, while mining occupies full cells', () => {
  const world = createWorld(true);
  const depths = new Set();
  for (let x = 0; x < 12; x++) {
    const pos = [x + 0.92, 3.94, 2.5];
    world.dig(x, 3, 2);
    const cell = world.trace(pos, 0, 0, 1);
    const surface = world.trace(pos, 0, 0, 1, 32, intersectStone);
    assert.equal(cell.t, 0.5);
    if (surface) {
      assert.ok(surface.t >= cell.t);
      depths.add(surface.t.toFixed(3));
    }
  }
  assert.ok(depths.size >= 3);
});

test('reset removes only the evicted chunk’s portals and pending openings', () => {
  for (const tutorial of [true, false]) {
    const world = createWorld(tutorial, () => 0);
    clearFace(world, 2, 1);
    for (let x = 17; x <= 48; x++)
      for (let y = -15; y <= 16; y++) world.dig(x, y, 16);
    world.advance(361);
    clearFace(world, 2, -1);
    const neighbour = world.portals().find(p => p.chunk[0] === 1);
    assert.ok(neighbour);
    assert.equal(world.portals().length, 3);
    world.stream([32, 0, 0]);
    assert.equal(world.portals().length, 3);
    world.stream([64, 0, 0]);
    assert.equal(world.mouth, null);
    assert.deepEqual(world.portals(), [neighbour]);
    world.stream([0, 0, 0]);
    world.dig(0, 0, 0);
    world.advance(1000);
    assert.deepEqual(world.portals(), [neighbour]);
    assert.deepEqual(world.gravity([0, 0, 0]), [0, 0, 0]);
  }
});

test('save round trip preserves excavation, portal countdown and chunk resets', () => {
  const world = createWorld(true, () => 0);
  clearFace(world, 2, 1);
  world.advance(300);
  const restore = w => createWorld(true, () => { throw Error('unexpected reroll'); },
    undefined, undefined, JSON.parse(JSON.stringify(w.snapshot())), () => 0);
  const loaded = restore(world);
  assert.equal(loaded.solid(0,0,16), false);
  assert.equal(loaded.solid(0,0,15), true);
  assert.equal(loaded.portals().length, 1);
  loaded.advance(1);
  world.advance(1);
  assert.deepEqual(loaded.portals(), world.portals());
  assert.deepEqual(restore(loaded).portals(), world.portals());
  loaded.stream([64,0,0]);
  const reset = restore(loaded);
  reset.stream([0,0,0]);
  assert.equal(reset.solid(0,0,16), true);
  assert.deepEqual(reset.portals(), []);
});

test('empty faces start waiting on entry and never spawn neighbours on their own', () => {
  const w = createWorld(true, () => 0.6);
  assert.equal(w.solid(32,8,2),false);
  w.advance(500);
  assert.equal(w.portals().length,1);
  w.stream([32,0,0]);
  w.advance(360);
  assert.equal(w.portals().length,7);
  assert.equal(w.hasChunk(2,0,0),false);
});

test('cave has connected passages, solid walls and accurate face counts', () => {
  const w = createWorld(false, () => 0.3);
  for (let z = -15; z <= 16; z++) assert.equal(w.solid(0,0,z),false);
  assert.equal(w.solid(12,12,12),true);
  let count=0;
  for(let x=-15;x<=16;x++) for(let y=-15;y<=16;y++) count+=Number(w.solid(x,y,16));
  assert.equal(w.snapshot().chunks[0].remaining[5],count);
  clearFace(w,2,1);
  w.advance(361);
  assert.ok(w.portals().some(p => !p.exit && p.axis===2 && p.sign===1));
});

test('warehouse pickups stay removed after reload', () => {
  const w = createWorld(false, () => 0.86);
  const first = w.warehouseItems()[0].item;
  assert.equal(first.type,null);
  assert.equal(w.solid(...first.point.map(Math.floor)),false);
  assert.ok([0,1,2].includes(w.takeNearby(first.point)));
  const restored = createWorld(false, Math.random, undefined, undefined, JSON.parse(JSON.stringify(w.snapshot())));
  assert.equal(restored.warehouseItems().length,8);
  assert.ok(restored.warehouseItems().every(({item}) => item.id !== first.id));
});

test('exit detaches solid cells, preserves fragments on reload, and resets with its chunk', () => {
  const exit = createWorld(false, () => 0, 2, 4);
  const start = createWorld(true);
  for (const world of [exit,start])
    for (let n=0; n<200; n++) world.debrisStep(0.05,[0.5,0.5,0.5],[0,0,0],false);
  assert.equal(start.fragments().length,0);
  assert.ok(exit.fragments().length>0);
  const saved = JSON.parse(JSON.stringify(exit.snapshot()));
  const excavated = saved.chunks.find(c => c.x===0 && c.y===0 && c.z===0).air;
  assert.equal(excavated.length,27+exit.fragments().length);
  const restored = createWorld(false, () => 0, 2, 4, saved);
  assert.deepEqual(restored.fragments(),exit.fragments());
  restored.stream([64,0,0]);
  assert.equal(restored.fragments().length,0);
});

test('fragment push depends on mass, closing speed and chain anchoring', () => {
  const push = (mass,speed,anchored) => hitHull({point:[1,0,0],speed:[-2,0,0],mass},
    [0,0,0],[speed,0,0],anchored)[0];
  assert.equal(push(4,-2,false),0);
  assert.ok(push(4,0,false) < push(1,0,false));
  assert.ok(push(1,0,false) < push(1,0,true));
});

test('pressure accumulates only while a body pins the hull against solid rock', () => {
  const body = {point:[-1,0,0],speed:[0,0,0],mass:4};
  const pos = [0,0,0], speed = [0,0,0], field = [2,0,0];
  assert.equal(contactDamage(body,pos,speed,field,0.05,() => false),0);
  assert.equal(contactDamage(body,pos,speed,field,0.05,p => p[0]>0),0.4);
  assert.equal(contactDamage(body,pos,speed,[-2,0,0],0.05,() => true),0);
});

test('fast floating cargo damages the hull and remains in the world after impact', () => {
  const world = createWorld(false,() => 0.86);
  const item = world.warehouseItems()[0].item;
  const pos = item.point.map((v,i) => v+(i===0 ? 1 : 0));
  item.speed = [6,0,0];
  assert.equal(world.takeNearby(pos),null);
  const result = world.hullContacts(0.05,pos,[0,0,0],false);
  assert.ok(result.damage>0 && result.push[0]>0);
  assert.equal(world.takeNearby(pos),null);
  const restored = createWorld(false,() => 0.86,undefined,undefined,JSON.parse(JSON.stringify(world.snapshot())));
  assert.deepEqual(restored.warehouseItems()[0].item,item);
});

test('fatal collision reboots once, retaining cargo and damaging the mounted drill', async t => {
  const data = mockStorage(t);
  const previous = {...readSave(), front:'drill-1',drills:['drill-1'],cargo:[2,1,3],transited:true};
  data.set(saveKey,JSON.stringify(previous));
  const next = await commit(previous.revision,'reboot');
  assert.equal(next.drillCondition,40);
  assert.deepEqual(next.cargo,previous.cargo);
  assert.deepEqual(next.drills,previous.drills);
  assert.equal(next.transited,false);
  assert.equal(next.session,null);
  await assert.rejects(commit(previous.revision,'reboot'));
  assert.equal(readSave().drillCondition,40);
});

test('exposure arms a volatile mineral; the countdown survives reload and blasts once', () => {
  const h = {point:[2,0,0],seed:0.1,fuse:null,kind:null,spent:false};
  const pos = [0,0,0], clear = () => null;
  assert.equal(senseHazard(h,pos,1,() => ({x:1,y:0,z:0})).visible,false);
  assert.equal(h.kind,null);
  assert.equal(senseHazard(h,pos,1,clear).damage,0);
  const saved = JSON.parse(JSON.stringify(h));
  assert.equal(senseHazard(saved,pos,2,clear).damage,90);
  assert.equal(senseHazard(saved,pos,1,clear).damage,0);
});

test('heat stops outside contact and fatal exposure reaches only susceptible outer cargo', () => {
  const h = {point:[0,0,0],seed:0.9,fuse:null,kind:null,spent:false};
  assert.equal(senseHazard(h,[1,0,0],0.5,()=>null).damage,21);
  assert.equal(senseHazard(h,[2,0,0],0.5,()=>null).damage,0);
  assert.deepEqual(cargoLoss('lava',[0,0,-1],[0,0,0],0,0),[1,1,0]);
  assert.deepEqual(cargoLoss('blast',[0,0,-1],[0,0,0],0,0),[1,0,0]);
  assert.deepEqual(cargoLoss('impact',[0,0,1],[0,0,0],0,0),[0,0,0]);
});

function mockStorage(t) {
  const data = new Map();
  const original = ['navigator','localStorage'].map(k => Object.getOwnPropertyDescriptor(globalThis,k));
  t.after(() => ['navigator','localStorage'].forEach((k,i) => {
    if (original[i]) Object.defineProperty(globalThis,k,original[i]); else delete globalThis[k];
  }));
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)}});
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{locks:{request:async(k,f)=>f()}}});
  return data;
}

test('a completed drill stroke wears once, laser recovery consumes the displayed materials', async t => {
  const data = mockStorage(t);
  const initial = {...readSave(),front:'drill-1',drills:['drill-1'],rocks:1,drillCondition:2};
  delete initial.ceramic;
  data.set(saveKey,JSON.stringify(initial));
  const session = {pos:[0.5,0.5,0.5],velocity:[0,0,0],yaw:0,pitch:0,sensor:false,entered:-1,world:createWorld(true).snapshot()};
  t.mock.method(Math,'random',()=>0);
  const broken = await commit(initial.revision,'drill',session);
  assert.equal(broken.drillCondition,0);
  assert.equal(broken.rocks,2);
  await assert.rejects(commit(initial.revision,'drill',session));
  await assert.rejects(commit(broken.revision,'repair'));
  const recovered = await commit(broken.revision,'laser',session);
  const ceramic = await commit(recovered.revision,'fire-ceramic');
  const fixed = await commit(ceramic.revision,'repair');
  assert.equal(fixed.rocks,0);
  assert.equal(fixed.ceramic,0);
  assert.equal(fixed.drillCondition,100);
  await assert.rejects(commit(ceramic.revision,'repair'));
});
