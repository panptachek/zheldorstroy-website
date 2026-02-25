import { test, expect } from '@playwright/test';

async function waitForStableVisual(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      .section {
        content-visibility: visible !important;
        contain-intrinsic-size: auto !important;
      }
    `
  });

  await page.waitForLoadState('networkidle');

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;

    const images = Array.from(document.images || []);
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      })
    );

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });

  await page.waitForTimeout(50);
}

const sectionIds = ['home', 'about', 'directions', 'projects', 'jobs', 'press', 'contacts'];

for (const sectionId of sectionIds) {
  test(`section snapshot: ${sectionId}`, async ({ page }) => {
    await waitForStableVisual(page);
    const section = page.locator(`section#${sectionId}`);
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot(`${sectionId}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: process.env.CI ? 0.02 : 0.01,
      timeout: 20_000
    });
  });
}
