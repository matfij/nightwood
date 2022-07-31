import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserControllerHelper } from 'src/app/client/api-helper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  avatarSrc: any;

  constructor(
    private userController: UserControllerHelper,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.getAvatar();
  }

  getAvatar() {
    this.userController.getAvatar().subscribe((data) => {
      var binaryData = [];
      binaryData.push(data.body);
      let objectURL = URL.createObjectURL(new Blob(binaryData, {type: 'application/octet-stream' }));
      this.avatarSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      console.log(objectURL, this.avatarSrc)
    });
  }

  setAvatar(event: any) {
    if (!event.target.files[0]) return;
    this.userController.setAvatar(event.target.files[0]).subscribe();
  }

}
