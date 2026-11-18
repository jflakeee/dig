import {test} from 'node:test';
import assert from 'node:assert/strict';
import {N,H} from '../src/terrain.ts';
import {oreAt,ores} from '../src/ores.ts';
import {spent,upgradedTool} from '../src/upgrades.ts';
test('world economy baseline stays compatible with saved ledgers',()=>{const counts={coal:0,copper:0,iron:0,gold:0,gem:0},bands=Array(6).fill(0);for(let y=0;y<H;y++)for(let z=0;z<N;z++)for(let x=0;x<N;x++){const k=oreAt(x,y,z);if(k){counts[k]++;bands[Math.floor((H-y-.5)*.5/2)]+=ores[k].value}}assert.deepEqual(counts,{coal:1874,copper:1394,iron:884,gold:270,gem:73});assert.deepEqual(bands,[866,3107,4403,6307,7703,8878]);assert.equal(spent([5,5,5]),3525)});
test('each upgrade increases theoretical throughput',()=>{for(let i=0;i<3;i++){let previous=0;for(let n=0;n<=5;n++){const levels=[0,0,0];levels[i]=n;const t=upgradedTool(i,levels),rate=t.radius**3/t.interval;assert.ok(rate>previous);previous=rate}}});
