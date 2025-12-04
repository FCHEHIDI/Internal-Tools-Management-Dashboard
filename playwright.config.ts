import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for A/B Testing
 * 
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
    ['./tests/reporters/ab-test-reporter.ts'], // Custom A/B test reporter
    ['list'], // Console output
  ],
  
  /* Shared settings for all projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // Core desktop browsers
    {
      name: 'chromium-widget',
      testMatch: /.*\.spec\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        // Widget variant context
        contextOptions: {
          storageState: undefined,
        },
      },
      grep: /@ab-test/,
    },
    {
      name: 'firefox',
      testMatch: /.*\.spec\.ts/,
      use: { 
        ...devices['Desktop Firefox'],
      },
      grep: /@smoke|@critical/,
    },

    // Mobile (most important for widget UX)
    {
      name: 'mobile-chrome',
      testMatch: /.*\.spec\.ts/,
      use: { 
        ...devices['Pixel 5'],
      },
      grep: /@mobile|@critical/,
    },

    // Additional browsers for full coverage (run less frequently)
    {
      name: 'webkit',
      testIgnore: /.*performance.*/, // Skip performance on WebKit
      use: { ...devices['Desktop Safari'] },
      grep: /@full-coverage/,
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
      grep: /@full-coverage|@mobile/,
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      grep: /@full-coverage/,
    },
  ],

  /* Metadata for test organization */
  metadata: {
    testType: 'A/B Testing',
    framework: 'Playwright',
    tags: {
      '@smoke': 'Quick validation tests',
      '@critical': 'Must-pass functionality',
      '@ab-test': 'A/B test comparison',
      '@mobile': 'Mobile-specific tests',
      '@performance': 'Performance benchmarks',
      '@accessibility': 'Accessibility compliance',
      '@full-coverage': 'Extended browser matrix',
    },
  },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
