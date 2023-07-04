import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { MoreThan, Repository } from "typeorm";
import { RUNE_BASE_RECIPES, RUNE_SPECIAL_RECIPES } from "../data/rune-recipes";
import { ItemRecipeDto } from "../model/dto/item-recipe.dto";
import { ItemDto } from "../model/dto/item.dto";
import { RecipeComposeDto } from "../model/dto/recipe-compose.dto";
import { Item } from "../model/item.entity";

@Injectable()
export class ItemRuneService {

    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        private errorService: ErrorService,
    ) {}

    async getRuneBaseRecipes(): Promise<ItemRecipeDto[]> {
        return RUNE_BASE_RECIPES;
    }

    async getRuneSpecialRecipes(): Promise<ItemRecipeDto[]> {
        return RUNE_SPECIAL_RECIPES;
    }

    async composeRecipe(userId: number, dto: RecipeComposeDto): Promise<ItemDto> {
        const items = await this.itemRepository.find({
            where: { user: { id: userId }, quantity: MoreThan(0) },
        });

        const recipe = [...RUNE_BASE_RECIPES, ...RUNE_SPECIAL_RECIPES].find(x => x.uid === dto.recipeUid);
        if (!recipe) this.errorService.throw('errors.recipeNotFound');

        const requiredItems = recipe.ingredients;
        const missingItems = requiredItems.filter(requiredItem => {
            const item = items.find(y => y.uid === requiredItem.uid);
            if (!item || item.quantity < requiredItem.quantity) return true;
            return false;
        });
        if (missingItems.length > 0) this.errorService.throw('errors.insufficientIngredients');

        requiredItems.forEach(requiredItem => {
            const item = items.find(y => y.uid === requiredItem.uid);
            item.quantity -= requiredItem.quantity;
            this.itemRepository.save(item);
        });

        const product = recipe.product;
        const newItem = this.itemRepository.create({ ...product, user: { id: userId } });
        this.itemRepository.save(newItem);

        return product;
    }
}
