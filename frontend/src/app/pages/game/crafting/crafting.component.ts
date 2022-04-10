import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemController, ItemRecipeDto } from 'src/app/client/api';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {

  recipe$!: Observable<ItemRecipeDto[]>;

  constructor(
    private itemController: ItemController,
  ) {}

  ngOnInit(): void {
    this.getAvailableRecipes();
  }

  getAvailableRecipes() {
    this.recipe$ = this.itemController.getRuneRecipes();
  }

}
