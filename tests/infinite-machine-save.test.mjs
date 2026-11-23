import assert from 'node:assert/strict';
import test from 'node:test';
import {loadMachine,saveMachine,MACHINE_SAVE_KEY} from '../src/infiniteMachineSave.ts';
const state=()=>({stock:{stone:15,copper:5,iron:1,crystal:0},drill:{tier:1,durability:20},drillCount:2,drillRange:1,wagons:2,engineLevel:1,queue:[{tier:0,durability:30}],crafting:{tier:2,readyAt:7000,paid:true}});
test('roundtrip machine state and remaining crafting duration',()=>{
 const data=new Map();
 const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 saveMachine(storage,20261123,state(),5000);
 const restored=loadMachine(storage,20261123,200);
 assert.equal(restored.wagons,2);
 assert.equal(restored.engineLevel,1);
 assert.equal(restored.drill.durability,20);
 assert.equal(restored.crafting.readyAt,2200);
 assert.equal(loadMachine(storage,999,200),null);
});
test('reject corrupted, impossible and incompatible machine saves',()=>{
 const storage={getItem:()=>JSON.stringify({version:1,seed:5,state:{...state(),wagons:1,stock:{stone:100,copper:0,iron:0,crystal:0}}})};
 assert.equal(loadMachine(storage,5,100),null);
 assert.equal(loadMachine({getItem:()=>'{bad'},5,100),null);
});
