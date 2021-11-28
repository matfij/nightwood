import { Component, OnInit } from '@angular/core';
import { GetUserDto, UserController, UserDto } from 'src/app/client/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: UserDto[] = [];

  constructor(
    private userController: UserController,
  ) {}

  ngOnInit(): void {
    this.getBestUsers();
  }

  getBestUsers() {
    const dto: GetUserDto = {
      limit: 5,
    };
    this.userController.getAll(dto).subscribe(x => {
      this.users = x.data;
    });
  }

}
