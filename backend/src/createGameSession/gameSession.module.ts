import { Module } from '@nestjs/common';
import { GameSessiontController } from './gameSession.controller';
import { GameSessionService } from './gameSession.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [GameSessiontController],
  providers: [GameSessionService, PrismaService],
  exports: [PrismaService],
})
export class GameSessionModule {}
