import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../../core/core.module';
import { AdoptDragonComponent } from './adopt-dragon/adopt-dragon.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdoptDragonComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    CoreModule.forChild(),
  ]
})
export class GameModule {}
