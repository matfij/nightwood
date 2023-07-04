import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from 'src/common/services/date.service';
import { ErrorService } from 'src/common/services/error.service';
import { MathService } from 'src/common/services/math.service';
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
    DateService,
    MathService,
  ],
  exports: [
    DragonActionService,
  ],
})
export class DragonActionModule {}
