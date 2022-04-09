import { Request, Controller, Post, UseGuards, Body } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { ItemPageDto } from "./model/dto/item-page.dto";
import { ItemRecipeDto } from "./model/dto/item-recipe.dto";
import { RecipeComposeDto } from "./model/dto/recipe-compose.dto";
import { ItemRuneService } from "./service/item-rune.service";
import { ItemService } from "./service/item.service";

@Controller('item')
@UseGuards(JwtAuthGuard)
@ApiTags('ItemController')
export class ItemController {

    constructor(
        private itemService: ItemService,
        private itemRuneService: ItemRuneService,
    ) {}

    @Post('getOwnedItems')
    @ApiOkResponse({ type: ItemPageDto })
    getOwnedItems(@Request() req: AuthorizedRequest): Promise<ItemPageDto> {
        return this.itemService.getOwnedItems(req.user);
    }

    @Post('getOwnedFoods')
    @ApiOkResponse({ type: ItemPageDto })
    getOwnedFoods(@Request() req: AuthorizedRequest): Promise<ItemPageDto> {
        return this.itemService.getOwnedFoods(req.user);
    }

    @Post('getRuneRecipes')
    @ApiOkResponse({ type: [ItemRecipeDto] })
    getRuneRecipes(): Promise<ItemRecipeDto[]> {
        return this.itemRuneService.getRuneRecipes();
    }

    @Post('composeRecipe')
    @ApiOkResponse()
    composeRecipe(@Request() req: AuthorizedRequest, @Body() dto: RecipeComposeDto): Promise<void> {
        return this.itemRuneService.composeRecipe(req.user, dto);
    }
}
