import { Injectable } from '@angular/core';

declare var ga: Function;

@Injectable()
export class GoogleAnalytics {

  public emitEvent(eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number) {
    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

}
