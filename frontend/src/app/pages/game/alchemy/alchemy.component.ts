import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlchemyController, BoosterRecipeDto, DragonController, DragonDto, ItemController, ItemDto, MixtureDto, MixtureRecipeDto } from 'src/app/client/api';

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
  userDragons$?: Observable<DragonDto[]>;
  boosterRecipes$: Observable<BoosterRecipeDto[]> = new Observable<BoosterRecipeDto[]>();

  constructor(
    private alchemyController: AlchemyController,
    private dragonController: DragonController,
    private itemController: ItemController,
  ) {}

  ngOnInit(): void {
    this.getUserItems();
    this.getBrewedMixtures();
    this.getMixtrueRecipes();
    this.getBoosterRecipes();
    this.getUserDragons();
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

  getUserDragons() {
    this.userDragons$ = this.dragonController.getOwned();
  }

  refreshMixturesData() {
    this.getUserItems();
    this.getBrewedMixtures();
  }

  refreshBoosterData() {
    this.getUserItems();
    this.getUserDragons();
  }

}
