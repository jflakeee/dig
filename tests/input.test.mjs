import {test} from 'node:test';
import assert from 'node:assert/strict';
import {joystick} from '../src/input.ts';
test('joystick deadzone',()=>assert.deepEqual(joystick(3,2),{x:0,y:0}));
test('joystick direction and maximum',()=>{const q=joystick(90,-90);assert.ok(q.x>0&&q.y<0);assert.ok(Math.abs(Math.hypot(q.x,q.y)-1)<1e-9)});
test('joystick partial speed',()=>{const q=joystick(24,0);assert.ok(q.x>0&&q.x<1);assert.equal(q.y,0)});
