import { Controller, Post, Body, Get } from '@nestjs/common';
import { TurnListService } from './turn-list.service';
import { CreateTurnOrderDto } from './dto/create-turn-order.dto';
import { TurnOrder } from '@prisma/client'; // Import the TurnOrder model if needed

@Controller('turn-list')
export class TurnListController {
  constructor(private readonly turnListService: TurnListService) {}

  // Existing POST route to create a turn
  @Post('create')
  async createTurn(@Body() createTurnOrderDto: CreateTurnOrderDto) {
    return this.turnListService.createTurn(createTurnOrderDto);
  }

  // New GET route to fetch all turn orders
  @Get()
  async getTurnOrders(): Promise<TurnOrder[]> {
    return this.turnListService.getAllTurnOrders();
  }
}
