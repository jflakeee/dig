import test from 'node:test';
import assert from 'node:assert/strict';
import {loadMachine,saveMachine,MACHINE_SAVE_KEY} from '../src/infiniteMachineSave.ts';
import {InfiniteMiningSave} from '../src/infiniteMiningSave.ts';

test('machine progress restores independently of stale chunk mining records',()=>{
 const data=new Map([[InfiniteMiningSave.key,'{corrupted legacy chunk data']]);
 const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 const machine={stock:{stone:12,copper:3,iron:0,crystal:0},drill:{tier:1,durability:24},drillCount:2,drillRange:1,wagons:1,engineLevel:0,queue:[],crafting:null,collected:91};
 saveMachine(storage,20261123,machine,1000);
 assert.equal(loadMachine(storage,20261123,500).collected,91);
 assert.equal(loadMachine(storage,20261123,500).drill.durability,24);
 assert.equal(data.get(InfiniteMiningSave.key),'{corrupted legacy chunk data');
 assert.ok(data.has(MACHINE_SAVE_KEY));
});
