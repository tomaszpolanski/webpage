import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import Prismic from 'prismic.io';

export interface Contact {
  link: string;
  description: string;
  image: string;
}

export interface ContactSection {
  title: string;
  contacts: Contact[];
}

export interface TextSection {
  title: string;
  content: string;
}

const documentTypes = {
  about: 'aboutview',
  contact: 'contact',
};

@Injectable()
export class PrismicService {

  private api: any;

  constructor() {
    this.api = Prismic.api('https://websentation.prismic.io/api');
  }

  private getDocumentsOfType(typeId: string): Promise<any> {
    return this.api.then((api: any) => api.query(Prismic.Predicates.at('document.type', typeId)));
  };

  getContacts(): Observable<ContactSection> {
    return Observable.fromPromise(this.getDocumentsOfType(documentTypes.contact).then((contact: any) => {
    const contacts: Contact[] = contact.results[0]
      .getGroup('contact.contact')
      .toArray()
      .map((it: any)  => {
        return {
          link: it.getText('link'),
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

  getAbout(): Observable<TextSection[]> {
    return Observable.fromPromise(this.getDocumentsOfType(documentTypes.about)
      .then((about: any) => {
        return about.results[0]
          .getGroup('aboutview.about-section')
          .toArray()
          .map((it: any) => ({
            title: it.getText('title'),
            content: it.getStructuredText('content').asHtml(),
          }));
      }));
  };


}

