import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: 'http://localhost:3001', // Замените на порт вашего фронтенда
    credentials: true, // Важно, если используете куки или заголовки авторизации
  }));
  await app.listen(3000);
}
bootstrap();