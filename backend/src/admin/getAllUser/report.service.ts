import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async generateTariffPurchasesReport(res: Response) {
    const purchases = await this.prisma.purchasedTariffs.findMany({
      include: {
        user: true,
        tariff: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tariff Purchases');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Почта пользователя', key: 'email', width: 30 },
      { header: 'Название тарифа', key: 'tariffName', width: 30 },
      { header: 'Статус', key: 'status', width: 15 },
      { header: 'Цена на момент покупки', key: 'price', width: 15 },
      { header: 'Куплен', key: 'createdAt', width: 25 },
    ];

    purchases.forEach((purchase) => {
      worksheet.addRow({
        id: purchase.id,
        email: purchase.user.email,
        tariffName: purchase.tariff.name,
        price: purchase.priceAtPurchase,
        createdAt: purchase.createdAt.toISOString(),
      });
    });

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="tariff_purchases.xlsx"',
    });

    await workbook.xlsx.write(res); // <--- важно не использовать `res.end()` вручную
  }
}
