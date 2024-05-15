import {test, expect, BrowserContext} from '@playwright/test';
import {username,password} from '../../Helpers/AuthorizationData'

const apiUsername = process.env.apiUsername
const apiPassword = process.env.apiPassword
let accessToken = '';

const getHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

test.describe.parallel('Tairai API tests 1С',() => {
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

test.describe('Tairai API tests stage',() => {
  const baseUrl = 'https://'+username+':'+password+'@stage-tairai.tairai.com'
  const phoneData = { phone: "+79126568079", verify_code: "0000"};

  test.beforeAll('Tairai API - getToken - login', async ({ request }) => {
    const response = await request.post(baseUrl + '/api/v1/auth/login', {
      headers: getHeaders(''),
      data: JSON.stringify(phoneData)
    })
    const responseText = await response.text();
    const responseBody = JSON.parse(responseText);
    accessToken = responseBody.data.accessToken;
  })

  test('Tairai API - show bonuses', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/bonuses/show', {
      headers: getHeaders(accessToken)
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.bonus).toBe(800)
  })

  test('Tairai API - show client', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/v1/clients/show', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.name).toBe('Даня_тест')
    expect(responseBody.data.uuid).toBe('7681a56d-31be-11ee-a0c0-005056010271')
    expect(responseBody.data.phone).toBe('+79126568079')
    expect(responseBody.data.email).toBe('kawzay@gmail.com')
  })

  test('Tairai API - deliveries', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/deliveries', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)

    expect(responseBody[0]).toHaveProperty('title', 'По Москве до МКАД');
    expect(responseBody[0]).toHaveProperty('price', 350);

    expect(responseBody[1]).toHaveProperty('title', 'За МКАД до 30 км');
    expect(responseBody[1]).toHaveProperty('price', 650);
  })

  test('Tairai API - deliveries MSK time', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/deliveries/8c93969e-a0da-11e6-80cf-005056be1f0b/times', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data[0].id).toBe('5b63b05a-72e0-11ec-8123-005056be1f0b')
    expect(responseBody.data[0].start).toBe('10:00:00')
    expect(responseBody.data[0].end).toBe('15:00:00')

    expect(responseBody.data[1].id).toBe('2ce8a7c9-325b-11eb-8116-005056be1f0b')
    expect(responseBody.data[1].start).toBe('14:00:00')
    expect(responseBody.data[1].end).toBe('18:00:00')

    expect(responseBody.data[2].id).toBe('7306733e-72e0-11ec-8123-005056be1f0b')
    expect(responseBody.data[2].start).toBe('17:00:00')
    expect(responseBody.data[2].end).toBe('21:00:00')
  })

  test('Tairai API - deliveries MKAD time', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/deliveries/a2449421-a0da-11e6-80cf-005056be1f0b/times', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data[0].id).toBe('38f6c331-2c1b-11e7-80dc-005056be1f0b')
    expect(responseBody.data[0].start).toBe('10:00:00')
    expect(responseBody.data[0].end).toBe('18:00:00')

    expect(responseBody.data[1].id).toBe('be266b3a-5c60-11ea-8115-005056be1f0b')
    expect(responseBody.data[1].start).toBe('10:00:00')
    expect(responseBody.data[1].end).toBe('16:00:00')

    expect(responseBody.data[2].id).toBe('fed9504b-fa74-11eb-8118-005056be1f0b')
    expect(responseBody.data[2].start).toBe('16:00:00')
    expect(responseBody.data[2].end).toBe('22:00:00')
  })

  test('Tairai API - first record', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/first-record', {
      headers: getHeaders(accessToken),
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200);
    expect(responseBody.data.images).toBeDefined();
    expect(responseBody.data.images).toBeDefined();
    expect(responseBody.data.images.length).toBeGreaterThan(0);
  })

  test('Tairai API - evaluation', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/v1/evaluation', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);
  })

  test('Tairai API - evaluation request', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/v1/evaluation-request', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);
  })

  test('Tairai API - certificate rules', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/certificate-rules', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);
    expect(responseBody.data).toBeDefined();
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);
  })

  test('Tairai API - season-ticket rules', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/season-ticket-rules', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);
    expect(responseBody.data).toBeDefined();
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);
  })

  test('Tairai API - bonuses rules', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/bonuses-rules', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);
    expect(responseBody.data).toBeDefined();
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);
  })

  test('Tairai API - personal data', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/personal-data', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);
    expect(responseBody.data).toBeDefined();
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(responseBody.data.length).toBeGreaterThan(0);
  })

  test('Tairai API - versions', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/versions', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);

    const appInfo = responseBody.data;
    expect(appInfo).toBeDefined();
    expect(appInfo).toHaveProperty('android');
    expect(appInfo.android).toHaveProperty('link');
    expect(appInfo.android).toHaveProperty('version');
    expect(appInfo).toHaveProperty('ios');
    expect(appInfo.ios).toHaveProperty('link');
    expect(appInfo.ios).toHaveProperty('version');
    expect(appInfo).toHaveProperty('is_checking');
    expect(appInfo).toHaveProperty('is_blocking');
  })

  test('Tairai API - map', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/map', {
      headers: getHeaders(accessToken),
    })

    expect(response.status()).toBe(200);
  })

  test('Tairai API - records', async ({ request}) => {

    const response = await request.get(baseUrl + '/api/v1/records', {
      headers: getHeaders(accessToken),
    })

    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200);
  })
})

