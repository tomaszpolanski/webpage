import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/merge';

import { PrismicService, Section, SectionType } from '../../shared/prismic.service';
import { GoogleAnalytics, FeedbackService } from '../../shared';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  allSection: Observable<Section<SectionType>[]>;

  constructor(
    public sanitizer: DomSanitizer,
    private prismic: PrismicService,
    private analytics: GoogleAnalytics,
    private feedback: FeedbackService) {

    this.allSection = Observable.merge(prismic.getProgrammingLanguages().map(it => [it]),
      prismic.getContacts().map(it => [it]),
      prismic.getAbout())
      .reduce<Section<SectionType>[]>(
      (acc: Section<SectionType>[], value) => acc.concat(value))
      .map(it => it.sort((f, s) => f.order - s.order));
  }

  contactPressed(url: string) {
    console.log('QQQ32', 'sadfasdfsfde');
    this.analytics.emitEvent('contact', url);
    this.feedback.tap();
  }

  ngOnInit() {
  }

}
