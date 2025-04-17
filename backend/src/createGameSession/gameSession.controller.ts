import { Controller, Get, Param } from '@nestjs/common';
import { GameSessionService } from './gameSession.service';

@Controller()
export class GameSessiontController {
  constructor(private readonly GameSessionService: GameSessionService) {}
  @Get('createGameSession')
  async createGameSession() {
    return this.GameSessionService.createGameSession();
  }
  // @Get(`gamePage/:token`)
  // async getGamePage(@Param('token') token: string) {
  //   return this.GameSessionService.getGamePage(token);
  // }
  @Get(`gamePage/:token/getMessage`)
  async getGamePage(@Param('token') token: string) {
    return this.GameSessionService.getGamePage(token);
  }
}
