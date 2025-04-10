import { Module } from '@nestjs/common';
import { GetAllUserController } from './getAllUser.controller';
import { GetAllUserService } from './getAllUser.service';
@Module({
  controllers: [GetAllUserController],
  providers: [GetAllUserService],
})
export class GetAllUserModule {}
