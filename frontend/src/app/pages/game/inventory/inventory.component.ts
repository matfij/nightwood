import { Component, OnInit } from '@angular/core';
import { ItemController, ItemDto } from 'src/app/client/api';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { DisplayItem } from 'src/app/core/definitions/items';

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
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();

    this.gold = this.repositoryService.getUserData().gold;
  }

  getOwnedItems(): void {
    this.itemsLoading = true;
    this.itemController.getOwnedFoods().subscribe(page => {
      this.itemsLoading = false;
      this.ownedItems = page.data.map(item => { return {...item, image: `assets/img/items/${item.name}.png` } });
    }, () => this.itemsLoading = false);
  }

}
