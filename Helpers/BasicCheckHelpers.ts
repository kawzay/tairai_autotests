import { expect, Page } from '@playwright/test'
import {username,password} from './AuthorizationData'

export async function baseAuth(page: Page){
  const urlWithCredentials = 'https://'+username+':'+password+'@stage-api.tairai.com'
  await page.goto(urlWithCredentials);
}
export async function checkPagesContent (page:Page, content:string){
  const citySelector = page.locator('h1')
  await expect(citySelector).toContainText(content)
}