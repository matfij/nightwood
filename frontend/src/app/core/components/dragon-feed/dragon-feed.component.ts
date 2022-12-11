import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActionController, DragonDto, DragonFeedDto, ItemController, ItemDto } from 'src/app/client/api';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayItem } from '../../definitions/items';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-dragon-feed',
  templateUrl: './dragon-feed.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-feed.component.scss'
  ]
})
export class DragonFeedComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DragonDto;
  @Output() updatedDragon = new EventEmitter<DragonDto>();

  availableFood$?: Observable<DisplayItem[]>;
  feedDragon$?: Observable<DragonDto>;
  feeding: boolean = false;

  constructor(
    private actionController: ActionController,
    private itemController: ItemController,
    private itemService: ItemsService,
    private toastService: ToastService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAvailableFoods();
  }

  getAvailableFoods() {
    this.availableFood$ = this.itemController.getOwnedFoods().pipe(
      map((itemPage) => itemPage.data),
      map((items) => items.map(item => this.itemService.toDisplayItem(item))),
      map((items) => items.filter(item => item.quantity! > 0))
    );
  }

  feedDragon(food: ItemDto) {
    if (!this.dragon || this.feeding) return;
    if (this.dragon.level < food.level) { this.toastService.showError('errors.error', 'errors.dragonTooYoung'); return; }

    const dto: DragonFeedDto = {
      itemId: food.id!,
      dragonId: this.dragon.id!,
    }
    this.feeding = true;
    this.feedDragon$ = this.actionController.feedDragon(dto).pipe(
      tap((fedDragon) => {
        this.feeding = false;
        this.toastService.showSuccess('dragon.feedSuccess', 'dragon.feedSuccessHint');
        this.updatedDragon.next(fedDragon);
      }),
    );
  }

}
