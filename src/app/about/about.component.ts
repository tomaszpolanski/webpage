import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { PrismicService, TextSection, ContactSection, ProgrammingSection } from '../../shared/prismic.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  fullSections: TextSection[];
  contactsSection: ContactSection;
  programmingSection: ProgrammingSection;

  constructor(
      private prismic: PrismicService,
      private iconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer) {
    prismic.getProgrammingLanguages().subscribe(it =>  this.programmingSection = it);
    prismic.getAbout().subscribe(it =>  this.fullSections = it);
    prismic.getContacts().subscribe(it => this.contactsSection = it);
  }

  ngOnInit() {
  }

}
