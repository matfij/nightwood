import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DragonModule } from 'src/api/dragons/dragon/dragon.module';
import { ItemModule } from 'src/api/items/item/item.module';
import { User } from '../user/model/user.entity';
import { UserModule } from '../user/user.module';
import { ActionController } from './action.controller';
import { ActionDragonService } from './service/action-dragon.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        DragonModule, 
        ItemModule,
    ],
    controllers: [
        ActionController,
    ],
    providers: [
        ActionDragonService,
    ]
})
export class ActionModule {}
