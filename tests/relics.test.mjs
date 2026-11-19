import {test} from 'node:test';import assert from 'node:assert/strict';
import {relics} from '../src/relics.ts';
import {naturalVoidMask} from '../src/caves.ts';
import {mines} from '../src/mineProfile.ts';
test('relic descriptors are stable, unique and inside caves',()=>{assert.deepEqual(relics(1),[]);for(const id of [2,3]){const m=mines[id-1],a=relics(id),mask=naturalVoidMask(id);assert.deepEqual(a,relics(id));assert.equal(new Set(a.map(r=>r.id)).size,a.length);for(const r of a){assert.equal(mask[r.x+r.z*m.n+r.y*m.n*m.n],1);assert.ok((m.h-r.y-.5)*.5>={tablet:9,idol:12,'ancient-compass':18}[r.kind])}}});
