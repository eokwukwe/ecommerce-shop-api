import '@babel/polyfill';
import request from 'supertest';

import app, { server } from '../..';

describe('customer controller', () => {
  afterAll(async done => {
    await server.close();
    done();
  });

  describe('create', () => {
    it('should return 400 error if user register with invalid email', async () => {
      const response = await request(app)
        .post('/api/v1/customers')
        .send({ name: 'test', email: 'test.com', password: 'password' });
      expect(response.statusCode).toBe(400);
    });
    it('should create a new user with valid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/customers')
        .send({ name: 'test', email: 'test@test.com', password: 'password' });
      expect(response.statusCode).toBe(200);
    });
    it('should return 400 error if a user registers with an email that already exists in the customer table', async () => {
      const response = await request(app)
        .post('/api/v1/customers')
        .send({ name: 'test', email: 'test@test.com', password: 'password' });
      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe('The email already exists.')
    });
  });
});
