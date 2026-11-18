import {chromium,devices} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
await mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
for(const [name,options] of [['desktop',{viewport:{width:1280,height:720}}],['mobile',{...devices['iPhone 13'],viewport:{width:844,height:390},screen:{width:844,height:390}}]]){
 const context=await browser.newContext(options);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/shader|webgl|three/i.test(m.text()))errors.push(m.text())});
 await page.goto('http://127.0.0.1:4173/dig/');await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('Removed 0'));
 await page.screenshot({path:'artifacts/'+name+'-initial.png'});
 for(const tool of ['Pickaxe','Drill','Shovel']){const button=page.getByRole('button',{name:tool,exact:true});await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true')}
 await page.getByRole('button',{name:'Lamp on',exact:true}).click();await page.getByRole('button',{name:'Lamp off',exact:true}).click();
 await page.getByRole('button',{name:'Craft',exact:true}).click();assert.equal(await page.getByRole('button',{name:/Coal fuel/}).isDisabled(),true);await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.mouse.move(options.viewport.width/2,options.viewport.height/2);
 await page.mouse.down();await page.mouse.move(options.viewport.width/2,options.viewport.height/2+60);await page.mouse.up();
 if(name==='mobile'){await page.locator('#dig').tap()}else{await page.keyboard.down(' ');await page.waitForTimeout(550);await page.keyboard.up(' ')}
 // Hold the dig control for multiple frames; mobile tap alone may be shorter than a frame.
 if(name==='mobile'){const box=await page.locator('#dig').boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(550);await page.mouse.up()}
 await page.waitForFunction(()=>{const raw=localStorage.getItem('dig-mines-v2');return raw&&JSON.parse(raw).mines[0].length>0},{},{timeout:15000});
 const saved=await page.evaluate(()=>localStorage.getItem('dig-mines-v2'));
 await page.getByRole('button',{name:'Surface',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('Returned'));
 await page.screenshot({path:'artifacts/'+name+'-dug.png'});
 await page.reload();await page.waitForFunction(()=>Number(document.querySelector('#hud')?.textContent?.match(/Removed (\d+)/)?.[1])>0);
 assert.equal(await page.evaluate(()=>localStorage.getItem('dig-mines-v2')),saved);
 await page.evaluate(()=>{const p=JSON.parse(localStorage.getItem('dig-mines-v2'));p.mines[0]=Array.from({length:2458},(_,i)=>i);p.legacy=JSON.stringify({version:1,removed:p.mines[0]});localStorage.setItem('dig-mines-v2',JSON.stringify(p))});
 await page.reload();await page.getByRole('button',{name:'Mine 1',exact:true}).click();await page.getByRole('button',{name:'Mine 2',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 2 · Removed 0'),{},{timeout:60000});
 await page.screenshot({path:'artifacts/'+name+'-mine2.png'});
 await page.getByRole('button',{name:'Mine 2',exact:true}).click();await page.getByRole('button',{name:'Mine 1',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#hud')?.textContent?.includes('DIG 1 · Removed 2458'),{},{timeout:60000});
 assert.deepEqual(errors,[]);console.log(name+' gameplay passed');await context.close();
}
}finally{await browser.close()}
