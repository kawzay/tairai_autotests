import {test, expect} from '@playwright/test'
import { baseAuth, putBaseAuth } from '../../Helpers/BasicCheckHelpers'
import {Payment} from '../../Helpers/TestCardDataAndPaymantData'
import {Support} from '../../Helpers/SupportHelpers'
import {CertificatePage} from '../../Helpers/CertificatePurchaseHelpers'
import { Data } from '../../Helpers/ChangingData'

test.describe.parallel('Stress Certificate Purchase', () => {
  let payment: Payment
  let support: Support
  let certificatePage:CertificatePage
  let data:Data

  test.beforeEach(async ({ page }) => {
    payment = new Payment(page)
    support = new Support(page)
    certificatePage = new CertificatePage(page)
    data = new Data()

    await baseAuth(page)
    await support.doNotChooseAnotherCity()
    await certificatePage.open()
  })
  for (let i = 0; i < 1; i++) {
    test("Positive electronic certificate for the service " +i, async ({ page }) => {
      await support.waitSelector('.cart__order-types')
      await certificatePage.selectCertificateType(data.electronicCertificateTypeSelect)
      await certificatePage.selectCertificateVariation(data.onServiceCertificateSelect)
      await certificatePage.chooseService(data.numberOfService)
      await certificatePage.submitCertificateButton()
      await certificatePage.checkPrice(data.priceOfService) // look at chooseProposeService
      await certificatePage.enteringUserData(data.name,data.email,data.phoneWithout7and8)
      await certificatePage.clickCheckboxAndGoToPayment()
      await payment.testCardDataOfRobokassaPaste()
      await payment.typeOfPurchase(payment.successPayment)
      await putBaseAuth(page)
      await support.waitSelector('.success-page__title')
      await payment.checkSuccessPurchase(data.textOfSuccessPurchaseOfCert)
    })
  }
})