import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DragonController, DragonDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';
import { AbstractModalComponent } from '../../../common/components/abstract-modal/abstract-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  @Input() requiredLevel: number = 0;
  @Input() dragonTemplate?: TemplateRef<DisplayDragon>;
  @Output() dragonSelected: EventEmitter<DragonDto> = new EventEmitter<DragonDto>();

  displayDragons$?: Observable<DisplayDragon[]>;

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
    this.displayDragons$ = this.dragonController.getOwned().pipe(
      map((dragons) => dragons.map((dragon) => this.dragonService.toDisplayDragon(dragon)))
    );
  }

  chooseDragon(dragon: DragonDto) {
    if (dragon.level < this.requiredLevel) { this.toastService.showError('errors.error', 'errors.dragonTooYoung'); return; }
    this.dragonSelected.next(dragon);
  }

}
