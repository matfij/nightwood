import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslateService } from 'src/common/services/translate.service';
import { User } from '../user/model/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './util/jwt.guard';
import { JwtStrategy } from './util/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(x: ConfigService) => ({ secret: x.get('JWT_KEY') }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    TranslateService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
