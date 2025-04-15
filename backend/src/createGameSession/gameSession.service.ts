import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
// import { GameHub } from '@prisma/client';
@Injectable()
export class GameSessionService {
  constructor(private prisma: PrismaService) {}

  async createGameSession(): Promise<void> {
    const gameSessionId = uuidv4();
    const dataSession = {
      id: gameSessionId,
      token: gameSessionId,
      status: 'active',
      createdAt: new Date(),
      updateAT: new Date(),
    };
    console.log(gameSessionId);
    const createSession = await this.prisma.gameHub.create({
      data: dataSession,
    });
    console.log('и получаеться' + createSession);
  }
}
