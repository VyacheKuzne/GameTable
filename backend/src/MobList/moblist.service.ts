import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class MoblistService {
    constructor (private prisma:PrismaService) {}
    async getMoblist() {
        return this.prisma.mob.findMany();
    }
}
