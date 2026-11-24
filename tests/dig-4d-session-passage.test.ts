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
