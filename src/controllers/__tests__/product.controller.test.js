import '@babel/polyfill';
import request from 'supertest';

import app, { server } from '../..';
import Authentication from '../../middlewares/authentication';

const baseUrl = '/api/v1/products';

describe('product controller', () => {
  afterAll(async done => {
    server.close();
    done();
  });

  const adminToken = `Bearer ${Authentication.generateToken(1)}`;
  const token = `Bearer ${Authentication.generateToken(2)}`;

  describe('Create a new product', () => {
    it('should return 401 if no token is provided', async () => {
      const response = await request(app).post(baseUrl);
      expect(response.statusCode).toBe(401);
    });
    it('should return 401 if user is not an admin', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: token });
      expect(response.statusCode).toBe(401);
    });
    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({
          name: '',
          description: '',
          price: '',
          discounted_price: '',
          image: '',
          image_2: '',
          thumbnail: '',
          display: '',
          category_id: '',
          attribute_value_id: '',
        });
      expect(response.statusCode).toBe(400);
    });
    it('should return 400 if product already exits', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({
          name: 'Chartres Cathedral',
          description: 'This is a description',
          price: 10.22,
          discounted_price: 0.0,
          image: 'http://www.image.com',
          image_2: 'http://www.image2.com',
          thumbnail: 'http://www.thumbnail.com',
          display: 2,
          category_id: 1,
          attribute_value_id: 1,
        });
      expect(response.statusCode).toBe(400);
    });
    it('should return 404 if category does not exits', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({
          name: 'Chartres Cathedrall',
          description: 'This is a description',
          price: 10.22,
          discounted_price: 0.0,
          image: 'http://www.image.com',
          image_2: 'http://www.image2.com',
          thumbnail: 'http://www.thumbnail.com',
          display: 2,
          category_id: 1000,
          attribute_value_id: 1,
        });
      expect(response.statusCode).toBe(404);
    });
    it('should return 404 if attribute value does not exits', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({
          name: 'Chartres Cathedrall',
          description: 'This is a description',
          price: 10.22,
          discounted_price: 0.0,
          image: 'http://www.image.com',
          image_2: 'http://www.image2.com',
          thumbnail: 'http://www.thumbnail.com',
          display: 2,
          category_id: 1,
          attribute_value_id: 100,
        });
      expect(response.statusCode).toBe(404);
    });
    it('should return 201 for successfully creating a new product', async () => {
      const response = await request(app)
        .post(baseUrl)
        .set({ USER_KEY: adminToken })
        .send({
          name: 'Chartres Cathedrall',
          description: 'This is a description',
          price: 10.22,
          discounted_price: 0.0,
          image: 'http://www.image.com',
          image_2: 'http://www.image2.com',
          thumbnail: 'http://www.thumbnail.com',
          display: 2,
          category_id: 1,
          attribute_value_id: 1,
        });
      expect(response.statusCode).toBe(201);
    });
  });
});
