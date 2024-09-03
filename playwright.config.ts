import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config()
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig<TestOptions>({
  timeout: 40000,
  //globalTimeout: 60000,
  expect: {
    timeout: 2000
  },
  retries: 1,
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    //['allure-playwright'],
    ['html']
  ],
  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
      : process.env.STAGING === '1' ? 'http://localhost:4201/'
        : 'http://localhost:4200/',

    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201/',
      },
      // fullyParallel: true // can configure
    },
    {
      name: 'chromium',
      // fullyParallel: true // can configure
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        video: {
          mode: 'on',
          size: {width: 1920, height: 1080}
        }
       },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['Pixel 7']
      }
    }

  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200/',
    timeout: 120 * 1000,
  }

});
