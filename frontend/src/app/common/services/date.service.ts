import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  checkIfEventAvailable(nextEvent: number): boolean {
    const todayMillis = Date.now();

    return todayMillis > nextEvent;
  }
}
