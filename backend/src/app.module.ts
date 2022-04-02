import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DragonModule } from './api/dragons/dragon/dragon.module';
import { AuthModule } from './api/users/auth/auth.module';
import { UserModule } from './api/users/user/user.module';
import { DragonActionModule } from './api/dragons/dragon-action/dragon-action.module';
import { ItemModule } from './api/items/item/item.module';
import { ChatModule } from './api/users/chat/chat.module';
import { DragonSkillsModule } from './api/dragons/dragon-skills/dragon-skills.module';
import { AuctionModule } from './api/items/auction/auction.module';
import { MailModule } from './api/users/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ActionModule } from './api/action/action.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';

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
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveStaticOptions: { redirect: false },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_ENDPOINT,
        port: +process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
  ],
  controllers: [],
})
export class AppModule {}
