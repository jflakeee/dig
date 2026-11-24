import assert from 'node:assert/strict';
import { SessionChunks } from '../src/digMode/sessionChunks.ts';

function sequence(values: number[]) {
  let index = 0;
  return () => values[index++];
}

const session = new SessionChunks(sequence([0.7, 0.7]), sequence([0.09, 0.02, 0.5, 0.5]));
const chunk = { x: 3, y: -1, z: 2 };
assert.deepEqual(session.getPassagePresence(chunk), { small: true, large: true });
assert.deepEqual(session.getPassagePresence(chunk), { small: true, large: true });
assert.equal(session.loadedChunkCount, 1);
session.resetChunk(chunk);
assert.deepEqual(session.getPassagePresence(chunk), { small: false, large: false });
session.transitionThroughLargePassage();
assert.equal(session.loadedChunkCount, 0);
assert.deepEqual(session.getLoadedChunkCoordinates(), []);
console.log('Session passage rolls persist per chunk and clear on reset');

const smallSession = new SessionChunks(() => 0.5, () => 0.05);
const passage = smallSession.smallPassageAt(chunk)!;
assert.ok(passage);
const receiver = { x: passage.x, y: passage.y, z: passage.fields[1].center[2] };
let pickups = 0;
let previousDroneZ = passage.droneZ;
let droneZAtPickup = Infinity;
assert.ok(previousDroneZ < passage.fields[0].center[2]);
let previousZ = passage.z;
for (let frame = 0; frame < 900; frame++) {
  if (passage.step(1 / 60, receiver)) {
    pickups++;
    droneZAtPickup = passage.droneZ;
  }
  assert.ok(passage.droneZ >= previousDroneZ);
  previousDroneZ = passage.droneZ;
  assert.ok(passage.z >= previousZ);
  previousZ = passage.z;
}
assert.ok(passage.z >= receiver.z);
assert.ok(passage.droneZ > droneZAtPickup, 'drone continues after ore pickup');
assert.ok(passage.droneZ - 0.14 > receiver.z, 'whole hull exits the bore');
const parkedZ = passage.droneZ;
assert.equal(passage.step(0.05, receiver), false);
assert.equal(passage.droneZ, parkedZ);
assert.equal(pickups, 1);
assert.equal(passage.visible, false);
assert.equal(smallSession.smallPassageAt(chunk), passage);
assert.equal(smallSession.mineVoxel(chunk, { x: 19, y: 16, z: 22 }), null);
smallSession.resetChunk(chunk);
assert.notEqual(smallSession.smallPassageAt(chunk), passage);
console.log('Small passage carries one mineral forward and grants only one pickup');

const largeOnly = new SessionChunks(() => 0.5, sequence([0.9, 0.02]));
const large = largeOnly.largePassageAt(chunk)!;
assert.equal(largeOnly.smallPassageAt(chunk), undefined);
const [outletX, y, z] = large.fields[1].center;
const before = { x: outletX - 1, y, z };
const after = { x: outletX + 1, y, z };
assert.equal(large.reverseContactX(before, after, 0.32), undefined);
assert.equal(large.reverseContactX(after, before, 0.32), outletX + 0.32);
assert.equal(large.reverseContactX({ ...after, y: y + 2 }, { ...before, y: y + 2 }, 0.32), undefined);
assert.equal(largeOnly.readVoxel(chunk, { x: 26, y: 16, z: 16 })?.mined, true);
assert.equal(largeOnly.largePassageAt(chunk), large);
console.log('Large passage opens the bore, retains the session and blocks reverse entry only at the mouth');

const { DigModeRuntime } = await import('../src/digMode/runtime.ts');
const { MeshBasicMaterial } = await import('three');
const material = new MeshBasicMaterial();
const runtime = new DigModeRuntime({
  rock: material, coal: material, iron: material, gold: material, rare: material,
}, { random: () => 0.5, portalRandom: () => 0.01 });
const machinePassage = runtime.session.largePassageAt(chunk)!;
const [inletX, axisY, axisZ] = machinePassage.fields[0].center;
const exitX = machinePassage.fields[1].center[0];
let position = { x: inletX - 0.5, y: axisY, z: axisZ };
const motion = {
  yaw: 0, pitch: 0, forward: 0, vertical: 0, deltaSeconds: 1 / 60, radius: 0.32,
  thrustAcceleration: 5, maximumSpeed: 3.5, passageFields: machinePassage.fields,
};
for (let i = 0; i < 420 && position.x < exitX + 0.5; i++) {
  position = runtime.moveMachine({ ...motion, position, strafe: 0 }).position;
}
assert.ok(position.x >= exitX + 0.5, 'gravity carries the machine completely through');
for (let i = 0; i < 180; i++) {
  position = runtime.moveMachine({ ...motion, position, strafe: -1 }).position;
}
assert.ok(Math.abs(position.x - exitX - motion.radius) < 0.001, 'reverse thrust stops at outlet');
assert.equal(runtime.session.largePassageAt(chunk), machinePassage);
runtime.dispose();
material.dispose();
