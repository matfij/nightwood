import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ItemModule } from 'src/api/items/item/item.module';
import { ErrorService } from '../../../common/services/error.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    ItemModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
    ErrorService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}
