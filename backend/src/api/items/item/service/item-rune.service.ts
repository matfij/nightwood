import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { MoreThan, Repository } from "typeorm";
import { RUNE_RECIPES } from "../model/data/item-blueprints";
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

    async getRuneRecipes(): Promise<ItemRecipeDto[]> {
        const recipes = RUNE_RECIPES;
        return recipes;
    }

    async composeRecipe(user: UserDto, dto: RecipeComposeDto): Promise<ItemDto> {
        const items = await this.itemRepository.find({
            where: { user: user, quantity: MoreThan(0) },
        });

        const recipe = RUNE_RECIPES.find(x => x.uid === dto.recipeUid);
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
        const item = items.find(y => y.uid === product.uid);
        if (!item) {
            const newItem = this.itemRepository.create({ ...product, user });
            this.itemRepository.save(newItem);
        } else {
            item.quantity += product.quantity ?? 1;
            this.itemRepository.save(item);
        }

        return product;
    }

    async equipDragon(dragon: DragonDto, item: ItemDto): Promise<void> {
        console.log(dragon.runes)
        // if (item.dragonId !== dragon.id) this.errorService.throw('errors.itemCanNotBeEquipped');
        item.dragonId = dragon.id;
        await this.itemRepository.save({ ...item, dragon});
    }

    async unequipDragon(dragon: DragonDto, item: ItemDto): Promise<void> {
        // check if item is equipped
        if (item.dragonId !== dragon.id) this.errorService.throw('errors.itemNotEquipped');
        item.dragonId = null;
        await this.itemRepository.save(item);
    }
}
