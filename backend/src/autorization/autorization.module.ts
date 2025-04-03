import { Module } from '@nestjs/common';
import { AutorizationController } from './autorization.controller';
import { AutorizationService } from './autorization.service';

@Module({
  imports: [],
  controllers: [AutorizationController],
  providers: [AutorizationService],
})
export class AutorizationModule {}
