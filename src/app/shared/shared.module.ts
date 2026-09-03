import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CountryFlagComponent } from './components/country-flag/country-flag.component';
import { SponsorCardComponent } from './components/sponsor-card/sponsor-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CountryFlagComponent,
    SponsorCardComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    CountryFlagComponent,
    SponsorCardComponent,
    LoadingSpinnerComponent,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {}
