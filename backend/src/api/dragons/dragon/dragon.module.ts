import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DragonController } from './dragon.controller';
import { Dragon } from './model/dragon.entity';
import { DragonService } from './service/dragon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dragon]),
  ],
  controllers: [
    DragonController
  ],
  providers: [
    DragonService,
  ],
})
export class DragonModule {}
