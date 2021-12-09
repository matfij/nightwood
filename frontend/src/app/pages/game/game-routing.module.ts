import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptDragonComponent } from './adopt-dragon/adopt-dragon.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'adopt-dragon', component: AdoptDragonComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
