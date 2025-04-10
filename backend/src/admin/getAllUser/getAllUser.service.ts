import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class GetAllUserService {
  private prisma = new PrismaClient();

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
