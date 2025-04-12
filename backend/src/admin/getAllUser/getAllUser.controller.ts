import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { GetAllUserService } from './getAllUser.service';
import { User } from '@prisma/client';

@Controller()
export class GetAllUserController {
  constructor(private readonly getAllUserService: GetAllUserService) {}

  @Get('find/allUser')
  async GetAllUser(): Promise<User[]> {
    return await this.getAllUserService.getAllUsers();
  }
  @Get('/delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    const userId = id; // Преобразуем строку в число
    await this.getAllUserService.deleteUser(userId); // Передаем id в сервис
  }
  @Patch('/update')
  async UpdateUserData(@Body() user: User): Promise<User> {
    console.log('Полученные данные для обновления:', user); // Логируем данные
    return await this.getAllUserService.updateUser(user);
  }
}
