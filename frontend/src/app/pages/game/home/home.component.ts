import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/client/api.service';
import { User } from 'src/app/definitions/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.apiService.getTopUsers().subscribe(x => {
      this.users = x.items;
      console.log(x.meta);
    });
  }

}
