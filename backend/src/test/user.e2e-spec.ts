import { AppModule } from '../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from 'prisma/prisma.service';


describe('UserController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: 'testuser@example.com' },
    });
    await app.close();
  });

it('✅ Должен создать пользователя успешно', async () => {
  const res = await request(app.getHttpServer())
    .post('/create')  
    .send({
      email: 'testuser@example.com',
      password: 'password123',
      secondname: 'testuser',
      name: 'Test',
      nickname: 'testnick',
      phone: '+9041528579'
      
    })
    .expect(201);

  expect(res.body).toHaveProperty('user');        
  expect(res.body.user).toHaveProperty('id');      
  expect(res.body.user.email).toBe('testuser@example.com');  
});

});
