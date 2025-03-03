import { Injectable } from '@nestjs/common';
import { PrismaClient, TurnOrder } from '@prisma/client';
import { CreateTurnOrderDto } from './dto/create-turn-order.dto';

const prisma = new PrismaClient();

@Injectable()
export class TurnListService {
  // Existing method to create a turn
  async createTurn(dto: CreateTurnOrderDto) {
    return prisma.turnOrder.create({
      data: {
        mobId: dto.mobId,
        turnIndex: dto.turnIndex,
      },
    });
  }

  // New method to get all turn orders
  async getAllTurnOrders(): Promise<TurnOrder[]> {
    return prisma.turnOrder.findMany({
      include: {
        mob: true, // Include the related mob details if needed
      },
    });
  }
}
