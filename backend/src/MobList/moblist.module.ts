import { Module } from '@nestjs/common';
import { MoblistController } from './moblist.controller';
import { MoblistService } from './moblist.service'
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [MoblistController],
  providers: [MoblistService,PrismaService],
  exports: [PrismaService]
})
export class MoblistModule {}


