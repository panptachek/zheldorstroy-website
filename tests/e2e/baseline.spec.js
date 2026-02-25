import { test, expect } from '@playwright/test';

test('homepage visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.03,
    timeout: 15_000
  });
});
