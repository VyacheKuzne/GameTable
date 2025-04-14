import { Injectable } from '@nestjs/common';
import { PrismaClient, Tariff } from '@prisma/client';
// import { use } from 'passport';

@Injectable()
export class TariffService {
  private prisma = new PrismaClient();

  async getTariffs(): Promise<Tariff[]> {
    return await this.prisma.tariff.findMany();
  }


  async creatTariff(tariff: Tariff): Promise<Tariff> {
    const createdTarif = await this.prisma.tariff.create({
      data: tariff,
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
      throw new Error('Тариф  не найден');
    }
    console.log('удаляем пользователя');
    const deleteTariffConfirm = await this.prisma.tariff.update({
      where: { idTariff: tariff.idTariff },
      data: { status: 'delete' },
    });
    return deleteTariffConfirm;
  }
}
