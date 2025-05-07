import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LkService } from './lk.service';

@Controller('user')
export class LkController {
  constructor(private readonly lkService: LkService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getdata')
  async getLkData(@Req() req: any) {
    const userId = req.user['id'];
    return this.lkService.getUserInfo(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateData')
  async updateUserData(@Req() req: any, @Body() body: any) {
    const userId = req.user['id'];
    return this.lkService.updateUserInfo(userId, body);
  }
}
