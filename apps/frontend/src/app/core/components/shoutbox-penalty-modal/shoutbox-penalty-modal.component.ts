import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PenaltyController, PenaltyImposeDto, PenaltyType } from 'src/app/client/api';
import { BAN_MAX_TIME, BAN_MIN_TIME, MUTE_MAX_TIME, MUTE_MIN_TIME, PENALTY_COMMENT_MAX_LENGTH } from 'src/app/client/config/frontend.config';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { ChatMessage } from 'src/app/common/definitions/chat';
import { FieldType, FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-shoutbox-penalty-modal',
  templateUrl: './shoutbox-penalty-modal.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './shoutbox-penalty-modal.component.scss'
  ],
})
export class ShoutboxPenaltyModalComponent extends AbstractModalComponent implements OnInit {

  @Input() message!: ChatMessage;
  @Input() penaltyType!: PenaltyType;
  @Output() penaltyInfo = new EventEmitter<FullPenaltyInfo>();

  form = new FormGroup({
    duration: new FormControl<number|null>(
      null,
      [Validators.required],
    ),
    comment: new FormControl<string|null>(
      null,
      [Validators.maxLength(PENALTY_COMMENT_MAX_LENGTH)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'duration', label: 'shoutbox.duration', type: 'number' },
    { form: this.form, key: 'comment', label: 'shoutbox.comment', type: 'text', fieldType: FieldType.TEXTAREA },
  ];
  submitLoading: boolean = false;

  PenaltyType = PenaltyType;

  constructor(
    private penaltyController: PenaltyController,
    private toastService: ToastService,
  ) {
    super();
  }

  ngOnInit(): void {
    switch(this.penaltyType) {
      case this.PenaltyType.Ban: {
        this.form.controls.duration.addValidators([
          Validators.min(BAN_MIN_TIME), Validators.max(BAN_MAX_TIME)
        ]);
        break;
      }
      case this.PenaltyType.Mute: {
        this.form.controls.duration.addValidators([
          Validators.min(MUTE_MIN_TIME), Validators.max(MUTE_MAX_TIME)
        ]);
        break;
      }
    }
  }

  imposePenalty() {
    if (!this.form.value.duration || !this.form.value.comment || !this.form.valid) {
      return;
    }
    const params: PenaltyImposeDto = {
      punishedUserId: this.message.userId,
      type: this.penaltyType,
      duration: this.form.value.duration,
      comment: this.form.value.comment,
      message: this.message.data,
    };
    this.submitLoading = true;
    this.penaltyController.imposePenalty(params).subscribe(() => {
      this.toastService.showSuccess('common.success', 'shoutbox.penaltyImposed');
      this.penaltyInfo.emit({
        ...params,
        punishedNickname: this.message.nickname,
      });
    }, () => this.close.emit(true));
  }
}

export interface FullPenaltyInfo extends PenaltyImposeDto {
  punishedNickname: string;
}
