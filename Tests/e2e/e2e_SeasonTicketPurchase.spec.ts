import {test } from '@playwright/test'
import { baseAuth, checkPagesContent } from '../../Helpers/BasicCheckHelpers'
import {Payment} from '../../Helpers/TestCardDataAndPaymantData'
import { Support } from '../../Helpers/SupportHelpers'
import {phoneWithout7and8} from '../../Helpers/UserData'
import { SeasonTicket,hoursOfSeasonTicket } from '../../Helpers/SeasonTicketPurchaseHelper'

test.describe.parallel('Season Ticket Positive Scenario',() => {
  let payment:Payment
  let support:Support
  let seasonTicket:SeasonTicket

  for (const hour of hoursOfSeasonTicket){
    test("Season Ticket " +hour+ " Hours Purchase", async ({page})=> {
      payment = new Payment(page)
      support = new Support(page)
      seasonTicket = new SeasonTicket(page)

      await baseAuth(page)

      await seasonTicket.pageOpening()

      await checkPagesContent(page, 'Абонементы')

      await seasonTicket.selectHours(hour)

      await seasonTicket.fillData()

      await seasonTicket.goToPayment()

      await payment.testCardDataOfRobokassaPaste()
      await payment.successPurchase()
      await support.waitSelector('.success-page__title')
      await payment.checkSuccessPurchase(' Абонемент успешно пополнен на '+hour+' ч и привязан к номеру телефона +7'+ phoneWithout7and8)
    })
  }
})

