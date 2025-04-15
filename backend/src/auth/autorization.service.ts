import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import * as bcrypt from 'bcrypt';
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
    const token = this.jwtService.sign({ id: user.id });
  
    return { user, token };
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async autorizationUser(user) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        nickname: user.nickname,
      }
    });
  
    if (!findUser) {
      throw new NotFoundException('Пользователь не найден');
    }
  
    const isPasswordValid = await bcrypt.compare(user.password, findUser.password);
  
    console.log('1:' + user.password)
    console.log('2:' + findUser.password)
    console.log(isPasswordValid)
  
    if (!isPasswordValid) {
      throw new NotFoundException('Неверный пароль');
    }
  
    return findUser;
  }
}
