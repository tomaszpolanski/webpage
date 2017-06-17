import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { PrismicService, TextSection, ContactSection, ProgrammingSection } from '../../shared/prismic.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  fullSections: Observable<TextSection[]>;
  contactsSection: Observable<ContactSection>;
  programmingSection: Observable<ProgrammingSection>;

  constructor(
      private prismic: PrismicService,
      private iconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer) {
    this.programmingSection = prismic.getProgrammingLanguages();
    this.fullSections = prismic.getAbout();
    this.contactsSection = prismic.getContacts();
  }

  ngOnInit() {
  }

}
