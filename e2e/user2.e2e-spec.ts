import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../src/resources/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const options = await getConnectionOptions('test');

    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(options), UserModule],
    })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  test(`/GET user by email`, async () => {
    return request(app.getHttpServer())
      .get('/users/hello@example.com')
      .expect(200)
      .expect({});
  });

  afterAll(async () => {
    try {
      await app.close();
    } catch (e) {
      console.error(e);
    }
  });
});
