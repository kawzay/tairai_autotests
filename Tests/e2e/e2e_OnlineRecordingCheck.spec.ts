import {test, expect} from '@playwright/test'
import { baseAuth } from '../../Helpers/BasicCheckHelpers'

test.describe.parallel('Online Recording',() => {
  test.beforeEach(async ({ page }) => {
    await baseAuth(page)

    await page.click('button.header-select__tip-option-btn--left')

    const optionsLink = await page.$$('.header-desktop__options-link')
    await optionsLink[0].click()
  })

  test("Positive Online Recording With One Service", async ({page})=> {
    const pageAboutUs = page.locator('.checkin-page__title')
    await expect(pageAboutUs).toContainText("Онлайн запись")

    await page.click('li:nth-child(2)')

    await page.click('#services-list > li:first-child .service-list-item__controls > button')
    await page.click('.checkin-page-services__confirm-btn-wrapper button')

    const serviceCount = await page.locator('.checkin-page__option-btn-services-list').count();
    expect(serviceCount).toBe(1)

    await page.click('text = Пропустить выбор мастера')

    await page.click('.checkin-page-date__time-select-btn')

    await page.click('.checkin-page-date__confirm-btn')

    await page.getByPlaceholder('Ваше имя').fill('Daniil')
    await page.getByPlaceholder('+7 (___) ___  __  __').fill('9126568079')
    await page.click('.preloader-button__content')

    await page.click('text =  В салоне (наличными / безналичными)')

    await page.click('.checkin-page-payment__confirm-btn')

    await page.getByPlaceholder('Проверочный код').fill('0000')
    await page.click('.custom-checkbox__checkbox--rect')
    await page.click('.preloader-button__content')

    const successRecord =page.locator('.checkin-popup__title')
    await expect(successRecord).toContainText('Запись успешно завершена!')

    await page.click('.checkin-popup__close-btn')
    await expect(pageAboutUs).toContainText("Онлайн запись")
  })
})