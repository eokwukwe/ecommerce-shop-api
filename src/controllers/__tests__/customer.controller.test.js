import '@babel/polyfill';
import request from 'supertest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import app, { server } from '../..';
import Authentication from '../../middlewares/authentication';

const mock = new MockAdapter(axios);
const baseUrl = '/api/v1/customers';

describe('customer controller', () => {
  afterAll(async done => {
    await server.close();
    done();
  });

  describe('CRUD', () => {
    let token;
    it('should return 400 error if user register with invalid email', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ name: 'test', email: 'test.com', password: 'password' });
      expect(response.statusCode).toBe(400);
    });
    it('should create a new user with valid credentials', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ name: 'test', email: 'test@test.com', password: 'password' });
      expect(response.statusCode).toBe(201);
    });
    it('should return 400 error if a user registers with an email that already exists in the customer table', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ name: 'test', email: 'test@test.com', password: 'password' });
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe('The email already exists.');
    });
    it('should return 400 error if user login with invalid credentials', async () => {
      const response = await request(app)
        .post(`${baseUrl}/login`)
        .send({ email: 'test.com', password: 'password' });
      expect(response.statusCode).toBe(400);
    });
    it('should login a user with valid credentials', async () => {
      const response = await request(app)
        .post(`${baseUrl}/login`)
        .send({ email: 'test@test.com', password: 'password' });
      token = response.body.accessToken;
      expect(response.statusCode).toBe(200);
    });
    it('should return a status of 401 if user makes request without access_token', async () => {
      const addressUpdate = {
        address_1: '12 sango road',
        city: 'Yaba',
        region: 'Europe',
        postal_code: '112340',
        country: 'Itay',
        shipping_region_id: 1,
      };
      const response = await request(app)
        .put(`${baseUrl}/address`)
        .send(addressUpdate);
      expect(response.statusCode).toBe(401);
    });
    it('should return a status of 400 if user omits a required field', async () => {
      const addressUpdate = {
        address_1: '1sango road',
        city: 'Yaba',
        region: 'Europe',
        postal_code: '112340',
        country: '',
        shipping_region_id: 1,
      };
      const response = await request(app)
        .put(`${baseUrl}/address`)
        .set({ USER_KEY: token })
        .send(addressUpdate);
      expect(response.statusCode).toBe(400);
    });
    it('should return a status of 404 if user does not exist', async () => {
      const addressUpdate = {
        address_1: '1sango road',
        city: 'Yaba',
        region: 'Europe',
        postal_code: '112340',
        country: '',
        shipping_region_id: 1,
      };
      const response = await request(app)
        .put(`${baseUrl}/address`)
        .set({ USER_KEY: `Bearer ${Authentication.generateToken(100)}` })
        .send(addressUpdate);
      expect(response.statusCode).toBe(404);
    });
    it('should return a status of 404 if shipping region is not found', async () => {
      const addressUpdate = {
        address_1: '1sango road',
        city: 'Yaba',
        region: 'Europe',
        postal_code: '112340',
        country: 'country',
        shipping_region_id: 10,
      };
      const response = await request(app)
        .put(`${baseUrl}/address`)
        .set({ USER_KEY: token })
        .send(addressUpdate);
      expect(response.statusCode).toBe(404);
    });
    it('should return a status of 200 for a successful address update', async () => {
      const addressUpdate = {
        address_1: '12 sango road',
        city: 'Yaba',
        region: 'Europe',
        postal_code: '112340',
        country: 'Spain',
        shipping_region_id: 1,
      };
      const response = await request(app)
        .put(`${baseUrl}/address`)
        .set({ USER_KEY: token })
        .send(addressUpdate);

        expect(response.statusCode).toBe(200);
    });
    it('should return a status of 400 if user omits a required field', async () => {
      const profile = {
        name: '',
        email: 'test@test.com',
        day_phone: '+351323213511235',
        eve_phone: '+452436143246123',
        mob_phone: '+351323213511235',
      };
      const response = await request(app)
        .put(`${baseUrl}/profile`)
        .set({ USER_KEY: token })
        .send(profile);
      expect(response.statusCode).toBe(400);
    });
    it('should return a status of 200 for a successful profile update', async () => {
      const profile = {
        name: 'john doe',
        email: 'test@test.com',
        day_phone: '+351323213511235',
        eve_phone: '+452436143246123',
        mob_phone: '+351323213511235',
      };
      const response = await request(app)
        .put(`${baseUrl}/profile`)
        .set({ USER_KEY: token })
        .send(profile);
      expect(response.statusCode).toBe(200);
    });
    it('should return a status of 200 for a successful profile data fetch', async () => {
      const response = await request(app)
        .get(baseUrl)
        .set({ USER_KEY: token });
      expect(response.statusCode).toBe(200);
    });
    it('should return a status of 400 if user omits a required field', async () => {
      const response = await request(app)
        .put(`${baseUrl}/creditCard`)
        .set({ USER_KEY: token })
        .send({ credit_card: '' });
      expect(response.statusCode).toBe(400);
    });
    it('should return a status of 200 for a successful creditCard update', async () => {
      const response = await request(app)
        .put(`${baseUrl}/creditCard`)
        .set({ USER_KEY: token })
        .send({ credit_card: '1215251211144' });
      expect(response.statusCode).toBe(200);
    });
    it('should return a status of 400 for a facebook login without access code', async () => {
      mock
        .onGet('https://graph.facebook.com/me?fields=name,email&access_token=ecommercesssss')
        .reply(200, {
          email: 'test@test1.com',
          name: 'John doe',
        });
      const response = await request(app).post(`${baseUrl}/facebook`);
      expect(response.statusCode).toBe(400);
    });
    it('should return a status of 200 for a successful facebook login', async () => {
      mock
        .onGet('https://graph.facebook.com/me?fields=name,email&access_token=ecommerce')
        .reply(200, {
          email: 'test@test419.com',
          name: 'John doe',
        });
      const response = await request(app)
        .post(`${baseUrl}/facebook`)
        .send({ access_token: 'ecommerce' });
      expect(response.statusCode).toBe(200);
    });
  });
});
