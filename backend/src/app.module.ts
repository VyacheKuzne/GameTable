import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoblistModule } from './MobList/moblist.module';

@Module({
  imports: [ MoblistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
