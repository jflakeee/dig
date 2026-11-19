import {test} from 'node:test';import assert from 'node:assert/strict';
import {crystalClusters} from '../src/crystals.ts';
import {naturalVoidMask} from '../src/caves.ts';
import {mines} from '../src/mineProfile.ts';
test('crystal clusters stable, unique and in natural caves',()=>{assert.deepEqual(crystalClusters(1),[]);let total=0;for(const id of [2,3]){const m=mines[id-1],a=crystalClusters(id),mask=naturalVoidMask(id);assert.deepEqual(a,crystalClusters(id));assert.equal(new Set(a.map(c=>c.id)).size,a.length);for(const c of a){assert.equal(mask[c.x+c.z*m.n+c.y*m.n*m.n],1);assert.ok(c.count>=3&&c.count<=7);assert.ok((m.h-c.y-.5)*.5>={amethyst:6,azure:9,golden:12,rainbow:18}[c.kind]);total++}}assert.ok(total>0)});
