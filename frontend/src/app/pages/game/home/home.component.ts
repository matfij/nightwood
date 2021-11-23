import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/definitions/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

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
