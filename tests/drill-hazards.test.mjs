import test from 'node:test';
import assert from 'node:assert/strict';
import { discoverDrillHazard, advanceDrillHazard, hazardResolved, rollDrillHazard, hazardFailureEffect } from '../src/drillHazards.ts';

test('explosive is cleared only after drill stops within five seconds', () => {
 const h = discoverDrillHazard('explosive','front',100);
 assert.equal(advanceDrillHazard(h,5099,true).phase,'warning');
 const clearing=advanceDrillHazard(h,5100,false);
 assert.equal(clearing.phase,'clearing');
 assert.equal(hazardResolved(clearing,6599),false);
 assert.equal(hazardResolved(clearing,6600),true);
});
test('acid can appear behind and activates neutralization on stop', () => {
 const h=discoverDrillHazard('acid','rear',0);
 assert.equal(advanceDrillHazard(h,5000,false).phase,'clearing');
 assert.equal(advanceDrillHazard(h,5001,true).phase,'clearing');
});
test('missing the five-second deadline fails', () => {
 const h=discoverDrillHazard('explosive','front',0);
 assert.equal(advanceDrillHazard(h,5001,false).phase,'failed');
});
test('hazard sampling can produce both sides and kinds', () => {
 assert.deepEqual(rollDrillHazard(.0005),{kind:'explosive',side:'front'});
 assert.deepEqual(rollDrillHazard(.0015),{kind:'explosive',side:'front'});
 assert.deepEqual(rollDrillHazard(.0045),{kind:'acid',side:'rear'});
 assert.deepEqual(rollDrillHazard(.0055),{kind:'acid',side:'rear'});
 assert.equal(rollDrillHazard(.5),null);
});
test('invalid inputs rejected', () => {
 assert.throws(()=>rollDrillHazard(NaN));
 assert.throws(()=>discoverDrillHazard('acid','rear',Infinity));
});

test('explosives only spawn in front and acid only behind', () => {
 assert.throws(() => discoverDrillHazard('explosive','rear',0));
 assert.throws(() => discoverDrillHazard('acid','front',0));
});
test('missed explosion probabilistically damages drill without cargo loss', () => {
 const failed=advanceDrillHazard(discoverDrillHazard('explosive','front',0),5001,true);
 const hit=hazardFailureEffect(failed,.2,1000);
 assert.ok(hit.drillDurabilityLoss>=150 && hit.drillDurabilityLoss<=450);
 assert.equal(hit.cargoLost,false);
 assert.deepEqual(hazardFailureEffect(failed,.8,1000),{drillDurabilityLoss:0,cargoLost:false});
});
test('missed rear acid destroys cargo without drill damage', () => {
 const failed=advanceDrillHazard(discoverDrillHazard('acid','rear',0),5001,true);
 assert.deepEqual(hazardFailureEffect(failed,.8,1000),{drillDurabilityLoss:0,cargoLost:true});
 assert.throws(()=>hazardFailureEffect(discoverDrillHazard('acid','rear',0),.1,1000));
});
