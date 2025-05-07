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
} from '@nestjs/common';
import { AutorizationService } from './autorization.service';
import { Response as ExpressResponse } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import * as passport from 'passport';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
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
    console.log('→ Перенаправление на страницу авторизации Яндекс');
  }

  @Get('auth/yandex/callback')
@UseGuards(AuthGuard('yandex'))
async yandexCallback(@Req() req, @Res() res: ExpressResponse) {
  try {
    const code = req.query.code as string;

    if (!code) {
      console.error('→ Нет кода авторизации');
      return res.status(400).json({ message: 'Missing code' });
    }

    // Проверка, не использовался ли код ранее
    const used = await this.cacheManager.get(`yandex_code_${code}`);
    if (used) {
      console.warn('→ Попытка повторного использования кода авторизации');
      return res.status(400).json({ message: 'Code already used' });
    }

    // Отметим код как использованный в кэше, срок действия кода - 60 секунд
    await this.cacheManager.set(`yandex_code_${code}`, true, 60);  

    // Обмен кода на токен с правильным форматированием параметров
    const response = await axios.post(
      'https://oauth.yandex.ru/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        client_id: '48a5fec8f1ee4b3888ba3721222c255a',  // Убедитесь, что это ваш client_id
        client_secret: '48d4d82213954f41b1d8387513505258',  // Убедитесь, что это ваш client_secret
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;

    // Получаем информацию о пользователе с помощью полученного access_token
    const userResponse = await axios.get('https://login.yandex.ru/info', {
      headers: { Authorization: `OAuth ${accessToken}` },
    });

    const yandexUser = userResponse.data;

    console.log('→ Пользователь из Яндекса:', yandexUser);

    // Обрабатываем пользователя и создаем или обновляем данные в базе
    const user = await this.AutorizationService.findOrCreateYandexUser({
      id: yandexUser.id,
      emails: [{ value: yandexUser.default_email }],
      username: yandexUser.login,
      displayName: yandexUser.real_name,
      name: {
        familyName: yandexUser.last_name,
        givenName: yandexUser.first_name,
      },
    });

    // Генерация JWT токена для пользователя
    const jwt = this.AutorizationService.generateJwt(user);

    // Перенаправление с токеном на клиентскую сторону
    return res.redirect(`http://localhost:5173/login/success?token=${jwt}`);
  } catch (error) {
    console.error('→ Ошибка в обработке callback:', error.response?.data || error);
    return res.status(500).send({ message: 'Ошибка при авторизации' });
  }
}

}
