import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { NgModule } from '@angular/core';
import { DraftSettingComponent } from './draft/draft-setting.component';
import { DraftStartComponent } from './draft/draft-start.component';

export const appRoutes: Routes = [
  { path: 'lobby', component: LobbyComponent },
  { path: 'game', component: GameComponent },
  { path: 'draft', component: DraftSettingComponent },
  { path: 'startDraft', component: DraftStartComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
