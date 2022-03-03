import { Component, OnInit } from '@angular/core';
import { MailController, MailDto, MailGetDto } from 'src/app/client/api';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  mails: MailDto[] = [];
  mailsLoading: boolean = false;
  currentPage: number = 0;
  pageLimit: number = 8;
  canGetNext: boolean = false;
  canGetPrev: boolean = false;
  activeMailId: number | null = null;
  displayComposeModal: boolean = false;
  replyName: string | null = null;

  constructor(
    private mailController: MailController,
  ) {}

  ngOnInit(): void {
    this.getMails();
    this.canGetNext = true;
    this.canGetPrev = true;
  }

  getMails(isNext?: boolean) {
    if (isNext === true) this.currentPage += 1;
    if (isNext === false) this.currentPage -= 1;

    const params: MailGetDto = {
      limit: this.pageLimit,
      page: this.currentPage,
    };
    this.mailsLoading = true;
    this.mailController.getAll(params).subscribe(mailPage => {
      this.mailsLoading = false;

      this.mails = mailPage.data;
      this.canGetPrev = this.currentPage !== 0;
      this.canGetNext = (this.currentPage + 1) * this.pageLimit <= mailPage.meta.totalItems! - 1;
    }, () => this.mailsLoading = false);
  }

  openMail(mail: MailDto) {
    this.activeMailId = this.activeMailId !== mail.id ? mail.id : null;

    if (mail.isRead === false) {
      this.mailController.read(mail.id.toString()).subscribe(() => mail.isRead = true);
    }
  }

}
