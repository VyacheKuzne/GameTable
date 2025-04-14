import { Module } from '@nestjs/common';
import { GetAllUserController } from './getAllUser.controller';
import { GetAllUserService } from './getAllUser.service';
import { TariffService } from './Tariff.service';
@Module({
  controllers: [GetAllUserController],
  providers: [GetAllUserService, TariffService],
})
export class GetAllUserModule {}
