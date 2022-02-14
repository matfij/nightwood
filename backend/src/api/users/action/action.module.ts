import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DragonActionModule } from 'src/api/dragons/dragon-action/dragon-action.module';
import { DragonModule } from 'src/api/dragons/dragon/dragon.module';
import { AuctionModule } from 'src/api/items/auction/auction.module';
import { ItemModule } from 'src/api/items/item/item.module';
import { ErrorService } from 'src/common/services/error.service';
import { User } from '../user/model/user.entity';
import { UserModule } from '../user/user.module';
import { ActionController } from './action.controller';
import { ActionDragonService } from './service/action-dragon.service';
import { ActionEventService } from './service/action-event.service';
import { ActionItemService } from './service/action-item.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        DragonModule, 
        DragonActionModule,
        ItemModule,
        AuctionModule,
    ],
    controllers: [
        ActionController,
    ],
    providers: [
        ActionDragonService,
        ActionEventService,
        ActionItemService,
        ErrorService,
    ]
})
export class ActionModule {}
