import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Настройка CORS для передачи куков
  app.use(
    cors({
      origin: 'http://localhost:3001',  // Убедись, что это твой фронт
      credentials: true,  // Важно: разрешаем передачу куков
    }),
  );

  await app.listen(3000);
}
bootstrap();
