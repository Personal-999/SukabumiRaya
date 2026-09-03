import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { DrawsComponent } from './components/draws/draws.component';
import { MatchCenterComponent } from './components/match-center/match-center.component';
import { BracketItemComponent } from './components/bracket-item/bracket-item.component';
import { GroupStandingsComponent } from './components/group-standings/group-standings.component';

@NgModule({
  declarations: [MatchesComponent, DrawsComponent, MatchCenterComponent, BracketItemComponent, GroupStandingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatchesRoutingModule
  ]
})
export class MatchesModule { }

