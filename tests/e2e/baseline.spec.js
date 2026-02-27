import { test, expect } from '@playwright/test';
import { prepareStableVisual } from './helpers/visual';

const contractSections = ['home', 'about', 'directions', 'projects', 'contacts'];

for (const sectionId of contractSections) {
  test(`blocking visual contract: ${sectionId}`, async ({ page }) => {
    await prepareStableVisual(page);
    const section = page.locator(`section#${sectionId}`);
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot(`contract-${sectionId}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: process.env.CI ? 0.02 : 0.01,
      timeout: 20_000
    });
  });
}
