import {rareAt} from '../src/rareResources.ts';
import {expandedInventory} from '../src/mineOres.ts';
import {volcanicMask} from '../src/volcanicTerrain.ts';
import {naturalVoidMask} from '../src/caves.ts';
import {chromium,devices} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
await mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
// P14: verify portrait controls independently of landscape-only gameplay flows.
{
 const context=await browser.newContext({...devices['iPhone 13'],viewport:{width:390,height:844},screen:{width:390,height:844}});
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:4173/dig/?perf=1');
 await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('Removed 0'));
 const controls=await page.locator('#actions button,#move,#dig').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {id:e.id||e.textContent?.trim(),left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}}));
 for(const c of controls)assert.ok(c.left>=0&&c.right<=390&&c.top>=0&&c.bottom<=844&&c.width>=44&&c.height>=44,'portrait control must be visible and touchable: '+JSON.stringify(c));
 await page.screenshot({path:'artifacts/mobile-portrait.png'});
 await context.close();console.log('mobile portrait control bounds passed');
}
for(const [name,options] of [['desktop',{viewport:{width:1280,height:720}}],['mobile',{...devices['iPhone 13'],viewport:{width:844,height:390},screen:{width:844,height:390}}]]){
 const context=await browser.newContext(options);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/shader|webgl|three/i.test(m.text()))errors.push(m.text())});
 await page.goto('http://127.0.0.1:4173/dig/?perf=1');await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('Removed 0'));
 const boxes=await page.locator('#actions button').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height,left:r.left,right:r.right}}));assert.equal(boxes.length,5);for(let i=0;i<boxes.length;i++){const b=boxes[i];assert.ok(b.height>=44&&b.left>=0&&b.right<=options.viewport.width&&b.bottom<=options.viewport.height);if(i)assert.ok(b.top>=boxes[i-1].bottom)}
 const leftControls=await page.locator('#craft-toggle,#travel-toggle,#journal-toggle,#move').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {id:e.id,x:r.x,y:r.y,w:r.width,h:r.height}}));for(let i=0;i<leftControls.length;i++)for(let j=i+1;j<leftControls.length;j++){const a=leftControls[i],b=leftControls[j];assert.ok(a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y,a.id+' overlaps '+b.id)}
 assert.match(await page.locator('#upgrade-preview').textContent(),/Radius .*180.*169ms/);await page.screenshot({path:'artifacts/'+name+'-initial.png'});
 for(const tool of ['Pickaxe','Drill','Shovel']){const button=page.getByRole('button',{name:tool,exact:true});await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true')}
 await page.getByRole('button',{name:'Lamp on',exact:true}).click();await page.getByRole('button',{name:'Lamp off',exact:true}).click();
 await page.getByRole('button',{name:'Craft',exact:true}).click();assert.equal(await page.getByRole('button',{name:/Coal fuel/}).isDisabled(),true);await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.mouse.move(options.viewport.width/2,options.viewport.height/2);
 await page.mouse.down();await page.mouse.move(options.viewport.width/2,options.viewport.height/2+60);await page.mouse.up();
 if(name==='mobile'){await page.locator('#dig').tap()}else{await page.keyboard.down(' ');await page.waitForTimeout(550);await page.keyboard.up(' ')}
 // Hold the dig control for multiple frames; mobile tap alone may be shorter than a frame.
 if(name==='mobile'){const box=await page.locator('#dig').boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(550);await page.mouse.up()}
 try{await page.waitForFunction(()=>{const raw=localStorage.getItem('dig-mines-v2');return raw&&JSON.parse(raw).mines[0].length>0},{},{timeout:15000})}catch(e){console.error('Dig diagnostic',await page.locator('#hud').textContent(),errors);await page.screenshot({path:'artifacts/'+name+'-dig-failed.png'});throw e}
 assert.match(await page.locator('#excavation-feedback').textContent(),/Dug|\+/);await page.screenshot({path:'artifacts/'+name+'-feedback.png'});
 if(name==='mobile'){
 const cdp=await context.newCDPSession(page),joy=await page.locator('#move').boundingBox(),dig=await page.locator('#dig').boundingBox();
 const j={x:joy.x+joy.width/2,y:joy.y+joy.height/2,id:1},d={x:dig.x+dig.width/2,y:dig.y+dig.height/2,id:2};
 const touch=(type,touchPoints)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints});
 await page.getByRole('button',{name:'Surface',exact:true}).click();
 const initial=await page.locator('#stick').evaluate(e=>getComputedStyle(e).transform);
 await touch('touchStart',[j]);await touch('touchMove',[{...j,x:j.x+30}]);
 const thumb=await page.locator('#stick').boundingBox();assert.ok(thumb.x>=joy.x-1&&thumb.y>=joy.y-1&&thumb.x+thumb.width<=joy.x+joy.width+1&&thumb.y+thumb.height<=joy.y+joy.height+1,'joystick thumb must remain inside pad');
 await page.waitForFunction(v=>getComputedStyle(document.querySelector('#stick')).transform!==v,initial);
 await touch('touchStart',[{...j,x:j.x+30},d]);await page.waitForTimeout(350);
 await touch('touchCancel',[]);try{await page.waitForFunction(v=>getComputedStyle(document.querySelector('#stick')).transform===v,initial,{timeout:5000})}catch(e){console.error('Touch cancellation diagnostic',await page.locator('#stick').evaluate(e=>({inline:e.style.transform,computed:getComputedStyle(e).transform})));await page.screenshot({path:'artifacts/mobile-cancel-failed.png'});throw e}
 // Verify compact landscape layouts and joystick travel after a viewport resize.
 // Mobile emulation needs screen metrics as well as viewport dimensions.
 await cdp.send('Emulation.setDeviceMetricsOverride',{width:700,height:500,deviceScaleFactor:3,mobile:true,screenWidth:700,screenHeight:500});
 const spacious=await page.locator('#move').boundingBox();
 await cdp.send('Emulation.setDeviceMetricsOverride',{width:700,height:360,deviceScaleFactor:3,mobile:true,screenWidth:700,screenHeight:360});
 await page.reload({waitUntil:'networkidle'});
 const compactViewport=await page.evaluate(()=>({innerWidth,innerHeight,visualWidth:visualViewport?.width,documentWidth:document.documentElement.clientWidth,screenWidth:screen.width}));
 assert.ok(compactViewport.innerWidth<=700,'compact layout viewport should fit emulated screen: '+JSON.stringify(compactViewport));
 const compact=await page.locator('#move').boundingBox();assert.ok(compact.width<spacious.width,'compact joystick should shrink when crossing the 450px height breakpoint');
 const compactButtons=await page.locator('#actions button').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,height:r.height}}));
 for(const b of compactButtons)assert.ok(b.left>=0&&b.right<=700&&b.top>=0&&b.bottom<=360&&b.height>=44,'compact action button must remain usable: '+JSON.stringify({button:b,all:compactButtons}));
 const compactLeft=await page.locator('#craft-toggle,#travel-toggle,#journal-toggle,#move').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {id:e.id,x:r.x,y:r.y,w:r.width,h:r.height}}));
 for(let i=0;i<compactLeft.length;i++)for(let k=i+1;k<compactLeft.length;k++){const a=compactLeft[i],b=compactLeft[k];assert.ok(a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y,a.id+' overlaps '+b.id+' in compact landscape')}
 await page.screenshot({path:'artifacts/mobile-compact-landscape.png'});
 // Rotate back to portrait without a reload: active joystick must be released.
 const rotatedJoy=await page.locator('#move').boundingBox();
 const center={x:rotatedJoy.x+rotatedJoy.width/2,y:rotatedJoy.y+rotatedJoy.height/2,id:3};
 await touch('touchStart',[center]);await touch('touchMove',[{...center,x:center.x+30}]);
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('#stick')).transform!=='matrix(1, 0, 0, 1, -24, -24)');
 await cdp.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:3,mobile:true,screenWidth:390,screenHeight:844});
 await page.evaluate(()=>window.dispatchEvent(new Event('resize')));
  await page.waitForFunction(()=>document.querySelector('#move').getBoundingClientRect().width>0);
 assert.equal((await page.locator('#stick').evaluate(e=>e.style.transform)).replaceAll(' ',''),'translate(-50%,-50%)','rotation should release active joystick');
 await touch('touchCancel',[]);
 await cdp.send('Emulation.clearDeviceMetricsOverride');
 await cdp.detach();console.log('mobile multi-pointer cancellation and compact landscape passed');
 }
 await page.getByRole('button',{name:'Surface',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('Returned'));
 await page.screenshot({path:'artifacts/'+name+'-dug.png'});
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('dig-mines-v2')).mines[0].length===Number(document.querySelector('#hud')?.textContent?.match(/Removed (\d+)/)?.[1]));
 const saved=await page.evaluate(()=>localStorage.getItem('dig-mines-v2'));
 await page.reload();await page.waitForFunction(()=>Number(document.querySelector('#hud')?.textContent?.match(/Removed (\d+)/)?.[1])>0);
 assert.equal(await page.evaluate(()=>localStorage.getItem('dig-mines-v2')),saved);
 await page.evaluate(()=>{const p=JSON.parse(localStorage.getItem('dig-mines-v2'));p.mines[0]=Array.from({length:2458},(_,i)=>i);p.legacy=JSON.stringify({version:1,removed:p.mines[0]});localStorage.setItem('dig-mines-v2',JSON.stringify(p))});
 await page.reload();await page.getByRole('button',{name:'Mine 1',exact:true}).click();await page.getByRole('button',{name:'Mine 2',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 2 · Removed 0'),{},{timeout:60000});
 await page.getByRole('button',{name:'Journal',exact:true}).click();await page.locator('#journal-panel').getByRole('heading',{name:/Exploration 0/}).waitFor();await page.locator('#journal-panel').getByRole('heading',{name:'Objectives'}).waitFor();assert.equal(await page.locator('#journal-panel progress').first().getAttribute('value'),'2458');await page.screenshot({path:'artifacts/'+name+'-journal.png'});await page.locator('#journal-panel').getByRole('button',{name:'Close',exact:true}).click();
 await page.screenshot({path:'artifacts/'+name+'-mine2.png'});
 await page.getByRole('button',{name:'Mine 2',exact:true}).click();await page.getByRole('button',{name:'Mine 1',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 1 · Removed 2458'),{},{timeout:60000});
 const mask=naturalVoidMask(2),removed=Array.from(mask.keys()).filter(i=>!mask[i]).slice(0,12442);assert.equal(removed.length,12442);await page.evaluate(removed=>{const p=JSON.parse(localStorage.getItem('dig-mines-v2'));p.mines[1]=removed;localStorage.setItem('dig-mines-v2',JSON.stringify(p))},removed);
 await page.reload();await page.getByRole('button',{name:'Mine 1',exact:true}).click();await page.getByRole('button',{name:'Mine 3',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 3 · Removed 0'),{},{timeout:60000});
 await page.screenshot({path:'artifacts/'+name+'-mine3.png'});
 for(let trial=1;trial<=3;trial++){const timings=await page.evaluate(async()=>{const samples=[];let last=performance.now();for(let i=0;i<120;i++){const now=await new Promise(resolve=>requestAnimationFrame(resolve));samples.push(now-last);last=now}samples.sort((a,b)=>a-b);return {mean:samples.reduce((a,b)=>a+b,0)/samples.length,p95:samples[Math.ceil(samples.length*.95)-1],max:samples.at(-1)}});
 const perf=JSON.parse(await page.locator('#hud').getAttribute('data-perf'));assert.ok(perf.frames>0&&perf.rebuilds>0&&perf.drawCalls>0&&perf.triangles>0);console.log(JSON.stringify({profile:name,mine:3,trial,mode:'headless software WebGL',...timings,perf}));}
 await page.keyboard.down('w');await page.waitForTimeout(500);await page.keyboard.up('w');
 await page.reload();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 3 · Removed 0'),{},{timeout:60000});
 const naturalVoidMask3=naturalVoidMask(3);const fourthSeed=Array.from(naturalVoidMask3.keys()).filter(i=>!naturalVoidMask3[i]).slice(0,39322);
 await page.evaluate(removed=>{const p=JSON.parse(localStorage.getItem('dig-mines-v2'));p.mines[2]=removed;localStorage.setItem('dig-mines-v2',JSON.stringify(p))},fourthSeed);
 await page.reload();await page.getByRole('button',{name:'Mine 3',exact:true}).click();await page.getByRole('button',{name:'Mine 4',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 4 · Removed 0'),{},{timeout:60000});
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('dig-mines-v2')).version),3);await page.getByRole('button',{name:'Craft',exact:true}).click();for(const name of ['seismic-shovel','ember-pickaxe','core-drill']){const b=page.locator('#craft-menu button').filter({hasText:name});assert.equal(await b.count(),1);assert.equal(await b.isDisabled(),true)}await page.locator('#craft-menu').getByRole('button',{name:'Close',exact:true}).click();await page.screenshot({path:'artifacts/'+name+'-mine4.png'});
 // Seed a legitimate fully funded late-game state; the game still validates it on reload.
 const mask4=volcanicMask(),rareCells=Array.from(mask4.keys()).filter(i=>!mask4[i]&&rareAt(i));
 await page.evaluate(cells=>{const p=JSON.parse(localStorage.getItem('dig-mines-v2'));p.mines[3]=cells;localStorage.setItem('dig-mines-v2',JSON.stringify(p))},rareCells);
 const funded=await page.evaluate(()=>JSON.parse(localStorage.getItem('dig-mines-v2')));
 funded.ledger={sold:expandedInventory(funded),levels:[5,5,5],crafted:[0,0,0,0]};
 await page.evaluate(p=>localStorage.setItem('dig-mines-v2',JSON.stringify(p)),funded);
 await page.reload();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 4'),{},{timeout:60000});
 await page.getByRole('button',{name:'Surface',exact:true}).click();
 await page.getByRole('button',{name:'Craft',exact:true}).click();
 const seismic=page.locator('#craft-menu button').filter({hasText:'seismic-shovel'});
 assert.equal(await seismic.isDisabled(),false);await seismic.click();
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('dig-mines-v2')).legendary?.equipped==='seismic-shovel');
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('dig-mines-v2')).legendary.unlocked),['seismic-shovel']);
 await page.locator('#craft-menu').getByRole('button',{name:'Close',exact:true}).click();
 await page.reload();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 4'),{},{timeout:60000});
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('dig-mines-v2')).legendary.equipped),'seismic-shovel');
 await page.getByRole('button',{name:'Craft',exact:true}).click();
 await page.locator('#craft-menu').getByRole('button',{name:'Unequip legendary'}).click();
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('dig-mines-v2')).legendary?.equipped===null);
 await page.locator('#craft-menu').getByRole('button',{name:'Close',exact:true}).click();
 console.log(name+' legendary craft, equip, reload and unequip passed');
 await page.reload();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 4 · Removed '+JSON.parse(localStorage.getItem('dig-mines-v2')).mines[3].length),{},{timeout:60000});
 await page.getByRole('button',{name:'Mine 4',exact:true}).click();await page.getByRole('button',{name:'Mine 1',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 1 · Removed 2458'),{},{timeout:60000});console.log(name+' fourth mine migration and return passed');
 assert.deepEqual(errors,[]);await page.evaluate(()=>localStorage.setItem('dig-mines-v2','invalid-save'));await page.reload();await page.getByRole('alert').waitFor();assert.equal(await page.evaluate(()=>localStorage.getItem('dig-mines-v2')),'invalid-save');console.log(name+' gameplay and corrupt-save protection passed');await context.close();
}
}finally{await browser.close()}
