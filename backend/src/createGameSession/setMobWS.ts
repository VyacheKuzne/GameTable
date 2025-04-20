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
export class setMobWS implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private prisma = new PrismaClient();

  async afterInit() {
    const messages = await this.prisma.chatMessage.findMany();
    this.server.emit('messgaeFromUser', messages);
  }
  @SubscribeMessage('newMobOnTable')
  async handleMessage(
    client: any,
    payload: { idMob: number; x: number; y: number; idSession: string },
  ) {
    await this.prisma.turnhistory.create({
      data: {
        idMob: payload.idMob,
        x: payload.x,
        y: payload.y,
        idSession: payload.idSession
      },
    });
    const sessionMessages = await this.prisma.chatMessage.findMany({
      where: { idSession: payload.idSession },
    });
    this.server.to(payload.idSession).emit('messages', sessionMessages);
  }
}
