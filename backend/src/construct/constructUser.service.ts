import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConstructUserDto } from './create-mob.dto';
import { CreateWeaponDto } from './create-weapon.dto';
import { CreateArmorDto } from './create-armor.dto';
import { CreateSkillDto } from './create-skill.dto';

@Injectable()
export class ConstructUserService {
  constructor(private readonly prisma: PrismaService) {}

async createMob(createDto: CreateConstructUserDto, user) {
  return this.prisma.mob.create({
    data: {
      ...createDto,
      creatorId: user.id,
    },
  });
}

   async createWeapon(CreateWeaponDto: CreateWeaponDto) {
    return this.prisma.weapon.create({
      data: CreateWeaponDto,
    });
  }
   async createArmor(CreateArmorDto: CreateArmorDto) {
    return this.prisma.armor.create({
      data: CreateArmorDto,
    });
  }
     async createSkill(CreateSkillDto: CreateSkillDto) {
      return this.prisma.skill.create({
      data: CreateSkillDto,
    });
  }
async checkTariff(user: { id: number }) {
  const foundUser = await this.prisma.user.findUnique({
    where: { id: user.id },
    include: { tarif: true },
  });

  if (!foundUser || !foundUser.tarif) {
    return {
      hasTariff: false,
      currentMobCount: 0,
      maxMobCount: 0,
    };
  }

  const mobCount = await this.prisma.mob.count({
    where: { creatorId: user.id },
  });

  return {
    hasTariff: true,
    currentMobCount: mobCount,
    maxMobCount: foundUser.tarif.availableMobs,
  };
}

}
