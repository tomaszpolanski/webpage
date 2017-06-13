import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { PrismicService, TextSection, ContactSection } from '../../shared/prismic.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  fullSections: TextSection[];
  state: string;
  label = 'Kotlin';
  value = 80;
  badges = [{
    label: 'Java',
    value: 100,
  }, {
    label: 'C#',
    value: 80,
  }, {
    label: 'F#',
    value: 80,
  }, {
    label: 'Kotlin',
    value: 70,
  }, {
    label: 'JS',
    value: 70,
  }, {
    label: 'C++',
    value: 50,
  },
  ];
  contacts: ContactSection;

  constructor(
      private prismic: PrismicService,
      private iconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer) {
    prismic.getAbout().subscribe(it => {
      this.fullSections = it;
    });
    prismic.getContacts().subscribe(it => {
      this.contacts = it;
    });
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  ngOnInit() {
  }

}
