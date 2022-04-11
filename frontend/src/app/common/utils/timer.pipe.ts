import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'timer',
})
export class TimerPipe implements PipeTransform {

  public transform(date: number): Observable<string> {
    return timer(0, 1000).pipe(
      map(() => {
        return this.getTimeLeft(date);
      })
    );
  }

  private getTimeLeft(date: number): string {
    const msRemaining = date - Date.now();
    if (msRemaining < 0) {
      return '00:00:00';
    }

    let seconds: string | number = Math.floor((msRemaining / 1000) % 60);
    let minutes: string | number = Math.floor((msRemaining / (1000 * 60)) % 60);
    let hours: string | number = Math.floor(
      (msRemaining / (1000 * 60 * 60)) % 24
    );

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return `${hours}:${minutes}:${seconds}`;
  }
}
