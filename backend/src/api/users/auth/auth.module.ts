import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from 'src/api/items/item/item.module';
import { User } from '../user/model/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { ErrorService } from '../../../common/services/error.service';
import { JwtAuthGuard } from './util/jwt.guard';
import { JwtStrategy } from './util/jwt.strategy';
import { DateService } from 'src/common/services/date.service';
import { EmailService } from 'src/common/services/email.service';
import { AchievementsModule } from '../achievements/achievements.module';
import { JWT_VALIDITY } from 'src/configuration/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(x: ConfigService) => ({ 
        secret: x.get('JWT_KEY'), 
        signOptions: { expiresIn: JWT_VALIDITY } 
      }),
    }),
    ItemModule,
    AchievementsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    ErrorService,
    DateService,
    EmailService,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
