import {test} from 'node:test';import assert from 'node:assert/strict';import {AdaptiveQuality,renderCeiling} from '../src/quality.ts';
test('slow frames reduce scale but never below floor',()=>{const q=new AdaptiveQuality(1.5);for(let i=0;i<1000;i++)q.sample(50);assert.equal(q.scale,.65)});
test('fast frames restore scale to ceiling',()=>{const q=new AdaptiveQuality(1);for(let i=0;i<300;i++)q.sample(50);assert.ok(q.scale<1);for(let i=0;i<3000;i++)q.sample(16);assert.equal(q.scale,1)});
test('pause resets timing and low ceilings are preserved',()=>{const q=new AdaptiveQuality(.5);q.sample(5000);for(let i=0;i<500;i++)q.sample(50);assert.equal(q.scale,.5)});

test('viewport budget bounds physical pixels',()=>{for(const [w,h,dpr,mobile,budget] of [[844,390,3,true,750000],[1920,1080,2,false,1800000],[390,844,3,true,750000]]){const scale=renderCeiling(w,h,dpr,mobile);assert.ok(w*h*scale*scale<=budget+1);assert.ok(scale<=1.5)}});
