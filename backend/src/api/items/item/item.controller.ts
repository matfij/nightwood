import { Request, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { ItemPageDto } from "./model/dto/item-page.dto";
import { ItemService } from "./service/item.service";

@Controller('item')
@UseGuards(JwtAuthGuard)
@ApiTags('ItemController')
export class ItemController {

    constructor(
        private itemService: ItemService
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
}
