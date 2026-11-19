import {test} from 'node:test';import assert from 'node:assert/strict';
import {treasureCaches} from '../src/caches.ts';
import {naturalVoidMask} from '../src/caves.ts';
import {mines} from '../src/mineProfile.ts';
test('cache rewards and positions deterministic, enclosed and bounded',()=>{assert.deepEqual(treasureCaches(1),[]);let n=0;for(const id of [2,3]){const m=mines[id-1],a=treasureCaches(id),mask=naturalVoidMask(id);assert.deepEqual(a,treasureCaches(id));assert.equal(new Set(a.map(c=>c.id)).size,a.length);for(const c of a){const b={small:15,rare:45,ancient:100}[c.tier];assert.ok(c.reward>=b&&c.reward<2*b);assert.equal(mask[c.x+c.z*m.n+c.y*m.n*m.n],1);assert.ok((m.h-c.y-.5)*.5>={small:6,rare:12,ancient:18}[c.tier]);n++}}assert.ok(n>0)});
