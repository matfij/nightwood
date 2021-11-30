import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { DEFAULT_LANG } from './configuration/app.config';
import { DragonModule } from './api/dragon/dragon.module';
import * as path from 'path';

const API_MODULES = [
  AuthModule,
  UserModule,
  DragonModule,
];

@Module({
  imports: [
    ...API_MODULES,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANG,
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, 'assets/i18n/'),
        watch: true,
      },
    }),
  ],
  controllers: [],
})
export class AppModule {}
