import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from 'src/common/services/error.service';
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
    ErrorService,
  ],
  exports: [
    DragonActionService,
  ],
})
export class DragonActionModule {}
