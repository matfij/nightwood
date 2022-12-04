import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionController, AlchemyController, BoosterActivateDto, BoosterRecipeDto, DragonController, DragonDto, ItemController, ItemDto, MixtureDto, MixtureRecipeDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-alchemy',
  templateUrl: './alchemy.component.html',
  styleUrls: ['./alchemy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlchemyComponent implements OnInit {

  displayMixtures: boolean = false;
  displayBoosters: boolean = false;

  userItems$?: Observable<ItemDto[]>;
  brewedMixtures$?: Observable<MixtureDto[]>;
  mixtureRecipes$?: Observable<MixtureRecipeDto[]>;

  boostersLoading: boolean = false;
  boosterRecipes$: Observable<BoosterRecipeDto[]> = new Observable<BoosterRecipeDto[]>();
  dragons$: Observable<DragonDto[]> = new Observable<DragonDto[]>();

  constructor(
    private actionController: ActionController,
    private alchemyController: AlchemyController,
    private dragonController: DragonController,
    private itemController: ItemController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getUserItems();
    this.getBrewedMixtures();
    this.getMixtrueRecipes();
    this.getBoosterRecipes();
    this.getOwnedDragons();
  }

  getUserItems() {
    this.userItems$ = this.itemController.getOwnedItems().pipe(
      map((itemPage) => itemPage.data)
    );
  }

  getBrewedMixtures() {
    this.brewedMixtures$ = this.alchemyController.getOnGoingMixtures({}).pipe(
      map((mixturePage) => mixturePage.data)
    );
  }

  getMixtrueRecipes() {
    this.mixtureRecipes$ = this.alchemyController.getMixtureRecipes();
  }

  getBoosterRecipes() {
    this.boosterRecipes$ = this.alchemyController.getBoosterRecipes();
  }

  getOwnedDragons() {
    this.dragons$ = this.dragonController.getOwned();
  }

  refreshMixturesData() {
    this.getUserItems();
    this.getBrewedMixtures();
  }



  // getItemQuantity(uid: string): number {
  //   const item = this.userItems$.find(item => item.uid === uid);
  //   return item?.quantity ?? 0;
  // }

  // checkIngredients(recipe: MixtureRecipeDto | BoosterRecipeDto): boolean {
  //   let canCraft = true;
  //   recipe.ingredients.forEach(requiredItem => {
  //     const item = this.userItems$.find(y => y.uid === requiredItem.uid);
  //     if (!item || item.quantity! < requiredItem.quantity!) {
  //       canCraft = false;
  //       return;
  //     }
  //   });

  //   return !canCraft;
  // }

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
