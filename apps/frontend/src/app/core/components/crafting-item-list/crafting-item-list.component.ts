import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ItemController, ItemDto, ItemRecipeDto, RecipeComposeDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-crafting-item-list',
  templateUrl: './crafting-item-list.component.html',
  styleUrls: ['./crafting-item-list.component.scss']
})
export class CraftingItemListComponent implements OnInit {

  @Input() items: ItemDto[] | null = [];
  @Input() recipes: ItemRecipeDto[] | null = [];
  @Output() refreshItems: EventEmitter<boolean> = new EventEmitter<boolean>();

  itemsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private itemController: ItemController,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {}

  getItemQuantity(uid: string): number {
    const item = this.items?.find((x) => x.uid === uid);
    return item?.quantity ?? 0;
  }

  checkIngredients(recipe: ItemRecipeDto): boolean {
    let canCraft = true;
    recipe.ingredients.forEach(requiredItem => {
      const item = this.items?.find((x) => x.uid === requiredItem.uid);
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
    this.itemsLoading$.next(true);
    this.itemController.composeRecipe(params).subscribe(item => {
      const message = this.translateService.instant('crafting.itemCrafted', { name: item.name });
      this.toastService.showSuccess('common.success', message);
      this.refreshItems.emit(true);
      this.itemsLoading$.next(false);
    }, () => this.itemsLoading$.next(false));
  }

}
