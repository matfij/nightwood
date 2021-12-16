import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/api/users/user/user.module';
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
    DragonController
  ],
  providers: [
    DragonService,
  ],
})
export class DragonModule {}
