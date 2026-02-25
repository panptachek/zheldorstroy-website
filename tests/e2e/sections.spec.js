import { test, expect } from '@playwright/test';

async function waitForStableVisual(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

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

    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `;
    document.head.appendChild(style);

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });

  await page.waitForLoadState('networkidle');
}

const sectionIds = ['home', 'about', 'directions', 'projects', 'jobs', 'press', 'contacts'];

for (const sectionId of sectionIds) {
  test(`section snapshot: ${sectionId}`, async ({ page }) => {
    await waitForStableVisual(page);
    const section = page.locator(`section#${sectionId}`);
    await expect(section).toBeVisible();
    await expect(section).toHaveScreenshot(`${sectionId}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
      timeout: 20_000
    });
  });
}
