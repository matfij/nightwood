import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ActionController, AlchemyController, BoosterActivateDto, BoosterRecipeDto, DragonController, DragonDto, ItemController, ItemDto, MixtureComposeDto, MixtureDto, MixtureGetDto, MixturePageDto, MixtureRecipeDto } from 'src/app/client/api';
import { DateService } from 'src/app/common/services/date.service';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-alchemy',
  templateUrl: './alchemy.component.html',
  styleUrls: ['./alchemy.component.scss']
})
export class AlchemyComponent implements OnInit {

  displayPotions: boolean = false;
  displayBoosters: boolean = false;
  currentDate: number = Date.now();
  mixtureRecipes$: Observable<MixtureRecipeDto[]> = new Observable<MixtureRecipeDto[]>();
  mixtures$: Observable<MixturePageDto> = new Observable<MixturePageDto>();
  items: ItemDto[] = [];
  itemsLoading: boolean = false;
  collectingLoading: boolean = false;
  boostersLoading: boolean = false;
  boosterRecipes$: Observable<BoosterRecipeDto[]> = new Observable<BoosterRecipeDto[]>();
  dragons$: Observable<DragonDto[]> = new Observable<DragonDto[]>();

  constructor(
    private actionController: ActionController,
    private alchemyController: AlchemyController,
    private dragonController: DragonController,
    private itemController: ItemController,
    private dateService: DateService,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();
    this.getRecipes();
    this.getOnGoingMixtures();
    this.getOwnedDragons();
  }

  getOwnedItems() {
    this.itemsLoading = true;
    this.itemController.getOwnedItems().subscribe(itemPage => {
      this.itemsLoading = false;
      this.items = itemPage.data;
    }, () => this.itemsLoading = true);
  }

  getRecipes() {
    this.mixtureRecipes$ = this.alchemyController.getMixtureRecipes();
    this.boosterRecipes$ = this.alchemyController.getBoosterRecipes();
  }

  getOwnedDragons() {
    this.dragons$ = this.dragonController.getOwned();
  }

  getOnGoingMixtures() {
    const params: MixtureGetDto = {};
    this.mixtures$ = this.alchemyController.getOnGoingMixtures(params);
  }

  getItemQuantity(uid: string): number {
    const item = this.items.find(item => item.uid === uid);
    return item?.quantity ?? 0;
  }

  checkIngredients(recipe: MixtureRecipeDto | BoosterRecipeDto): boolean {
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

  startMixtureComposing(recipe: MixtureRecipeDto) {
    const params: MixtureComposeDto = {
      recipeUid: recipe.uid,
    }
    this.itemsLoading = true;
    this.alchemyController.composeMixture(params).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'alchemy.brewingStarted');
      this.getOwnedItems();
      this.getOnGoingMixtures();
    }, () => this.itemsLoading = false);
  }

  canCollect(mixture: MixtureDto): boolean {
    return this.dateService.checkIfEventAvailable(mixture.readyOn);
  }

  collectMixture(mixture: MixtureDto) {
    this.collectingLoading = true;
    this.alchemyController.collectMixture(mixture.id!.toString()).subscribe(_ => {
      const message = this.translateService.instant('crafting.itemCrafted', { name: mixture.productName });
      this.toastService.showSuccess('common.success', message);
      this.getOnGoingMixtures();
      this.collectingLoading = false;
    }, () => this.collectingLoading = false);
  }

  activateBooster(recipe: BoosterRecipeDto, dragon: DragonDto) {
    const params: BoosterActivateDto = {
      boosterRecipeUid: recipe.uid,
      dragonId: dragon.id,
    };
    this.boostersLoading = true;
    this.actionController.activateBooster(params).subscribe(_ => {
      this.boostersLoading = false;
      this.toastService.showSuccess('common.success', 'alchemy.boosterActivated');
    }, () => this.boostersLoading = false);
  }

}
