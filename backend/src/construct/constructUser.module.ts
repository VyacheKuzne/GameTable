import { Module } from '@nestjs/common';
import { ConstructUserController } from './constructUser.controller';
import { ConstructUserService } from './constructUser.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ConstructUserController],
  providers: [ConstructUserService, PrismaService],
})
export class ConstructUserModule {}
