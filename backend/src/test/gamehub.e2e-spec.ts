import { AppModule } from '../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../../prisma/prisma.service';

describe('GameHubController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('❌ Не должен позволить создать игровую сессию без авторизации', async () => {
    const res = await request(app.getHttpServer())
      .get('/createGameSession') // Подставь актуальный endpoint
    //   .send({
    //     token: 'random-token',
    //     status: 'waiting',
    //   })
      .expect(401); // Ожидаем отказ в авторизации

    expect(res.body.message).toMatch(/Unauthorized/i);
  });
});
