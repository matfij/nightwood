import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DragonActionController } from './dragon-action.controller';
import { DragonAction } from './model/dragon-action.entity';
import { DragonActionService } from './service/dragon-action.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DragonAction]),
  ],
  controllers: [
    DragonActionController,
  ],
  providers: [
    DragonActionService,
  ],
  exports: [
    DragonActionService,
  ],
})
export class DragonActionModule {}
