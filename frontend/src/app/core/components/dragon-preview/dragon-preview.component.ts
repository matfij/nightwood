import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionController, DragonFeedDto, ItemController, ItemDto } from 'src/app/client/api';
import { DisplayDragon } from '../../definitions/dragons';
import { DateService } from '../../../common/services/date.service';
import { DragonService } from '../../services/dragons.service';
import { ItemsService } from '../../services/items.service';
import { DisplayItem } from '../../definitions/items';
import { ToastService } from 'src/app/common/services/toast.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dragon-preview',
  templateUrl: './dragon-preview.component.html',
  styleUrls: ['./dragon-preview.component.scss']
})
export class DragonPreviewComponent implements OnInit {

  @Input() dragon!: DisplayDragon;
  @Output() release: EventEmitter<number> = new EventEmitter<number>();

  feedAvailable: boolean = false;
  displayFeedModal: boolean = false;
  foodLoading: boolean = false;
  availableFood$?: Observable<DisplayItem[]>;
  feedLoading: boolean = false;
  displayDetails: boolean = false;
  displayEquipment: boolean = false;
  displayStatistics: boolean = false;
  displayReleaseModal: boolean = false;

  DRAGON_ATTRIBUTES = ['strength', 'dexterity', 'endurance', 'will', 'luck'];

  constructor(
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

  getDragonAttribute(attribute: string) {
    return this.dragon ? (this.dragon as any)[attribute] : 0;
  }

  prepareFeedModal() {
    if (this.feedAvailable) {
      this.displayFeedModal = true;
      this.getAvailableFoods();
    }
  }

  getAvailableFoods() {
    this.availableFood$ = this.itemController.getOwnedFoods().pipe(
      map(itemPage => itemPage.data),
      map(items => items.map(item => this.itemService.toDisplayItem(item))),
      map(items => items.filter(item => item.quantity! > 0))
    );
  }

  feedDragon(item: ItemDto) {
    if (!this.dragon) return;
    if (this.dragon.level < item.level) { this.toastService.showError('errors.error', 'errors.dragonTooYoung'); return; }

    const dto: DragonFeedDto = {
      itemId: item.id!,
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
