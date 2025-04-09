import { Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';

@Injectable()
export class GetAllUserService {
  private prisma = new PrismaClient();

  async getAllUsers(): Promise<user[]> {
    return await this.prisma.user.findMany();
  }
}
