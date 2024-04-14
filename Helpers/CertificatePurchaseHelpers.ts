import { expect, Page } from '@playwright/test'
import {name,email,phoneWithout7and8} from './ChangingData'

export const textOfSuccessPurchaseOfCert = ' Спасибо, оплата прошла успешно! '
export const electronicCertificateTypeSelect = 0
export const physicalCertificateTypeSelect = 1

export const onSumCertificateSelect = 'На сумму'
export const onServiceCertificateSelect = 'На услугу'
export class CertificatePage{
  readonly page: Page

  constructor(page:Page) {
    this.page = page
  }

  async open(){
    const optionsLink = await this.page.$$('.header-desktop__options-link')
    await optionsLink[1].click()
  }

  async hasText(titleText: string) {
    const pageCertificate = this.page.locator('.cart__title');
    await expect(pageCertificate).toContainText(titleText);
  }

  async selectCertificateType(certificateType: number) {
    const type = await this.page.$$('.custom-checkbox');
    await type[certificateType].click();
  }

  async selectCertificateVariation(certificateVariation: string) {
    await this.page.click(`text=${certificateVariation}`);
  }

  async inputSumOfPhysicalCertificate(inputSum: string) {
    await this.page.fill('.custom-input__input', inputSum);
  }

  async submitCertificateButton() {
    await this.page.click('.cart__submit-button');
  }

  async checkPrice(priceLikeInputOrChoosen: string) {
    const priceOfCertificate = this.page.locator('.cart-certificates-list__price');
    await expect(priceOfCertificate).toContainText(priceLikeInputOrChoosen);
  }

  async enteringUserData(name: string, email: string, phone: string) {
    await this.page.getByPlaceholder('Введите ваше имя').fill(name);
    await this.page.getByPlaceholder('post@post.net').fill(email);
    await this.page.getByPlaceholder('+7 (___) ___  __  __').fill(phone);
  }

  async clickCheckboxAndGoToPayment() {
    await this.page.click('.custom-checkbox__checkbox--rect');
    await this.page.click('.preloader-button__content');
  }

  async chooseProposedSum(numberOfCheckboxFrom1to4: number) {
    await this.page.click(`.cart-amount-form__sums > div:nth-child(${numberOfCheckboxFrom1to4}) > label > span.custom-checkbox__checkbox`);
  }

  async chooseService(numberOfServiceFromSite: number) {
    await this.page.click(`#services-list > li:nth-child(${numberOfServiceFromSite}) > div > div.service-list-item__controls > button > span`);
  }
}
export async function certificatePageOpen(page: Page){
  const optionsLink = await page.$$('.header-desktop__options-link')
  await optionsLink[1].click()
}

export async function certificatePageHasText(page:Page,titleText:string){
  const pageCertificate = page.locator('.cart__title')
  await expect(pageCertificate).toContainText(titleText)
}

export async function certificateType(page:Page,certificateType:number){
  const type = await page.$$('.custom-checkbox')
  await type[certificateType].click()
}

export async function certificateVariation(page:Page,certificateVariation:string){
  await page.click('text = '+certificateVariation)
}

export async function inputSumOfPhysicalCertificate(page:Page,inputSum:string){
  await page.fill('.custom-input__input',inputSum)
}

export async function submitCertificateButtonClick(page:Page){
  await page.click('.cart__submit-button')
}

export async function checkPrice(page:Page,priceLikeInputOrChoosen:string){
  const priceOfCertificate = page.locator('.cart-certificates-list__price')
  await expect(priceOfCertificate).toContainText(priceLikeInputOrChoosen)
}

export async function checkSum(page:Page){
  await page.click('.cart__submit-button')
}

export async function enteringUserData(page:Page){
  await page.getByPlaceholder('Введите ваше имя').fill(name)
  await page.getByPlaceholder('post@post.net').fill(email)
  await page.getByPlaceholder('+7 (___) ___  __  __').fill(phoneWithout7and8)
}

export async function clickCheckboxAndGoToPayment(page:Page){
  await page.click('.custom-checkbox__checkbox--rect')
  await page.click('.preloader-button__content')
}

export async function chooseProposedSum(page:Page,numberOfCheckboxFrom1to4:number){
  await page.click('.cart-amount-form__sums > div:nth-child('+numberOfCheckboxFrom1to4+') > label > span.custom-checkbox__checkbox')
}

export async function chooseService(page:Page,numberOfServiceFromSite:number){
  await page.click('#services-list > li:nth-child('+numberOfServiceFromSite+') > div > div.service-list-item__controls > button > span')
}

