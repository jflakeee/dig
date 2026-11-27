import test from 'node:test';
import assert from 'node:assert/strict';
import {equipRecoveredDrill} from '../src/infiniteRecoveredDrill.ts';

test('equip recovered drill swaps worn gear without changing original inventory',()=>{
 const current={tier:0,durability:17};
 const items=[{kind:'ic-chip',tier:0,durability:40,maxDurability:100},{kind:'drill',tier:2,durability:81,maxDurability:150}];
 const result=equipRecoveredDrill(current,items,1);
 assert.deepEqual(result.drill,{tier:2,durability:81});
 assert.deepEqual(result.equipment[1],{kind:'drill',tier:0,durability:17,maxDurability:30});
 assert.equal(items[1].tier,2);
});
test('non-drills and invalid indexes cannot be equipped',()=>{
 const items=[{kind:'ic-chip',tier:0,durability:40,maxDurability:100},{kind:'drill',tier:1,durability:9,maxDurability:75}];
 assert.equal(equipRecoveredDrill({tier:0,durability:20},items,0),null);
 assert.equal(equipRecoveredDrill({tier:0,durability:20},items,3),null);
 assert.deepEqual(equipRecoveredDrill({tier:0,durability:0},items,1).drill,{tier:1,durability:9});
});
