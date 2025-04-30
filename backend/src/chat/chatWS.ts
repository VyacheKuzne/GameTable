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
    const messages = await this.prisma.chatMessage.findMany();
    this.server.emit('messages', messages);
  }
  @SubscribeMessage('messages')
  async handleMessage(client: any, payload: { text: string, idSession:string }) {
    await this.prisma.chatMessage.create({
      data: {
        text: payload.text, 
        idSession: payload.idSession,
        createdAt: new Date()
      },
    });
    const sessionMessages  = await this.prisma.chatMessage.findMany({
      where: {idSession: payload.idSession}
    });
    this.server.to(payload.idSession).emit('messages', sessionMessages);
    
  }
}



