import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any[] = [];

  constructor(

  ) {}

  ngOnInit(): void {
    this.users = [
      {
        id: 1,
        nickname: 'John Doe',
        email: 'mail'
      }
    ];
  }

}
