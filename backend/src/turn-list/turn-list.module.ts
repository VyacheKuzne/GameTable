import { Module } from '@nestjs/common';
import { TurnListController } from './turn-list.controller';
import { TurnListService } from './turn-list.service';

@Module({
  controllers: [TurnListController],
  providers: [TurnListService],
})
export class TurnListModule {}
