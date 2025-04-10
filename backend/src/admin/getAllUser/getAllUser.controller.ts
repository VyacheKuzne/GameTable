import { Controller, Get } from '@nestjs/common';
import { GetAllUserService } from './getAllUser.service';
import { User } from '@prisma/client';

@Controller()
export class GetAllUserController {
  constructor(private readonly getAllUserService: GetAllUserService) {}

  @Get('find/allUser')
  async GetAllUser(): Promise<User[]> {
    return await this.getAllUserService.getAllUsers();
  }
}
