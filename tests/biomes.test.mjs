import {test} from 'node:test';import assert from 'node:assert/strict';
import {biomeAt,caveBiomes} from '../src/biomes.ts';
import {mines} from '../src/mineProfile.ts';
test('biomes preserve legacy and reject invalid coordinates',()=>{assert.equal(biomeAt(1,0,0,0),'soil');assert.equal(biomeAt(0,0,0,0),null);assert.equal(biomeAt(2,-1,0,0),null);assert.equal(biomeAt(2,0,36,0),null)});
test('biome depth gates and stable cave attribution',()=>{for(const id of [2,3]){const m=mines[id-1];assert.deepEqual(caveBiomes(id),caveBiomes(id));for(let y=0;y<m.h;y++)for(let x=0;x<m.n;x+=4)for(let z=0;z<m.n;z+=4){const b=biomeAt(id,x,y,z);assert.equal(b,biomeAt(id,x,y,z));assert.ok((m.h-y-.5)*.5>={soil:0,limestone:3,basalt:9,crystal:12,ancient:18}[b])}}});
