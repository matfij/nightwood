import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionController, DragonActionController, DragonDto, ExpeditionDto, StartExpeditionDto } from 'src/app/client/api';
import { DateService } from 'src/app/common/services/date.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayExpedition } from 'src/app/core/definitions/events';
import { ExpeditionsService } from 'src/app/core/services/expeditions.service';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpeditionsComponent implements OnInit {

  @ViewChild('selectDragon') selectDragon?: ElementRef;

  expeditions$?: Observable<DisplayExpedition[]>;
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
    private dateService: DateService,
    private toastService: ToastService,
    private expeditionService: ExpeditionsService,
  ) {}

  ngOnInit(): void {
    this.getExpeditions();
    this.dragonChoiceCallback = this.startExpedition.bind(this);
  }

  getExpeditions() {
    this.expeditions$ = this.dragonActionController.getExpeditions().pipe(
      map((expeditionPage) => expeditionPage.data.map((x) => this.expeditionService.toDisplayExpedition(x)))
    );
  }

  prepareExpedition(expedition: DisplayExpedition) {
    const titleParams = { location: this.translateService.instant(expedition.name) };
    this.modalTitle = this.translateService.instant('explore.startExpeditionOf', titleParams);
    const messageParams = { level: expedition.level };
    this.modalMessage = this.translateService.instant('explore.startExpeditionHint', messageParams);

    this.dragonChoiceCallback = this.startExpedition.bind(this);
    this.selectedExpedition = expedition;
    this.showDragonChoiceModal = true;
    this.requiredLevel = expedition.level;
  }

  prepareGuardianChallenge(expedition: DisplayExpedition) {
    const titleParams = { location: this.translateService.instant(expedition.name) };
    this.modalTitle = this.translateService.instant('explore.battleGuardianTitle', titleParams);
    const messageParams = { guardianName: expedition.guardian.name, level: expedition.guardian.level };
    this.modalMessage = this.translateService.instant('explore.battleGuardianHint', messageParams);

    this.dragonChoiceCallback = this.battleGuardian.bind(this);
    this.selectedExpedition = expedition;
    this.showDragonChoiceModal = true;
    this.requiredLevel = expedition.guardian.level;
  }

  startExpedition(dragon: DragonDto, expedition: ExpeditionDto) {
    if (!this.dateService.checkIfEventAvailable(dragon.action.nextAction)) {
      this.toastService.showError('errors.error', 'errors.dragonBusy');
      return;
    }
    this.showDragonChoiceModal = false;

    const dto: StartExpeditionDto = {
      dragonId: dragon.id!,
      expeditionUid: expedition.uid,
    };
    this.actionController.startExpedition(dto).subscribe(() => {
      this.toastService.showSuccess('explore.expeditionStarted', 'explore.expeditionStartedHint');
    });
  }

  battleGuardian(dragon: DragonDto, expedition: ExpeditionDto) {
    if (!this.dateService.checkIfEventAvailable(dragon.action.nextAction)) {
      this.toastService.showError('errors.error', 'errors.dragonBusy');
      return;
    }
    this.selectedDragon = dragon;
    this.showDragonChoiceModal = false;
    this.displayBattle = true;
  }
}
