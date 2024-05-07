import {test, expect,Page} from '@playwright/test'
import { baseAuth, putBaseAuth } from '../../Helpers/BasicCheckHelpers'
import {OnlineRecording} from '../../Helpers/RecordingHelpers'
import {Data} from '../../Helpers/ChangingData'
import {Support} from '../../Helpers/SupportHelpers'
import { Payment } from '../../Helpers/TestCardDataAndPaymantData'
import {SeasonTicket} from '../../Helpers/SeasonTicketPurchaseHelper'
import {CertificatePage} from '../../Helpers/CertificatePurchaseHelpers'
import { exec } from 'child_process';
import { resolve } from 'path'
import { promisify } from 'util';
import { readFileSync } from 'fs';
import { join } from 'path';


const execAsync = promisify(exec);
async function runPythonScript() {
  const pathToScript = resolve(__dirname, '../../Helpers/GoogleAPI.py');
  try {
    const { stdout, stderr } = await execAsync(`python3 `+ pathToScript);
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
}

async function loadCertificateData() {
  const pathToFile = join(__dirname, '../../Helpers/certificate_data.json'); // Указываем путь к файлу
  const fileContents = readFileSync(pathToFile, 'utf8'); // Читаем содержимое файла
  return JSON.parse(fileContents); // Преобразуем JSON строку в объект
}

const roomData = [
  { name: 'differentRoom', roomNumber: 1, checkName: ' Отдельная комната каждому ' },
  { name: 'oneRoom', roomNumber: 2, checkName: ' Комната для двоих ' },
  { name: 'anyRoom', roomNumber: 3, checkName: ' Любая комната ' }
];

let onlineRecording:OnlineRecording
let data:Data
let payment: Payment
let support: Support
let seasonTicket:SeasonTicket
let certificatePage: CertificatePage
data = new Data()

async function selectService(numberOfService:number){
  await onlineRecording.selectService(numberOfService)
}

async function selectMaster(numberOfMaster:number){
  if(numberOfMaster < 1 ){
    await onlineRecording.dontSelectMaster()
  }
  else {
    await onlineRecording.selectMaster(numberOfMaster)
  }
}

async function selectTypeOfPayment(type:string){
  if(type === 'cash' ){
    await onlineRecording.selectCashPaymentMethod()
  }
  else if (type === 'seasonTicket') {
    await onlineRecording.selectSeasonTicketPaymentMethod()
  }
  else if (type === 'certificate'){
    const certificateData = await loadCertificateData();
    await onlineRecording.selectCertificatePaymentMethod(certificateData.number,certificateData.code)
  }
}

async function selectTimeAndInputData(){
  await onlineRecording.selectNearestDateAndTime()
  await onlineRecording.inputPersonalData(data.name,data.phoneWithout7and8)
  await support.waitSelector('.checkin-page-payment__container')
}



test.beforeEach(async ({ page }) => {
  support = new Support(page)
  onlineRecording = new OnlineRecording(page)
  payment = new Payment(page)
  seasonTicket = new SeasonTicket(page)
  certificatePage = new CertificatePage(page)
  data= new Data()

  await baseAuth(page)
  await onlineRecording.open()
  await onlineRecording.hasText('Онлайн запись')
})
test.describe('Online Recording For One Person',() => {
  test("Online Recording With 1 Service Without Select Master", async ({page})=> {

    await onlineRecording.selectSalon(2)

    await selectService(1)

    await onlineRecording.checkPrice(data.priceOf1HourOilMassage)

    await onlineRecording.goToNextStepAndCheckCountOfService(1)

    await selectMaster(0)

    await selectTimeAndInputData()

    await selectTypeOfPayment(payment.cash)

    await onlineRecording.finalRecordingAndCheck()
  })

  test("Online Recording With 2 Service", async ({page})=> {
    await onlineRecording.selectSalon(2)

    await selectService(1)
    await selectService(2)

    await onlineRecording.goToNextStepAndCheckCountOfService(2)

    await selectMaster(0)

    await selectTimeAndInputData()

    await selectTypeOfPayment(payment.cash)

    await onlineRecording.finalRecordingAndCheck()
  })

  test("Online Recording With 3 Service", async ({page})=> {
    await onlineRecording.selectSalon(2)

    await selectService(1)
    await selectService(2)
    await selectService(3)

    await onlineRecording.goToNextStepAndCheckCountOfService(3)

    await selectMaster(0)

    await selectTimeAndInputData()

    await selectTypeOfPayment(payment.cash)

    await onlineRecording.finalRecordingAndCheck()
  })

  test("Online Recording With 4 Service And 4 Hours", async ({page})=> {
    await onlineRecording.selectSalon(2)

    await selectService(1)
    await selectService(2)
    await selectService(3)
    await selectService(4)

    await onlineRecording.error4Hours()
  })

  test("Online Recording With 4 Hours Error And Continue", async ({page})=> {
    await onlineRecording.selectSalon(2)

    await selectService(1)
    await selectService(2)
    await selectService(3)
    await selectService(4)

    await onlineRecording.error4Hours()

    await onlineRecording.goToNextStepAndCheckCountOfService(3)

    await selectMaster(0)

    await selectTimeAndInputData()

    await selectTypeOfPayment(payment.cash)

    await onlineRecording.finalRecordingAndCheck()
  })

  test("Online Recording With Change Time For 1.5 Hours", async ({page})=> {
    await onlineRecording.selectSalon(2)

    await onlineRecording.changeTimeOfService(2)

    await onlineRecording.checkPrice(data.priceOf1_5HourOilMassage)

    await selectService(1)

    await onlineRecording.goToNextStepAndCheckCountOfService(1)

    await selectMaster(0)

    await selectTimeAndInputData()

    await selectTypeOfPayment(payment.cash)

    await onlineRecording.finalRecordingAndCheck()
  })

  test("Online Recording With Change Time For 2 Hours", async ({page})=> {
    await onlineRecording.selectSalon(2)

    await onlineRecording.changeTimeOfService(3)

    await onlineRecording.checkPrice(data.priceOf2HourOilMassage)

    await selectService(1)

    await onlineRecording.goToNextStepAndCheckCountOfService(1)

    await selectMaster(0)

    await selectTimeAndInputData()

    await selectTypeOfPayment(payment.cash)

    await onlineRecording.finalRecordingAndCheck()
  })

  test.skip("Online Recording With 1 Service With Select Master", async ({page})=> {
    await onlineRecording.selectSalon(2)

    await selectService(1)

    await onlineRecording.checkPrice(data.priceOf1HourOilMassage)

    await onlineRecording.goToNextStepAndCheckCountOfService(1)

    await selectMaster(1)

    await selectTimeAndInputData()

    await selectTypeOfPayment(payment.cash)

    await onlineRecording.finalRecordingAndCheck()
  })
})


  test.describe('Online Recording For Two Person',() => {
    roomData.forEach(room =>{
    test("Online Recording With 1 Service In "+room.name, async ({page})=> {
      await onlineRecording.selectSalon(2)

      await onlineRecording.twoPersonVisit()

      await selectService(2)

      await onlineRecording.serviceListForSecondPerson()

      await selectService(3)

      await onlineRecording.goToNextStepAndCheckCountOfService(2)

      await onlineRecording.selectRoom(room.roomNumber, room.checkName)

      await selectTimeAndInputData()

      await selectTypeOfPayment(payment.cash)

      await onlineRecording.finalRecordingAndCheck()
    })

      test("Online Recording 3 hours spa-program "+room.name, async ({page})=> {
        await onlineRecording.selectSalon(2)

        await selectService(18)

        await onlineRecording.goToNextStepAndCheckCountOfService(2)

        await onlineRecording.selectRoom(room.roomNumber, room.checkName)

        await selectTimeAndInputData()

        await selectTypeOfPayment(payment.cash)

        await onlineRecording.finalRecordingAndCheck()
      })
})
})

async function stepsOfSelectService() {
  await onlineRecording.selectSalon(3)
  await selectService(1)
  await onlineRecording.checkPrice(data.priceOf1HourOilMassage)
  await onlineRecording.goToNextStepAndCheckCountOfService(1)
  await selectMaster(0)
  await selectTimeAndInputData()
}
test.describe('Online Recording Different Payment Type',() => {
  test("Online Recording With Cash", async ({page})=> {
    await onlineRecording.selectSalon(2)
    await selectService(1)
    await onlineRecording.checkPrice(data.priceOf1HourOilMassage)
    await onlineRecording.goToNextStepAndCheckCountOfService(1)
    await selectMaster(0)
    await selectTimeAndInputData()
    await selectTypeOfPayment(payment.cash)
    await onlineRecording.finalRecordingAndCheck()
  })

  test("Online Recording With SeasonTicket", async ({page})=> {
    await seasonTicket.pageOpening()
    await seasonTicket.selectHours(3,3)
    await seasonTicket.fillData(data.name, data.phoneWithout7and8, data.email)
    await seasonTicket.goToPayment()
    await payment.testCardDataOfRobokassaPaste()
    await payment.typeOfPurchase(payment.successPayment)
    await putBaseAuth(page)
    await support.waitSelector('.success-page__title')

    await onlineRecording.open()
    await support.timeout(2000)
    await stepsOfSelectService()
    await onlineRecording.finalRecordingAndCheck()
  })

  test("Online Recording With Certificate", async ({page})=> {
    await certificatePage.open()
    await support.waitSelector('.cart__order-types')
    await certificatePage.selectCertificateType(data.electronicCertificateTypeSelect);
    await certificatePage.selectCertificateVariation(data.onServiceCertificateSelect);
    await certificatePage.chooseService(data.numberOfService)
    await certificatePage.submitCertificateButton()
    await certificatePage.checkPrice(data.priceOfService)
    await certificatePage.enteringUserData(data.name, data.email, data.phoneWithout7and8);
    await certificatePage.clickCheckboxAndGoToPayment();
    await payment.testCardDataOfRobokassaPaste();
    await payment.typeOfPurchase(payment.successPayment);
    await putBaseAuth(page)
    await support.waitSelector('.success-page__title');
    await payment.checkSuccessPurchase(data.textOfSuccessPurchaseOfCert);

    await runPythonScript()
    await onlineRecording.open()
    await support.waitSelector('#salon')
    await stepsOfSelectService()
    await selectTypeOfPayment(payment.certificate)
    await onlineRecording.finalRecordingAndCheck()
  })

})

