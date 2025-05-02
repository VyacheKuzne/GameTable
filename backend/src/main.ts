import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); 
  // Настройка CORS для передачи куков
  app.use(
    cors({
      origin: 'http://localhost:3001',  
      credentials: true,  
    }),
  );

  await app.listen(3000);
}
bootstrap();
