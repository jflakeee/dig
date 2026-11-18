import {test} from 'node:test';
import assert from 'node:assert/strict';
import {N,H,index,solid,decode,encode,excavate} from '../src/terrain.ts';
test('v1 round trip',()=>{const d=decode('{"version":1,"removed":[0,24575,0]}');assert.equal(d[0],0);assert.equal(d[d.length-1],0);assert.deepEqual(decode(encode(d)),d)});
test('invalid saves',()=>{for(const raw of ['{','null','{"version":2,"removed":[]}','{"version":1,"removed":[-1]}','{"version":1,"removed":[24576]}','{"version":1,"removed":[1.5]}','{"version":1,"removed":["1"]}'])assert.throws(()=>decode(raw))});
test('index and bounds',()=>{const d=decode(null);assert.equal(index(N-1,H-1,N-1),d.length-1);assert.equal(solid(d,-1,0,0),false);assert.equal(solid(d,N,0,0),false);assert.equal(solid(d,0,H,0),false)});
test('excavation idempotence and neighbor chunks',()=>{const d=decode(null);const r=excavate(d,{x:7,y:8,z:8});assert.equal(r.removed,27);assert.ok(r.dirty.has('0,1,1'));assert.ok(r.dirty.has('1,1,1'));assert.equal(excavate(d,{x:7,y:8,z:8}).removed,0)});
test('map edge clipped',()=>{const d=decode(null);assert.equal(excavate(d,{x:0,y:0,z:0}).removed,8);assert.equal(d.length,N*N*H)});
