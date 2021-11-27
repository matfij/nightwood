import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/utils/auth.guard';

const routes: Routes = [
  { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule), canActivate: [AuthGuard] },
  { path: 'start', loadChildren: () => import('./pages/start/start.module').then(m => m.StartModule) },
  { path: '**', redirectTo: 'start', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
