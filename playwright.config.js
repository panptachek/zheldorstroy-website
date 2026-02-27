import { defineConfig, devices } from '@playwright/test';

const stableUse = {
  baseURL: 'http://127.0.0.1:4173',
  deviceScaleFactor: 1,
  locale: 'ru-RU',
  timezoneId: 'UTC',
  reducedMotion: 'reduce',
  colorScheme: 'light',
  launchOptions: {
    args: ['--font-render-hinting=none']
  }
};

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: !process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  use: stableUse,
  outputDir: './artifacts/test-results',
  webServer: {
    command: 'npx vite build --outDir .pw-dist && npx vite preview --outDir .pw-dist --host 127.0.0.1 --port 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  projects: [
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 5'],
        ...stableUse,
        viewport: { width: 393, height: 851 },
        isMobile: true,
        hasTouch: true
      }
    },
    {
      name: 'tablet',
      use: {
        ...devices['Desktop Chrome'],
        ...stableUse,
        viewport: { width: 1024, height: 1366 },
        isMobile: false,
        hasTouch: true
      }
    },
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        ...stableUse,
        viewport: { width: 1440, height: 900 },
        isMobile: false,
        hasTouch: false
      }
    },
    {
      name: 'wide',
      use: {
        ...devices['Desktop Chrome'],
        ...stableUse,
        viewport: { width: 1920, height: 1080 },
        isMobile: false,
        hasTouch: false
      }
    }
  ]
});
