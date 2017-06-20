import { TestBed, async } from '@angular/core/testing';
import { MdProgressSpinnerModule, MdCardModule, MdButtonModule, MdTooltipModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { BadgeComponent } from '../shared/badge/badge.component';
import { GithubService } from '../shared/github.service';
import { PrismicService, Section, Contact, Programming } from '../shared/prismic.service';
import { GoogleAnalytics } from '../shared/google-analytics.service';

class MockPrismicService {
  getContacts(): Observable<Section<Contact>> {
    return Observable.empty();
  }
  getProgrammingLanguages(): Observable<Section<Programming>> {
    return Observable.empty();
  }
  getAbout(): Observable<Section<String>[]> {
    return Observable.empty();
  }

}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AboutComponent,
        BadgeComponent
      ],
      imports: [
        MdCardModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdTooltipModule,
      ],
      providers: [
        GithubService,
        { provide: PrismicService, useClass: MockPrismicService },
        GoogleAnalytics
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toBe('Tomek Polański');
  }));
});
