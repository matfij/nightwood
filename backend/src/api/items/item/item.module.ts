import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/api/users/user/user.module';
import { ItemController } from './item.controller';
import { Item } from './model/item.entity';
import { ItemService } from './service/item.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
        UserModule,
    ],
    controllers: [
        ItemController,
    ],
    providers: [
        ItemService,
    ]
})
export class ItemModule {}
