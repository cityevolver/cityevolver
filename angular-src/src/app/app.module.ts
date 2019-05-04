import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapOverviewComponent } from './map-overview/map-overview.component';
import { IssueComponent } from './issue/issue.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapOverviewComponent,
    IssueComponent,
    CreateIssueComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
