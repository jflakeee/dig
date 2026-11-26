import { createWorld } from '../next/world.js';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.DIG_BASE || 'http://127.0.0.1:4173/dig/';
const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN,
  headless: true,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const errors = [];
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
// This route exercises continuous drilling across a solid-rock boundary.
await context.addInitScript(() => { Math.random = () => 0.12; });
const page = await context.newPage();
page.on('pageerror', (e) => errors.push(e.message));
const key = 'dig-unified-v1';
const read = () =>
  page.evaluate((k) => JSON.parse(localStorage.getItem(k)), key);
try {
  await page.goto(base + 'next/');
  assert.equal(await page.locator('button:visible').count(), 0);
  const classic = JSON.stringify({ version: 1, removed: [0, 1, 2] });
  await page.evaluate((classic) => {
    localStorage.setItem('dig-p0-v1', classic);
    localStorage.setItem('dig-4d-train-v1', '4d-marker');
  }, classic);
  for (const n of [1,2]) {
    await page.waitForFunction(n => Number(document.querySelector('#rock b').textContent) === n, n);
    await page.locator('#rock-gain').waitFor();
    const progress = await read();
    const origin = progress.session.world.chunks.find(c => !c.x && !c.y && !c.z);
    assert.equal(origin.air.length,27+n);
  }
  await page.reload();
  assert.equal(await page.locator('#rock b').textContent(), '2');
  assert.equal(await page.locator('#craft').count(),0);
  await page.getByText('기본 드릴 제작 시작',{exact:true}).waitFor();
  const building = await read();
  assert.equal(building.rocks,3);
  assert.equal(building.front,null);
  assert.equal(building.session.world.chunks.find(c => !c.x && !c.y && !c.z).air.length,30);
  await page.getByText('기본 드릴 제작중',{exact:true}).waitFor();
  await page.reload();
  assert.equal((await read()).craftReadyAt,building.craftReadyAt);
  assert.equal(await page.locator('#rock-gain').isVisible(),false);
  await page.getByText('기본 드릴 장착함',{exact:true}).waitFor();
  assert.equal(
    await page
      .getByRole('button', { name: /^(정지|재개|후진)$/, includeHidden: true })
      .count(),
    0,
  );
  await page.locator('#menu').waitFor();
  let save = await read();
  // Automatic drilling may already have removed more cells after installation.
  // Those drill blocks may yield other minerals, so count mined blocks.
  const startRoom = save.session.world.chunks.find(c => !c.x && !c.y && !c.z);
  assert.equal(save.blocksMined, startRoom.air.length - 27);
  assert.ok(save.rocks <= startRoom.air.length - 30);
  assert.deepEqual(save.drills, ['drill-1']);
  await page.reload();
  await page.locator('#sensor').waitFor();
  await page.waitForFunction(k => JSON.parse(localStorage.getItem(k))?.transited, key, {timeout: 60000});
  assert.equal((await read()).arrivalStrength, 0.6);
  await page.locator('#sensor.offscreen').waitFor();
  await page.mouse.move(15, 400);
  await page.mouse.down();
  await page.mouse.move(375, 400, { steps: 4 });
  await page.mouse.up();
  const afterPortal = (await read()).blocksMined;
  // At most 15 forward layers of 9 voxels fit before the old boundary.
  // Mining 170 blocks on this straight course requires crossing it.
  await page.locator('#menu').click();
  await page.waitForFunction(
    ([k, n]) => JSON.parse(localStorage.getItem(k)).blocksMined >= n + 170,
    [key, afterPortal],
    { timeout: 150000 },
  );
  assert.equal(await page.locator('#panel').isVisible(), true);
  assert.equal(await page.getByText(/청크 경계/).count(), 0);
  const checkpoint = await read();
  await page.reload();
  await page.locator('#menu').waitFor();
  await page.waitForFunction(([k,revision]) => JSON.parse(localStorage.getItem(k)).revision > revision, [key, checkpoint.revision]);
  const restored = await read();
  assert.ok(restored.session.world.elapsed >= checkpoint.session.world.elapsed);
  assert.ok(Math.hypot(...restored.session.pos.map((n,i) => n - checkpoint.session.pos[i])) < 3);
  assert.equal(restored.session.yaw, checkpoint.session.yaw);
  await page.locator('#menu').click();
  await page.locator('#reset').click();
  const beforeConfirm = (await read()).blocksMined;
  await page.waitForFunction(
    ([k, n]) => JSON.parse(localStorage.getItem(k)).blocksMined > n,
    [key, beforeConfirm],
  );
  await page.locator('#confirm-reset').click();
  await page.waitForFunction(
    (k) => JSON.parse(localStorage.getItem(k))?.front === null,
    key,
  );
  assert.deepEqual(
    await page.evaluate(() =>
      ['dig-p0-v1', 'dig-4d-train-v1'].map((k) => localStorage.getItem(k)),
    ),
    [classic, '4d-marker'],
  );
  await page.goto(base + 'dig-4d.html?legacy=1#checkpoint');
  await page.waitForURL(
    '**/versions/2026-11-25/dig-4d.html?legacy=1#checkpoint',
  );
  await page.goto(base + 'versions/2026-11-25/');
  await page.waitForFunction(() =>
    document.querySelector('#hud').textContent.includes('Removed 3'),
  );
  const profile = await page.evaluate(() =>
    localStorage.getItem('dig-mines-v2'),
  );
  await page.goto(base);
  await page.waitForFunction(() =>
    document.querySelector('#hud').textContent.includes('Removed 3'),
  );
  assert.equal(
    await page.evaluate(() => localStorage.getItem('dig-mines-v2')),
    profile,
  );
  const ready = {
    version: 1,
    revision: 7,
    rocks: 3,
    front: null,
    drills: [],
    transited: false,
  };
  await page.evaluate(
    ([k, v]) => localStorage.setItem(k, JSON.stringify(v)),
    [key, ready],
  );
  await page.goto(base + 'next/');
  const other = await context.newPage();
  await other.goto(base + 'next/');
  // Both tabs resume the same legacy three-rock fabrication automatically.
  await page.waitForFunction(
    (k) => JSON.parse(localStorage.getItem(k)).front,
    key,
  );
  const shared = await read();
  // The drill starts mining as soon as it is installed, so rocks may already
  // be back. Every rock left must come from a block mined after the craft.
  assert.ok(shared.rocks <= shared.blocksMined, JSON.stringify([shared.rocks, shared.blocksMined]));
  assert.deepEqual(shared.drills, ['drill-1']);
  await other.close();
  const warehouse = createWorld(false, () => 0.98);
  const item = warehouse.warehouseItems()[0].item;
  const session = {pos:item.point,velocity:[0,0,0],yaw:0,pitch:0,sensor:true,entered:-1,world:warehouse.snapshot()};
  await page.evaluate(([k,v]) => localStorage.setItem(k,JSON.stringify(v)),
    [key,{...shared, transited:true,session}]);
  await page.reload();
  await page.waitForFunction(k => JSON.parse(localStorage.getItem(k)).cargo?.some(n => n > 0),key);
  const recovered = await read();
  const owner = recovered.session.world.chunks.find(c => c.x===0 && c.y===0 && c.z===0);
  assert.ok(!owner.items.some(slot => slot.id === item.id));
  await page.reload();
  await page.locator('#menu').click();
  await page.locator('#cargo').filter({hasText:'× 1'}).waitFor();
  await page.getByText('발견 도감', {exact:true}).click();
  await page.locator('#discovery-list li').filter({hasText:'누적 회수 1개'}).waitFor();
  item.speed = [6,0,0];
  const collision = {...session,yaw:Math.PI/2,hull:0.5,pos:item.point.map((v,i) => v+Number(i===0)),world:warehouse.snapshot()};
  await page.evaluate(([k,v]) => localStorage.setItem(k,JSON.stringify(v)),
    [key,{...recovered,cargo:[2,1,1],session:collision}]);
  await page.reload();
  await page.locator('#message').filter({hasText:'기체 파손'}).waitFor();
  const rebooted = await read();
  assert.deepEqual(rebooted.cargo,[1,1,1]);
  assert.equal(rebooted.drillCondition,40);
  await page.reload();
  assert.equal((await read()).drillCondition,40);
  const hazards = createWorld(false, () => 0.93).snapshot();
  const room = hazards.chunks.find(c => c.x===0 && c.y===0 && c.z===0);
  room.hazard = {point:[0.5,0.5,2.3],kind:null,seed:0.1,fuse:null,spent:false};
  const danger = {...session,pos:[0.5,0.5,0.5],world:hazards};
  async function enterHazard(hull) {
    await page.evaluate(([k,v]) => localStorage.setItem(k,JSON.stringify(v)),
      [key,{...recovered,cargo:[2,2,2],session:{...danger,hull}}]);
    await page.reload();
  }
  await enterHazard(100);
  await page.locator('#stabilize').click();
  await page.waitForFunction(k => JSON.parse(localStorage.getItem(k)).cargo[2]===3,key);
  assert.ok((await read()).session.world.chunks.some(c => c.hazard?.spent));
  room.hazard = {point:[0.5,0.5,0],kind:null,seed:0.8,fuse:null,spent:false};
  await enterHazard(0.1);
  await page.locator('#message').filter({hasText:'기체 파손'}).waitFor();
  assert.deepEqual((await read()).cargo,[1,1,2]);
  await page.reload();
  assert.deepEqual((await read()).cargo,[1,1,2]);
  await page.evaluate(([k,v]) => localStorage.setItem(k,JSON.stringify(v)),
    [key,{...shared,session:null,transited:false,rocks:2,ceramic:0,drillCondition:0}]);
  await page.reload();
  // The emergency laser recovers whatever the block holds; repeat until a rock comes.
  while ((await read()).rocks < 3) {
    const mined = (await read()).blocksMined;
    await page.locator('#emergency:enabled').click();
    await page.waitForFunction(([k,n]) => JSON.parse(localStorage.getItem(k)).blocksMined > n, [key, mined]);
  }
  assert.equal(await page.locator('#emergency').isVisible(),false);
  await page.locator('#menu').click();
  assert.equal(await page.locator('#repair').isVisible(),false);
  await page.locator('#fire-ceramic').click();
  await page.locator('#repair').waitFor();
  const fired = await read();
  assert.equal(fired.rocks,0);
  assert.equal(fired.ceramic,1);
  await page.reload();
  await page.locator('#menu').click();
  await page.locator('#repair').click();
  await page.waitForFunction(k => JSON.parse(localStorage.getItem(k)).drillCondition===100,key);
  assert.equal((await read()).ceramic,0);
  await page.waitForFunction(k => JSON.parse(localStorage.getItem(k)).blocksMined>0,key);
  await page.evaluate((k) => localStorage.setItem(k, 'broken-save'), key);
  await page.reload();
  await page.locator('#message').filter({ hasText: '원본을 보존' }).waitFor();
  assert.equal(
    await page.evaluate((k) => localStorage.getItem(k), key),
    'broken-save',
  );
  assert.deepEqual(errors, []);
  console.log(
    'First craft, reload, automatic driving through menus, steering, ordinary boundary crossing, isolated reset and legacy bookmark passed.',
  );
} finally {
  await browser.close();
}
