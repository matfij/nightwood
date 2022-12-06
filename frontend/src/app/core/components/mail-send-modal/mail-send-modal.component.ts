import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MailController, MailSendDto } from 'src/app/client/api';
import { MAIL_MESSAGE_MAX_LENGTH, MAIL_MESSAGE_MIN_LENGTH, MAIL_RECEIVER_MAX_LENGTH, MAIL_RECEIVER_MIN_LENGTH, MAIL_TOPIC_MAX_LENGTH, MAIL_TOPIC_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { FieldType, FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { ValidatorService } from 'src/app/common/services/validator.service';
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
      null, [Validators.minLength(MAIL_RECEIVER_MIN_LENGTH), Validators.maxLength(MAIL_RECEIVER_MAX_LENGTH)],
    ),
    topic: new FormControl(
      null, [Validators.minLength(MAIL_TOPIC_MIN_LENGTH), Validators.maxLength(MAIL_TOPIC_MAX_LENGTH)],
    ),
    message: new FormControl(
      null, [Validators.minLength(MAIL_MESSAGE_MIN_LENGTH), Validators.maxLength(MAIL_MESSAGE_MAX_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'receiver', label: 'mails.receiver', type: 'text' },
    { form: this.form, key: 'topic', label: 'mails.topic', type: 'text' },
    { form: this.form, key: 'message', label: 'mails.message', type: 'text', fieldType: FieldType.TEXTAREA },
  ];
  submitLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get receiver(): FormControl { return this.form.get('receiver') as FormControl; }
  get topic(): FormControl { return this.form.get('topic') as FormControl; }
  get message(): FormControl { return this.form.get('message') as FormControl; }

  constructor(
    private mailController: MailController,
    private engineService: EngineService,
    private toastService: ToastService,
    private validatorService: ValidatorService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.replyName) this.receiver.setValue(this.replyName);
  }

  sendMail() {
    if (
      !this.validatorService.checkBannedWords(this.topic.value)
      || !this.validatorService.checkBannedWords(this.message.value)
    ) return;

    const params: MailSendDto = {
      senderId: this.engineService.user.id,
      receiverName: this.receiver.value,
      topic: this.topic.value,
      message: this.message.value,
    }
    this.submitLoading$.next(true);
    this.mailController.send(params).subscribe(() => {
      this.submitLoading$.next(false);
      this.toastService.showSuccess('common.success', 'mails.mailSent');
      this.close.next(true);
    }, () => this.submitLoading$.next(false));
  }

}
