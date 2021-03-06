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

  describe('Get all categories', () => {
    it('should return 200 for successful categories fetch', async () => {
      const response = await request(app).get(baseUrl);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Get category by ID', () => {
    it('should return 400 if the ID is not a number', async () => {
      const response = await request(app).get(`${baseUrl}/ab`);
      expect(response.statusCode).toBe(400);
    });
    it('should return 404 if the category does not exist', async () => {
      const response = await request(app).get(`${baseUrl}/100`);
      expect(response.statusCode).toBe(404);
    });
    it('should return 200 if the category exists', async () => {
      const response = await request(app).get(`${baseUrl}/1`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Get product categories by ID', () => {
    it('should return 400 if the ID is not a number', async () => {
      const response = await request(app).get(`${baseUrl}/inProduct/ab`);
      expect(response.statusCode).toBe(400);
    });
    it('should return 404 if the product does not exist', async () => {
      const response = await request(app).get(`${baseUrl}/inProduct/1000`);
      expect(response.statusCode).toBe(404);
    });
    it('should return 200 with an array of product categories', async () => {
      const response = await request(app).get(`${baseUrl}/inProduct/1`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Get department categories by ID', () => {
    it('should return 400 if the ID is not a number', async () => {
      const response = await request(app).get(`${baseUrl}/inDepartment/ab`);
      expect(response.statusCode).toBe(400);
    });
    it('should return 404 if the department does not exist', async () => {
      const response = await request(app).get(`${baseUrl}/inDepartment/1000`);
      expect(response.statusCode).toBe(404);
    });
    it('should return 200 with an array of department categories', async () => {
      const response = await request(app).get(`${baseUrl}/inDepartment/1`);
      expect(response.statusCode).toBe(200);
    });
  });
});
