import { expect, Locator, Page } from '@playwright/test'
import {username,password} from './AuthorizationData'

const citiesArray: Array<string> = ['kaliningrad', 'spb', 'surgut', 'ufa', 'khabarovsk', 'chita']
let currentIndex:number = 0

export class CitiesSelectors{

  readonly page:Page
  readonly citiesUrl: string
  readonly citySelector: Locator
  readonly pageTitle: Locator
  readonly singUpButtonTextOnCitiesPage:string

  constructor(page:Page) {
    this.page = page

    this.citiesUrl = 'https://'+username+':'+password+'@'+citiesArray[currentIndex]+'.web-tairai.flagsoft.ru'
    this.citySelector = page.locator('.header-select__current-city-btn')
    this.pageTitle = page.locator('.header-desktop__options')
    this.singUpButtonTextOnCitiesPage = 'Записаться'

  }

  async openCity(){
    await this.page.goto(this.citiesUrl)

    currentIndex = (currentIndex+1)%citiesArray.length
  }

  async nameOfCityCheck(city:string){
    await expect(this.citySelector).toContainText(city)
  }

  async pageHasSignUpButton(){
    await expect(this.pageTitle).toContainText(this.singUpButtonTextOnCitiesPage)
  }
}