import '@babel/polyfill';
import request from 'supertest';

import app, { server } from '../..';

describe('Welcome route', () => {
  // afterAll(async done => {
  //   await server.close();
  //   done();
  // });
  it('should return 200 for the welcome route', async () => {
    const response = await request(app)
      .get('/api/v1')
    expect(response.statusCode).toBe(200);
  });
});
