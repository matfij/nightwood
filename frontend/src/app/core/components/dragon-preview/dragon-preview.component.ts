import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActionController, DragonFeedDto, ItemController } from 'src/app/client/api';
import { DisplayDragon } from '../../definitions/dragons';
import { DateService } from '../../../common/services/date.service';
import { DragonService } from '../../services/dragons.service';
import { ItemsService } from '../../services/items.service';
import { DisplayItem } from '../../definitions/items';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-dragon-preview',
  templateUrl: './dragon-preview.component.html',
  styleUrls: ['./dragon-preview.component.scss']
})
export class DragonPreviewComponent implements OnInit {

  @Input() dragon?: DisplayDragon;
  @Output() release: EventEmitter<number> = new EventEmitter<number>();

  feedAvailable: boolean = false;
  displayFeedModal: boolean = false;
  foodLoading: boolean = false;
  availableFood: DisplayItem[] = [];
  feedLoading: boolean = false;
  displayDetails: boolean = false;
  displayEquipment: boolean = false;
  displayReleaseModal: boolean = false;

  constructor(
    private router: Router,
    private actionController: ActionController,
    private itemController: ItemController,
    private dateService: DateService,
    private dragonService: DragonService,
    private itemService: ItemsService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.dragon) {
      this.dragon = this.dragonService.toDisplayDragon(this.dragon);
      this.feedAvailable = this.dateService.checkIfEventAvailable(this.dragon.nextFeed);
    }
  }

  prepareFeedModal() {
    if (this.feedAvailable) {
      this.getAvailableFoods();
      this.displayFeedModal = true;
    }
  }

  getAvailableFoods() {
    this.foodLoading = true;
    this.itemController.getOwnedFoods().subscribe(foodsPage => {
      this.foodLoading = false;
      this.availableFood = foodsPage.data
        .map(item => this.itemService.toDisplayItem(item))
        .filter(item => item.quantity! > 0);
    }, () => this.foodLoading = false);
  }

  feedDragon(itemId: number) {
    if (!this.dragon) return;

    const dto: DragonFeedDto = {
      itemId: itemId,
      dragonId: this.dragon.id!,
    }
    this.feedLoading = true;
    this.actionController.feedDragon(dto).subscribe(fedDragon => {
      this.feedLoading = false;
      this.displayFeedModal = false;
      this.feedAvailable = false;
      this.toastService.showSuccess('dragon.feedSuccess', 'dragon.feedSuccessHint')
      this.dragon = Object.assign(this.dragon, fedDragon);
    }, () => this.feedLoading = false);
  }

  onRelease(dragonId: number) {
    this.displayReleaseModal = false;
    this.release.next(dragonId);
  }

}
