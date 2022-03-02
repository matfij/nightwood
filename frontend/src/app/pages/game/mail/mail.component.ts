import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MailController, MailDto, MailGetDto, MailPageDto } from 'src/app/client/api';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  mails$?: Observable<MailPageDto>;
  activeMailId?: number;
  displayComposeModal: boolean = false;
  replyName?: string | null;

  constructor(
    private mailController: MailController,
  ) {}

  ngOnInit(): void {
    this.getMails();
  }

  getMails() {
    const params: MailGetDto = {
      limit: 20,
      page: 0,
    };
    this.mails$ = this.mailController.getAll(params);
  }

  openMail(mail: MailDto) {
    this.activeMailId = mail.id;

    if (mail.isRead === false) {
      this.mailController.read(mail.id.toString()).subscribe();
    }
  }

}
