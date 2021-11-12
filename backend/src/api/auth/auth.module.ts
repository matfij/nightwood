import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './util/jwt.guard';
import { JwtStrategy } from './util/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(x: ConfigService) => ({ secret: x.get('JWT_KEY') }),
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
