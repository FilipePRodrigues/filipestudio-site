import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:5173/filipestudio-site/'

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],

    // Hermes env seems prepackaged for a specific Chromium build.
    // Force Playwright to use it instead of downloading headless-shell.
    browserName: 'chromium',
    launchOptions: {
      executablePath:
        '/opt/hermes/tools/chromium-1208/chrome-linux64/chrome',
    },
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5173',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
