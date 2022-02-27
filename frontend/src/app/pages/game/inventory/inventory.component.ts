import { Component, OnInit } from '@angular/core';
import { ItemController } from 'src/app/client/api';
import { DisplayItem } from 'src/app/core/definitions/items';
import { EngineService } from 'src/app/core/services/engine.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  gold: number = 0;
  ownedItems: DisplayItem[] = [];
  itemsLoading: boolean = false;

  constructor(
    private itemController: ItemController,
    private engineSerivce: EngineService,
    private itemsService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();

    this.gold = this.engineSerivce.user.gold;
  }

  getOwnedItems(): void {
    this.itemsLoading = true;
    this.itemController.getOwnedFoods().subscribe(page => {
      this.itemsLoading = false;
      this.ownedItems = page.data.map(item => this.itemsService.toDisplayItem(item));
    }, () => this.itemsLoading = false);
  }

}
