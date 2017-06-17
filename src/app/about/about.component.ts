import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { PrismicService, ContactSection, Section, Programming } from '../../shared/prismic.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  contactsSection: Observable<ContactSection>;

  allSection: Observable<Section<String | Programming>[]>;

  constructor(
      private prismic: PrismicService,
      private iconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer) {
    this.contactsSection = prismic.getContacts();
    this.allSection = Observable.combineLatest(prismic.getProgrammingLanguages(), prismic.getAbout(),
      (p, t) => [p, ...t].sort( (f: Section<any>, s: Section<any>) => f.order - s.order )).share();
  }

  ngOnInit() {
  }

}
