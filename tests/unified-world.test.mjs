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
