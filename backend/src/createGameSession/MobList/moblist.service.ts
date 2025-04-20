import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MoblistService {
  constructor(private prisma: PrismaService) {}

  // Метод, который собирает информацию о мобах с учетом их оружия и брони
  async getMoblist() {
    return this.prisma.mob.findMany({
      include: {
        weapon: true,  // Включаем оружие, если оно существует
        armor: true,   // Включаем броню, если она существует
      },
    });
  }
}
