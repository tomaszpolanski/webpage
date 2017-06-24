import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdProgressSpinnerModule, MdCardModule, MdButtonModule, MdTooltipModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { AboutComponent } from './about.component';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { GithubService } from '../../shared/github.service';
import { PrismicService, Section, Contact, Programming } from '../../shared/prismic.service';
import { GoogleAnalytics } from '../../shared/google-analytics.service';

const TEXT_SECTION_TITLE = 'Some section';

class MockPrismicService {
  getContacts(): Observable<Section<Contact>> {
    return Observable.empty();
  }
  getProgrammingLanguages(): Observable<Section<Programming>> {
    return Observable.empty();
  }
  getAbout(): Observable<Section<String>[]> {
    const section: Section<String> = {
      order: 0,
      size: 'short',
      kind: 'text',
      title: TEXT_SECTION_TITLE,
      content: ['Content'],
    };
    return Observable.of([section]);
  }

}

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent, BadgeComponent],
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('creates text sections', () => {
    const sections = fixture.debugElement.query(By.css('.short'));

    expect(sections.nativeElement.querySelector('h2').textContent).toBe(TEXT_SECTION_TITLE);
  });
});
