import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataApiService} from './data-api.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DataApiService]
})
export class AppRoutingModule { }
