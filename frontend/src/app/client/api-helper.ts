import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { API_BASE_URL, SwaggerException } from './api';

export interface IUserControllerHelper {
  setAvatar(file: any): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class UserControllerHelper implements IUserControllerHelper {

  private http: HttpClient;
  private baseUrl: string;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  setAvatar(file: any): Observable<any> {
    let url_ = this.baseUrl + "/api/v1/user/setAvatar";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    content_.append("avatar", file, file.name);

    let options_ : any = {
      body: content_,
      observe: "response",
      responseType: "blob",
    };

    return this.http.request("post", url_, options_)
}

protected processSetAvatar(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    if (status === 201) {
        return blobToText(responseBlob).pipe(mergeMap(_responseText => {
        return of<void>(<any>null);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(mergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return of<void>(<any>null);
}
}

export interface FileParameter {
  data: any;
  fileName: string;
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return throwError(result);
  else
    return throwError(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
