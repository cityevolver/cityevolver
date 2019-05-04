import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IssueComponent} from './issue/issue.component';
import {MapOverviewComponent} from './map-overview/map-overview.component';

const routes: Routes = [
  { path: 'dashboard', component: MapOverviewComponent },
  { path: 'issue', component: IssueComponent },
  { path: '', redirectTo: 'issue', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
