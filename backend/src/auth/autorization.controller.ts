import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Response,
  Req,
} from '@nestjs/common';
import { AutorizationService } from './autorization.service';
import { Response as ExpressResponse } from 'express';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller()
export class AutorizationController {
  constructor(private readonly AutorizationService: AutorizationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('registartion')
  getProtected(@Req() req) {
    console.log('Получен запрос на /registartion');
    console.log('Request cookies:', req.cookies);

    if (req.user) {
      console.log('Пользователь авторизован:', req.user);
    } else {
      console.log('Пользователь не авторизован');
    }

    return { message: 'You are атворизованны', user: req.user };
  }

  @Post('create')
  async createUser(
    @Body()
    Body: {
      name: string;
      secondname: string;
      email: string;
      phone: string;
      password: string;
      nickname: string;
    },
    @Response() res: ExpressResponse,
  ) {
    // Добавляем поле updateAt вручную
    const fullUserData = {
      ...Body,
      updateAt: new Date(),
    };

    const { user, token } = await this.AutorizationService.createUser(fullUserData);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000, // 1 час
      path: '/',
    });

    console.log(token);
    return res.send({ user });
  }
}
