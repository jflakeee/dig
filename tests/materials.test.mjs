import {test} from 'node:test';
import assert from 'node:assert/strict';
import {terrainTint} from '../src/materials.ts';
test('strata correspond to depth',()=>{assert.equal(terrainTint(4,12,4).layer,'grass');assert.equal(terrainTint(4,11,4).layer,'soil');assert.equal(terrainTint(4,8,4).layer,'clay');assert.equal(terrainTint(4,1,4).layer,'rock')});
test('tint deterministic and bounded',()=>{for(let x=0;x<16;x+=.25)for(let y=0;y<=12;y++){const a=terrainTint(x,y,4);assert.deepEqual(a,terrainTint(x,y,4));assert.ok(a.tint>=.82-1e-9&&a.tint<=1.18+1e-9)}});
