import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConstructUserDto } from './create-mob.dto';
import { CreateWeaponDto } from './create-weapon.dto';
import { CreateArmorDto } from './create-armor.dto';
import { CreateSkillDto } from './create-skill.dto';

@Injectable()
export class ConstructUserService {
  constructor(private readonly prisma: PrismaService) {}

  async createMob(createDto: CreateConstructUserDto) {
    return this.prisma.mob.create({
      data: createDto,
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
    console.debug(user.id)
    const Finduser = this.prisma.user.findUnique({
     where: {id:user.id }
    })
    if(Finduser.tarif == null){
      console.log(`у пользователя нет тарифа`)
      return
    }
    else
    {
      return true
    }
  }
}
