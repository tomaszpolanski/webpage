import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';

import { PrismicService, ContactSection, Section, SectionType } from '../../shared/prismic.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  contactsSection: Observable<ContactSection>;

  allSection: Observable<Section<SectionType>[]>;

  constructor(
      private prismic: PrismicService) {
    this.contactsSection = prismic.getContacts();

    Observable.of([1], [2]).reduce<number[]>((acc: number[], value) => value)

    this.allSection = Observable.merge(prismic.getProgrammingLanguages() .map( it => [it] ),
      prismic.getAbout())
      .reduce<Section<SectionType>[]>(
      (acc: Section<SectionType>[], value) => acc.concat(value))
      .map(it => it.sort((f, s) => f.order - s.order ));
  }

  ngOnInit() {
  }

}
