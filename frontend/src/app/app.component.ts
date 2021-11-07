import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'status loading ...';
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<Status>(this.baseUrl + '/start')
      .subscribe(
        (response: Status) => {
          this.title = response['status'].toString();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

interface Status {
  status: string;
}
