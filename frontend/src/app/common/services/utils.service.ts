import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public blobToJsonObject<T>(blob: Blob): Observable<T> {
    return new Observable<T>((observer: any) => {
      if (!blob || blob.size === 0) {
        observer.next(null);
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = function () {
          observer.next(JSON.parse(this.result as string));
          observer.complete();
        };

        reader.readAsText(blob);
      }
    });
  }

  public blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next('');
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = function () {
          observer.next(this.result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    }).pipe(take(1));
  }
}
