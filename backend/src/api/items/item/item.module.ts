import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorService } from 'src/common/services/error.service';
import { MathService } from 'src/common/services/math.service';
import { ItemController } from './item.controller';
import { Item } from './model/item.entity';
import { ItemRuneService } from './service/item-rune.service';
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
        ItemRuneService,
        ErrorService,
        MathService,
    ],
    exports: [
        ItemService,
        ItemRuneService,
    ],
})
export class ItemModule {}
