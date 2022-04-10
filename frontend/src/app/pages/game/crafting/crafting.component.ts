import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ItemController, ItemDto, ItemRecipeDto, RecipeComposeDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {

  recipe$: Observable<ItemRecipeDto[]> = new Observable();
  items: ItemDto[] = [];
  itemsLoading: boolean = false;

  constructor(
    private translateService: TranslateService,
    private itemController: ItemController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();
    this.getAvailableRecipes();
  }

  getOwnedItems() {
    this.itemsLoading = true;
    this.itemController.getOwnedItems().subscribe(itemPage => {
      this.itemsLoading = false;
      this.items = itemPage.data;
    }, () => this.itemsLoading = true);
  }

  getAvailableRecipes() {
    this.recipe$ = this.itemController.getRuneRecipes();
  }

  getItemQuantity(uid: string): number {
    const item = this.items.find(item => item.uid === uid);
    return item?.quantity ?? 0;
  }

  checkIngredients(recipe: ItemRecipeDto): boolean {
    let canCraft = true;
    recipe.ingredients.forEach(requiredItem => {
      const item = this.items.find(y => y.uid === requiredItem.uid);
      if (!item || item.quantity! < requiredItem.quantity!) {
        canCraft = false;
        return;
      }
    });

    return !canCraft;
  }

  craftRecipe(recipe: ItemRecipeDto) {
    const params: RecipeComposeDto = {
      recipeUid: recipe.uid,
    }
    this.itemsLoading = true;
    this.itemController.composeRecipe(params).subscribe(item => {
      const message = this.translateService.instant('crafting.itemCrafted', { name: item.name });
      this.toastService.showSuccess('common.success', message);
      this.getOwnedItems();
    }, () => this.itemsLoading = false);
  }

}
