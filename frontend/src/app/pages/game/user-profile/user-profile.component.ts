import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/client/api';
import { UserControllerHelper } from 'src/app/client/api-helper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  file?: any;

  constructor(
    private userController: UserControllerHelper
  ) {}

  ngOnInit(): void {
  }

  setAvatarPreview(event: any) {
    if (!event.target.files[0]) return;

    this.file = event.target.files[0];

    console.log(event.target.files[0])

    // const formData = new FormData()
    // formData.append('file', event.target.files[0].name)

    this.userController.setAvatar(event.target.files[0]).subscribe();
  }

  uploadAvatar() {
    console.log(this.file)
  }

}
