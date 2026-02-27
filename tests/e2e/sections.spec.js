import { test, expect } from '@playwright/test';
import { prepareStableVisual } from './helpers/visual';

const sectionIds = ['home', 'about', 'directions', 'projects', 'jobs', 'press', 'contacts'];

for (const sectionId of sectionIds) {
  test(`section snapshot: ${sectionId}`, async ({ page }) => {
    await prepareStableVisual(page);
    const section = page.locator(`section#${sectionId}`);
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot(`${sectionId}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: process.env.CI ? 0.02 : 0.01,
      timeout: 20_000
    });
  });
}
