import { expect, Locator, Page, test } from '@playwright/test'
import { Support, timeout } from './SupportHelpers'

export class OnlineRecording{
  readonly page:Page

  constructor(page:Page) {
    this.page = page
  }

  async open(){
    await this.page.click('.header-desktop__options > a:nth-child(1)')
  }

  async hasText(titleText: string){
    const onlineRecordingPage = this.page.locator('.checkin-page__title')
    await expect(onlineRecordingPage).toContainText(titleText)
  }

  async selectSalon(salonNumberInTheList:number){
    await this.page.click('li:nth-child('+salonNumberInTheList+')')
  }

  async selectService(numberOfServiceInTheList:number){
    await this.page.click('#services-list li:nth-child('+numberOfServiceInTheList+') .service-list-item__controls > button > span')
  }

  async goToNextStepAndCheckCountOfService(countOfService:number){
    await this.page.click('.checkin-page-services__confirm-btn-wrapper button')
    const serviceCount = await this.page.locator('.checkin-page__option-btn-service-title').count();
    expect(serviceCount).toBe(countOfService)
  }

  async dontSelectMaster(){
    await this.page.click('text = Пропустить выбор мастера')
  }

  async selectMaster(numberOfMaster:number){
    await this.page.click('text = Выбрать мастера')
    await this.page.click('.checkin-page__options-container li:nth-child('+numberOfMaster+') > button > span')
  }

  async selectNearestDateAndTime(){
    await this.page.click('.checkin-page-date__time-select-btn')
    await this.page.click('.checkin-page-date__confirm-btn')
  }

  async inputPersonalData(name:string, phone:string){
    await this.page.getByPlaceholder('Ваше имя').fill(name)
    await this.page.getByPlaceholder('+7 (___) ___  __  __').fill(phone)
    await this.page.click('.preloader-button__content')
  }

  async selectCashPaymentMethod(){
    await this.page.click('text = В салоне (наличными / безналичными)')
    await this.page.click('.checkin-page-payment__confirm-btn')
  }

  async selectCertificatePaymentMethod(numberOfCert:string, codeOfCert:string){
    await this.page.click('text = Оплата Подарочным сертификатом')
    await this.page.locator('input[name="cardNumber"]').fill(numberOfCert)
    await this.page.locator('input[name="cardCode"]').fill(codeOfCert)
    await timeout(this.page,1000)
    await this.page.click('#main > div > div.checkin-page__options-container > div > div > div > form > button')

  }

  async selectSeasonTicketPaymentMethod(){
    await this.page.click('text = Оплата абонементом')
    await timeout(this.page,1000)
    await this.page.click('.checkin-page-payment__confirm-btn')
  }

  async finalRecordingAndCheck(){
    await this.page.getByPlaceholder('Проверочный код').fill('0000')
    await this.page.click('.custom-checkbox__checkbox--rect')
    await this.page.click('.preloader-button__content')

    const successRecord = this.page.locator('.checkin-popup__title')
    await expect(successRecord).toContainText('Запись успешно завершена!')

    await this.page.click('.checkin-popup__close-btn')

    const pageAboutUs = this.page.locator('.checkin-page__title')
    await expect(pageAboutUs).toContainText("Онлайн запись")
  }

  async error4Hours(){
    const errorPopUp = this.page.locator('.checkin-page-services__popup-caption')
    await expect(errorPopUp).toContainText('Можно выбрать не более 3 часов в одном визите')

    await this.page.click('.checkin-page-services__popup-button')
    const onlineRecordingPage = this.page.locator('.checkin-page__title')
    await expect(onlineRecordingPage).toContainText('Онлайн запись')
  }

  async changeTimeOfService(numberOfTimeOfService:number){
    await this.page.waitForTimeout(1500)
    await this.page.click('.service-list-item__current-time-btn-title')
    await this.page.click('#services-list > li:nth-child(1) > div > div.service-list-item__controls > div.service-list-item__time > div > button:nth-child('+numberOfTimeOfService+')')
  }

  async checkPrice(priceOfService:string){
    const price = this.page.locator('#services-list li:first-child .service-list-item__prices > div')
    await expect(price).toContainText(priceOfService)
  }

  async twoPersonVisit(){
    await this.page.click('.checkin-page-services__together-option-label')
  }

  async serviceListForSecondPerson(){
    await this.page.click('.checkin-page-services__services-by-client > button:nth-child(2)')
  }

  async selectRoom(typeOfRoom:number, selectedRoomText:string){
    const roomSelector = '.checkin-page-rooms__options > button:nth-child('+typeOfRoom+')';
    await this.page.click(roomSelector);
    await this.page.click('.checkin-page-rooms__confirm-btn')
    const checkSelector = this.page.locator('.checkin-page__options-container > button:nth-child(3) > div > span.checkin-page__option-btn-title')
    await expect(checkSelector).toContainText(selectedRoomText)
  }
}
