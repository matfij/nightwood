import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selectedDragonId?: number;

  constructor(
    private dragonController: DragonController,
    private dragonActionController: DragonActionController,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.expeditionsLoading = false;
    this.expeditions = [];
    this.ownedDragons = [];
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

  startExpedition() {
    console.log(this.selectDragon?.nativeElement.value, this.selectedDragonId)
  }
}

export interface DisplayExpedition extends ExpeditionDto {
  hint: string;
  image: string;
}
