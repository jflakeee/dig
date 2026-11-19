import {test} from 'node:test';import assert from 'node:assert/strict';
import {terrainFor} from '../src/expedition.ts';
import {naturalVoidMask} from '../src/caves.ts';
import {parseProfile} from '../src/mineProfile.ts';
test('versioned caves are separate from excavated cells',()=>{const p={version:2,legacy:null,active:1,mines:[[],[],[]]};const legacy=terrainFor(p,2);assert.ok(legacy.every(v=>v===1));const next=parseProfile(JSON.stringify({...p,worldgen:1}));const data=terrainFor(next,2),mask=naturalVoidMask(2);assert.ok(mask.some(Boolean));assert.ok(data.every((v,i)=>v===1-mask[i]));assert.deepEqual(next.mines,[[],[],[]]);next.mines[1].push(mask.indexOf(1));assert.throws(()=>parseProfile(JSON.stringify(next)))});
