import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptDragonComponent } from './adopt-dragon/adopt-dragon.component';
import { AlchemyComponent } from './alchemy/alchemy.component';
import { ArenaComponent } from './arena/arena.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { CraftingComponent } from './crafting/crafting.component';
import { DragonSummonComponent } from './dragon-summon/dragon-summon.component';
import { DragonTamerComponent } from './dragon-tamer/dragon-tamer.component';
import { ExpeditionsComponent } from './expeditions/expeditions.component';
import { GuildComponent } from './guild/guild.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MailComponent } from './mail/mail.component';
import { MyDragonsComponent } from './my-dragons/my-dragons.component';
import { ShoutboxComponent } from './shoutbox/shoutbox.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'adopt-dragon', component: AdoptDragonComponent },
  { path: 'my-dragons', component: MyDragonsComponent },
  { path: 'summon-dragon', component: DragonSummonComponent },
  { path: 'dragon-tamer', component: DragonTamerComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'expeditions', component: ExpeditionsComponent },
  { path: 'arena', component: ArenaComponent },
  { path: 'arena/:id', component: ArenaComponent },
  { path: 'auctions', component: AuctionsComponent },
  { path: 'mail', component: MailComponent },
  { path: 'shoutbox', component: ShoutboxComponent },
  { path: 'crafting', component: CraftingComponent },
  { path: 'alchemy', component: AlchemyComponent },
  { path: 'guild', component: GuildComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
