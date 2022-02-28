import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MailController, MailGetDto, MailPageDto } from 'src/app/client/api';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  mails$?: Observable<MailPageDto>;

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

}
