import { Page } from '@playwright/test'

export async function timeout(page: Page,millisecTime:number){
  await page.waitForTimeout(millisecTime)
}

// тут чет не понял, в конце файла есть метод с таким-же названием но внутри класса Support
// а этот метод похоже нигде не используется
export async function doNotChooseAnotherCity(page: Page){
  if(await page.locator('.header-select__tip').isVisible()){
    await page.click('.header-desktop__top .header-select__tip-option-btn--left')
  }
}

export class Support{
  readonly page:Page

  constructor(page:Page) {
    this.page = page
  }

  async timeout(millisecTime:number){
    await this.page.waitForTimeout(millisecTime)
  }

  async waitSelector(selector:string){
    await this.page.waitForSelector(selector)
  }

  async doNotChooseAnotherCity(){
    if(await this.page.locator('.header-select__tip').isVisible()){
      await this.page.click('#app > header > section.header-desktop > div.header-desktop__top > div.header-select > div > div > div > button.header-select__tip-option-btn.header-select__tip-option-btn--left')
    }
  }
}
