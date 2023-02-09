import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  testDir: 'src/tests/api',
  use: {
    baseURL: 'https://reqres.in',
    headless: true,
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
  },
}
export default config
