import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import Prismic from 'prismic.io';
import { DomSanitizer } from '@angular/platform-browser';

export interface Section<T> {
  order: number;
  size: 'full' | 'long' | 'short';
  kind: 'text' | 'programming';
  title: string;
  content: T[];
}

export interface Contact {
  link: string;
  description: string;
  image: string;
}

export interface ContactSection {
  title: string;
  contacts: Contact[];
}

export interface Programming {
  label: string;
  value: number;
}

const documentTypes = {
  about: 'aboutview',
  contact: 'contact',
};

export type SectionType = String | Programming;

const badges: Programming[] = [{
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

const programmingOrder = 2;

@Injectable()
export class PrismicService {

  private api: any;

  constructor(private sanitizer: DomSanitizer) {
    this.api = Prismic.api('https://websentation.prismic.io/api');
  }

  private getDocumentsOfType(typeId: string): Observable<any> {
    return Observable.fromPromise(this.api.then((api: any) => api.query(Prismic.Predicates.at('document.type', typeId))));
  };

  getContacts(): Observable<ContactSection> {
    return this.getDocumentsOfType(documentTypes.contact)
      .map(((contact: any) => {
        const contacts: Contact[] = contact.results[0]
          .getGroup('contact.contact')
          .toArray()
          .map((it: any) => {
            return {
              link: this.sanitizer.bypassSecurityTrustUrl(it.getText('link')),
              description: it.getText('description'),
              image: it.getImage('image').url,
            };
          });
        return {
          title: contact.results[0].getStructuredText('contact.title').asText(),
          contacts,
        };
      }));
  }

  getProgrammingLanguages(): Observable<Section<Programming>> {
    return Observable.of({
      order: programmingOrder,
      size: 'full',
      kind: 'programming',
      title: 'Programming',
      content: badges });
  }

  getAbout(): Observable<Section<String>[]> {
    return this.getDocumentsOfType(documentTypes.about)
      .map((about: any) => {
        return about.results[0]
          .getGroup('aboutview.about-section')
          .toArray()
          .map((it: any, index: number) => ({
            size: index % 2 === 0 ? 'short' : 'long',
            order: index < programmingOrder ? index : index + 1,
            kind: 'text',
            title: it.getText('title'),
            content: it.getStructuredText('content').asHtml(),
          }));
      });
  };


}

