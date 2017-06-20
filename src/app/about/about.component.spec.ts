import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdProgressSpinnerModule, MdCardModule, MdButtonModule, MdTooltipModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { AboutComponent } from './about.component';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { GithubService } from '../../shared/github.service';
import { PrismicService, Section, Contact, Programming } from '../../shared/prismic.service';
import { GoogleAnalytics } from '../../shared/google-analytics.service';

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
});
