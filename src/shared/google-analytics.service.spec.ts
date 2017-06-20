import { TestBed, inject } from '@angular/core/testing';

import { GoogleAnalytics } from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAnalytics]
    });
  });

  it('should be created', inject([GoogleAnalytics], (service: GoogleAnalytics) => {
    expect(service).toBeTruthy();
  }));
});
