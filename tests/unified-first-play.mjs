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
  await page.waitForFunction(
    () => document.querySelector('#rock b').textContent === '2',
  );
  await page.reload();
  assert.equal(await page.locator('#rock b').textContent(), '2');
  await page.locator('#craft').waitFor();
  await page.evaluate(() => {
    document.querySelector('#craft').click();
    document.querySelector('#craft').click();
  });
  assert.equal(
    await page
      .getByRole('button', { name: /^(정지|재개|후진)$/, includeHidden: true })
      .count(),
    0,
  );
  await page.locator('#menu').waitFor();
  let save = await read();
  assert.equal(save.rocks, 0);
  assert.deepEqual(save.drills, ['drill-1']);
  await page.reload();
  assert.equal(await page.locator('#sensor').isVisible(), false);
  await page.mouse.move(15, 400);
  await page.mouse.down();
  await page.mouse.move(375, 400, { steps: 4 });
  await page.mouse.up();
  const afterPortal = (await read()).rocks;
  // At most 15 forward layers of 9 voxels fit before the old boundary.
  // Collecting 170 rocks on this straight course requires crossing it.
  await page.locator('#menu').click();
  await page.waitForFunction(
    ([k, n]) => JSON.parse(localStorage.getItem(k)).rocks >= n + 170,
    [key, afterPortal],
    { timeout: 150000 },
  );
  assert.equal(await page.locator('#panel').isVisible(), true);
  assert.equal(await page.getByText(/청크 경계/).count(), 0);
  await page.reload();
  await page.locator('#menu').waitFor();
  assert.equal(await page.locator('#sensor').isVisible(), false);
  assert.equal((await read()).transited, false);
  await page.locator('#menu').click();
  await page.locator('#reset').click();
  const beforeConfirm = (await read()).rocks;
  await page.waitForFunction(
    ([k, n]) => JSON.parse(localStorage.getItem(k)).rocks > n,
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
  await Promise.all(
    [page, other].map((p) =>
      p.evaluate(() => document.querySelector('#craft').click()),
    ),
  );
  await page.waitForFunction(
    (k) => JSON.parse(localStorage.getItem(k)).front,
    key,
  );
  const shared = await read();
  assert.equal(shared.rocks, 0);
  assert.deepEqual(shared.drills, ['drill-1']);
  await other.close();
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
