import { test, expect } from '@playwright/test';

test('homepage smoke', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ЖЕЛДОРСТРОЙ');
  await expect(page.locator('section#contacts')).toBeVisible();
});
