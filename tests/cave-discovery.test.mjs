import {test} from 'node:test';import assert from 'node:assert/strict';
import {enteredCave} from '../src/caveDiscovery.ts';import {caveCandidates} from '../src/caves.ts';
test('cave entry only inside an unclaimed cave',()=>{assert.equal(enteredCave(1,0,0,0,[]),null);for(const id of [2,3])for(const c of caveCandidates(id)){assert.equal(enteredCave(id,c.x,c.y,c.z,[]),c.id);assert.equal(enteredCave(id,c.x,c.y,c.z,[c.id]),null);assert.equal(enteredCave(id,c.x,c.y+c.ry+1,c.z,[]),null)}});
