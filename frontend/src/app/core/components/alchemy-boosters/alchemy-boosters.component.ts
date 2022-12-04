import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionController, BoosterActivateDto, BoosterRecipeDto, DragonDto, ItemDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-alchemy-boosters',
  templateUrl: './alchemy-boosters.component.html',
  styleUrls: ['./alchemy-boosters.component.scss']
})
export class AlchemyBoostersComponent implements OnInit {

  @Input() userItems$?: Observable<ItemDto[]>;
  @Input() userDragons$?: Observable<DragonDto[]>;
  @Input() boosterRecipes$?: Observable<BoosterRecipeDto[]>;
  @Output() refreshItems: EventEmitter<boolean> = new EventEmitter<boolean>();

  activateLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private actionController: ActionController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {}

  getItemQuantity(uid: string, items: ItemDto[] | null): number {
    const item = items?.find((item) => item.uid === uid);
    return item?.quantity ?? 0;
  }

  checkIngredients(recipe: BoosterRecipeDto, items: ItemDto[] | null): boolean {
    let canCraft = true;
    recipe.ingredients.forEach((ingredient) => {
      const item = items?.find(y => y.uid === ingredient.uid);
      if (!item || item.quantity! < ingredient.quantity!) canCraft = false;
    });
    return !canCraft;
  }

  activateBooster(recipe: BoosterRecipeDto, dragon: DragonDto | null) {
    if (!dragon) return;

    const params: BoosterActivateDto = {
      boosterRecipeUid: recipe.uid,
      dragonId: dragon.id,
    };
    this.activateLoading$.next(true);
    this.actionController.activateBooster(params).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'alchemy.boosterActivated');
      this.refreshItems.emit();
      this.activateLoading$.next(false);
    }, () => this.activateLoading$.next(false));
  }

}
