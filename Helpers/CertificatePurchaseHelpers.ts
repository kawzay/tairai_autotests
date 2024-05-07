import { expect, Page } from '@playwright/test'
import {Data} from './ChangingData'


export class CertificatePage{
  readonly page: Page

  constructor(page:Page) {
    this.page = page
  }

  async open(){
    await this.page.click('.header-desktop__options > a:nth-child(2)')
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

