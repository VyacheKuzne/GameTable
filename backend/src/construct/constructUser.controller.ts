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
    @UseGuards(AuthGuard('jwt'))
  createWeapon(@Body() CreateWeaponDto: CreateWeaponDto, @Req() req: any) {
    const user = req.user as { id: number }
    return this.constructUserService.createWeapon(CreateWeaponDto, user);
  }
   @Post('createArmor')
    @UseGuards(AuthGuard('jwt'))
  createArmor(@Body() CreateArmorDto: CreateArmorDto, @Req() req: any) {
    const user = req.user as { id: number }
    return this.constructUserService.createArmor(CreateArmorDto, user);
  }
   @Post('createSkill')
    @UseGuards(AuthGuard('jwt'))
  createSkill(@Body() CreateSkillDto: CreateSkillDto, @Req() req: any) {
    const user = req.user as { id: number }
    return this.constructUserService.createSkill(CreateSkillDto, user);
  }
    @Get('checkTariff')
    @UseGuards(AuthGuard('jwt'))
    async checkCreator(@Req() req: any) {
      const user = req.user as { id: number }
      return this.constructUserService.checkTariff(user); // имя таблицы в Prisma
    }

    @Get('armor')
     @UseGuards(AuthGuard('jwt'))
       async getArmor(@Req() req: any) {
      const user = req.user as { id: number }
      return this.constructUserService.getArmor(user); // имя таблицы в Prisma
    }
     @Get('weapon')
     @UseGuards(AuthGuard('jwt'))
       async getWeapon(@Req() req: any) {
      const user = req.user as { id: number }
      return this.constructUserService.getWeapon(user); // имя таблицы в Prisma
    }
    //  @Get('skill/user')
    //  @UseGuards(AuthGuard('jwt'))
    //    async getSkill(@Req() req: any) {
    //   const user = req.user as { id: number }
    //   return this.constructUserService.getSkill(user); // имя таблицы в Prisma
    // }
}
