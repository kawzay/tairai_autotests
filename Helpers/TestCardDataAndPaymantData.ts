import { expect, Locator, Page } from '@playwright/test'
import {Data} from './ChangingData'

export class Payment{
  readonly page:Page

  readonly emailValue:string

  readonly cardNumberValue:string

  readonly validToValue:string

  readonly cvcValue:string

  readonly cardHolderValue:string

  readonly submitButton:Locator

  readonly successPaymentText:Locator

  successPayment = 'btn-secondary'

  wrongPayment = 'btn-warning'

  data:Data

  constructor(page:Page) {
    this.page = page
    this.data = new Data()
    this.emailValue = this.data.email
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

  async typeOfPurchase(purchaseType:string){
    await this.submitButton.click()
    await this.page.click('.btn.'+purchaseType+'.dialogButton')
  }

  async checkSuccessPurchase(textOfSuccessPurchase:string){
    await expect(this.successPaymentText).toContainText(textOfSuccessPurchase)
  }
}
