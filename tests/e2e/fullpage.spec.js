import { test, expect } from '@playwright/test';
import { prepareStableVisual } from './helpers/visual';

test('homepage fullpage visual (advisory)', async ({ page }) => {
  await prepareStableVisual(page, { fullPage: true });

  await expect(page).toHaveScreenshot('homepage-fullpage.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
    maxDiffPixels: 8000,
    timeout: 20_000
  });
});
