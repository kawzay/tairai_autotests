import { Locator, Page } from '@playwright/test'


export class SeasonTicket{
  readonly page:Page
  readonly seasonTicketPage:Locator
  readonly namePlaceholder:string
  readonly phonePlaceholder:string
  readonly emailPlaceholder:string
  readonly checkboxPersonalData:Locator
  readonly goToPaymentButton:Locator

  constructor(page:Page) {
    this.page = page
    this.seasonTicketPage = page.locator(".header-desktop__main-menu > a:nth-child(6)")
    this.namePlaceholder = 'Ваше имя'
    this.phonePlaceholder = '+7 (___) ___  __  __'
    this.emailPlaceholder = 'post@post.net'
    this.checkboxPersonalData = page.locator('.custom-checkbox__checkbox--rect')
    this.goToPaymentButton = page.locator('.preloader-button__content')
  }

  async pageOpening(){
    await this.seasonTicketPage.click()
}

  async selectHours(hour:number,hoursOfSeasonTicket:number){
    if(hour === 3){
      await this.page.click('text ='+hoursOfSeasonTicket+' часа')
    } else if(hour === 5){
      await this.page.click('text ='+hoursOfSeasonTicket+' часов')
    } else if (hour === 9){
      await this.page.click('text ='+hoursOfSeasonTicket+' часов')
    }
  }

  async fillData(name:string,phone:string,email:string){
    await this.page.getByPlaceholder(this.namePlaceholder).fill(name)
    await this.page.getByPlaceholder(this.phonePlaceholder).fill(phone)
    await this.page.getByPlaceholder(this.emailPlaceholder).fill(email)
  }

  async goToPayment(){
    await this.checkboxPersonalData.click()
    await this.goToPaymentButton.click()
  }
}
