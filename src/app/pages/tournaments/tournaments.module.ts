import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentsComponent } from './tournaments.component';


@NgModule({
  declarations: [TournamentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TournamentsRoutingModule
  ]
})
export class TournamentsModule { }

