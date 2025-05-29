import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создаем оружие
  const sword = await prisma.weapon.create({
    data: {
      name: 'Меч',
      damage: 15,
    },
  });

  const shield = await prisma.armor.create({
    data: {
      name: 'Щит',
      defense: 10,
    },
  });
  await prisma.user.create({
    data: {
      name: "Тест",
      secondname: "Пользователь",
      email: "test@example.com",
      phone: "+79991234567",
      password: "hashed_password", // обязательно хешируй на практике
      nickname: "testuser",
      role: "user",
      status: "active",
      yandexId: null,
      avatar: null,
      createdSessionId: null,
      idTariff: null,
      idSession: null,
    },
  });
  // Создаем мобов
  const goblin = await prisma.mob.create({
    data: {
      name: 'Гоблин',
      health: 30,
      speed: 10,
      weaponId: sword.id,
      armorId: shield.id,
      creatorId: 1,
      manevr: 16,
    },
  });

  const orc = await prisma.mob.create({
    data: {
      name: 'Орк',
      health: 50,
      speed: 7,
      creatorId: 1,
      manevr: 13,
    },
  });

  // // Устанавливаем порядок ходов
  // await prisma.turnOrder.createMany({
  //   data: [
  //     { mobId: goblin.id, turnIndex: 1 },
  //     { mobId: orc.id, turnIndex: 2 },
  //   ],
  // });

  console.log('Seed успешно выполнен!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
