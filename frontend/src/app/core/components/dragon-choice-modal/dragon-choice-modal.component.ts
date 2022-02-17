import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DragonDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';
import { AbstractModalComponent } from '../../../common/components/abstract-modal/abstract-modal.component';

@Component({
  selector: 'app-dragon-choice-modal',
  templateUrl: './dragon-choice-modal.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-choice-modal.component.scss',
  ],
})
export class DragonChoiceModalComponent extends AbstractModalComponent implements OnInit {

  @Input() title?: string;
  @Input() message?: string;
  @Input() dragons!: DragonDto[];
  @Input() level!: number;
  @Output() dragonSelected: EventEmitter<DragonDto> = new EventEmitter<DragonDto>();

  displayDragons: DisplayDragon[] = [];

  constructor(
    private toastService: ToastService,
    private dragonService: DragonService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.title = this.title ?? 'explore.selectDragon';
    this.message = this.message ?? '';
    this.level = this.level ?? 0;

    this.displayDragons = this.dragons.map(x => this.dragonService.toDisplayDragon(x));
  }

  chooseDragon(dragon: DragonDto) {
    if (dragon.level < this.level) { this.toastService.showError('errors.error', 'errors.dragonTooYoung'); return; }

    this.dragonSelected.next(dragon);
  }

}
