import { Module } from '@nestjs/common';
import { ActionService } from './service/action.service';
import { ActionController } from './action.controller';
import { Action } from './model/action.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Action]),
  ],
  controllers: [
    ActionController,
  ],
  providers: [
    ActionService,
  ]
})
export class ActionModule {}
