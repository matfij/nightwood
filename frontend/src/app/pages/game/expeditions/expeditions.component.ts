import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionController, DragonActionController, DragonDto, ExpeditionDto, ExpeditionGuardianDto, StartExpeditionDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayExpedition } from 'src/app/core/definitions/events';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss']
})
export class ExpeditionsComponent implements OnInit {

  private readonly BASE_IMG_PATH = 'assets/img/expeditions';

  @ViewChild('selectDragon') selectDragon?: ElementRef;

  expeditionsLoading: boolean = false;
  expeditions: DisplayExpedition[] = [];
  showDragonChoiceModal: boolean = false;
  modalTitle?: string;
  modalMessage?: string;
  selectedExpedition?: ExpeditionDto;
  dragonChoiceCallback!: ((dragon: DragonDto, expedition: ExpeditionDto) => void);

  requiredLevel: number = 0;
  selectedDragon?: DragonDto;
  displayBattle: boolean = false;

  constructor(
    private translateService: TranslateService,
    private actionController: ActionController,
    private dragonActionController: DragonActionController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getExpeditions();
    this.dragonChoiceCallback = this.startExpedition.bind(this);
  }

  getExpeditions() {
    this.expeditionsLoading = true;
    this.dragonActionController.getExpeditions().subscribe(expeditionsPage => {
      this.expeditionsLoading = false;
      this.expeditions = expeditionsPage.data.map(expedition => {
        return {
          ...expedition,
          image: `${this.BASE_IMG_PATH}/${expedition.uid}.png`,
        };
      });
    }, () => this.expeditionsLoading = false);
  }

  prepareExpedition(expedition: DisplayExpedition) {
    const titleParams = { location: this.translateService.instant(expedition.name) };
    this.modalTitle = this.translateService.instant('explore.startExpeditionOf', titleParams);
    this.modalMessage = this.translateService.instant('explore.startExpeditionHint', { level: expedition.level });

    this.dragonChoiceCallback = this.startExpedition.bind(this);
    this.selectedExpedition = expedition;
    this.showDragonChoiceModal = true;
    this.requiredLevel = expedition.level;
  }

  prepareGuardianChallenge(expedition: DisplayExpedition) {
    const titleParams = { location: this.translateService.instant(expedition.name) };
    this.modalTitle = this.translateService.instant('explore.battleGuardianTitle', titleParams);
    this.modalMessage = this.translateService.instant('explore.battleGuardianHint', { guardianName: expedition.guardian.name });

    this.dragonChoiceCallback = this.battleGuardian.bind(this);
    this.selectedExpedition = expedition;
    this.showDragonChoiceModal = true;
    this.requiredLevel = expedition.guardian.level;
  }

  startExpedition(dragon: DragonDto, expedition: ExpeditionDto) {
    this.showDragonChoiceModal = false;

    const dto: StartExpeditionDto = {
      dragonId: dragon.id!,
      expeditionUid: expedition.uid,
    };
    this.expeditionsLoading = true;
    this.actionController.startExpedition(dto).subscribe(() => {
      this.expeditionsLoading = false;
      this.toastService.showSuccess('explore.expeditionStarted', 'explore.expeditionStartedHint');
    }, () => this.expeditionsLoading = false);
  }

  battleGuardian(dragon: DragonDto, expedition: ExpeditionDto) {
    this.selectedDragon = dragon;
    this.showDragonChoiceModal = false;
    this.displayBattle = true;

    console.log('battleGuardian', this.displayBattle);
  }
}
