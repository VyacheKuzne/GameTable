import { Body, Controller, Get, Post, Patch, UseGuards, Req } from '@nestjs/common';
import { GetAllUserService } from './getAllUser.service';
import { TariffService } from './Tariff.service';
import { User, Tariff } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class GetAllUserController {
  constructor(
    private readonly getAllUserService: GetAllUserService,
    private readonly TariffService: TariffService,
  ) {}

  @Get('find/allUser')
  async GetAllUser(): Promise<User[]> {
    return await this.getAllUserService.getAllUsers();
  }
  @Get('find/tariffs')
  async getTariffs(): Promise<Tariff[]> {
    return await this.TariffService.getTariffs();
  }
  @Patch('/deleteUser')
  async deleteUser(@Body() user: User): Promise<User> {
    console.log('Полученные данные для удаления:', user); // Логируем данные
    return await this.getAllUserService.deleteUser(user);
  }

  @Patch('/update')
  async UpdateUserData(@Body() user: User): Promise<User> {
    console.log('Полученные данные для обновления:', user); // Логируем данные
    return await this.getAllUserService.updateUser(user);
  }
  @Patch('/updateTariff')
  async UpdateTariffData(@Body() tariff: Tariff): Promise<Tariff> {
    console.log('Полученные данные для обновления:', tariff); // Логируем данные
    return await this.TariffService.updateTariff(tariff);
  }
  @Post('/createTariff')
  @UseGuards(AuthGuard('jwt'))
  async createNewTariff(@Body() tariff: Tariff, @Req() req: any): Promise<Tariff> {
    const user = req.user as { id: number }
    console.log('получили данные', tariff, user);
    return await this.TariffService.creatTariff(tariff, user);
  }
  @Patch('/deleteTariff')
  async deleteTariff(@Body() tariff: Tariff): Promise<Tariff> {
    console.log('Полученные данные для удаления:', tariff); // Логируем данные
    return await this.TariffService.deleteTariff(tariff);
  }
  @Post('/buyTarif')
  @UseGuards(AuthGuard('jwt'))
  async buyTariff(@Body() tariff: Tariff, @Req() req: any): Promise<User>{
    const user = req.user as { id: number }
    return await this.TariffService.buyTariff(user, tariff);
  }
}
