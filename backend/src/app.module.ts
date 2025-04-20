import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoblistModule } from './createGameSession/MobList/moblist.module';
import { TurnListService } from './turn-list/turn-list.service';
import { TurnListController } from './turn-list/turn-list.controller';
import { TurnListModule } from './turn-list/turn-list.module';
import { AutorizationModule } from './auth/autorization.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { GetAllUserModule } from './admin/getAllUser/getAllUser.module';
import { GameSessionModule } from './createGameSession/gameSession.module';
@Module({
  imports: [
    MoblistModule,
    TurnListModule,
    AutorizationModule,
    PrismaModule,
    ChatModule,
    GetAllUserModule,
    GameSessionModule,
  ],
  controllers: [AppController, TurnListController],
  providers: [AppService, TurnListService],
})
export class AppModule {}
