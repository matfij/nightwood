import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { ChatMessage } from 'src/app/common/definitions/chat';
import { FieldType, FormInputOptions } from 'src/app/common/definitions/forms';

@Component({
  selector: 'app-shoutbox-penalty-modal',
  templateUrl: './shoutbox-penalty-modal.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './shoutbox-penalty-modal.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoutboxPenaltyModalComponent extends AbstractModalComponent implements OnInit {

  @Input() message!: ChatMessage;
  @Input() penaltyType!: ShoutboxPenaltyType;

  form: FormGroup = new FormGroup({
    duration: new FormControl(
      null, [Validators.min(1), Validators.max(200)],
    ),
    comment: new FormControl(
      null, [Validators.minLength(10), Validators.maxLength(200)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'duration', label: 'shoutbox.duration', type: 'number' },
    { form: this.form, key: 'comment', label: 'shoutbox.comment', type: 'text', fieldType: FieldType.TEXTAREA },
  ];
  submitLoading: boolean = false;

  PenaltyType = ShoutboxPenaltyType;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  banUser() {
    console.log(this.message.nickname + ' banned')
  }

}

export enum ShoutboxPenaltyType {
  Ban,
  Mute
}
