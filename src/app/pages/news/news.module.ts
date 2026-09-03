import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }


