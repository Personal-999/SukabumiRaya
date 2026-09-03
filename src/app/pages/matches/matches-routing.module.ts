import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesComponent } from './matches.component';
import { MatchCenterComponent } from './components/match-center/match-center.component';

const routes: Routes = [
  { path: '', component: MatchesComponent },
  { path: ':id', component: MatchCenterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
