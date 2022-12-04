import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlchemyController, ItemDto, MixtureComposeDto, MixtureDto, MixtureRecipeDto } from 'src/app/client/api';
import { DateService } from 'src/app/common/services/date.service';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-alchemy-mixtures',
  templateUrl: './alchemy-mixtures.component.html',
  styleUrls: ['./alchemy-mixtures.component.scss']
})
export class AlchemyMixturesComponent implements OnInit {

  @Input() userItems$? : Observable<ItemDto[]>;
  @Input() brewedMixtures$?: Observable<MixtureDto[]>;
  @Input() mixtureRecipes$?: Observable<MixtureRecipeDto[]>;
  @Output() refreshItems: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentDate: number = 0;
  collectLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  composeLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private alchemyController: AlchemyController,
    private dateService: DateService,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.currentDate = this.dateService.date;
  }

  canCollect(mixture: MixtureDto): boolean {
    return this.dateService.checkIfEventAvailable(mixture.readyOn);
  }

  collectMixture(mixture: MixtureDto) {
    this.collectLoading$.next(true);
    this.alchemyController.collectMixture(mixture.id!.toString()).subscribe(_ => {
      const message = this.translateService.instant('crafting.itemCrafted', { name: mixture.productName });
      this.toastService.showSuccess('common.success', message);
      this.refreshItems.emit();
      this.collectLoading$.next(false);
    }, () => this.collectLoading$.next(false));
  }

  getItemQuantity(uid: string, items: ItemDto[] | null): number {
    const item = items?.find(item => item.uid === uid);
    return item?.quantity ?? 0;
  }

  checkIngredients(recipe: MixtureRecipeDto, items: ItemDto[] | null): boolean {
    let canCraft = true;
    recipe.ingredients.forEach(requiredItem => {
      const item = items?.find(y => y.uid === requiredItem.uid);
      if (!item || item.quantity! < requiredItem.quantity!) {
        canCraft = false;
        return;
      }
    });
    return !canCraft;
  }

  composeMixture(recipe: MixtureRecipeDto) {
    const params: MixtureComposeDto = {
      recipeUid: recipe.uid,
    };
    this.composeLoading$.next(true);
    this.alchemyController.composeMixture(params).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'alchemy.brewingStarted');
      this.refreshItems.emit();
      this.composeLoading$.next(false);
    }, () => this.composeLoading$.next(false));
  }

}
