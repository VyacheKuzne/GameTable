import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
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
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: any, idSession: string) {
    client.join(idSession);
    const sessionMob = await this.prisma.turnhistory.findMany({
      where: { idSession:idSession },
    });
    this.server.to(idSession).emit('sessionMob', sessionMob);
  }
  @SubscribeMessage('newMobOnTable')
  async handleMessage(
    client: any,
    payload: { idMob: number; x: number; y: number; idSession: string },
  ) {
    const newMobToken = uuidv4();
    await this.prisma.turnhistory.create({
      data: {
        idMob: payload.idMob,
        x: payload.x,
        y: payload.y,
        idSession: payload.idSession,
        tokenMob: newMobToken
      },
    });
    const sessionMob = await this.prisma.turnhistory.findMany({
      where: { idSession: payload.idSession },
    });
    this.server.to(payload.idSession).emit('sessionMob', sessionMob);
  }
  @SubscribeMessage('replaceMobOnTable')
  async handleReplaceMob(
    client: any,
    payload: { idMob: number; x: number; y: number; idSession: string; tokenMob: string  },
  ) {
    const findReolacedMobs = await this.prisma.turnhistory.findFirst({
      where: { tokenMob: payload.tokenMob }
    });
    console.log('выбранный моб для перемещения ' + findReolacedMobs?.id + ' ' + findReolacedMobs?.tokenMob)
    const upadateMobs = await this.prisma.turnhistory.update({
      where: {
        tokenMob: findReolacedMobs?.tokenMob
      },
        data: {
    idMob: payload.idMob,
    x: payload.x,
    y: payload.y,
    idSession: payload.idSession,
  },
    })
    console.log(upadateMobs)
    const sessionMob = await this.prisma.turnhistory.findMany({
      where: { idSession: payload.idSession },
    });
    this.server.to(payload.idSession).emit('sessionMob', sessionMob);
  }
}

// where[]{
//   data: {
//     idMob: payload.idMob,
//     x: payload.x,
//     y: payload.y,
//     idSession: payload.idSession,
//   },
// }


