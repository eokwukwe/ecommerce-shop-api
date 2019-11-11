import '@babel/polyfill';
import request from 'supertest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import app, { server } from '../..';

const mock = new MockAdapter(axios);
const baseUrl = '/api/v1/customers';

describe('customer controller', () => {
  afterAll(async done => {
    await server.close();
    done();
  });

  describe('create', () => {
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
      expect(response.statusCode).toBe(200);
    });
    it('should return 400 error if a user registers with an email that already exists in the customer table', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ name: 'test', email: 'test@test.com', password: 'password' });
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe('The email already exists.');
    });
    it('should return a status of 400 for a facebook login without access code', async () => {
      mock
        .onGet('https://graph.facebook.com/me?fields=name,email&access_token=ecommerce')
        .reply(200, {
          email: 'test@test1.com',
          name: 'John doe',
        });
      const response = await request(app)
        .post(`${baseUrl}/facebook`);
      expect(response.statusCode).toBe(400);
    });
    it('should return a status of 200 for a successful facebook login', async () => {
      mock
        .onGet('https://graph.facebook.com/me?fields=name,email&access_token=ecommerce')
        .reply(200, {
          email: 'test@test1.com',
          name: 'John doe',
        });
      const response = await request(app)
        .post(`${baseUrl}/facebook`)
        .send({ access_token: 'ecommerce' });
      expect(response.statusCode).toBe(200);
    });
  });
});
