import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventScheduleComponent } from './components/event-schedule/event-schedule.component';

@NgModule({
  declarations: [EventsComponent, EventDetailsComponent, EventScheduleComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }


