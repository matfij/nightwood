import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL, SwaggerException } from './api';

@Injectable({
  providedIn: 'root',
})
export class UserControllerHelper {

  private baseUrl: string;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string,
  ) {
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  setAvatar(file: any): Observable<any> {
    let url_ = this.baseUrl + '/api/v1/user/setAvatar';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    content_.append('avatar', file, file.name);

    let options_ : any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
    };

    return this.http.request('post', url_, options_);
  }

  getAvatar(): Observable<any> {
    let url_ = this.baseUrl + '/api/v1/user/getAvatar';
    url_ = url_.replace(/[?&]$/, '');

    let options_ : any = {
      body: {},
      observe: 'response',
      responseType: 'blob',
    };

    return this.http.request('post', url_, options_).pipe(
      map((data) => {
        if (!(data as any).body.size) return null;

        var binaryData = [];
        binaryData.push((data as any).body);
        let objectURL = URL.createObjectURL(new Blob(binaryData, {type: 'application/octet-stream' }));
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
      })
    );
  }
}

export interface FileParameter {
  data: any;
  fileName: string;
}
