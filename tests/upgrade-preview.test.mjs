import {test} from 'node:test';import assert from 'node:assert/strict';import {upgradePreview} from '../src/upgradePreview.ts';
test('preview uses actual crafted upgrade stats and costs',()=>{const p=upgradePreview(0,[0,0,0],[0,0,0,0]);assert.equal(p.cost,40);assert.ok(p.nextRadius>p.radius);assert.ok(p.nextInterval<p.interval);assert.equal(upgradePreview(0,[5,0,0],[0,0,0,0]),null)});
