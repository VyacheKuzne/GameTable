import {
  Injectable,
  NotFoundException,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'; // Импортируем Response из express
import { error } from 'console';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { User } from '@prisma/client';
import { Response as ExpressResponse } from 'express';

@Injectable()
export class AutorizationService {
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
    const token = this.jwtService.sign({ id: user.id, status: user.status, role: user.role });

    return { user, token };
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async autorizationUser(user) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        nickname: user.nickname,
        status: 'active',
      },
    });

    if (!findUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      findUser.password,
    );

    // console.log('1:' + user.password)
    // console.log('2:' + findUser.password)
    // console.log(isPasswordValid)

    if (!isPasswordValid) {
      throw new NotFoundException('Неверный пароль');
    }
    const token = this.jwtService.sign({
      id: findUser.id,
      status: findUser.status,
      role: findUser.role
    });
    return { findUser, token };
  }

  generateJwt(user): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async logout(res: Response) {
    res.setHeader('Set-Cookie', [
      `session=; Path=/; Domain=${process.env.COOKIE_DOMAIN || 'localhost'}; ` +
        'Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly' +
        (process.env.NODE_ENV === 'production' ? '; Secure' : ''),
    ]);

    return { redirectUrl: '/aftorization' };
  }


  // src/auth/auth.service.ts
async validateYandexUser(profile) {
  console.debug('данные для регистрации по яндекс')
  console.debug(profile)
  let user = await this.prisma.user.findUnique({
    where: { yandexId: profile.yandexId },
  });

  if (!user) {
    user = await this.prisma.user.create({
      data: {
        yandexId: profile.yandexId,
        email: profile.email,
        name: profile.name,
        secondname: '123123',
        phone: '123123',
        password: '1231231',
        nickname: '12313',
      },
    });
  }
    const token = this.jwtService.sign({ id: user.id, status: user.status, role: user.role});

  return {user,token};
}


}
