import dotenv from 'dotenv';
dotenv.config();
import { beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import { GetTimeType } from '../interfaces';

describe('Unit testing:', () => {
  let mockedReq: request.SuperTest<request.Test>;

  beforeAll(() => {
    mockedReq = request(app);
  });

  describe('Get time:', () => {
    test('Without Authorization', () => {
      return mockedReq.get('/time').expect(403);
    });

    test('With wrong Auth', () => {
      return mockedReq
        .get('/time')
        .set('Authorization', 'bearer ' + 123)
        .expect(403);
    });

    test('With Auth, get data', async () => {
      const okRequest = await mockedReq.get('/time').set('Authorization', 'bearer ' + process.env.AUTH_PHRASE);

      expect(okRequest.status).toBe(200);

      const body: GetTimeType = okRequest.body;
      expect(typeof body).toBe('object');
      expect(typeof body.epoch).toBe('number');
    });
  });

  describe('Random urls', () => {
    test('Without Auth, url: /time123', () => {
      return mockedReq.get('/time123').expect(404);
    });
    test('Random url with wrong Auth', () => {
      return mockedReq
        .get('/123')
        .set('Authorization', 'bearer ' + 123)
        .expect(404);
    });
    test('Random url with right Auth', () => {
      return mockedReq
        .get('/123')
        .set('Authorization', 'bearer ' + process.env.AUTH_PHRASE)
        .expect(404);
    });
  });

  describe('Metrics:', () => {
    test('Without Auth', () => {
      return mockedReq.get('/metrics').expect(404);
    });

    test('With wrong Auth', () => {
      return mockedReq
        .get('/metrics')
        .set('Authorization', 'bearer ' + 123)
        .expect(404);
    });

    test('With Auth, get data', async () => {
      const okRequest = await mockedReq.get('/metrics').set('Authorization', 'bearer ' + process.env.AUTH_PHRASE);

      expect(okRequest.status).toBe(200);
    });
  });
});
