import { test, expect } from '@playwright/test';

async function waitForStableVisual(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Disable animations ASAP (before network settles)
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `
  });

  await page.waitForLoadState('networkidle');

  // Full-page warmup to stabilize lazy/content-visibility rendering
  await page.evaluate(async () => {
    const step = 800;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });

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

test('homepage visual baseline', async ({ page }) => {
  await waitForStableVisual(page);

  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
    maxDiffPixels: 8000,
    timeout: 20_000
  });
});
