import {test} from 'node:test';
import assert from 'node:assert/strict';
import {decode,excavate} from '../src/terrain.ts';
import {meshChunk} from '../src/surface.ts';
test('solid interior emits no triangles',()=>assert.equal(meshChunk(decode(null),1,1,1).length,0));
test('top surface emits finite triangles',()=>{const p=meshChunk(decode(null),1,2,1);assert.ok(p.length>0);assert.equal(p.length%9,0);assert.ok(p.every(Number.isFinite));for(let i=1;i<p.length;i+=3)assert.equal(p[i],12)});
test('excavation creates interior surface',()=>{const d=decode(null);excavate(d,{x:12,y:12,z:12});assert.ok(meshChunk(d,1,1,1).length>0)});
test('adjacent chunk seam matches',()=>{const d=decode(null);excavate(d,{x:8,y:12,z:12});const seam=p=>{const s=new Set();for(let i=0;i<p.length;i+=3)if(p[i]===4.25)s.add(p.slice(i,i+3).join(','));return [...s].sort()};const a=seam(meshChunk(d,0,1,1)),b=seam(meshChunk(d,1,1,1));assert.ok(a.length);assert.deepEqual(a,b)});
