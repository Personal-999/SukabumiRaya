import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';

@NgModule({
  declarations: [PlayersComponent, PlayerProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    PlayersRoutingModule
  ]
})
export class PlayersModule { }
