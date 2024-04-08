import {test, expect} from '@playwright/test'

import {baseAuth,checkPagesContent} from '../../Helpers/BasicCheckHelpers'

test.describe.parallel('Home screen pages are displayed',() => {
  test.beforeEach(async ({page}) =>{
      await baseAuth(page)
  })

  test("BasicAuth Check", async ({page})=> {
    const pageTitle = page.locator('.header-desktop__options')
    await expect(pageTitle).toContainText("Записаться")
  })

  test ("'About Tairai' Page Check", async ({page}) =>{
    await page.click("text=О ТАЙРАЙ")

    const pageAboutUs = page.locator('.about-page__tagline')
    await expect(pageAboutUs).toContainText("ТАЙРАЙ — место твоего отдыха.")
  })

  test ("News Page Check", async ({page}) =>{
    await page.click("text=Новости")

    await checkPagesContent(page,'Новости')
  })

  test ("Reviews Page Check", async ({page}) =>{
    await page.click("text=Отзывы")

    await checkPagesContent(page,'Отзывы')
  })

  test ("CorporateOffers Page Check", async ({page}) =>{
    await page.click("text=Корпоративные предложения")

    await checkPagesContent(page,'Корпоративные предложения')
  })

  test("Service Page Check", async ({page})=> {
    await page.click("text=Услуги")

    await checkPagesContent(page,'Услуги в г. Москва и МО')
  })

  test("Promotions Page Check", async ({page})=> {
    await page.click("text=Акции")

    await checkPagesContent(page,'Акции')
  })

  test("Salons Page Check", async ({page})=> {
    await page.click("text=Салоны")

    await checkPagesContent(page,'Спа салоны в г. ')
  })

  test("Certificates Page Check", async ({page})=> {
    await page.click("text=Подарочные сертификаты")

    await checkPagesContent(page,'Подарочные сертификаты')
  })

  test("SeasonTicket Page Check", async ({page})=> {
    await page.click("text=Абонементы")

    await checkPagesContent(page,'Абонементы')
  })

  test("MainPageLogo Check", async ({page}) => {
    const mainPageLogo = page.locator(".header-desktop__logo-image")
    await expect(mainPageLogo).toBeVisible()
  })
})

