import test from 'node:test';
import assert from 'node:assert/strict';
import {discardMinerals} from '../src/infiniteCargoActions.ts';
const stock={stone:25,copper:2,iron:0,crystal:4};
test('discard one, ten, or all without modifying original stock',()=>{
 assert.equal(discardMinerals(stock,'stone',1).stone,24);
 assert.equal(discardMinerals(stock,'stone',10).stone,15);
 assert.equal(discardMinerals(stock,'stone','all').stone,0);
 assert.equal(discardMinerals(stock,'copper',10).copper,0);
 assert.equal(stock.stone,25);
});
test('reject empty stock, invalid counts and corrupted inventory',()=>{
 assert.equal(discardMinerals(stock,'iron',1),null);
 assert.equal(discardMinerals(stock,'stone',-1),null);
 assert.equal(discardMinerals({...stock,stone:-1},'stone',1),null);
});
