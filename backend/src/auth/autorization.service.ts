import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AutorizationService {
  private readonly logger = new Logger(AutorizationService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createUser(data: Prisma.UserCreateInput) {
    this.logger.debug('создали нового пользователя', { data });
    const user = await this.prisma.user.create({ data });
    const token = this.jwtService.sign({ id: user.id });
    return { user, token };
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
