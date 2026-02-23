import { test, expect } from '@playwright/test';

test('homepage visual baseline', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true, animations: 'disabled' });
});
