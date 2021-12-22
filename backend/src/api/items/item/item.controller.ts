import { Request, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { CreateItemDto } from "./model/dto/create-item.dto";
import { ItemDto } from "./model/dto/item.dto";
import { PageItemDto } from "./model/dto/page-item.dto";
import { ItemService } from "./service/item.service";

@Controller('item')
@UseGuards(JwtAuthGuard)
@ApiTags('ItemController')
export class ItemController {

    constructor(
        private itemService: ItemService
    ) {}

    @Post('getOwnedFoods')
    @ApiOkResponse({ type: PageItemDto })
    getOwnedFoods(@Request() req: AuthorizedRequest): Promise<PageItemDto> {
        return this.itemService.getOwnedFoods(req.user);
    }
}
