import {PlaywrightTestConfig} from '@playwright/test'

const playwrightConfig: PlaywrightTestConfig = {
  timeout:120000,
  retries: 0,
  workers:4,
  testDir: "tests/e2e",
  reporter: "allure-playwright",
  use:{
    headless: true,
    viewport:{width: 1920, height:1080},
    actionTimeout:30000,
    video: 'off',
    screenshot: 'off',
  },

  projects: [
    {
      name: "Chromium",
      use: {browserName: 'chromium'},
    },
    {
      name: "Firefox",
      use: {browserName: 'firefox'},
    },
    {
      name: "Webkit",
      use: {browserName: 'webkit'},
    },
  ],
}



export default playwrightConfig