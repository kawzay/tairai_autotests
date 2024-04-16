import { test, expect, Page } from '@playwright/test'
import { baseAuth } from '../../Helpers/BasicCheckHelpers'
import {Payment} from '../../Helpers/TestCardDataAndPaymantData'
import {Support} from '../../Helpers/SupportHelpers'
import {CertificatePage} from '../../Helpers/CertificatePurchaseHelpers'
import {Data} from '../../Helpers/ChangingData'


test.describe.parallel('Certificate Purchase', () => {
    let payment: Payment
    let support: Support
    let certificatePage: CertificatePage
    let data: Data


    async function prepareCertificatePage(page:Page, certificateType, certificateVariation) {
      await certificatePage.selectCertificateType(certificateType);
      await certificatePage.selectCertificateVariation(certificateVariation);
    }

    async function finalizePurchase(page, data) {
      await certificatePage.enteringUserData(data.name, data.email, data.phoneWithout7and8);
      await certificatePage.clickCheckboxAndGoToPayment();
      await payment.testCardDataOfRobokassaPaste();
      await payment.typeOfPurchase(payment.successPayment);
      await support.waitSelector('.success-page__title');
      await payment.checkSuccessPurchase(data.textOfSuccessPurchaseOfCert);
    }

  test.beforeEach(async ({ page }) => {
    payment = new Payment(page)
    support = new Support(page)
    certificatePage = new CertificatePage(page)
    data = new Data()

    await baseAuth(page)

    await support.doNotChooseAnotherCity()

    await certificatePage.open()
  })

  test.afterEach(async ({ page }) =>{
    await finalizePurchase(page,data)
  })

    test("Certificate page opening check", async ({ page }) => {
      await certificatePage.hasText('Корзина')
    })

    test("Positive electronic certificate for the amount to be entered", async ({ page }) => {
      await support.waitSelector('.cart__order-types')

      await prepareCertificatePage(page,data.electronicCertificateTypeSelect,data.onSumCertificateSelect)

      await certificatePage.inputSumOfPhysicalCertificate(data.inputSum)

      await certificatePage.submitCertificateButton()

      await certificatePage.checkPrice(data.inputSum)
    })

    test("Positive electronic certificate for the proposed amount", async ({ page }) => {
      await support.waitSelector('.cart__order-types')

      await prepareCertificatePage(page,data.electronicCertificateTypeSelect,data.onSumCertificateSelect)

      await certificatePage.chooseProposedSum(data.proposedSum) // 1-6000 2-8000 3-10000 4-12000

      await certificatePage.submitCertificateButton()

      await certificatePage.checkPrice(data.proposedValue) // look at chooseProposedSum
    })

    test("Positive electronic certificate for the service", async ({ page }) => {
      await support.waitSelector('.cart__order-types')

      await prepareCertificatePage(page,data.electronicCertificateTypeSelect,data.onServiceCertificateSelect)

      await certificatePage.chooseService(data.numberOfService)

      await certificatePage.submitCertificateButton()

      await certificatePage.checkPrice(data.priceOfService) // look at chooseProposeService
    })
  })
