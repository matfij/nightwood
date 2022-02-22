import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DragonModule } from './api/dragons/dragon/dragon.module';
import { AuthModule } from './api/users/auth/auth.module';
import { UserModule } from './api/users/user/user.module';
import { DragonActionModule } from './api/dragons/dragon-action/dragon-action.module';
import { ItemModule } from './api/items/item/item.module';
import { ActionModule } from './api/users/action/action.module';
import { ChatModule } from './api/users/chat/chat.module';
import { DragonSkillsModule } from './api/dragons/dragon-skills/dragon-skills.module';
import { AuctionModule } from './api/items/auction/auction.module';
import { MailModule } from './api/users/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

const API_MODULES = [
  ActionModule,
  AuthModule,
  UserModule,
  MailModule,
  ChatModule,
  DragonModule,
  DragonActionModule,
  DragonSkillsModule,
  ItemModule,
  AuctionModule,
];

@Module({
  imports: [
    ...API_MODULES,
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
})
export class AppModule {}
