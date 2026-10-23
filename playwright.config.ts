import { defineConfig, devices } from '@playwright/test'

const PORT = 3200

/**
 * End-to-end tests against the production build (`npm run build` first).
 * Locally they use the installed Microsoft Edge (PW_CHANNEL=msedge, the
 * default off CI) so no browser download is needed; CI installs Chromium.
 */
const channel = process.env.CI ? undefined : (process.env.PW_CHANNEL ?? 'msedge')

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
