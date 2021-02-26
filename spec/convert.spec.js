const request = require('supertest')
const app = require('../app')
const db = require('../models');
/*
const cleanDb = require('./helpers/cleanDb')
require('./factories/author').factory;
require('./factories/post').factory;
*/
const factory = require('factory-girl').factory

beforeAll(async () => {
    await cleanDb(db)
});

afterAll(async () => {
    await cleanDb(db)
    await db.close()
});

describe('GET /', () => {
    let response;

    beforeEach(async () => {
        await cleanDb(db)
        response = await request(app).get('/');
    })

    test('It should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200);
    });
});

describe('Payload Converter', () => {
    let response;
/*
    beforeEach(async () => {
        await cleanDb(db)
        response = await request(app).get('/');
    })
*/
    test('It should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200);
    });
});