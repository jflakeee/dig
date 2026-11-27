import test from 'node:test';
import assert from 'node:assert/strict';
import {installRecoveredUpgrade} from '../src/infiniteRecoveredUpgrade.ts';
import {MAX_WAGONS,MAX_ENGINE} from '../src/infiniteCargoTrain.ts';

const items=[{kind:'wagon',tier:0,durability:30,maxDurability:100},{kind:'engine',tier:0,durability:50,maxDurability:100},{kind:'ic-chip',tier:0,durability:70,maxDurability:100}];
test('recovered wagons and engines install without consuming minerals',()=>{
 const wagon=installRecoveredUpgrade(items,0,1,0);
 assert.equal(wagon.wagons,2);
 assert.equal(wagon.engineLevel,0);
 assert.equal(wagon.equipment.length,2);
 const engine=installRecoveredUpgrade(items,1,1,0);
 assert.equal(engine.wagons,1);
 assert.equal(engine.engineLevel,1);
 assert.equal(items.length,3);
});
test('reject unsupported loot and upgrades at maximum',()=>{
 assert.equal(installRecoveredUpgrade(items,2,1,0),null);
 assert.equal(installRecoveredUpgrade(items,0,MAX_WAGONS,0),null);
 assert.equal(installRecoveredUpgrade(items,1,1,MAX_ENGINE),null);
});
