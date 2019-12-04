import '@babel/polyfill';
import request from 'supertest';

import app, { server } from '../..';
import Authentication from '../../middlewares/authentication';

const baseUrl = '/api/v1/categories';

describe('category controller', () => {
  afterAll(async done => {
    await server.close();
    done();
  });

  describe('Create a new category', () => {
    const adminToken = `Bearer ${Authentication.generateToken(1)}`;
    const token = `Bearer ${Authentication.generateToken(2)}`;
    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({
          name: 'category',
          description: 'a new category',
          department_id: 2,
        });
      expect(response.statusCode).toBe(401);
    });
    it('should return 401 if user is not an admin', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: token })
        .send({
          name: 'category',
          description: 'a new category',
          department_id: 2,
        });
      expect(response.statusCode).toBe(401);
    });
    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'category', description: 'a new category', department_id: '2' });
      expect(response.statusCode).toBe(400);
    });
    it('should return 404 if department is not found', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'category', description: 'a new category', department_id: 100 });
      expect(response.statusCode).toBe(404);
    });
    it('should return 201 for successfully creating a new department', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'category', description: 'a new category', department_id: 2 });
      expect(response.statusCode).toBe(201);
    });
    it('should return 400 for trying to create a new department that already exists', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'category', description: 'a new category', department_id: 2 });
      expect(response.statusCode).toBe(400);
    });
  });
});
