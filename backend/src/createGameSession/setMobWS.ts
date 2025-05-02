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
export interface MobsOnTable {
  id: number;
  x: number;
  y: number;
  name: string;
  health: number;
  psih: number;
  idSession?: string | null;
  createdAt: string; // ISO 8601 формат (Date.toISOString())
  idMob?: number | null;
  idOwner: number;
  tokenMob: string;
  isOverMove?: boolean | null;
}
@WebSocketGateway({
  cors: {
    origin: `*`,
  },
})
export class setMobWS implements OnGatewayInit {
  private userSockets: Map<number, string> = new Map();
  private getSocketIdByUserId(userId: number): string | undefined {
    console.debug('getSocketIdByUserId ' + this.userSockets.get(userId));
    return this.userSockets.get(userId);
  }
  private async determineNextTurn(idSession: string) {
    const turnhistoryMobs = await this.prisma.mobsOnTable.findMany({
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
    const MobIsNowTurn = await this.prisma.mobsOnTable.findFirstOrThrow({
      where: { tokenMob: nextToMove.tokenMob },
    });
    console.debug(MobIsNowTurn);
    if (socketId) {
      this.server.to(socketId).emit('yourTurn', {
        message: 'Теперь ваш ход!',
        tokenMob: nextToMove.tokenMob,
        MobIsNowTurn: MobIsNowTurn,
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
      userId = decoded.id;
      console.debug('User ID from token:', userId);
    } catch (e) {
      console.error('Token verification failed:', e.message);
      client.emit('error', 'Invalid token');
      return;
    }
    client.join(idSession);
    console.log(`🔗 Клиент ${client.id} присоединился к комнате ${idSession}`);
    await this.prisma.user.update({
      where: { id: userId },
      data: { idSession: idSession },
    });
    const AllMembers = await this.prisma.user.findMany({
      where: { idSession: idSession },
    });
    const turnhistoryMobs = await this.prisma.mobsOnTable.findMany({
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
    this.server.to(idSession).emit('sessionMembers', AllMembers);
    // await this.determineNextTurn(idSession);
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
    const mobTamplate = await this.prisma.mob.findFirstOrThrow({
      where: { id: payload.idMob },
    });
    await this.prisma.mobsOnTable.create({
      data: {
        idMob: payload.idMob,
        name: mobTamplate.name,
        health: mobTamplate.health,
        x: payload.x,
        y: payload.y,
        idSession: payload.idSession,
        tokenMob: newMobToken,
        isOverMove: false,
        idOwner: userId,
      },
    });

    const turnhistoryMobs = await this.prisma.mobsOnTable.findMany({
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
    // await this.determineNextTurn(payload.idSession);
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
    const findReolacedMobs = await this.prisma.mobsOnTable.findFirst({
      where: { tokenMob: payload.tokenMob },
    });
    // console.log(
    //   'выбранный моб для перемещения ' +
    //     findReolacedMobs?.id +
    //     ' ' +
    //     findReolacedMobs?.tokenMob,
    // );
    const upadateMobs = await this.prisma.mobsOnTable.update({
      where: {
        tokenMob: findReolacedMobs?.tokenMob,
      },
      data: {
        x: payload.x,
        y: payload.y,
        idSession: payload.idSession,
      },
    });
    // console.log(upadateMobs);
    const sessionMob = await this.prisma.mobsOnTable.findMany({
      where: { idSession: payload.idSession },
    });
    this.server.to(payload.idSession).emit('sessionMob', sessionMob);
    // await this.determineNextTurn(payload.idSession);
  }
  @SubscribeMessage('GameOn')
  async gameOn(payload: { idSession: string }) {
    console.debug('Игра началась');
    await this.determineNextTurn(payload.idSession);
  }
  @SubscribeMessage('editMob')
  async handleEditMob(
    client: any,
    payload: { idSession: string; ownerId: number; tokenMob: string },
  ) {
    console.debug('ownerId моба', payload.ownerId);
    console.debug('idSession моба', payload.idSession);
    console.debug('tokenMob моба', payload.tokenMob);
    const editMob = await this.prisma.mobsOnTable.update({
      where: { tokenMob: payload.tokenMob },
      data: { idOwner: payload.ownerId },
    });
    console.debug(editMob);
    const AllMembers = await this.prisma.user.findMany({
      where: { idSession: payload.idSession },
    });
    const turnhistoryMobs = await this.prisma.mobsOnTable.findMany({
      where: { idSession: payload.idSession },
    });
    const allMobs = await this.prisma.mob.findMany();
    const sessionMob = turnhistoryMobs.map((turnHistoryEntry) => {
      const mob = allMobs.find((m) => m.id === turnHistoryEntry.idMob);
      return {
        ...turnHistoryEntry,
        mob: mob || null,
      };
    });
    // this.userSockets.set(userId, client.id);
    this.server.to(payload.idSession).emit('sessionMob', sessionMob);
    this.server.to(payload.idSession).emit('sessionMembers', AllMembers);
  }
  @SubscribeMessage('endTurn')
  async endTurn(
    client: any,
    payload: { MobIsNowTurn: MobsOnTable; idSession: string },
  ) {
    const endTurnMob = this.prisma.mobsOnTable.update({
      where: { tokenMob: payload.MobIsNowTurn.tokenMob },
      data: { isOverMove: true },
    });
    console.debug('моб закончил ход' + (await endTurnMob).isOverMove)
    const AllMembers = await this.prisma.user.findMany({
      where: { idSession: payload.idSession },
    });
    const turnhistoryMobs = await this.prisma.mobsOnTable.findMany({
      where: { idSession: payload.idSession },
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
    this.server.to(payload.idSession).emit('sessionMembers', AllMembers);
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
