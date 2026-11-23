import test from 'node:test';
import assert from 'node:assert/strict';
import {repairRecoveredDrill} from '../src/infiniteRecoveredDrillRepair.ts';

test('repair broken recovered drill using minerals without touching active drill',()=>{
 const stock={stone:10,copper:5,iron:0,crystal:0};
 const equipment=[{kind:'drill',tier:1,durability:0,maxDurability:75},{kind:'ic-chip',tier:0,durability:30,maxDurability:100}];
 const result=repairRecoveredDrill(stock,equipment,0);
 assert.equal(result.equipment[0].durability,38);
 assert.equal(result.equipment[1].kind,'ic-chip');
 assert.equal(result.stock.stone,2);
 assert.equal(result.stock.copper,2);
 assert.equal(equipment[0].durability,0);
});
test('repair rejects IC chips and unaffordable minerals',()=>{
 const stock={stone:0,copper:0,iron:0,crystal:0};
 assert.equal(repairRecoveredDrill(stock,[{kind:'ic-chip',tier:0,durability:1,maxDurability:100}],0),null);
 assert.equal(repairRecoveredDrill(stock,[{kind:'drill',tier:0,durability:0,maxDurability:30}],0),null);
});
