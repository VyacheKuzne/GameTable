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

  async createGameSession(): Promise<GameHub> {
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
    // console.log('и получаеться' + createSession);
    return createSession;
  }


  async getGamePage(token){
    try {
      return this.ChatService.getMessages(token)
    } catch (error) {
      
    }
  }
  async mobfindMany() {
    try {
      return this.prisma.mob.findMany()
    } catch (error) {
      
    }
  }
}
