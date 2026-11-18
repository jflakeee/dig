import {test} from 'node:test';
import assert from 'node:assert/strict';
import {decode,excavateSphere,surfaceSpawn,density,N,H,S} from '../src/terrain.ts';
test('surface spawn is supported and clear',()=>{const d=decode(null),p=surfaceSpawn(d);assert.ok(p);assert.ok(density(d,p.x,H*S-.1,p.z)>.5);assert.equal(density(d,p.x,p.y,p.z),0)});
test('surface return avoids excavated landing',()=>{const d=decode(null),p=surfaceSpawn(d);excavateSphere(d,{x:p.x,y:H*S-.25,z:p.z});assert.notDeepEqual(surfaceSpawn(d),p)});
test('fully removed terrain has no landing',()=>assert.equal(surfaceSpawn(new Uint8Array(N*N*H)),null));
