import { Body, Controller, Get, Post, Patch, UseGuards, Req, Query, Res, Param  } from '@nestjs/common';
import { GetAllUserService } from './getAllUser.service';
import { TariffService } from './Tariff.service';
import { User, Tariff } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller()
export class GetAllUserController {
  constructor(
    private readonly getAllUserService: GetAllUserService,
    private readonly TariffService: TariffService,
    private readonly ReportService: ReportService,
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
// tariff.controller.ts
  @Get('tariffs')
  async findTariffs(@Query('name') name?: string) {
    return this.TariffService.findTariffsByName(name);
  }

@Get('sort')
async sortTariffs(
  @Query('order') order: 'asc' | 'desc' = 'asc'
) {
  return this.TariffService.sortTariffs(order);
}

  @Get('tariff-purchases')
  async downloadReport(@Res() res: Response) {
    return this.ReportService.generateTariffPurchasesReport(res);
  }
@Patch('/tariffs/:idTariff/restore')
async restoreTariff(@Param('idTariff') idTariff: string) {
  // Преобразуем строку в число
  const id = parseInt(idTariff, 10);
  
  // Проверим, что id является числом
  if (isNaN(id)) {
    throw new Error('Invalid idTariff');
  }

  return this.TariffService.restoreTariff(id);
}
@Patch('/Users/:Userid/restore')
async restoreUser(@Param('Userid') Userid: string) {
  // Преобразуем строку в число
  const id = parseInt(Userid, 10);
  
  // Проверим, что id является числом
  if (isNaN(id)) {
    throw new Error('Invalid Userid');
  }

  return this.getAllUserService.restoreUser(id);
}

}
