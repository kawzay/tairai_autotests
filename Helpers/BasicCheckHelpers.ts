import { expect, Page } from '@playwright/test'
import {username,password} from './AuthorizationData'

export async function baseAuth(page: Page){
  const urlWithCredentials = 'https://'+username+':'+password+'@stage-tairai.tairai.com'
  
  await page.goto(urlWithCredentials);
}
export async function checkPagesContent (page:Page, content:string){
  const citySelector = page.locator('h1')
  await expect(citySelector).toContainText(content)
}

export async function putBaseAuth(page:Page){
  await page.route('**/*', route => {
    // Добавляем заголовок авторизации ко всем запросам
    const headers = Object.assign({}, route.request().headers(), {
      Authorization: `Basic ${Buffer.from(username+':'+password).toString('base64')}`
    });
    route.continue({ headers });
  });
}