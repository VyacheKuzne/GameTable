import { Controller, Post, Body } from '@nestjs/common';
import { ConstructUserService } from './constructUser.service';
import { CreateConstructUserDto } from './create-mob.dto';
import { CreateWeaponDto } from './create-weapon.dto';
import { CreateArmorDto } from './create-armor.dto';
import { CreateSkillDto } from './create-skill.dto';
@Controller('construct-user')
export class ConstructUserController {
  constructor(private readonly constructUserService: ConstructUserService) {}

  @Post('createMob')
  createMob(@Body() dto: CreateConstructUserDto) {
    return this.constructUserService.createMob(dto);
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
}
