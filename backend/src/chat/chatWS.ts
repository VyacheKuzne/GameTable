import { Server } from 'socket.io';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from 'src/auth/utils/jwt.utils';

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
  async handleMessage(client: any, payload: { text: string, idSession:string, userToken:string}) {
    const { userToken } = payload;
    console.debug(payload )
    let userId: number;
    const decoded = verifyToken(userToken)
    userId = decoded.id;
    await this.prisma.chatMessage.create({
      data: {
        senderId: userId,
        text: payload.text, 
        idSession: payload.idSession,
        createdAt: new Date()
      },
    });

    console.debug('id '+ userId )
    const sessionMessages  = await this.prisma.chatMessage.findMany({
      where: {idSession: payload.idSession},
      include: {sender: true}
    });
    this.server.to(payload.idSession).emit('messages', sessionMessages);
    
  }
}



