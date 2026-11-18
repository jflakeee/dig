import {test} from 'node:test';
import assert from 'node:assert/strict';
import {tools,toolAt} from '../src/tools.ts';
import {decode,excavateSphere} from '../src/terrain.ts';
test('tool selection fallback',()=>{for(const i of [-1,3,NaN,1.5])assert.equal(toolAt(i),tools[0]);assert.equal(toolAt(2).id,'drill')});
test('larger radius removes more terrain',()=>{const totals=[0,0,0];for(const x of [4,4.125,4.25])for(const y of [4,4.125,4.25])for(const z of [4,4.125,4.25]){const counts=tools.map(t=>excavateSphere(decode(null),{x,y,z},t.radius).removed);assert.ok(counts[1]>=counts[0]&&counts[0]>=counts[2]);counts.forEach((n,i)=>totals[i]+=n)}assert.ok(totals[1]>totals[0]&&totals[0]>totals[2])});
test('drill is fastest and shovel reaches farthest',()=>{assert.ok(tools[2].interval<tools[0].interval&&tools[0].interval<tools[1].interval);assert.ok(tools[0].reach>tools[1].reach&&tools[0].reach>tools[2].reach)});
