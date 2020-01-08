import '@babel/polyfill';
import request from 'supertest';

import app, { server } from '../..';
import Authentication from '../../middlewares/authentication';

const baseUrl = '/api/v1/attributes';

describe('category controller', () => {
  afterAll(async done => {
    await server.close();
    done();
  });

  const adminToken = `Bearer ${Authentication.generateToken(1)}`;
  const token = `Bearer ${Authentication.generateToken(2)}`;

  describe('Create a new attribute', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({
          name: 'category',
        });
      expect(response.statusCode).toBe(401);
    });
    it('should return 401 if user is not an admin', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: token })
        .send({
          name: 'category',
        });
      expect(response.statusCode).toBe(401);
    });
    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: '' });
      expect(response.statusCode).toBe(400);
    });

    it('should return 201 for successfully creating a new attribute', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'width' });
      expect(response.statusCode).toBe(201);
    });
    it('should return 400 for trying to create a new attribute that already exists', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'width' });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('Add attribute values', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .post(`${baseUrl}/1/values`)
        .send({
          value: 'green',
        });
      expect(response.statusCode).toBe(401);
    });
    it('should return 401 if user is not an admin', async () => {
      const response = await request(app)
        .post(`${baseUrl}/1/values`)
        .set({ USER_KEY: token })
        .send({
          value: 'green',
        });
      expect(response.statusCode).toBe(401);
    });
    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post(`${baseUrl}/1/values`)
        .set({ USER_KEY: adminToken })
        .send({ value: '' });
      expect(response.statusCode).toBe(400);
    });
    it('should return 400 for invalid attribute_id', async () => {
      const response = await request(app)
        .post(`${baseUrl}/'1'/values`)
        .set({ USER_KEY: adminToken })
        .send({ value: 'green' });
      expect(response.statusCode).toBe(400);
    });
    it('should return 404 if the attribute does not exist', async () => {
      const response = await request(app)
        .post(`${baseUrl}/10/values`)
        .set({ USER_KEY: adminToken })
        .send({ value: 'green' });
      expect(response.statusCode).toBe(404);
    });
    it('should return 201 for successfully add attribute values to an attribute', async () => {
      const response = await request(app)
        .post(`${baseUrl}/2/values`)
        .set({ USER_KEY: adminToken })
        .send({ value: 'green' });
      expect(response.statusCode).toBe(201);
    });
  });

   describe('Get all categories', () => {
     it('should return 200 for successful attributes fetch', async () => {
       const response = await request(app).get(baseUrl);
       expect(response.statusCode).toBe(200);
     });
   });
});
