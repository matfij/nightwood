import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemController } from 'src/app/client/api';
import { DisplayItem } from 'src/app/core/definitions/items';
import { EngineService } from 'src/app/core/services/engine.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {

  gold: number = 0;
  eter: number = 0;
  ownedItems$: Observable<DisplayItem[]> = new Observable<DisplayItem[]>();

  constructor(
    private itemController: ItemController,
    private engineSerivce: EngineService,
    private itemsService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();
    this.gold = this.engineSerivce.user.gold;
    this.eter = this.engineSerivce.user.eter;
  }

  getOwnedItems(): void {
    this.ownedItems$ = this.itemController.getOwnedItems().pipe(
      map((itemPage) => itemPage.data.map(item => this.itemsService.toDisplayItem(item)))
    );
  }

}
