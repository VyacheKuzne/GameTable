import { Controller, Get } from '@nestjs/common';
import { GameSessionService } from './gameSession.service';

@Controller()
export class GameSessiontController {
  constructor(private readonly GameSessionService: GameSessionService) {}
  @Get('createGameSession')
  async createGameSession() {
    return this.GameSessionService.createGameSession();
  }
}
