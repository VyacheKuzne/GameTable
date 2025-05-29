import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Response,
  Req,
  Query,
  Res,
  BadRequestException,
  Redirect,
} from '@nestjs/common';
import { AutorizationService } from './autorization.service';
import { Response as ExpressResponse } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import * as passport from 'passport';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs'; // Для работы с параметрами запроса в формате URL encoded
@Controller()
export class AutorizationController {
  private readonly YANDEX_OAUTH_URL = 'https://login.yandex.ru/oauth/token';
  constructor(
    private readonly AutorizationService: AutorizationService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // @UseGuards(JwtAuthGuard)
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

    const { user, token } =
      await this.AutorizationService.createUser(fullUserData);

    res.cookie('access_token', token, {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000, // 1 час
      path: '/',
    });

    console.log(token);
    return res.send({ user });
  }

  @Post('/autorization')
  async autorizationUser(@Body() user: User, @Response() res: ExpressResponse) {
    const { token } = await this.AutorizationService.autorizationUser(user);
    res.cookie('access_token', token, {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000, // 1 час
      path: '/',
    });
    return res.send({ user });
  }



   @Get('auth/yandex')
  @UseGuards(AuthGuard('yandex'))
  async yandexLogin() {
    // редирект на Яндекс
  }

@Get('auth/yandex/callback')
@UseGuards(AuthGuard('yandex'))
async yandexCallback(
  @Req() req,
  @Res({ passthrough: true }) res: ExpressResponse,
) {
  const { user, token } = await this.AutorizationService.validateYandexUser(req.user);

  res.cookie('access_token', token, {
    httpOnly: false,
    secure: false,
    maxAge: 60 * 60 * 1000,
    path: '/',
  });

  return     res.redirect('http://localhost:3001/')

}



}
