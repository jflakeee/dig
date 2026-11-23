import test from 'node:test';
import assert from 'node:assert/strict';
import {FUSION_RECIPES,fuseMinerals} from '../src/infiniteMineralFusion.ts';
const stock=()=>({stone:20,copper:10,iron:10,crystal:0});
test('success consumes source and grants exactly one higher mineral',()=>{
 const result=fuseMinerals(stock(),FUSION_RECIPES[0],.59);
 assert.deepEqual(result.stock,{stone:10,copper:11,iron:10,crystal:0});
 assert.equal(result.success,true);
});
test('failure consumes source without output',()=>{
 const result=fuseMinerals(stock(),FUSION_RECIPES[1],.4);
 assert.equal(result.success,false);
 assert.equal(result.stock.copper,2);
 assert.equal(result.stock.iron,10);
});
test('insufficient stock and invalid rolls do not change inventory',()=>{
 const before=stock();
 assert.equal(fuseMinerals(before,FUSION_RECIPES[0],1),null);
 assert.equal(fuseMinerals({...before,iron:0},FUSION_RECIPES[2],0),null);
 assert.equal(before.stone,20);
});
