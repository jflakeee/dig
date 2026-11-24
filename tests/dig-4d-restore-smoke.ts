import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

try {
  for (const [sample, expected] of [[0.05, true], [0.8, false]] as const) {
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await mobile.addInitScript((roll) => { Math.random = () => roll; }, sample);
    await mobile.goto('http://127.0.0.1:4173/dig/dig-4d.html');
    await mobile.waitForFunction(() => document.querySelector('#status')?.textContent?.includes('수집:'));
    assert.equal((await mobile.locator('#status').textContent())?.includes('미세중력 감지'), expected);
    await mobile.close();
  }
  const page = await browser.newPage({ viewport: { width: 1000, height: 720 } });
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          if ((window as Window & { __digFailClipboard?: boolean }).__digFailClipboard) {
            throw new Error('clipboard permission denied');
          }
          (window as Window & { __digClipboardText?: string }).__digClipboardText = text;
        },
      },
    });
  });

  await page.goto('http://127.0.0.1:4173/dig/dig-4d.html');
  await page.getByRole('button', { name: '공유 코드' }).waitFor();
  await page.getByRole('button', { name: '공유 코드' }).click();
  await page.locator('#restore-panel').waitFor({ state: 'visible' });

  await page.locator('#copy-progress-code').click();
  const code = await page.locator('#backup-code').inputValue();
  assert.match(code, /^DIG4R1\.[A-Za-z0-9_-]+\.[0-9a-f]{8}$/);
  assert.equal(await page.evaluate(() => (window as Window & { __digClipboardText?: string }).__digClipboardText), code);

  const saveKey = 'dig-4d-train-v1';
  const beforeInvalidRestore = await page.evaluate((key) => localStorage.getItem(key), saveKey);
  await page.locator('#restore-input').fill('not-a-valid-restore-code');
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator('#restore-submit').click();
  await page.waitForFunction(() => document.querySelector('#restore-message')?.textContent?.includes('올바르지'));
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), saveKey), beforeInvalidRestore);

  await page.evaluate(() => {
    (window as Window & { __digFailClipboard?: boolean }).__digFailClipboard = true;
  });
  await page.locator('#restore-input').fill(code);
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator('#restore-submit').click();
  await page.locator('#manual-copy-confirm').waitFor({ state: 'visible' });
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), saveKey), beforeInvalidRestore);

  await page.locator('#manual-copy-confirm').click();
  await page.waitForFunction(() => document.querySelector('#restore-message')?.textContent?.includes('복원했습니다'));
  const restored = await page.evaluate((key) => localStorage.getItem(key), saveKey);
  assert.ok(restored, 'restore should persist the validated train save');
  assert.equal(JSON.parse(restored).version, 1);
  assert.deepEqual(pageErrors, []);
  console.log('4D share-code copy, invalid-code rejection, manual-copy fallback and restore passed');
} finally {
  await browser.close();
}
