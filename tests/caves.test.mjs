import {test} from 'node:test';import assert from 'node:assert/strict';
import {caveCandidates,naturalVoidMask} from '../src/caves.ts';
import {mines} from '../src/mineProfile.ts';
test('legacy mine has no natural voids',()=>assert.equal(naturalVoidMask(1).some(Boolean),false));
test('expanded cave masks deterministic and enclosed',()=>{for(const id of [2,3]){const m=mines[id-1],a=naturalVoidMask(id);assert.deepEqual(a,naturalVoidMask(id));assert.ok(a.some(Boolean));assert.equal(new Set(caveCandidates(id).map(c=>c.id)).size,caveCandidates(id).length);for(let i=0;i<a.length;i++)if(a[i]){const x=i%m.n,z=Math.floor(i/m.n)%m.n,y=Math.floor(i/(m.n*m.n));assert.ok(x>=2&&z>=2&&y>=2&&x<m.n-2&&z<m.n-2&&y<m.h-10)}}});
