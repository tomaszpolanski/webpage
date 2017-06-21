import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import Prismic from 'prismic.io';

export interface Section<T> {
  order: number;
  size: 'full' | 'long' | 'short';
  kind: 'text' | 'programming' | 'contact';
  title: string;
  content: T[];
}

export interface Contact {
  link: string;
  description: string;
  image: string;
}

export interface Programming {
  label: string;
  value: number;
}

const documentTypes = {
  about: 'aboutview',
  contact: 'contact',
};

export type SectionType = String | Programming | Contact;

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

  constructor() {
    this.api = Prismic.api('https://websentation.prismic.io/api');
  }

  private getDocumentsOfType(typeId: string): Observable<any> {
    return Observable.fromPromise(this.api.then((api: any) => api.query(Prismic.Predicates.at('document.type', typeId))));
  };

  getContacts() {
    return this.getDocumentsOfType(documentTypes.contact)
      .map<any, Section<Contact>>((contact => {
        const contacts: Contact[] = contact.results[0]
          .getGroup('contact.contact')
          .toArray()
          .map((it: any) => {
            return {
              link: it.getText('link') as string,
              description: it.getText('description') as string,
              image: it.getImage('image').url as string,
            };
          });
        return {
          order: 100,
          kind: 'contact',
          size: 'full',
          title: '' + contact.results[0].getStructuredText('contact.title').asText(),
          content: contacts,
        };
      }));
  }

  getProgrammingLanguages() {
    return Observable.of<Section<Programming>>({
      order: programmingOrder,
      size: 'full',
      kind: 'programming',
      title: 'Programming Languages',
      content: badges });
  }

  getAbout() {
    return this.getDocumentsOfType(documentTypes.about)
      .map<any, Section<String>[]>(about => {
        return about.results[0]
          .getGroup('aboutview.about-section')
          .toArray()
          .map((it: any, index: number): Section<String> => ({
            size: index % 2 === 0 ? 'short' : 'long',
            order: index < programmingOrder ? index : index + 1,
            kind: 'text',
            title: it.getText('title'),
            content: it.getStructuredText('content').asHtml(),
          }));
      });
  };


}

