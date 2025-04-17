import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClient} from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async getMessages(token:string) {
    // console.log('сервер что ли: ' + token)
    const findMessage = await this.prisma.chatMessage.findMany({
      where: { idSession: token},
    });
    return findMessage
  }
}
