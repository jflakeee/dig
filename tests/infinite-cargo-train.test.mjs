import assert from 'node:assert/strict';
import test from 'node:test';
import {cargoAmount,cargoCapacity,cargoSpeed,canStore,wagonCost,engineCost} from '../src/infiniteCargoTrain.ts';
const stock=(stone,copper=0,iron=0,crystal=0)=>({stone,copper,iron,crystal});
test('each connected wagon adds 40 cargo slots',()=>{
 assert.equal(cargoCapacity(1),40);assert.equal(cargoCapacity(4),160);
 assert.throws(()=>cargoCapacity(0));assert.throws(()=>cargoCapacity(9));
});
test('full cargo blocks collection until capacity is upgraded or minerals spent',()=>{
 assert.equal(canStore(stock(39),1),true);
 assert.equal(canStore(stock(40),1),false);
 assert.equal(canStore(stock(40),2),true);
 assert.equal(cargoAmount(stock(12,8,4,2)),26);
});
test('weight slows the train and engine upgrades recover speed',()=>{
 const empty=cargoSpeed(stock(0),1,0);
 const heavy=cargoSpeed(stock(40),1,0);
 assert.ok(heavy<empty);
 assert.ok(cargoSpeed(stock(40),1,2)>heavy);
 assert.ok(cargoSpeed(stock(40),2,0)>heavy);
});
test('wagon and engine upgrades require increasing mineral costs',()=>{
 assert.ok(wagonCost(3).stone>wagonCost(2).stone);
 assert.ok(engineCost(2).iron>engineCost(1).iron);
 assert.throws(()=>engineCost(6));
});
