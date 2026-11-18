import {test} from 'node:test';
import assert from 'node:assert/strict';
import {tools,toolAt} from '../src/tools.ts';
import {decode,excavateSphere} from '../src/terrain.ts';
test('tool selection fallback',()=>{for(const i of [-1,3,NaN,1.5])assert.equal(toolAt(i),tools[0]);assert.equal(toolAt(2).id,'drill')});
test('larger radius removes more terrain',()=>{const p={x:4,y:4,z:4};const counts=tools.map(t=>excavateSphere(decode(null),p,t.radius).removed);assert.ok(counts[1]>counts[0]&&counts[0]>counts[2])});
test('drill is fastest and shovel reaches farthest',()=>{assert.ok(tools[2].interval<tools[0].interval&&tools[0].interval<tools[1].interval);assert.ok(tools[0].reach>tools[1].reach&&tools[0].reach>tools[2].reach)});
