import { Module } from '@nestjs/common';
import { GameSessiontController } from './gameSession.controller';
import { GameSessionService } from './gameSession.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ChatService } from 'src/chat/chat.service';
import { ChatModule } from 'src/chat/chat.module';
import { JwtModule } from '@nestjs/jwt';
import { setMobWS } from './setMobWS';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ChatModule
  ],
  controllers: [GameSessiontController],
  providers: [GameSessionService, PrismaService, setMobWS],
  exports: [PrismaService],
})
export class GameSessionModule {}
