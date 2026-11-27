import test from 'node:test';
import assert from 'node:assert/strict';
import {repairDrill} from '../src/infiniteDrillRepair.ts';
const stock={stone:100,copper:100,iron:100,crystal:100};
test('repair spends ore and restores half durability, capped at maximum',()=>{
 const result=repairDrill(stock,{tier:1,durability:10});
 assert.deepEqual(result.drill,{tier:1,durability:48});
 assert.equal(result.stock.stone,92);
 assert.equal(result.stock.copper,97);
 assert.equal(stock.stone,100);
 assert.equal(repairDrill(stock,{tier:0,durability:29}).drill.durability,30);
});
test('repair depleted drill and reject full, unaffordable, invalid drills',()=>{
 assert.equal(repairDrill(stock,{tier:0,durability:0}).drill.durability,15);
 assert.equal(repairDrill(stock,{tier:0,durability:30}),null);
 assert.equal(repairDrill({...stock,stone:0},{tier:0,durability:0}),null);
 assert.equal(repairDrill(stock,{tier:3,durability:-1}),null);
});
