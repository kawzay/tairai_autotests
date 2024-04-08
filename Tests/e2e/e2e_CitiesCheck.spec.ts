import {test, expect} from '@playwright/test'
import {CitiesSelectors} from '../../Helpers/CitiesCheckHelpers'


test.describe('Checking the opening of other cities',() => {

  let citiesSelectors:CitiesSelectors

  test.beforeEach(async ({page}) =>{
    citiesSelectors = new CitiesSelectors(page)

    await citiesSelectors.openCity()
    await citiesSelectors.pageHasSignUpButton()
  })

  test("Kaliningrad", async ({page}) => {
    await citiesSelectors.nameOfCityCheck('Калининград')
  })

  test("Spb", async ({page}) => {
    await citiesSelectors.nameOfCityCheck('Санкт-Петербург')
  })

  test("Surgut", async ({page}) => {
    await citiesSelectors.nameOfCityCheck('Сургут')
  })

  test("Ufa", async ({page}) => {
    await citiesSelectors.nameOfCityCheck('Уфа')
  })

  test("Khabarovsk", async ({page}) => {
    await citiesSelectors.nameOfCityCheck('Хабаровск')
  })

  test("Chita", async ({page}) => {
    await citiesSelectors.nameOfCityCheck('Чита')
  })
})