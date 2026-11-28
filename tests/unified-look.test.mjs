import test from 'node:test';
import assert from 'node:assert/strict';
import { turn, wrap, upright, edgeRate } from '../next/look.js';
import { forward } from '../next/world.js';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, a + ' ≠ ' + b);

test('pitch keeps turning past straight up and wraps', () => {
  let [yaw, pitch] = [0, 0];
  for (let i = 0; i < 100; i++) [yaw, pitch] = turn(yaw, pitch, 0, 0.1);
  close(pitch, wrap(10));
  assert.ok(pitch > -Math.PI && pitch <= Math.PI);
  // A full loop comes back to the start.
  [yaw, pitch] = [0.3, 0.2];
  for (let i = 0; i < 64; i++) [yaw, pitch] = turn(yaw, pitch, 0, Math.PI / 32);
  close(yaw, 0.3);
  close(pitch, 0.2);
});

test('yaw keeps turning one way without bound', () => {
  let [yaw, pitch] = [0, 0];
  for (let i = 0; i < 1000; i++) [yaw, pitch] = turn(yaw, pitch, 0.05, 0);
  close(yaw, wrap(50));
});

test('upside down, a sideways drag still moves the view toward the drag', () => {
  // The view's right is [cos yaw, 0, -sin yaw]; a rightward drag must move
  // the forward vector toward it whether upright or upside down.
  for (const pitch of [0.4, 2.6, -2.6]) {
    const before = forward(0, pitch);
    const [yaw2, pitch2] = turn(0, pitch, 0.01, 0);
    const after = forward(yaw2, pitch2);
    assert.ok(after[0] - before[0] > 0, 'pitch ' + pitch);
  }
});

test('edge band turns faster deeper in and not at all in the middle', () => {
  assert.deepEqual(edgeRate(200, 400, 400, 800), [0, 0]);
  const [r1] = edgeRate(395, 400, 400, 800);
  const [r2] = edgeRate(370, 400, 400, 800);
  assert.ok(r1 > r2 && r2 > 0 && r1 <= 1);
  assert.ok(edgeRate(2, 400, 400, 800)[0] < 0);
  assert.ok(edgeRate(200, 2, 400, 800)[1] < 0);
});

test('upright keeps the heading and drops the roll', () => {
  const [yaw, pitch] = upright(0.7, 2.4);
  assert.ok(Math.cos(pitch) >= 0);
  forward(yaw, pitch).forEach((v, i) => close(v, forward(0.7, 2.4)[i]));
});
