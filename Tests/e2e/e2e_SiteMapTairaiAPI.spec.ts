import { test, expect, Page } from '@playwright/test'
import { join } from 'path'
import { readFileSync } from 'fs'
import {username,password} from '../../Helpers/AuthorizationData'

// Считывание JSON файла с URL
const pathToFile = join(__dirname, '../../Helpers/sitemap.json')
const sitemap: Record<string, string> = JSON.parse(readFileSync(pathToFile, 'utf8'))
// Функция для тестирования каждого URL на статус 200
async function testUrl(page: Page, url: string) {
  const response = await page.goto('https://'+username+':'+password+'@'+url);
  expect(response.status()).toBe(200);
}

// Основной блок теста
test.describe.parallel('URL Status Check', () => {
  // key не юзается, можно использовать Object.values, ниже заменил в качечтве примера
  for (const url of Object.values(sitemap)) {
    test(`${url} should return status 200`, async ({ page }) => {
      await testUrl(page, url);
    });
  }
});

