import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создаем оружие
  const sword = await prisma.weapon.create({
    data: {
      name: 'Меч',
      damage: 15,
      weight: 5,
    },
  });

  const shield = await prisma.armor.create({
    data: {
      name: 'Щит',
      defense: 10,
      weight: 7,
    },
  });

  // Создаем мобов
  const goblin = await prisma.mob.create({
    data: {
      name: 'Гоблин',
      health: 30,
      attack: 5,
      defense: 2,
      speed: 10,
      weaponId: sword.id,
      armorId: shield.id,
    },
  });

  const orc = await prisma.mob.create({
    data: {
      name: 'Орк',
      health: 50,
      attack: 8,
      defense: 5,
      speed: 7,
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
