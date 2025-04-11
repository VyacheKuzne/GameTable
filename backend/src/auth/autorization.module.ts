import { Module } from '@nestjs/common';
import { AutorizationController } from './autorization.controller';
import { AutorizationService } from './autorization.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutorizationController],
  providers: [AutorizationService, JwtStrategy],
})
export class AutorizationModule {}
