import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressSpinnerModule, MdCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { GithubService } from '../shared/github.service';
import { PrismicService } from '../shared/prismic.service';
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
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule,
    MdCardModule,
  ],
  providers: [GithubService, PrismicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
