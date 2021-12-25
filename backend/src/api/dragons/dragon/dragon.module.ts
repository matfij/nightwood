import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/api/users/user/user.module';
import { DateService } from 'src/common/services/date.service';
import { TranslateService } from 'src/common/services/translate.service';
import { DragonActionModule } from '../dragon-action/dragon-action.module';
import { DragonController } from './dragon.controller';
import { Dragon } from './model/dragon.entity';
import { DragonService } from './service/dragon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dragon]),
    DragonActionModule,
    UserModule,
  ],
  controllers: [
    DragonController,
  ],
  providers: [
    DragonService,
    TranslateService,
    DateService,
  ],
  exports: [
    DragonService,
  ],
})
export class DragonModule {}
