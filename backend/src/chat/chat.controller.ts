import { Controller, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Get('/api/chat')
  // async getMessages(@Res() res: Response) {
  //   const messages = await this.chatService.getMessages(token);
  //   res.json(messages);
  // }
}
