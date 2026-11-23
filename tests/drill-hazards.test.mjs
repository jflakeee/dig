import test from 'node:test';
import assert from 'node:assert/strict';
import { discoverDrillHazard, advanceDrillHazard, hazardResolved, rollDrillHazard } from '../src/drillHazards.ts';

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
 assert.equal(advanceDrillHazard(h,5001,true).phase,'failed');
});
test('missing the five-second deadline fails', () => {
 const h=discoverDrillHazard('explosive','front',0);
 assert.equal(advanceDrillHazard(h,5001,false).phase,'failed');
});
test('hazard sampling can produce both sides and kinds', () => {
 assert.deepEqual(rollDrillHazard(.0005),{kind:'explosive',side:'front'});
 assert.deepEqual(rollDrillHazard(.0015),{kind:'explosive',side:'rear'});
 assert.deepEqual(rollDrillHazard(.0045),{kind:'acid',side:'front'});
 assert.deepEqual(rollDrillHazard(.0055),{kind:'acid',side:'rear'});
 assert.equal(rollDrillHazard(.5),null);
});
test('invalid inputs rejected', () => {
 assert.throws(()=>rollDrillHazard(NaN));
 assert.throws(()=>discoverDrillHazard('acid','rear',Infinity));
});
