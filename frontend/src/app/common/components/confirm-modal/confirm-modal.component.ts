import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractModalComponent } from 'src/app/core/components/abstract-modal/abstract-modal.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: [
    '../../../core/components/abstract-modal/abstract-modal.component.scss',
    './confirm-modal.component.scss',
  ],
})
export class ConfirmModalComponent extends AbstractModalComponent {

  @Input() title!: string;
  @Input() message!: string;
  @Input() confirmText: string = 'common.confirm';
  @Input() cancelText: string = 'common.cancel';
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  onConfirm() {
    this.confirm.next(true);
  }

}
