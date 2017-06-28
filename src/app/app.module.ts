import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressSpinnerModule, MdCardModule, MdButtonModule, MdTooltipModule } from '@angular/material';

import { AppComponent } from './app.component';
import {
  PrismicService,
  GoogleAnalytics,
  GithubService,
  FeedbackService
} from '../shared';
import { AboutComponent } from './about/about.component';
import { BadgeComponent } from '../shared/badge/badge.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BadgeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,

    MdCardModule,
    MdProgressSpinnerModule,
    MdButtonModule,
    MdTooltipModule,
  ],
  providers: [
    GithubService,
    PrismicService,
    GoogleAnalytics,
    FeedbackService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
