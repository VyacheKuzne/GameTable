import { Controller, Get, Render, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/chat')
  @Render('index')
  home() {
    return;
  }

  @Get('/api/chat')
  async getMessages(@Res() res: Response) {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }
}
