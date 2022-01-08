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

@NgModule({
  declarations: [
    HomeComponent,
    AdoptDragonComponent,
    MyDragonsComponent,
    InventoryComponent,
    ExpeditionsComponent,
    ArenaComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    CoreModule.forChild(),
  ]
})
export class GameModule {}
