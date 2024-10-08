
export class Data{
  name:string = 'Daniil'
  email:string = 'kawzay@gmail.com'
  phoneWithout7and8:string = '9126568079'

  electronicCertificateTypeSelect:number = 0
  onSumCertificateSelect:string = 'На сумму'
  inputSum:string = '5000'

  proposedSum:number = 1 // 1-6000 2-8000 3-10000 4-12000
  proposedValue:string = '6000'

  onServiceCertificateSelect:string = 'На услугу'
  numberOfService:number = 1
  priceOfService:string = '4490'

  textOfSuccessPurchaseOfCert:string = ' Спасибо, оплата прошла успешно! '


  hoursOfSeasonTicket:number[] = [3,5,9]

  priceOf1HourOilMassage = '4490'
  priceOf1_5HourOilMassage = '6290'
  priceOf2HourOilMassage = '7990'
}