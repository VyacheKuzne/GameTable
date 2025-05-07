import { Injectable, NotFoundException, Req, Res, BadRequestException  } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { User } from '@prisma/client';
import { Response as ExpressResponse } from 'express';

@Injectable()
export class AutorizationService {
  private readonly YANDEX_OAUTH_URL = 'https://login.yandex.ru/oauth/token';
  private readonly logger = new Logger(AutorizationService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createUser(data: Prisma.UserCreateInput) {
    this.logger.debug('создали нового пользователя', { data });
  
    // Хешируем пароль перед сохранением
    const salt = await bcrypt.genSalt(); // можно указать rounds, например bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt);
  
    // Обновляем data перед сохранением
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, // сохраняем хеш
      },
    });
  
    // Создаем JWT
    const token = this.jwtService.sign({ id: user.id, status: user.status});
  
    return { user, token };
  }
  async createUserFromYandex(profile: any) {
    const generateNickname = () => `user__${Math.floor(Math.random() * 1000000)}`;
  
    const generatePassword = (length = 10) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };
  
    const randomNickname = generateNickname();
    const randomPassword = generatePassword();
  
    return this.prisma.user.create({
      data: {
        yandexId: profile.id,
        name: profile.display_name,
        secondname: profile.display_name,
        email: profile.default_email,
        nickname: randomNickname,
        phone: profile.phone,
        password: randomPassword,
      },
    });
  }
  async getUsers() {
    return this.prisma.user.findMany();
  }

  async autorizationUser(user) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        nickname: user.nickname,
        status: 'active'
      }
    });
  
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден');
    }
  
    const isPasswordValid = await bcrypt.compare(user.password, findUser.password);
  
    // console.log('1:' + user.password)
    // console.log('2:' + findUser.password)
    // console.log(isPasswordValid)
  
    if (!isPasswordValid) {
      throw new NotFoundException('Неверный пароль');
    }
    const token = this.jwtService.sign({ id: findUser.id, status: findUser.status});
    return {findUser, token};
  }
  async yandexCallback(@Req() req, @Res() res: ExpressResponse) {
    try {
      // Проверяем наличие данных о пользователе
      if (!req.user) {
        throw new BadRequestException('Нет данных о пользователе');
      }
      this.logger.log('Пользователь найден в req.user:', req.user);
  
      // Логируем профиль пользователя
      this.logger.log('Данные из Yandex в req.user:', req.user);
  
      // Проверка на наличие и создание пользователя
      this.logger.log('Проверка наличия пользователя в базе данных...');
      const user = await this.findOrCreateYandexUser(req.user);
      this.logger.log('Пользователь найден или создан:', user);
  
      // Генерация токена
      this.logger.log('Генерация JWT для пользователя...');
      const token = this.jwtService.sign({ id: user.id, status: user.status });
      this.logger.log('Токен сгенерирован:', token);
  
      // Перенаправление на фронтенд с токеном
      this.logger.log('Перенаправление на фронтенд с токеном...');
      res.redirect(`http://localhost:5173/login/success?token=${token}`);
    } catch (error) {
      this.logger.error('Ошибка при обработке callback:', error);
  
      // Обработка ошибок и повторная авторизация при истечении кода
      if (error.code === 'invalid_grant') {
        this.logger.warn('Код авторизации истек. Запрашиваем новый код.');
        res.redirect('/auth/yandex');  // Переадресация на процесс авторизации
      } else {
        this.logger.warn('Произошла ошибка, перенаправляем на процесс авторизации');
        res.redirect('/auth/yandex');  // Переадресация на процесс авторизации
      }
    }
  }
  
  generateJwt(user): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async findOrCreateYandexUser(yandexProfile: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { yandexId: yandexProfile.id },
    });

    if (existingUser) return existingUser;

    // Генерация случайного ника и пароля
    const randomNick = `user__${Math.floor(100000 + Math.random() * 900000)}`;
    const randomPassword = [...Array(10)]
      .map(() => (Math.random().toString(36)[2]))
      .join('');

    return this.prisma.user.create({
      data: {
        yandexId: yandexProfile.id,
        name: yandexProfile.name.familyName,
        secondname: yandexProfile.name.givenName,
        email: yandexProfile.emails?.[0]?.value || '',  // Получение email
        nickname: randomNick,
        phone: yandexProfile.phone || '',
        password: randomPassword,
      },
    });
  }
  
}
