import {test} from 'node:test';
import assert from 'node:assert/strict';
import {openSave,SAVE} from '../src/save.ts';
function memory(raw=null){return {raw,fail:false,getItem(){return this.raw},setItem(k,v){if(this.fail)throw Error('quota');this.raw=v}}}
test('save and reopen v1',()=>{const s=memory();const a=openSave(s);a.data[2]=0;assert.equal(a.write(a.data),'saved');assert.equal(openSave(s).data[2],0)});
test('failed write preserves previous data and allows retry',()=>{const s=memory('{"version":1,"removed":[1]}');const a=openSave(s);a.data[2]=0;s.fail=true;assert.equal(a.write(a.data),'failed');assert.equal(s.raw,'{"version":1,"removed":[1]}');s.fail=false;assert.equal(a.write(a.data),'saved')});
test('stale tab cannot overwrite newer save',()=>{const s=memory();const a=openSave(s),b=openSave(s);a.data[1]=0;b.data[2]=0;assert.equal(a.write(a.data),'saved');assert.equal(b.write(b.data),'conflict');assert.equal(openSave(s).data[1],0)});
test('corrupt save is protected',()=>{const s=memory('broken');const a=openSave(s);assert.equal(a.readable,false);assert.equal(a.write(a.data),'protected');assert.equal(s.raw,'broken')});
test('unavailable storage is protected',()=>{const a=openSave({getItem(){throw Error('denied')},setItem(){throw Error('unexpected')}});assert.equal(a.write(a.data),'protected')});
