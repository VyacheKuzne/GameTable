import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MoblistService } from './moblist.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('moblist')

export class MoblistController {
    constructor (private readonly MoblistService:MoblistService) {}
    @Get('Mob')
      @UseGuards(AuthGuard('jwt'))
    async getMoblist(@Req() req: any){
        const user = req.user as { id: number} 
        return this.MoblistService.getMoblist(user);
    }
}
