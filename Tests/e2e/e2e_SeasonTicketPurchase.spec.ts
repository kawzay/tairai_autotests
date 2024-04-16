import {test } from '@playwright/test'
import { baseAuth, checkPagesContent } from '../../Helpers/BasicCheckHelpers'
import {Payment} from '../../Helpers/TestCardDataAndPaymantData'
import { Support } from '../../Helpers/SupportHelpers'
import {Data} from '../../Helpers/ChangingData'
import { SeasonTicket} from '../../Helpers/SeasonTicketPurchaseHelper'

test.describe.parallel('Season Ticket Positive Scenario',() => {
  let payment:Payment
  let support:Support
  let seasonTicket:SeasonTicket
  let data:Data

  data = new Data()

  for (const hour of data.hoursOfSeasonTicket){
    test("Season Ticket " +hour+ " Hours Purchase", async ({page})=> {
      payment = new Payment(page)
      support = new Support(page)
      seasonTicket = new SeasonTicket(page)

      await baseAuth(page)

      await seasonTicket.pageOpening()

      await checkPagesContent(page, 'Абонементы')

      await seasonTicket.selectHours(hour, data.hoursOfSeasonTicket[hour])

      await seasonTicket.fillData(data.name, data.phoneWithout7and8, data.email)

      await seasonTicket.goToPayment()

      await payment.testCardDataOfRobokassaPaste()
      await payment.typeOfPurchase(payment.successPayment)
      await support.waitSelector('.success-page__title')
      await payment.checkSuccessPurchase(' Абонемент успешно пополнен на '+hour+' ч и привязан к номеру телефона +7'+ data.phoneWithout7and8)
    })
  }
})
