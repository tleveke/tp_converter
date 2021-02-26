const request = require('supertest')
const app = require('../app')
const db = require('../models');
const PayloadConverter = require('../converter/PayloadConverter');

const cleanDb = require('./helpers/cleanDb')
require('./factories/company').factory;
require('./factories/account').factory;
require('./factories/booking').factory;

const factory = require('factory-girl').factory

const payloadGlobal = {
                        attendees: [{
                            displayName: 'Nick Stock',
                            email: 'client@client.com',
                            organizer: true,
                            response_status: 'accepted'
                        },
                            {
                                displayName: 'Nicholas Stock',
                                email: 'not_client@client.com',
                                response_status: 'accepted',
                                self: true
                            }
                        ],
                        end: { date_time: '2018-03-05T18:30:00.000+01:00' },
                        html_link: 'https://www.google.com/calendar/event?eid=MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ',
                        id: '0jmv2ud9c1j7ci2g1jgmrmf6ss',
                        start: { date_time: '2018-03-05T12:30:00.000+01:00' },
                        status: 'confirmed',
                        summary: 'summary'
                    }

beforeAll(async () => {
    //await cleanDb(db)
});

afterAll(async () => {
    //await cleanDb(db)
    //await db.close()
});

describe('GET /', () => {
    let response;

    beforeEach(async () => {
        response = await request(app).get('/');
    })

    test('It should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200);
    });
});

describe('Payload Converter', () => {
    let payload = payloadGlobal;
    let payloadConvert;

    beforeEach(async () => {
        //await cleanDb(db)
        await factory.createMany('Bookings', 2);

        /*
        let Account = await factory.createMany('Accounts', 5)*/
        company = await factory.createMany('Companies', 5)
        let compagnies = await db.Company.findAll();


        for (let i = 0 ; i<5;i++) {
            rnd = Math.floor(Math.random() * compagnies.length);
            await factory.create('Accounts', {CompanyId: compagnies[rnd].id});
        }

        /*await db.Account.create({
            name: 'CompanyId',
            CompanyId: 1,
        });*/




        payloadConvert = new PayloadConverter(payload);
    })

    test('Expect idGoogle = MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ', async () => {
        expect(payloadConvert.getIdGoogle()).toBe('MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ');
    });
    test(`Expect Date and startDate = ${payload.start.date_time}`, async () => {
        expect(payloadConvert.onStart() instanceof Date).toBe(true);
        expect(payloadConvert.onStart().getTime()).toBe(new Date(payload.start.date_time).getTime());
    });
    test(`Expect Date and endDate = ${payload.end.date_time}`, async () => {
        expect(payloadConvert.onEnd() instanceof Date).toBe(true);
        expect(payloadConvert.onEnd().getTime()).toBe(new Date(payload.end.date_time).getTime());
    });
});
