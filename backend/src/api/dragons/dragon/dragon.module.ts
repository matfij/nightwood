import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from 'src/common/services/error.service';
import { DateService } from 'src/common/services/date.service';
import { DragonActionModule } from '../dragon-action/dragon-action.module';
import { DragonController } from './dragon.controller';
import { Dragon } from './model/dragon.entity';
import { DragonService } from './service/dragon.service';
import { DragonBattleService } from './service/dragon-battle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dragon]),
    DragonActionModule,
  ],
  controllers: [
    DragonController,
  ],
  providers: [
    DragonService,
    DragonBattleService,
    ErrorService,
    DateService,
  ],
  exports: [
    DragonService,
  ],
})
export class DragonModule {}
