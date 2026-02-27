export async function prepareStableVisual(page, { fullPage = false } = {}) {
  await page.goto('/?test-mode=1', { waitUntil: 'domcontentloaded' });

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

  if (fullPage) {
    await page.evaluate(async () => {
      const step = 800;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
  }

  const fontState = await page.evaluate(async () => {
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

    const hero = document.querySelector('section#home h1');
    const body = document.body;
    const heroFamily = hero ? getComputedStyle(hero).fontFamily : '';
    const bodyFamily = body ? getComputedStyle(body).fontFamily : '';

    return {
      bodyFamily,
      heroFamily,
      hasRajdhani: document.fonts ? document.fonts.check('16px "Rajdhani"') : false
    };
  });

  if (!fontState.hasRajdhani) {
    throw new Error(
      `Font fallback in CI: Rajdhani not loaded. hero="${fontState.heroFamily}" body="${fontState.bodyFamily}"`
    );
  }

  await page.waitForTimeout(50);
}
