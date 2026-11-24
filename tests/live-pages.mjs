import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const origin = 'https://jflakeee.github.io';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const mine = await page.goto(origin + '/dig/');
  assert.equal(mine.status(), 200);
  await page.getByRole('button', { name: 'Lamp on', exact: true }).click();
  await page.getByRole('button', { name: 'Lamp off', exact: true }).waitFor();
  console.log('Live original mine loaded and lamp responded');

  const four = await page.goto(origin + '/dig/dig-4d.html');
  assert.equal(four.status(), 200);
  await page.waitForFunction(() => document.querySelector('#status')?.textContent.includes('수집:'));
  await page.locator('#upgrade').click();
  assert.match(await page.locator('#upgrade').innerText(), /Lv 1$/);
  await page.locator('#add-drill').click();
  assert.match(await page.locator('#add-drill').innerText(), /2대$/);
  await page.reload();
  await page.getByRole('button', { name: /드릴 강화 · Lv 1/ }).waitFor();
  await page.getByRole('button', { name: /드릴 추가 · 2대/ }).waitFor();
  await page.locator('#restore-toggle').click();
  await page.locator('#copy-progress-code').click();
  await page.waitForFunction(() => document.querySelector('#backup-code')?.value.startsWith('DIG4R1.'));
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(clipboard, await page.locator('#backup-code').inputValue());
  assert.match(clipboard, /^DIG4R1\./);
  assert.deepEqual(errors, []);
  console.log('Live 4D drill upgrade, second drill, reload persistence, and real clipboard passed');
} finally {
  await browser.close();
}
