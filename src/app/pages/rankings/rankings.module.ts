import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { RankingsRoutingModule } from './rankings-routing.module';
import { RankingsComponent } from './rankings.component';
import { RankingHistoryComponent } from './components/ranking-history/ranking-history.component';


@NgModule({
  declarations: [RankingsComponent, RankingHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RankingsRoutingModule
  ]
})
export class RankingsModule { }

