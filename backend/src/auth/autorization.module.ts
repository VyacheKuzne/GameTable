import { Module } from '@nestjs/common';
import { AutorizationController } from './autorization.controller';
import { AutorizationService } from './autorization.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import { YandexStrategy } from './strategies/yandex.strategy';
@Module({
  imports: [
    CacheModule.register({
      ttl: 60, // Время жизни кэша в секундах
      max: 100, // Макс. кол-во элементов в кэше
    }),
    PassportModule,
    JwtModule.register({
      secret: 'supersecretkey123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutorizationController],
  providers: [AutorizationService, JwtStrategy, YandexStrategy],
})
export class AutorizationModule {}
