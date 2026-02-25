import { test, expect } from '@playwright/test';

async function waitForStableVisual(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.evaluate(async () => {
    // Fonts
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    // Images currently in DOM
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

    // Disable transitions/animations (extra safety for CI)
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `;
    document.head.appendChild(style);

    // Let layout settle
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });

  await page.waitForLoadState('networkidle');
}

test('homepage visual baseline', async ({ page }) => {
  await waitForStableVisual(page);

  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
    maxDiffPixels: 30000,
    timeout: 20_000
  });
});
