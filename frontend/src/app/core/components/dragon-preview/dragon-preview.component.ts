import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionController, DragonController, FeedDragonDto, ItemController, ItemDto } from 'src/app/client/api';
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

  feedAvailable: boolean = false;
  showFeedModal: boolean = false;
  foodLoading: boolean = false;
  availableFood: DisplayItem[] = [];
  feedLoading: boolean = false;

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
    this.showFeedModal = false;
    this.foodLoading = false;
    this.availableFood = [];
    this.feedLoading = false;
  }

  prepareFeedModal() {
    if (this.feedAvailable) {
      this.getAvailableFoods();
      this.showFeedModal = true;
    }
  }

  getAvailableFoods() {
    this.foodLoading = true;
    this.itemController.getOwnedFoods().subscribe(foodsPage => {
      this.foodLoading = false;
      this.availableFood = foodsPage.data
        .map(item => this.itemService.setItemImage(item))
        .filter(item => item.quantity! > 0);
    }, () => this.foodLoading = false);
  }

  feedDragon(itemId: number) {
    if (!this.dragon) return;

    const dto: FeedDragonDto = {
      itemId: itemId,
      dragonId: this.dragon.id!,
    }
    this.feedLoading = true;
    this.actionController.feedDragon(dto).subscribe(fedDragon => {
      this.feedLoading = false;
      this.showFeedModal = false;
      this.feedAvailable = false;
      this.toastService.showSuccess('dragon.feedSuccess', 'dragon.feedSuccessHint')
      this.dragon = Object.assign(this.dragon, fedDragon);
    }, () => this.feedLoading = false);
  }

  navigateExplore() {
    this.router.navigate(['game', 'expeditions']);
  }

  navigateArena(dragonId: number) {
    this.router.navigate(['game', 'arena', dragonId]);
  }

}
