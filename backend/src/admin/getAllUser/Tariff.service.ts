import { Injectable } from '@nestjs/common';
import { PrismaClient, Tariff, User } from '@prisma/client';
// import { use } from 'passport';

@Injectable()
export class TariffService {
  private prisma = new PrismaClient();

  async getTariffs(): Promise<Tariff[]> {
    return await this.prisma.tariff.findMany();
  }

async creatTariff(tariff: Tariff, user: { id: number }): Promise<Tariff> {
  // Проверка, существует ли уже тариф с таким именем
  const existingTariff = await this.prisma.tariff.findFirst({
    where: {
      name: tariff.name,  // Ищем тариф по имени
    },
  });

  // Если тариф с таким именем найден, выбрасываем ошибку
  if (existingTariff) {
    throw new Error(`Тариф с именем "${tariff.name}" уже существует.`);
  }

  // Если тариф уникален, создаем новый
  const createdTarif = await this.prisma.tariff.create({
    data: {
      ...tariff,
      createrId: user.id,
    },
  });

  return createdTarif;
}

  async updateTariff(tariff: Tariff): Promise<Tariff> {
    const findTariff = await this.prisma.tariff.findUnique({
      where: { idTariff: tariff.idTariff },
    });

    if (!findTariff) {
      throw new Error('Пользователь не найден');
    }

    console.log('Обновляемые данные пользователя:', tariff);
    const dataForUpdate: Partial<Tariff> = {};
    for (const key in tariff) {
      if (key !== 'idTariff' && tariff[key as keyof Tariff] !== undefined) {
        dataForUpdate[key] = tariff[key as keyof Tariff];
      }
    }
    const updatedTariff = await this.prisma.tariff.update({
      where: { idTariff: tariff.idTariff },
      data: dataForUpdate,
    });

    console.log('Обновленные данные пользователя:', updatedTariff); // Логируем обновленные данные
    return updatedTariff;
  }
async deleteTariff(tariff: Tariff): Promise<Tariff> {
  const findTariff = await this.prisma.tariff.findUnique({
    where: { idTariff: tariff.idTariff },
  });

  if (!findTariff) {
    throw new Error('Тариф не найден');
  }

  // Проверка: используется ли тариф хотя бы одним пользователем
  const usersUsingTariff = await this.prisma.user.findFirst({
    where: {
      tarif: {
        idTariff: tariff.idTariff,
      },
    },
  });

  if (usersUsingTariff) {
    throw new Error('Нельзя удалить тариф: он используется хотя бы одним пользователем');
  }

  // Удаление (смена статуса)
  const deleteTariffConfirm = await this.prisma.tariff.update({
    where: { idTariff: tariff.idTariff },
    data: { status: 'delete' },
  });

  return deleteTariffConfirm;
}

  async buyTariff( user: { id: number }, tariff: Tariff): Promise<User> {
    const createdTarif = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        idTariff: tariff.idTariff
      }
    });
    await this.prisma.purchasedTariffs.create({
      data:{
        userId: user.id,
        tariffId: tariff.idTariff,
        priceAtPurchase: tariff.price
      }
    })
    await this.prisma.leftTime.create({
      data:{
        userId: user.id,
        time: tariff.availableTime,
        tariffId: tariff.idTariff
      }
    })
    return createdTarif;
  }
 async findTariffsByName(name?: string): Promise<Tariff[]> {
    if (!name || name.trim() === '') {
      return this.prisma.tariff.findMany();
    }

    // Регистронезависимый поиск для MySQL
    return this.prisma.$queryRaw`
      SELECT * FROM Tariff 
      WHERE name LIKE CONCAT('%', ${name}, '%')
      COLLATE utf8mb4_general_ci
    `;
  }

  // tariff.service.ts

async sortTariffs(order: 'asc' | 'desc') {
  return this.prisma.tariff.findMany({
    orderBy: {
      name: order
    }
  });
}
async restoreTariff(idTariff: number) {
  return this.prisma.tariff.update({
    where: { idTariff },
    data: { status: 'active' },
  });
}
}
