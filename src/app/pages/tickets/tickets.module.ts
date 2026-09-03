import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';


@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }

