import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../../core/core.module';
import { AdoptDragonComponent } from './adopt-dragon/adopt-dragon.component';
import { MyDragonsComponent } from './my-dragons/my-dragons.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdoptDragonComponent,
    MyDragonsComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    CoreModule.forChild(),
  ]
})
export class GameModule {}
