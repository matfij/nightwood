import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from 'src/common/services/date.service';
import { ErrorService } from 'src/common/services/error.service';
import { AlchemyController } from './alchemy.controller';
import { Booster } from './model/booster.entity';
import { Mixture } from './model/mixture.entity';
import { AlchemyService } from './service/alchemy.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booster, Mixture]),
  ],
  controllers: [
    AlchemyController,
  ],
  providers: [
    AlchemyService,
    DateService,
    ErrorService,
  ],
  exports: [
    AlchemyService,
  ]
})
export class AlchemyModule {}
