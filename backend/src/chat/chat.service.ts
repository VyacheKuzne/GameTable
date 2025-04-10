import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClient, ChatMessage } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async getMessages(): Promise<ChatMessage[]> {
    const client: PrismaClient = this.prisma;
    return await client.ChatMessage.findMany();
  }
}
