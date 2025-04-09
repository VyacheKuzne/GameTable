import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClient, chatMessage } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(chat: chatMessage): Promise<chatMessage> {
    const client: PrismaClient = this.prisma;
    return await client.chatMessage.create({ data: chat });
  }

  async getMessages(): Promise<chatMessage[]> {
    const client: PrismaClient = this.prisma;
    return await client.chatMessage.findMany();
  }
}
