import { Server } from 'socket.io';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaClient } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: `*`,
  },
})
export class chatWS implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private prisma = new PrismaClient();

  async afterInit() {
    const messages = await this.prisma.ChatMessage.findMany();
    this.server.emit('messgaeFromUser', messages);
  }
  @SubscribeMessage('messages')
  async handleMessage(client: any, payload: { text: string }) {
    await this.prisma.ChatMessage.create({
      data: { text: payload.text },
    });
    const allMessages = await this.prisma.ChatMessage.findMany();
    this.server.emit('messages', allMessages);
  }
}
