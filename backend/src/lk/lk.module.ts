import { Module } from '@nestjs/common';
import { LkController } from './lk.controller';
import { LkService } from './lk.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [LkController],
  providers: [LkService, PrismaService],
})
export class LkModule {}
