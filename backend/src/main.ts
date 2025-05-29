import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { resolve } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  // Настройка CORS для передачи куков
  app.use(
    cors({
      origin: 'http://localhost:3001',
      credentials: true,
    }),
  );
  
  app.useStaticAssets(resolve('./uploads'), {
    prefix: '/uploads',
  });
  await app.listen(3000);
}
bootstrap();
