import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from 'src/common/services/error.service';
import { DateService } from 'src/common/services/date.service';
import { DragonActionModule } from '../dragon-action/dragon-action.module';
import { DragonController } from './dragon.controller';
import { Dragon } from './model/dragon.entity';
import { DragonService } from './service/dragon.service';
import { DragonBattleService } from './service/dragon-battle.service';
import { MathService } from 'src/common/services/math.service';
import { DragonSkillsModule } from '../dragon-skills/dragon-skills.module';
import { DataService } from 'src/common/services/data.service';
import { BattleHelperService } from './service/dragon-helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dragon]),
    DragonActionModule,
    DragonSkillsModule,
  ],
  controllers: [
    DragonController,
  ],
  providers: [
    DragonService,
    DragonBattleService,
    BattleHelperService,
    ErrorService,
    DataService,
    DateService,
    MathService,
  ],
  exports: [
    DragonService,
  ],
})
export class DragonModule {}
