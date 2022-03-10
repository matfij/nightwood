import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DragonController, DragonDto } from 'src/app/client/api';
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

  @Input() title: string = 'explore.selectDragon';
  @Input() message: string = '';
  @Input() level: number = 0;
  @Output() dragonSelected: EventEmitter<DragonDto> = new EventEmitter<DragonDto>();

  dragonsLoading: boolean = false;
  displayDragons: DisplayDragon[] = [];

  constructor(
    private dragonController: DragonController,
    private toastService: ToastService,
    private dragonService: DragonService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDragons();
  }

  getDragons() {
    this.dragonsLoading = true;
    this.dragonController.getOwned().subscribe(dragons => {
      this.dragonsLoading = false;
      this.displayDragons = dragons.map(x => this.dragonService.toDisplayDragon(x));
    }, () => this.dragonsLoading = false);
  }

  chooseDragon(dragon: DragonDto) {
    if (dragon.level < this.level) { this.toastService.showError('errors.error', 'errors.dragonTooYoung'); return; }

    this.dragonSelected.next(dragon);
  }

}
