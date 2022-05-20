import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlchemyController, ItemDto, MixtureRecipeDto } from 'src/app/client/api';

@Component({
  selector: 'app-alchemy',
  templateUrl: './alchemy.component.html',
  styleUrls: ['./alchemy.component.scss']
})
export class AlchemyComponent implements OnInit {

  recipes$: Observable<MixtureRecipeDto[]> = new Observable<MixtureRecipeDto[]>();
  items: ItemDto[] = [];
  itemsLoading: boolean = false;

  constructor(
    private alchemyController: AlchemyController,
  ) {}

  ngOnInit(): void {
    this.getOwnedItems();
    this.getMixtureRecipes();
  }

  getOwnedItems() {

  }

  getMixtureRecipes() {
    this.recipes$ = this.alchemyController.getMixtureRecipes();
  }

  getItemQuantity(uid: string): number {
    const item = this.items.find(item => item.uid === uid);
    return item?.quantity ?? 0;
  }

  checkIngredients(recipe: MixtureRecipeDto) {
  }

  startMixtureComposing() {

  }

}
