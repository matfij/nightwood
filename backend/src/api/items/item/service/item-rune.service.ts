import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { RUNE_RECIPES } from "../model/data/item-blueprints";
import { ItemRecipeDto } from "../model/dto/item-recipe.dto";
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

    async composeRecipe(user: UserDto, dto: RecipeComposeDto): Promise<void> {
        // get user items

        // check if user has all required items

        // subtract used items
        
        // craft recipe product
    }
}
