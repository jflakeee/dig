import {test} from 'node:test';import assert from 'node:assert/strict';import {AdaptiveQuality} from '../src/quality.ts';
test('persistent long frames lower render resolution rather than resetting',()=>{const q=new AdaptiveQuality(1.5);for(let i=0;i<12;i++)q.sample(300);assert.ok(q.scale<1.5);for(let i=0;i<100;i++)q.sample(400);assert.equal(q.scale,.65);q.reset();assert.equal(q.scale,.65)});
