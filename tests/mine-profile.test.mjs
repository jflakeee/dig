import {test} from 'node:test';import assert from 'node:assert/strict';import {migrateProfile,parseProfile,PROFILE} from '../src/mineProfile.ts';import {SAVE} from '../src/save.ts';
const memory=(raw)=>{const m=new Map([[SAVE,raw]]);return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)}};
test('migration preserves legacy and is idempotent',()=>{const raw=JSON.stringify({version:1,removed:[1,8]});const s=memory(raw);const p=migrateProfile(s);assert.deepEqual(p.mines,[[1,8],[],[]]);assert.equal(s.getItem(SAVE),raw);assert.deepEqual(migrateProfile(s),p)});
test('corrupt legacy cannot create profile',()=>{const s=memory('bad');assert.throws(()=>migrateProfile(s));assert.equal(s.getItem(PROFILE),null)});
test('invalid mine indices and legacy mismatch rejected',()=>{const p=migrateProfile(memory(null));p.mines[1]=[82944];assert.throws(()=>parseProfile(JSON.stringify(p)));p.mines[1]=[];p.mines[0]=[1];assert.throws(()=>parseProfile(JSON.stringify(p)))});
