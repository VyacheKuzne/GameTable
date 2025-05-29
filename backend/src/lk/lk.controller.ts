import { Body, Controller, Get, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LkService } from './lk.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  @UseGuards(JwtAuthGuard)
  @Patch('uploadAvatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
         destination: './uploads/avatars',
            filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    })
  }))
    async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user.id; // если авторизация
    return this.lkService.saveAvatarPath(userId, file.filename);
  }
}
