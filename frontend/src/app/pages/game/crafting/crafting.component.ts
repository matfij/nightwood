import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemController, ItemDto, ItemPageDto, ItemRecipeDto } from 'src/app/client/api';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {

  recipe$: Observable<ItemRecipeDto[]> = new Observable();
  items: ItemDto[] = [];

  constructor(
    private itemController: ItemController,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();
    this.getAvailableRecipes();
  }

  getOwnedItems() {
    this.itemController.getOwnedItems().subscribe(itemPage => {
      this.items = itemPage.data;
    });
  }

  getAvailableRecipes() {
    this.recipe$ = this.itemController.getRuneRecipes();
  }

  getItemQuantity(uid: string): number {
    const item = this.items.find(item => item.uid === uid);
    return item?.quantity ?? 0;
  }

}
