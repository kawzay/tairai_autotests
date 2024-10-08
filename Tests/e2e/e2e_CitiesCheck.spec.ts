import {test} from '@playwright/test'
import {CitiesSelectors} from '../../Helpers/CitiesCheckHelpers'


test.describe('Checking the opening of other cities',() => {

  let citiesSelectors:CitiesSelectors

  test.beforeEach(async ({page}) =>{
    citiesSelectors = new CitiesSelectors(page)

    await citiesSelectors.openCity()
    await citiesSelectors.pageHasSignUpButton()
  })

  test("Kaliningrad", async () => {
    await citiesSelectors.nameOfCityCheck('Калининград')
  })

  test("Spb", async () => {
    await citiesSelectors.nameOfCityCheck('Санкт-Петербург')
  })

  test("Surgut", async () => {
    await citiesSelectors.nameOfCityCheck('Сургут')
  })

  test("Ufa", async () => {
    await citiesSelectors.nameOfCityCheck('Уфа')
  })

  test("Khabarovsk", async () => {
    await citiesSelectors.nameOfCityCheck('Хабаровск')
  })

  test("Chita", async () => {
    await citiesSelectors.nameOfCityCheck('Чита')
  })
})