import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { chatWS } from './chatWS';

@Module({
  exports: [ChatService],
  controllers: [ChatController],
  providers: [ChatService, chatWS],
})
export class ChatModule {}
