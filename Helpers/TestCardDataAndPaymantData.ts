import { expect, Locator, Page } from '@playwright/test'
import {email} from './UserData'

export const successPayment = 'btn-secondary'
export const wrongPayment = 'btn-warning'

export class Payment{
  readonly page:Page

  readonly emailValue:string

  readonly cardNumberValue:string

  readonly validToValue:string

  readonly cvcValue:string

  readonly cardHolderValue:string

  readonly submitButton:Locator

  readonly successPaymentText:Locator

  constructor(page:Page) {
    this.page = page
    this.emailValue = email
    this.cardNumberValue = '4300000000000777'
    this.validToValue = '1124'
    this.cvcValue = '111'

    this.cardHolderValue = 'CARDHOLDER'

    this.submitButton = page.locator('.btn-primary')
    this.successPaymentText = page.locator('h1')
  }

  async testCardDataOfRobokassaPaste(){
    await this.page.fill("[name='EMail']",this.emailValue)
    await this.page.fill("[name='CardNumber']",this.cardNumberValue)
    await this.page.fill("[name='ValidTo']",this.validToValue)
    await this.page.fill("[name='CVC']",this.cvcValue)
    await this.page.waitForSelector("[name='CardHolder']")
    await this.page.fill("[name='CardHolder']",this.cardHolderValue)
  }

  async successPurchase(){
    await this.submitButton.click()
    await this.page.click('.btn.'+successPayment+'.dialogButton')
  }

  async wrongPurchase(){
    await this.submitButton.click()
    await this.page.click('.btn.'+wrongPayment+'.dialogButton')
  }

  async checkSuccessPurchase(textOfSuccessPurchase:string){
    await expect(this.successPaymentText).toContainText(textOfSuccessPurchase)
  }
}
