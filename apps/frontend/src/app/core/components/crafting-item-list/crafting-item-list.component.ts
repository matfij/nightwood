import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import {
    ActionController,
    ItemController,
    ItemDto,
    ItemRecipeDto,
    RecipeComposeDto,
    UserAuthDto,
} from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';
import { EngineService } from '../../services/engine.service';

@Component({
    selector: 'app-crafting-item-list',
    templateUrl: './crafting-item-list.component.html',
    styleUrls: ['./crafting-item-list.component.scss'],
})
export class CraftingItemListComponent implements OnInit {
    @Input() items: ItemDto[] | null = [];
    @Input() recipes: ItemRecipeDto[] | null = [];
    @Output() refreshItems = new EventEmitter<boolean>();

    user$?: BehaviorSubject<UserAuthDto>;
    itemsLoading$ = new BehaviorSubject(false);
    composeRecipe$?: Observable<ItemDto>;

    constructor(
        private actionController: ActionController,
        private toastService: ToastService,
        private translateService: TranslateService,
        private engineService: EngineService,
    ) {}

    ngOnInit(): void {
        this.user$ = this.engineService.getUser();
    }

    getItemQuantity(uid: string): number {
        const item = this.items?.find((x) => x.uid === uid);
        return item?.quantity ?? 0;
    }

    checkIngredients(recipe: ItemRecipeDto): boolean {
        let canCraft = true;
        recipe.ingredients.forEach((requiredItem) => {
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
        };
        this.itemsLoading$.next(true);
        this.composeRecipe$ = this.actionController.composeRecipe(params).pipe(
            tap((item) => {
                const message = this.translateService.instant('crafting.itemCrafted', { name: item.name });
                this.toastService.showSuccess('common.success', message);
                this.refreshItems.emit(true);
                this.itemsLoading$.next(false);
                this.engineService.updateUser({
                    gold: this.engineService.user.gold - recipe.gold,
                    eter: this.engineService.user.eter - recipe.eter,
                })
            }),
            catchError((err) => {
                this.itemsLoading$.next(false);
                throw err;
            }),
        );
    }
}
