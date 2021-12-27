import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from 'src/api/users/auth/service/error.service';
import { ItemController } from './item.controller';
import { Item } from './model/item.entity';
import { ItemService } from './service/item.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
    ],
    controllers: [
        ItemController,
    ],
    providers: [
        ItemService,
        ErrorService,
    ],
    exports: [
        ItemService,
    ],
})
export class ItemModule {}
