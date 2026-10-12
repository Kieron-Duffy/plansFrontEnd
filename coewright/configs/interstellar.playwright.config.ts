/* eslint-disable import-x/no-extraneous-dependencies */
import { resolve } from 'path';

import { devices } from '@playwright/test';
import { BrowserSetup } from '@qecoe/playwright_automation';
import dotenv from 'dotenv';

const timeInMin = 60 * 1000;

dotenv.config();
if (process.env.ENV_FILE_NAME) {
  dotenv.config({
    path: resolve(__dirname, '..', 'env', process.env.ENV_FILE_NAME),
    override: false,
  });
}

const config = {
  use: {
    browserName: BrowserSetup.type(process.env.BROWSER_NAME.toLowerCase()),
    trace: 'off',
    headless: BrowserSetup.convertToBoolean(process.env.HEADLESS_MODE),
    launchOptions: {
      args: ['--start-maximized', '--disable-plugins', '--disable-extensions'],
      timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10),
    },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    channel: BrowserSetup.channel(process.env.BROWSER_NAME.toLowerCase()),
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInMin,
    navigationTimeout:
      Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInMin,
    testIdAttribute: 'data-qa-id',
  },
  // If running tests via Sauce Labs and using config.yml, you need to provide a relative path in testDir due to the root specified in the yml file.
  testDir: '../tests/interstellar',
  expect: {
    timeout: process.env.EXPECT_TIMEOUT,
  },
  globalSetup: require.resolve('../hooks/global-setup'),
  globalTeardown: require.resolve('../hooks/global-teardown'),
  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
  timeout: Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: Number.parseInt(process.env.RETRIES, 10),
  workers: Number.parseInt(process.env.PARALLEL_THREAD, 10),
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['@qecoe/playwright_automation/dist/cjs/src/logger/XrayTestListener'],
  ],
  projects: [
    {
      name: 'local',
      /* Any test needs to be ignored can be mentioned in below field */
      testIgnore: 'accessibility.spec.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      testIgnore: 'accessibility.spec.ts',
    },
    {
      name: 'accessibility',
      testMatch: 'accessibility.spec.ts',
    },

    // For a comprehensive list of browsers and devices and their respective configurations, please refer to:
    // https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json

    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        browserChannel: 'msedge',
        ...devices['Desktop Edge'],
      },
      testIgnore: 'accessibility.spec.ts',
    },

    {
      name: 'latestIphone',
      use: {
        ...devices['iPhone 15'],
      },
      testIgnore: 'accessibility.spec.ts',
    },
    {
      name: 'latestAndroid',
      use: {
        ...devices['Galaxy S24'],
      },
      testIgnore: 'accessibility.spec.ts',
    },
    {
      name: 'iPadLatestPortrait',
      use: {
        ...devices['iPad (gen 11)'],
      },
      testIgnore: 'accessibility.spec.ts',
    },
    {
      name: 'iPadLatestLandscape',
      use: {
        ...devices['iPad (gen 11) landscape'],
      },
      testIgnore: 'accessibility.spec.ts',
    },
  ],
};
export default config;
