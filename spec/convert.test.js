const request = require('supertest')
const app = require('../app')
const db = require('../models');
const PayloadConverter = require('../converter/PayloadConverter');

const cleanDb = require('./helpers/cleanDb')
require('./factories/company').factory;
require('./factories/account').factory;
require('./factories/booking').factory;
require('./factories/user').factory;

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
                            },
                            {
                                displayName: 'John Stock',
                                email: 'John@client.com',
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
    await cleanDb(db)
});

afterAll(async () => {
    // await cleanDb(db)
    // await db.close()
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
        await cleanDb(db)

        await factory.create('Companies', {name:"Gembani"} );
        await factory.create('Companies', {name:"Company 2"} );

        const compagnies = await db.Company.findAll();
// await factory.createMany('Users', 20)

        for (let i = 0 ; i<5;i++) {
            rndCompagnies = Math.floor(Math.random() * compagnies.length);
            await factory.create('Users', { CompanyId: compagnies[rndCompagnies].id });
        }

        const companyUser = await db.Company.findOne({
            where: {
                name: 'Gembani'
            }
        });
        await factory.create('Users', { email: 'John@client.com', name: 'John Stock', CompanyId: companyUser.id});

        const companyAccount = await db.Company.findOne({
            where: {
                name: 'Company 2'
            }
        });
        await factory.create('Accounts', { CompanyId: companyAccount.id });

        /*for (let i = 0 ; i<5;i++) {
            rndCompagnies = Math.floor(Math.random() * compagnies.length);
            await factory.create('Accounts', { CompanyId: compagnies[rndCompagnies].id });
        }*/

        const accounts = await db.Account.findAll();
        for (let i = 0 ; i<5;i++) {
            rndAccounts = Math.floor(Math.random() * accounts.length);
            rndAccountsClient = Math.floor(Math.random() * accounts.length);
            await factory.create('Bookings', {ClientId: accounts[rndAccountsClient].id, EmployeeId: accounts[rndAccounts].id});
        }

        payloadConvert = new PayloadConverter(payload);
    })

    test('Expect idGoogle = MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ', async () => {
        expect(payloadConvert.getIdGoogle()).toBe('MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ');
    });
    test('Expect Organizator', async () => {
        expect(payloadConvert.getOrganizater().length).toBe(1);
        expect(payloadConvert.getOrganizater()[0].displayName).toBe('Nick Stock');
    });
    test(`Expect Date and startDate = ${payload.start.date_time}`, async () => {
        expect(payloadConvert.onStart() instanceof Date).toBe(true);
        expect(payloadConvert.onStart().getTime()).toBe(new Date(payload.start.date_time).getTime());
    });
    test(`Expect Date and endDate = ${payload.end.date_time}`, async () => {
        expect(payloadConvert.onEnd() instanceof Date).toBe(true);
        expect(payloadConvert.onEnd().getTime()).toBe(new Date(payload.end.date_time).getTime());
    });

    test(`Expect getClientsId`, async () => {
        const clientsId = await payloadConvert.getClientsId();
        console.log(clientsId);
        expect(!clientsId.some(isNaN)).toBe(true);
    });
});

describe('Payload Converter BDD', () => {
    let payload = payloadGlobal;
    let payloadConvert;

    beforeEach(async () => {
        payloadConvert = new PayloadConverter(payload);
    });
    test('Create Bookings with Payloads', async () => {

        const compagnies = await db.Company.findAll();
        rndCompagnies = Math.floor(Math.random() * compagnies.length);

        //const clients = payloadConvert.getClients();

        const organizater = payloadConvert.getOrganizater()[0];

        const idGoogle = payloadConvert.getIdGoogle();

        const onStart = payloadConvert.onStart();
        const onEnd = payloadConvert.onEnd();
        //const clientsId = await payloadConvert.getClientsId();

        //console.log(clientsId,"dsqqdsqdsdqsqsdqdsqdsqdsqsdqdsqdsqds");


        employee = await payloadConvert.createOrganizator(organizater, compagnies[rndCompagnies]);
        /*clientsId.forEach(async (idClient) => {
            await factory.create('Bookings', {idGoogle : idGoogle, startDate : onStart, endDate: onEnd,ClientId: idClient,
                EmployeeId : employee.id});
        });*/
        await factory.create('Bookings', {idGoogle : idGoogle, startDate : onStart, endDate: onEnd,
            EmployeeId : employee.id});
        expect(payloadConvert.getIdGoogle()).toBe('MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ');
    });
})