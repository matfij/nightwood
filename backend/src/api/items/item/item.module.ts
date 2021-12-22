import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    ],
    exports: [
        ItemService,
    ],
})
export class ItemModule {}
