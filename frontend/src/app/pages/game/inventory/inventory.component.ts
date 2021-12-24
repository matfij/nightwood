import { Component, OnInit } from '@angular/core';
import { ItemController, ItemDto } from 'src/app/client/api';
import { DisplayItem } from 'src/app/core/definitions/items';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  ownedItems!: DisplayItem[];
  itemsLoading!: boolean;

  constructor(
    private itemController: ItemController,
  ) {}

  ngOnInit(): void {
    this.itemsLoading = false;
    this.getOwnedItems();
  }

  getOwnedItems(): void {
    this.itemsLoading = true;
    this.itemController.getOwnedFoods().subscribe(page => {
      this.itemsLoading = false;
      this.ownedItems = page.data.map(item => { return {...item, image: `assets/img/items/${item.name}.png` } });
    }, () => this.itemsLoading = false);
  }

}
