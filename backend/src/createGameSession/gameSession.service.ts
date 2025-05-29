import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { GameHub } from '@prisma/client';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class GameSessionService {
  constructor(
    private prisma: PrismaService,
    private readonly ChatService: ChatService,
  ) {}

  async createGameSession(user: { id: number }): Promise<GameHub> {
    const gameSessionId = uuidv4();
    const dataSession = {
      token: gameSessionId,
      status: 'active',
      createdAt: new Date(),
      updateAT: new Date(),
    };
    console.log('id сессии ' + gameSessionId);
    const createSession = await this.prisma.gameHub.create({
      data: dataSession,
    });
    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        createdSessionId:createSession.token
      }
    })
    return createSession;
  }


  async getGamePage(token){
    try {
      return this.ChatService.getMessages(token)
    } catch (error) {
      null
    }
  }
async mobfindMany(user) {
  try {
    return await this.prisma.mob.findMany({
      where: {
        creatorId: user.id,
      },
      include: {
        weapon: true,
        armor: true,
      },
    });
  } catch (error) {
    console.error("Ошибка при получении мобов:", error);
    return null;
  }
}

  async checkCreator(user: { id: number }, token) {
    console.debug(token)
    console.debug(user.id)
    const gameSession = this.prisma.gameHub.findUnique({
     where: {token: token}
    })
    if(!gameSession){
      console.log('такой сессии нет')
      return
    }
    const findUser = await this.prisma.user.findUnique({
      where: {id: user.id}
    })
    if(findUser?.createdSessionId === token)
    {
      return true
    }
    if (!findUser) {
      throw new Error('User not found');
    }
  }
}
