import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '../auth/utils/jwt.utils';
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
  private userSockets: Map<number, string> = new Map();
  private getSocketIdByUserId(userId: number): string | undefined {
    console.debug('getSocketIdByUserId ' + this.userSockets.get(userId))
    return this.userSockets.get(userId);
  }
  private async determineNextTurn(idSession: string) {
    const turnhistoryMobs = await this.prisma.turnhistory.findMany({
      where: { idSession },
      include: { Mob: true },
      orderBy: { createdAt: 'asc' },
    });

    const notMovedYet = turnhistoryMobs.filter(
      (entry) => !entry.isOverMove && entry.Mob,
    );

    notMovedYet.sort((a, b) => {
      const manevrA = a.Mob?.manevr || 0;
      const manevrB = b.Mob?.manevr || 0;
      if (manevrB !== manevrA) return manevrB - manevrA;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    const nextToMove = notMovedYet[0];
    if (!nextToMove) return;

    const socketId = this.getSocketIdByUserId(nextToMove.idOwner);
    if (socketId) {
      this.server.to(socketId).emit('yourTurn', {
        message: 'Теперь ваш ход!',
        tokenMob: nextToMove.tokenMob,
      });
    }
  }
  @WebSocketServer()
  server: Server;
  private prisma = new PrismaClient();

  async afterInit() {
    const messages = await this.prisma.chatMessage.findMany();
    this.server.emit('messgaeFromUser', messages);
  }
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    client: any,
    payload: {
      idSession: string;
      userToken: string;
    },
  ) {
    const { idSession, userToken } = payload;
    let userId: number;
    try {
      const decoded = verifyToken(userToken);
      userId = decoded.id; // или decoded.sub, в зависимости от структуры токена
      console.debug('User ID from token:', userId);
    } catch (e) {
      console.error('Token verification failed:', e.message);
      client.emit('error', 'Invalid token');
      return;
    }
    client.join(idSession);
    console.log(`🔗 Клиент ${client.id} присоединился к комнате ${idSession}`);
    const turnhistoryMobs = await this.prisma.turnhistory.findMany({
      where: { idSession: idSession },
    });
    const allMobs = await this.prisma.mob.findMany();
    const sessionMob = turnhistoryMobs.map((turnHistoryEntry) => {
      const mob = allMobs.find((m) => m.id === turnHistoryEntry.idMob);
      return {
        ...turnHistoryEntry,
        mob: mob || null,
      };
    });
    this.userSockets.set(userId, client.id);
    this.server.to(idSession).emit('sessionMob', sessionMob);
    await this.determineNextTurn(idSession);
  }
  @SubscribeMessage('newMobOnTable')
  async handleMessage(
    client: any,
    payload: {
      idMob: number;
      x: number;
      y: number;
      idSession: string;
      token: string;
      userToken: string;
    },
  ) {
    // 🔓 Расшифровка токена
    let userId: number;
    try {
      const decoded = verifyToken(payload.userToken);
      userId = decoded.id; // или decoded.sub, в зависимости от структуры токена
      console.debug('User ID from token:', userId);
    } catch (e) {
      console.error('Token verification failed:', e.message);
      client.emit('error', 'Invalid token');
      return;
    }
    // console.debug('newMobOnTable');
    const newMobToken = uuidv4();
    // console.debug(token)
    await this.prisma.turnhistory.create({
      data: {
        idMob: payload.idMob,
        x: payload.x,
        y: payload.y,
        idSession: payload.idSession,
        tokenMob: newMobToken,
        isOverMove: false,
        idOwner: userId,
      },
    });

    const turnhistoryMobs = await this.prisma.turnhistory.findMany({
      where: { idSession: payload.idSession },
      include: { Mob: true },
      orderBy: { createdAt: 'asc' },
    });
    const allMobs = await this.prisma.mob.findMany();
    const sessionMob = turnhistoryMobs.map((turnHistoryEntry) => {
      const mob = allMobs.find((m) => m.id === turnHistoryEntry.idMob);
      return {
        ...turnHistoryEntry,
        mob: mob || null,
      };
    });

    this.server.to(payload.idSession).emit('sessionMob', sessionMob);
    // console.debug(sessionMob);
    await this.determineNextTurn(payload.idSession);
  }
  @SubscribeMessage('replaceMobOnTable')
  async handleReplaceMob(
    client: any,
    payload: {
      idMob: number;
      x: number;
      y: number;
      idSession: string;
      tokenMob: string;
    },
  ) {
    const findReolacedMobs = await this.prisma.turnhistory.findFirst({
      where: { tokenMob: payload.tokenMob },
    });
    // console.log(
    //   'выбранный моб для перемещения ' +
    //     findReolacedMobs?.id +
    //     ' ' +
    //     findReolacedMobs?.tokenMob,
    // );
    const upadateMobs = await this.prisma.turnhistory.update({
      where: {
        tokenMob: findReolacedMobs?.tokenMob,
      },
      data: {
        idMob: payload.idMob,
        x: payload.x,
        y: payload.y,
        idSession: payload.idSession,
      },
    });
    // console.log(upadateMobs);
    const sessionMob = await this.prisma.turnhistory.findMany({
      where: { idSession: payload.idSession },
    });
    this.server.to(payload.idSession).emit('sessionMob', sessionMob);
    await this.determineNextTurn(payload.idSession);

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
