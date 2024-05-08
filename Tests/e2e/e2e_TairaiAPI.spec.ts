import {test, expect, BrowserContext} from '@playwright/test';

const apiUsername = process.env.apiUsername
const apiPassword = process.env.apiPassword

test.describe.parallel('Tairai API tests',() => {
    const baseUrl = 'http://'+apiUsername+':'+apiPassword+'@1c-dev.keyseven.su/tr_auto_restore/hs'

  test('Tairai API - GetInfoByPhone', async ({ request}) => {
    const response = await request.get(baseUrl+'/clientsjson/getinfobyphone?phone=89126568079')
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.Type).toBe('Client')
    expect(responseBody.Name).toBe('Даня_тест')
    expect(responseBody.ID).toBe('7681a56d-31be-11ee-a0c0-005056010271')
    expect(responseBody.Phone).toBe('89126568079')
    expect(responseBody.EMail).toBe('kawzay@gmail.com')
    expect(responseBody.Phone).toBe('89126568079')
  })

  test('Tairai API - GetHistoryVisits', async ({ request}) => {
    const response = await request.get(baseUrl+'/clientsjson/gethistoryvisits?clientid=7681a56d-31be-11ee-a0c0-005056010271')
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.Visits).toBeTruthy()
  })
})