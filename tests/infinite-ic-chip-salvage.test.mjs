import test from 'node:test';
import assert from 'node:assert/strict';
import {dismantleIcChip} from '../src/infiniteIcChipSalvage.ts';

const chip={kind:'ic-chip',tier:0,durability:50,maxDurability:100};
test('dismantle consumes exactly one IC chip and awards minerals',()=>{
 const stock={stone:1,copper:0,iron:0,crystal:0};
 const equipment=[chip,chip];
 const result=dismantleIcChip(stock,equipment,1);
 assert.equal(result.stock.copper,3);
 assert.equal(result.stock.iron,2);
 assert.equal(result.equipment.length,1);
 assert.equal(equipment.length,2);
 assert.equal(stock.copper,0);
});
test('full cargo and missing chip prevent dismantling without mutation',()=>{
 const full={stone:39,copper:0,iron:0,crystal:0};
 assert.equal(dismantleIcChip(full,[chip],1),null);
 assert.equal(dismantleIcChip({stone:0,copper:0,iron:0,crystal:0},[],1),null);
 assert.equal(full.stone,39);
});
