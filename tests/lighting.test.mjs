import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lighting,caveAtmosphere} from '../src/lighting.ts';
test('surface lighting unchanged',()=>assert.deepEqual(lighting(0),{ambient:2,sun:2}));
test('smooth monotone falloff',()=>{let p=lighting(0);for(let d=.1;d<=10;d+=.1){const q=lighting(d);assert.ok(q.ambient<=p.ambient&&q.sun<=p.sun);assert.ok(q.ambient>0&&q.sun>0);p=q}});
test('depth limits',()=>{assert.deepEqual(lighting(-1),lighting(0));assert.deepEqual(lighting(100),lighting(6))});

test('cave atmosphere bounded and smooth',()=>{assert.deepEqual(caveAtmosphere(-1),caveAtmosphere(0));assert.deepEqual(caveAtmosphere(100),caveAtmosphere(7));assert.equal(caveAtmosphere(0).fill,0);assert.equal(caveAtmosphere(7).lampIntensity,43);let p=caveAtmosphere(0);for(let d=.1;d<8;d+=.1){const q=caveAtmosphere(d);assert.ok(q.fogDensity>=p.fogDensity&&q.fill>=p.fill);p=q}});
