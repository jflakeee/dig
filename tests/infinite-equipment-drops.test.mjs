import test from 'node:test';
import assert from 'node:assert/strict';
import {rollEquipmentDrop,DROP_CHANCE,DROP_KINDS} from '../src/infiniteEquipmentDrops.ts';
import {saveMachine,loadMachine} from '../src/infiniteMachineSave.ts';

test('equipment only drops below probability threshold and is worn',()=>{
 assert.equal(rollEquipmentDrop(DROP_CHANCE,0,0),null);
 assert.equal(rollEquipmentDrop(-1,0,0),null);
 for(let i=0;i<DROP_KINDS.length;i++){
  const drop=rollEquipmentDrop(0,(i+.01)/DROP_KINDS.length,.8);
  assert.equal(drop.kind,DROP_KINDS[i]);
  if(drop.kind==='mineral-pile'){
   assert.ok(drop.amount>=3&&drop.amount<=10);
   assert.ok(['stone','copper','iron','crystal'].includes(drop.mineral));
  }else assert.ok(drop.durability>=1&&drop.durability<drop.maxDurability);
 }
});
test('found equipment persists independently of mined chunks',()=>{
 const data=new Map();
 const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 const foundEquipment=[{kind:'lamp',tier:0,durability:33,maxDurability:100}];
 const state={stock:{stone:0,copper:0,iron:0,crystal:0},drill:{tier:0,durability:30},drillCount:1,drillRange:0,wagons:1,engineLevel:0,queue:[],crafting:null,collected:2,foundEquipment};
 saveMachine(storage,20261123,state,100);
 assert.deepEqual(loadMachine(storage,20261123,200).foundEquipment,foundEquipment);
 assert.equal(data.size,1);
});
