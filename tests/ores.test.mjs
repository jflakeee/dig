import {test} from 'node:test';
import assert from 'node:assert/strict';
import {oreAt,ores} from '../src/ores.ts';
import {N,H,S} from '../src/terrain.ts';
test('ores deterministic and depth gated',()=>{const counts={coal:0,copper:0,iron:0,gold:0,gem:0};const min={coal:1,copper:2,iron:4,gold:6,gem:8};for(let y=0;y<H;y++)for(let z=0;z<N;z++)for(let x=0;x<N;x++){const a=oreAt(x,y,z);assert.equal(a,oreAt(x,y,z));if(a){assert.ok((H-y-.5)*S>=min[a]);counts[a]++}}for(const k of Object.keys(ores))assert.ok(counts[k]>0);assert.ok(counts.gem<counts.gold&&counts.gold<counts.iron)});
test('out of bounds ore is absent',()=>{for(const p of [[-1,0,0],[N,0,0],[0,H,0],[0,0,N],[.5,0,0]])assert.equal(oreAt(...p),null)});
