import {test} from 'node:test';import assert from 'node:assert/strict';import {veinDensity} from '../src/veins.ts';
test('veins are stable, bounded and spatially variable',()=>{const values=[];for(let x=-8;x<16;x++)for(let y=0;y<12;y++){const v=veinDensity(42,x,y,3);assert.equal(v,veinDensity(42,x,y,3));assert.ok(v>=0&&v<=1);values.push(v)}assert.ok(values.some(v=>v>0));assert.ok(values.some(v=>v===0))});
test('different seeds produce different deposits',()=>{assert.ok(Array.from({length:30},(_,x)=>veinDensity(42,x,5,7)!==veinDensity(43,x,5,7)).some(Boolean))});
