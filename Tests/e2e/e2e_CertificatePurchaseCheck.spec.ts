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

  test.describe.parallel('Certificate Purchase', () => {
    let payment: Payment
    let support: Support

    test.beforeEach(async ({ page }) => {
      payment = new Payment(page)
      support = new Support(page)

      await baseAuth(page)

      await support.doNotChooseAnotherCity()

      await certificatePageOpen(page)
    })

    test("Certificate page opening check", async ({ page }) => {
      await certificatePageHasText(page, 'Корзина')
    })

    test("Positive electronic certificate for the amount to be entered", async ({ page }) => {
      await support.waitSelector('.cart__order-types')

      await certificateType(page, electronicCertificateTypeSelect)

      await certificateVariation(page, onSumCertificateSelect)

      await inputSumOfPhysicalCertificate(page, '5000')

      await submitCertificateButtonClick(page)

      await checkPrice(page, '5000')

      await enteringUserData(page)

      await clickCheckboxAndGoToPayment(page)

      await payment.testCardDataOfRobokassaPaste()

      await payment.successPurchase()

      await support.waitSelector('.success-page__title')

      await payment.checkSuccessPurchase(textOfSuccessPurchaseOfCert)
    })

    test("Positive electronic certificate for the proposed amount", async ({ page }) => {
      await support.waitSelector('.cart__order-types')

      await certificateType(page, electronicCertificateTypeSelect)

      await certificateVariation(page, onSumCertificateSelect)

      await chooseProposedSum(page, 2) // 1-6000 2-8000 3-10000 4-12000

      await submitCertificateButtonClick(page)

      await checkPrice(page, '8000') // look at chooseProposedSum

      await enteringUserData(page)

      await clickCheckboxAndGoToPayment(page)

      await payment.testCardDataOfRobokassaPaste()

      await payment.successPurchase()

      await support.waitSelector('.success-page__title')

      await payment.checkSuccessPurchase(textOfSuccessPurchaseOfCert)
    })

    test("Positive electronic certificate for the service", async ({ page }) => {
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
  })