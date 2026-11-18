import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lighting} from '../src/lighting.ts';
test('surface lighting unchanged',()=>assert.deepEqual(lighting(0),{ambient:2,sun:2}));
test('smooth monotone falloff',()=>{let p=lighting(0);for(let d=.1;d<=10;d+=.1){const q=lighting(d);assert.ok(q.ambient<=p.ambient&&q.sun<=p.sun);assert.ok(q.ambient>0&&q.sun>0);p=q}});
test('depth limits',()=>{assert.deepEqual(lighting(-1),lighting(0));assert.deepEqual(lighting(100),lighting(6))});
