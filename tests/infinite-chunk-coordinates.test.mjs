import test from 'node:test';
import assert from 'node:assert/strict';
import {chunkAt,chunkKey,chunkFromKey,distanceToChunk,chunkRange} from '../src/infiniteChunkCoordinates.ts';

test('positive, zero and negative world positions use floor division', () => {
  assert.deepEqual(chunkAt([0,0,0]), [0,0,0]);
  assert.deepEqual(chunkAt([16,32,-16]), [1,2,-1]);
  assert.deepEqual(chunkAt([-.001,-16.001,-32]), [-1,-2,-2]);
});
test('chunk keys round-trip and reject malformed inputs', () => {
  assert.equal(chunkKey([-2,0,13]), '-2,0,13');
  assert.deepEqual(chunkFromKey('-2,0,13'), [-2,0,13]);
  for (const value of ['1,2','1,2,3,4','1.5,0,0','01,0,0','NaN,0,0'])
    assert.throws(() => chunkFromKey(value));
});
test('nearest bounds distance avoids center-distance pop-in', () => {
  assert.equal(distanceToChunk([0,0,0],[0,0,0]), 0);
  assert.equal(distanceToChunk([17,8,8],[0,0,0]), 1);
  assert.equal(distanceToChunk([-3,-4,8],[0,0,0]), 5);
  assert.equal(distanceToChunk([-16,0,0],[-1,0,0]), 0);
});
test('distance policy is inclusive at thresholds', () => {
  for (const [distance,expected] of [[0,'active'],[32,'active'],[32.001,'unload'],[64,'unload'],[64.001,'retain'],[256,'retain'],[256.001,'reset']])
    assert.equal(chunkRange(distance), expected);
});
test('invalid coordinates and distances fail closed', () => {
  assert.throws(() => chunkAt([Infinity,0,0]));
  assert.throws(() => chunkAt([Number.MAX_VALUE,0,0]));
  assert.throws(() => distanceToChunk([NaN,0,0],[0,0,0]));
  assert.throws(() => chunkRange(-1));
});
