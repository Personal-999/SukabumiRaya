import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TeamPlayersComponent } from './components/team-players/team-players.component';
import { TeamsBracketsComponent } from './components/teams-brackets/teams-brackets.component';


@NgModule({
  declarations: [TeamsComponent, TeamDetailsComponent, TeamPlayersComponent, TeamsBracketsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TeamsRoutingModule
  ]
})
export class TeamsModule { }

