import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptDragonComponent } from './adopt-dragon/adopt-dragon.component';
import { ArenaComponent } from './arena/arena.component';
import { ExpeditionsComponent } from './expeditions/expeditions.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MyDragonsComponent } from './my-dragons/my-dragons.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'adopt-dragon', component: AdoptDragonComponent },
  { path: 'my-dragons', component: MyDragonsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'expeditions', component: ExpeditionsComponent },
  { path: 'arena', component: ArenaComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
