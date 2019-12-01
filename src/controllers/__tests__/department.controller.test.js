import '@babel/polyfill';
import request from 'supertest';

import app, { server } from '../..';
import Authentication from '../../middlewares/authentication';

const baseUrl = '/api/v1/departments';

describe('department controller', () => {
  afterAll(async done => {
    await server.close();
    done();
  });

  describe('Create new department', () => {
    const adminToken = `Bearer ${Authentication.generateToken(1)}`;
    const token = `Bearer ${Authentication.generateToken(2)}`;
    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .post(baseUrl)
        .send({ name: 'department', description: 'a new department' });
      expect(response.statusCode).toBe(401);
    });
    it('should return 401 if user is not an admin', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: token })
        .send({ name: 'department', description: 'a new department' });
      expect(response.statusCode).toBe(401);
    });
    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: '', description: 'a new department' });
      expect(response.statusCode).toBe(400);
    });
    it('should return 201 for successfully creating a new department', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'new department', description: 'a new department' });
      expect(response.statusCode).toBe(201);
    });
    it('should return 400 for trying to create a new department that already exists', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({ name: 'new department', description: 'a new department' });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('Get departments', () => {
    it('should return 200 for successful departments fetch', async () => {
      const response = await request(app).get(baseUrl);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Get department by ID', () => {
    it('should return 400 if the ID is not a number', async () => {
      const response = await request(app).get(`${baseUrl}/ab`);
      expect(response.statusCode).toBe(400);
    });
    it('should return 404 if the department does not exist', async () => {
      const response = await request(app).get(`${baseUrl}/10`);
      expect(response.statusCode).toBe(404);
    });
    it('should return 200 if the department exists', async () => {
      const response = await request(app).get(`${baseUrl}/1`);
      expect(response.statusCode).toBe(200);
    });
  });
});
