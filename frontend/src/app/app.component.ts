import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'data loading ...';

  constructor(
    private http: HttpClient
  ) {}


  ngOnInit() {
    this.http.get('/start')
      .subscribe(
        (response) => {
          this.title = response.toString();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
