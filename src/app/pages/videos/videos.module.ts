import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';

@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    VideosRoutingModule
  ]
})
export class VideosModule { }


