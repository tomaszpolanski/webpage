import { Injectable } from '@angular/core';

@Injectable()
export class FeedbackService {

  tap() {
    this.vibrate(100);
  }

  private vibrate(timeInMiliseconds: number) {
    if (navigator && navigator.vibrate) {
      navigator.vibrate(100);
    }
  }

}
