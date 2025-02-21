import { Controller, Get } from '@nestjs/common';
import { MoblistService } from './moblist.service';

@Controller('moblist')

export class MoblistController {
    constructor (private readonly MoblistService:MoblistService) {}
    @Get('Mob')
    async getMoblist(){
        return this.MoblistService.getMoblist();
    }
}
