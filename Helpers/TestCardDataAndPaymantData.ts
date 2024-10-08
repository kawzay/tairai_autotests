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
  successPayment = 'success'
  wrongPayment = 'error'
  cash:string = 'cash'
  seasonTicket:string = 'seasonTicket'
  certificate:string = 'certificate'

  data:Data

  constructor(page:Page) {
    this.page = page
    this.data = new Data()
    this.emailValue = this.data.email
    this.cardNumberValue = '4300000000000777'
    this.validToValue = '1124'
    this.cvcValue = '111'

    this.cardHolderValue = 'CARDHOLDER'

    this.submitButton = page.locator('.general-button')
    this.successPaymentText = page.locator('h1')
  }

  async testCardDataOfRobokassaPaste(){
    await this.page.fill("[name='EMail']",this.emailValue)
    await this.page.fill("[name='cardNumber']",this.cardNumberValue)
    await this.page.fill("[name='validTo']",this.validToValue)
    await this.page.fill("[name='cvc']",this.cvcValue)
    await this.page.waitForSelector("[name='cardholder']")
    await this.page.fill("[name='cardholder']",this.cardHolderValue)
  }

  async typeOfPurchase(purchaseType:string){
    await this.submitButton.click()
    await this.page.click('.general-button_test-' + purchaseType)
    await this.page.waitForTimeout(3000)
  }

  async checkSuccessPurchase(textOfSuccessPurchase:string){

    await expect(this.successPaymentText).toContainText(textOfSuccessPurchase)
  }
}
