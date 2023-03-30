import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../../core/core.module';
import { AdoptDragonComponent } from './adopt-dragon/adopt-dragon.component';
import { MyDragonsComponent } from './my-dragons/my-dragons.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ExpeditionsComponent } from './expeditions/expeditions.component';
import { ArenaComponent } from './arena/arena.component';
import { ShoutboxComponent } from './shoutbox/shoutbox.component';
import { FormsModule } from '@angular/forms';
import { AuctionsComponent } from './auctions/auctions.component';
import { MailComponent } from './mail/mail.component';
import { CraftingComponent } from './crafting/crafting.component';
import { DragonTamerComponent } from './dragon-tamer/dragon-tamer.component';
import { DragonSummonComponent } from './dragon-summon/dragon-summon.component';
import { AlchemyComponent } from './alchemy/alchemy.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GuildComponent } from './guild/guild.component';
import { FounderGuildComponent } from './guild/founder-guild/founder-guild.component';
import { NoGuildComponent } from './guild/no-guild/no-guild.component';
import { CreateGuildComponent } from './guild/no-guild/create-guild/create-guild.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdoptDragonComponent,
    MyDragonsComponent,
    InventoryComponent,
    ExpeditionsComponent,
    ArenaComponent,
    ShoutboxComponent,
    AuctionsComponent,
    MailComponent,
    CraftingComponent,
    DragonTamerComponent,
    DragonSummonComponent,
    AlchemyComponent,
    UserProfileComponent,
    GuildComponent,
    FounderGuildComponent,
    NoGuildComponent,
    CreateGuildComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GameRoutingModule,
    CoreModule.forChild(),
  ]
})
export class GameModule {}
