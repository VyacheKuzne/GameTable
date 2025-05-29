import { Controller, Post, Body, Get, Req, UseGuards  } from '@nestjs/common';
import { ConstructUserService } from './constructUser.service';
import { CreateConstructUserDto } from './create-mob.dto';
import { CreateWeaponDto } from './create-weapon.dto';
import { CreateArmorDto } from './create-armor.dto';
import { CreateSkillDto } from './create-skill.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('construct-user')
export class ConstructUserController {
  constructor(private readonly constructUserService: ConstructUserService) {}

  @Post('createMob')
    @UseGuards(AuthGuard('jwt'))
  createMob(@Body() dto: CreateConstructUserDto, @Req() req: any) {
          const user = req.user as { id: number }
    return this.constructUserService.createMob(dto, user);
  }
   @Post('createWeapon')
  createWeapon(@Body() CreateWeaponDto: CreateWeaponDto) {
    return this.constructUserService.createWeapon(CreateWeaponDto);
  }
   @Post('createArmor')
  createArmor(@Body() CreateArmorDto: CreateArmorDto) {
    return this.constructUserService.createArmor(CreateArmorDto);
  }
   @Post('createSkill')
  createSkill(@Body() CreateSkillDto: CreateSkillDto) {
    return this.constructUserService.createSkill(CreateSkillDto);
  }
    @Get('checkTariff')
    @UseGuards(AuthGuard('jwt'))
    async checkCreator(@Req() req: any) {
      const user = req.user as { id: number }
      return this.constructUserService.checkTariff(user); // имя таблицы в Prisma
    }
}
