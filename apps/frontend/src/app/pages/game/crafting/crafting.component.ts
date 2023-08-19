import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActionController, ItemController, ItemDto, ItemRecipeDto, ItemType } from 'src/app/client/api';
import { CONVERT_ETER } from '../../../core/data/eter-converter';
import { ToastService } from '../../../common/services/toast.service';
import { EngineService } from '../../../core/services/engine.service';

@Component({
    selector: 'app-crafting',
    templateUrl: './crafting.component.html',
    styleUrls: ['./crafting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CraftingComponent implements OnInit {
    items$ = new Observable<ItemDto[]>();
    recipesBase$ = new Observable<ItemRecipeDto[]>();
    recipesSpecial$ = new Observable<ItemRecipeDto[]>();
    decomposeItem$ = new Observable<void>();
    decomposeLoading$ = new BehaviorSubject(false);

    displayBaseRecipes = false;
    displaySpecialRecipes = false;
    displayEterRecipes = false;

    constructor(
        private actionController: ActionController,
        private itemController: ItemController,
        private toastService: ToastService,
        private engineService: EngineService,
    ) {}

    ngOnInit(): void {
        this.getOwnedItems();
        this.getRecipes();
    }

    getOwnedItems() {
        this.items$ = this.itemController.getOwnedItems().pipe(map((itemPage) => itemPage.data));
    }

    getRecipes() {
        this.recipesBase$ = this.itemController.getRuneBaseRecipes();
        this.recipesSpecial$ = this.itemController.getRuneSpecialRecipes();
    }

    filterEquipment(items: ItemDto[]): ItemDto[] {
        return items.filter((item) => item.type === ItemType.Equipment);
    }

    calculateEterGain(itemId: number, items: ItemDto[]): number {
        const item = items.filter((item) => item.id === itemId)[0];
        return CONVERT_ETER(item.level, item.rarity);
    }

    decomposeItem(itemId: number) {
        this.decomposeLoading$.next(true);
        this.decomposeItem$ = this.actionController.decomposeItem(itemId).pipe(
            tap(() => {
                this.toastService.showSuccess('common.success', 'crafting.itemDecomposed');
                this.getOwnedItems();
                this.engineService.tick();
                this.decomposeLoading$.next(false);
            }),
            catchError((err) => {
                this.decomposeLoading$.next(false);
                throw err;
            })
        );
    }
}
