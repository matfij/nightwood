import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DragonActionModule } from 'src/api/dragons/dragon-action/dragon-action.module';
import { DragonModule } from 'src/api/dragons/dragon/dragon.module';
import { AuctionModule } from 'src/api/items/auction/auction.module';
import { ItemModule } from 'src/api/items/item/item.module';
import { ErrorService } from 'src/common/services/error.service';
import { GuildModule } from '../guilds/guild/guild.module';
import { AlchemyModule } from '../items/alchemy/alchemy.module';
import { AchievementsModule } from '../users/achievements/achievements.module';
import { MailModule } from '../users/mail/mail.module';
import { User } from '../users/user/model/user.entity';
import { UserModule } from '../users/user/user.module';
import { ActionGuildController } from './action-guild.controller';
import { ActionController } from './action.controller';
import { ActionDragonService } from './service/action-dragon.service';
import { ActionEventService } from './service/action-event.service';
import { ActionGuildService } from './service/action-guild.service';
import { ActionItemService } from './service/action-item.service';
import { ActionDragonTourneamentService } from './service/action-dragon-tournament.service';
import { ActionAdminController } from './action-admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        AchievementsModule,
        MailModule,
        DragonModule, 
        DragonActionModule,
        ItemModule,
        AlchemyModule,
        AuctionModule,
        MailModule,
        GuildModule,
    ],
    controllers: [
        ActionController,
        ActionGuildController,
        ActionAdminController,
    ],
    providers: [
        ActionDragonService,
        ActionEventService,
        ActionItemService,
        ActionGuildService,
        ActionDragonTourneamentService,
        ErrorService,
    ]
})
export class ActionModule {}
