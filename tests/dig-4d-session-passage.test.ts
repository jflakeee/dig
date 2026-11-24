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
let previousZ = passage.z;
for (let frame = 0; frame < 900; frame++) {
  if (passage.step(1 / 60, receiver)) pickups++;
  assert.ok(passage.z >= previousZ);
  previousZ = passage.z;
}
assert.ok(passage.z >= receiver.z);
assert.equal(pickups, 1);
assert.equal(passage.visible, false);
assert.equal(smallSession.smallPassageAt(chunk), passage);
assert.equal(smallSession.mineVoxel(chunk, { x: 19, y: 16, z: 22 }), null);
smallSession.resetChunk(chunk);
assert.notEqual(smallSession.smallPassageAt(chunk), passage);
console.log('Small passage carries one mineral forward and grants only one pickup');
