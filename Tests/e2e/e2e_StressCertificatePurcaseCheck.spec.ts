import {test, expect} from '@playwright/test'
import { baseAuth } from '../../Helpers/BasicCheckHelpers'
import {Payment} from '../../Helpers/TestCardDataAndPaymantData'
import {Support} from '../../Helpers/SupportHelpers'
import {
  certificatePageOpen, certificatePageHasText, certificateType, electronicCertificateTypeSelect,
  physicalCertificateTypeSelect, certificateVariation, onSumCertificateSelect, onServiceCertificateSelect,
  inputSumOfPhysicalCertificate, enteringUserData,clickCheckboxAndGoToPayment,submitCertificateButtonClick,
  checkPrice,chooseProposedSum,chooseService,textOfSuccessPurchaseOfCert
} from '../../Helpers/CertificatePurchaseHelpers'

test.describe.parallel('Stress Certificate Purchase', () => {
  let payment: Payment
  let support: Support

  test.beforeEach(async ({ page }) => {
    payment = new Payment(page)
    support = new Support(page)

    await baseAuth(page)

    await support.doNotChooseAnotherCity()

    await certificatePageOpen(page)
  })
  for (let i = 0; i < 100; i++) {
    test("Positive electronic certificate for the service " +i, async ({ page }) => {
      await support.waitSelector('.cart__order-types')

      await certificateType(page, electronicCertificateTypeSelect)

      await certificateVariation(page, onServiceCertificateSelect)

      await chooseService(page, 1)

      await submitCertificateButtonClick(page)

      await checkPrice(page, '4490') // like choose service

      await enteringUserData(page)

      await clickCheckboxAndGoToPayment(page)

      await payment.testCardDataOfRobokassaPaste()

      await payment.successPurchase()

      await support.waitSelector('.success-page__title')

      await payment.checkSuccessPurchase(textOfSuccessPurchaseOfCert)
    })
  }
})