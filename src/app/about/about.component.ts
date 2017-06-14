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
  contactsSection: any;

  constructor(
      private prismic: PrismicService,
      private iconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer) {
    prismic.getAbout().subscribe(it => {
      this.fullSections = it;
    });
    prismic.getContacts().subscribe(it => {

      this.contactsSection = {
        title: it.title,
        contacts: it.contacts.map(({link, description, image}) => ({ link , description, image: sanitizer.bypassSecurityTrustResourceUrl(image) }))
        
      }
      this.contactsSection.contacts
      .forEach((itt, index) => iconRegistry.addSvgIcon(`tomek${index}`, itt.image));
      iconRegistry.getNamedSvgIcon('tomek0').subscribe(iit => console.log('QQQ56', iit))
      
    });
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  ngOnInit() {
  }

}
