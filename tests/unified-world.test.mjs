import assert from 'node:assert/strict';
import { createWorld } from '../next/world.js';
import { portalMarker } from '../next/view.js';
import { test } from 'node:test';

test('excavation, ray hits and hull clearance cross each chunk face', () => {
  for (let axis = 0; axis < 3; axis++)
    for (const sign of [-1, 1]) {
      const world = createWorld(false);
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
    const w = createWorld(false, () => 0.999999);
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
    const world = createWorld(false, () => sample);
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
