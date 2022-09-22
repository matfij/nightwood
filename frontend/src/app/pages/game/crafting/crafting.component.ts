import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemController, ItemDto, ItemRecipeDto } from 'src/app/client/api';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {

  recipesBase$: Observable<ItemRecipeDto[]> = new Observable();
  recipesSpecial$: Observable<ItemRecipeDto[]> = new Observable();
  items: ItemDto[] = [];
  itemsLoading: boolean = false;

  displayBaseRecipes: boolean = false;
  displaySpecialRecipes: boolean = false;

  constructor(
    private itemController: ItemController,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();
    this.getRecipes();
  }

  getOwnedItems() {
    this.itemsLoading = true;
    this.itemController.getOwnedItems().subscribe(itemPage => {
      this.itemsLoading = false;
      this.items = itemPage.data;
    }, () => this.itemsLoading = true);
  }

  getRecipes() {
    this.recipesBase$ = this.itemController.getRuneBaseRecipes();
    this.recipesSpecial$ = this.itemController.getRuneSpecialRecipes();
  }

}
