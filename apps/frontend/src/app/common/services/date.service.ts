import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  get date() {
    return Date.now();
  }

  checkIfEventAvailable(nextEvent: number): boolean {
    const todayMillis = this.date;

    return todayMillis > nextEvent;
  }
}
