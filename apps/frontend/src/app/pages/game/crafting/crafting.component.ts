import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemController, ItemDto, ItemRecipeDto } from 'src/app/client/api';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftingComponent implements OnInit {

  items$: Observable<ItemDto[]> = new Observable<ItemDto[]>();
  recipesBase$: Observable<ItemRecipeDto[]> = new Observable<ItemRecipeDto[]>();
  recipesSpecial$: Observable<ItemRecipeDto[]> = new Observable<ItemRecipeDto[]>();

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
    this.items$ = this.itemController.getOwnedItems().pipe(
      map((itemPage) => itemPage.data)
    );
  }

  getRecipes() {
    this.recipesBase$ = this.itemController.getRuneBaseRecipes();
    this.recipesSpecial$ = this.itemController.getRuneSpecialRecipes();
  }

}
