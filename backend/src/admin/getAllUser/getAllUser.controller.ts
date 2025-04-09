import { Controller, Get } from '@nestjs/common';
import { GetAllUserService } from './getAllUser.service';
import { user } from '@prisma/client';

@Controller('find')
export class GetAllUserController {
  constructor(private readonly getAllUserService: GetAllUserService) {}

  @Get('/allUser')
  async GetAllUser(): Promise<user[]> {
    return await this.getAllUserService.getAllUsers();
  }
}
