import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionController, DragonActionController, DragonDto, ExpeditionDto, StartExpeditionDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayExpedition } from 'src/app/core/definitions/events';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss']
})
export class ExpeditionsComponent implements OnInit {

  private readonly BASE_NAME_PATH = 'expeditions';
  private readonly BASE_IMG_PATH = 'assets/img/expeditions';

  @ViewChild('selectDragon') selectDragon?: ElementRef;

  expeditionsLoading: boolean = false;
  expeditions: DisplayExpedition[] = [];
  showDragonChoiceModal: boolean = false;
  modalTitle?: string;
  modalMessage?: string;
  selectedExpedition?: string;

  constructor(
    private translateService: TranslateService,
    private actionController: ActionController,
    private dragonActionController: DragonActionController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getExpeditions();
  }

  getExpeditions() {
    this.expeditionsLoading = true;
    this.dragonActionController.getExpeditions().subscribe(expeditionsPage => {
      this.expeditionsLoading = false;
      this.expeditions = expeditionsPage.data.map(expedition => {
        return {
          ...expedition,
          image: `${this.BASE_IMG_PATH}/${expedition.id}.png`,
        };
      });
    }, () => this.expeditionsLoading = false);
  }

  prepareExpedition(expedition: DisplayExpedition) {
    const titleParams = { location: this.translateService.instant(expedition.name) };
    this.modalTitle = this.translateService.instant('explore.startExpeditionOf', titleParams);

    let message = 'explore.';
    if (expedition.minimumActionTime < 4 * 60 * 60 * 1000) message += 'startExpeditionShort';
    else if (expedition.minimumActionTime < 7 * 60 * 60 * 1000) message += 'startExpeditionMedium';
    else if (expedition.minimumActionTime < 13 * 60 * 60 * 1000) message += 'startExpeditionLong';

    this.modalMessage = this.translateService.instant(message, { level: expedition.level });

    this.selectedExpedition = expedition.name;
    this.showDragonChoiceModal = true;
  }

  startExpedition(dragon: DragonDto, expedition: ExpeditionDto) {
    this.showDragonChoiceModal = false;

    const dto: StartExpeditionDto = {
      dragonId: dragon.id!,
      expeditionId: expedition.id,
    };
    this.expeditionsLoading = true;
    this.actionController.startExpedition(dto).subscribe(() => {
      this.expeditionsLoading = false;
      this.toastService.showSuccess('explore.expeditionStarted', 'explore.expeditionStartedHint');
    }, () => this.expeditionsLoading = false);
  }
}
