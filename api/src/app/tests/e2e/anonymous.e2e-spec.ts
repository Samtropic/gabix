import request  from 'supertest';
import app from '../../app';
import { expertizes } from '../fixtures/anonymous';

describe('anonymous routes', () => {
  it('should get a list of expertizes', async () => {
    const res = await request(app)
      .get('/anonymous/expertizes');
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.arrayContaining(expertizes))
  })
})