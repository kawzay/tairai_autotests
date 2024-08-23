import { test, expect } from '@playwright/test';
import { join } from 'path'
import { readFileSync } from 'fs'
import {username,password} from '../../Helpers/AuthorizationData'
import { Support} from '../../Helpers/SupportHelpers'

const pathToFile = join(__dirname, '../../Helpers/sitemap.json')
const sitemap = JSON.parse(readFileSync(pathToFile, 'utf8'))

test.describe.parallel('Visual Testing', () => {
  let support: Support // todo не используется

  // todo можно Object.values
  Object.entries(sitemap).forEach(([key, url], index) => {
    if (index > 0) {
      test(`Check snapshot ${url}`, async ({ page }) => {
        const support = new Support(page);
        await page.goto(`https://${username}:${password}@${url}`);
        await support.timeout(6000);
        expect(await page.screenshot()).toMatchSnapshot({
          name: `${url}.png`,
          threshold: 0.4,
          maxDiffPixels:500
        });
      });
    }
  });
});
