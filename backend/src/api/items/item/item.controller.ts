import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { ItemService } from "./service/item.service";

@Controller('item')
@UseGuards(JwtAuthGuard)
@ApiTags('ItemController')
export class ItemController {

    constructor(
        private itemService: ItemService
    ) {}
}
