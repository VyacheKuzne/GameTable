import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MoblistService {
  constructor(private prisma: PrismaService) {}

  // Метод, который собирает информацию о мобах с учетом их оружия и брони
async getMoblist(user) {
  return this.prisma.mob.findMany({
    where: {
      creatorId: user.id,
    },
    include: {
      weapon: true,  // Включаем оружие
      armor: true,   // Включаем броню
    },
  });
}

}
