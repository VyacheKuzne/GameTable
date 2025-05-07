import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LkService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserInfo(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        tarif: true,
      },
    });
  }
  async updateUserInfo(userId: number, data: any) {
    const allowedFields = [
      'nickname',
      'email',
      'phone',
      'name',
      'secondname',
      'password',
    ];
    const updateData: any = {};

    for (const key of allowedFields) {
      if (key in data) {
        updateData[key] = data[key];
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}
