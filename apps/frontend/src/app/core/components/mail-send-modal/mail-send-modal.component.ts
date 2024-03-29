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

  @Input() replyName?: string|null;

  form = new FormGroup({
    receiver: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(MAIL_RECEIVER_MIN_LENGTH), Validators.maxLength(MAIL_RECEIVER_MAX_LENGTH)],
    ),
    topic: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(MAIL_TOPIC_MIN_LENGTH), Validators.maxLength(MAIL_TOPIC_MAX_LENGTH)],
    ),
    message: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(MAIL_MESSAGE_MIN_LENGTH), Validators.maxLength(MAIL_MESSAGE_MAX_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'receiver', label: 'mails.receiver', type: 'text' },
    { form: this.form, key: 'topic', label: 'mails.topic', type: 'text' },
    { form: this.form, key: 'message', label: 'mails.message', type: 'text', fieldType: FieldType.TEXTAREA },
  ];
  submitLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private mailController: MailController,
    private engineService: EngineService,
    private toastService: ToastService,
    private validatorService: ValidatorService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.replyName) {
      this.form.controls.receiver.setValue(this.replyName);
    }
    console.log(this.form.controls)
  }

  sendMail() {
    if (
      !this.form.value.receiver || !this.form.value.topic || !this.form.value.message
      || !this.validatorService.checkBannedWords(this.form.value.receiver)
      || !this.validatorService.checkBannedWords(this.form.value.topic)
      || !this.validatorService.checkBannedWords(this.form.value.message)
    ) {
      return;
    }

    const params: MailSendDto = {
      senderId: this.engineService.user.id,
      receiverName: this.form.value.receiver,
      topic: this.form.value.topic,
      message: this.form.value.message,
    }
    this.submitLoading$.next(true);
    this.mailController.send(params).subscribe(() => {
      this.submitLoading$.next(false);
      this.toastService.showSuccess('common.success', 'mails.mailSent');
      this.close.next(true);
    }, () => this.submitLoading$.next(false));
  }

}
