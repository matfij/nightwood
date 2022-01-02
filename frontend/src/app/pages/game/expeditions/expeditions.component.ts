import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DragonActionController, DragonController, DragonDto, ExpeditionDto, GetDragonDto } from 'src/app/client/api';
import { RepositoryService } from 'src/app/common/services/repository.service';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss']
})
export class ExpeditionsComponent implements OnInit {

  private readonly BASE_NAME_PATH = 'expeditions';
  private readonly BASE_IMG_PATH = 'assets/img/expeditions';

  @ViewChild('selectDragon') selectDragon?: ElementRef;

  expeditionsLoading!: boolean;
  expeditions!: DisplayExpedition[];
  ownedDragons!: DragonDto[];
  showDragonChoiceModal!: boolean;
  modalTitle?: string;
  modalMessage?: string;
  selectedExpedition?: string;

  constructor(
    private translateService: TranslateService,
    private dragonController: DragonController,
    private dragonActionController: DragonActionController,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.expeditionsLoading = false;
    this.expeditions = [];
    this.ownedDragons = [];
    this.showDragonChoiceModal = false;
    this.getExpeditions();
    this.getDragons();
  }

  getExpeditions() {
    this.expeditionsLoading = true;
    this.dragonActionController.getExpeditions().subscribe(x => {
      this.expeditionsLoading = false;
      this.expeditions = x.data.map(y => {
        return {
          ...y,
          name: `${this.BASE_NAME_PATH}.${y.name}`,
          hint: `${this.BASE_NAME_PATH}.${y.name}Hint`,
          image: `${this.BASE_IMG_PATH}/${y.name}.png`
        }
      });
    }, () => this.expeditionsLoading = false);
  }

  getDragons() {
    const dto: GetDragonDto = {
      ownerId: this.repositoryService.getUserData().id,
    };
    this.dragonController.getAll(dto).subscribe(x => {
      this.ownedDragons = x.data;
    })
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
    console.log(dragon, expedition);
  }
}

export interface DisplayExpedition extends ExpeditionDto {
  hint: string;
  image: string;
}
