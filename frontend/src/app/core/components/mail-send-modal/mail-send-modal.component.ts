import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailController, MailSendDto } from 'src/app/client/api';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { EngineService } from '../../services/engine.service';

@Component({
  selector: 'app-mail-send-modal',
  templateUrl: './mail-send-modal.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './mail-send-modal.component.scss',
  ]
})
export class MailSendModalComponent extends AbstractModalComponent implements OnInit {

  @Input() replyName?: string | null;

  form: FormGroup = new FormGroup({
    receiver: new FormControl(
      null, [Validators.required],
    ),
    topic: new FormControl(
      null, [Validators.required],
    ),
    message: new FormControl(
      null, [Validators.required],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'receiver', label: 'mails.receiver', type: 'text' },
    { form: this.form, key: 'topic', label: 'mails.topic', type: 'text' },
    { form: this.form, key: 'message', label: 'mails.message', type: 'text' },
  ];
  submitLoading: boolean = false;

  get receiver(): FormControl { return this.form.get('receiver') as FormControl; }
  get topic(): FormControl { return this.form.get('topic') as FormControl; }
  get message(): FormControl { return this.form.get('message') as FormControl; }

  constructor(
    private mailController: MailController,
    private engineService: EngineService,
    private toastService: ToastService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.replyName) this.receiver.setValue(this.replyName);
  }

  sendMail() {
    const params: MailSendDto = {
      senderId: this.engineService.user.id,
      receiverName: this.receiver.value,
      topic: this.topic.value,
      message: this.message.value,
    }
    this.submitLoading = true;
    this.mailController.send(params).subscribe(() => {
      this.submitLoading = false;
      this.toastService.showSuccess('common.success', 'mails.mailSent');
      this.close.next(true);
    }, () => this.submitLoading = false);
  }

}
