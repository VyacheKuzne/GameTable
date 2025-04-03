import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutorizationService } from './autorization.service';

@Controller('user')
export class AutorizationController {
  constructor(private readonly AutorizationService: AutorizationService) {}
    @Post('create')
    async createUser(@Body() Body:{
        name: string,
        email: string,
        password: string
        phone: string
    }){
        return this.AutorizationService.createUser(Body)
    }
}
