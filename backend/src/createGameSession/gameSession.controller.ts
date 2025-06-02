import { Controller, Get, Param, Req } from '@nestjs/common';
import { GameSessionService } from './gameSession.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class GameSessiontController {
  constructor(private readonly GameSessionService: GameSessionService) {}
  @Get('createGameSession')
  @UseGuards(AuthGuard('jwt'))
  async createGameSession(@Req() req: any) {
    const user = req.user as { id: number }
    console.debug(user)
    return this.GameSessionService.createGameSession(user);
  }
  @Get(`gamePage/:token/getMessage`)
  async getGamePage(@Param('token') token: string) {
    return this.GameSessionService.getGamePage(token);
  }
  @Get('mobs/:SessionToken')
  
  // @UseGuards(AuthGuard('jwt'))
  async getAllMobs(@Param('SessionToken') SessionToken:string) {
    // const user = req.user as { id: number }
    return this.GameSessionService.mobfindMany(SessionToken); // имя таблицы в Prisma
  }
  // 23123123 
  @Get('checkCreator')
  @UseGuards(AuthGuard('jwt'))
  async checkCreator(@Req() req: any) {
    const token = req.headers['x-session-token'];
    const user = req.user as { id: number }
    return this.GameSessionService.checkCreator(user, token); // имя таблицы в Prisma
  }
}
