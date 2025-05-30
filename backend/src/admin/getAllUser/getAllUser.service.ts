import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class GetAllUserService {
  private prisma = new PrismaClient();

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async deleteUser(user: User): Promise<User> {
    const findUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!findUser) {
      throw new Error('Пользователь не найден');
    }
    console.log('удаляем пользователя');
    const deleteUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { status: 'delete' },
    });
    return deleteUser;
  }

  async updateUser(user: User): Promise<User> {
    const findUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!findUser) {
      throw new Error('Пользователь не найден');
    }

    console.log('Обновляемые данные пользователя:', user);
    const dataForUpdate: Partial<User> = {};
    for (const key in user) {
      if (key !== 'id' && user[key as keyof User] !== undefined) {
        dataForUpdate[key] = user[key as keyof User];
      }
    }
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: dataForUpdate,
    });

    console.log('Обновленные данные пользователя:', updatedUser); // Логируем обновленные данные
    return updatedUser;
  }

  async restoreUser(id: number) {
  return this.prisma.user.update({
    where: { id: id },
    data: { status: 'active' },
  });
}
}
