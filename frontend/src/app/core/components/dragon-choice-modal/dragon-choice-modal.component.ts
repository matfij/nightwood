import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DragonDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-choice-modal',
  templateUrl: './dragon-choice-modal.component.html',
  styleUrls: ['./dragon-choice-modal.component.scss']
})
export class DragonChoiceModalComponent implements OnInit {

  @Input() title?: string;
  @Input() message?: string;
  @Input() dragons!: DragonDto[];
  @Input() level!: number;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dragonSelected: EventEmitter<DragonDto> = new EventEmitter<DragonDto>();

  displayDragons!: DisplayDragon[];

  constructor(
    private toastService: ToastService,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    this.title = this.title ?? 'explore.selectDragon';
    this.message = this.message ?? '';
    this.level = this.level ?? 0;

    this.displayDragons = this.dragons.map(x => this.dragonService.setDragonImage(x));
  }

  closeModal() {
    this.close.next(true);
  }

  chooseDragon(dragon: DragonDto) {
    if (dragon.level < this.level) { this.toastService.showError('errors.error', 'errors.dragonTooYoung'); return; }

    this.dragonSelected.next(dragon);
  }

}
