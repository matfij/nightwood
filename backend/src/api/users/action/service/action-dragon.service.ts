import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDragonDto } from "src/api/dragons/dragon/model/dto/create-dragon.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { FeedDragonDto } from "src/api/dragons/dragon/model/dto/feed-dragon.dto";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { UserDto } from "../../user/model/dto/user.dto";

@Injectable()
export class ActionDragonService {

    constructor(
        private dragonService: DragonService,
        private itemService: ItemService,
    ) {}

    async adopt(owner: UserDto, dto: CreateDragonDto): Promise<DragonDto> {
        return null;
    }

    async feed(owner: UserDto, dto: FeedDragonDto): Promise<DragonDto> {
        const item = await this.itemService.checkFeedingItem(owner.id, dto.itemId);
        const dragon = await this.dragonService.checkFeedingDragon(owner.id, dto.dragonId);

        await this.itemService.consumeFeedingItem(item);
        const fedDragon = await this.dragonService.feedDragon(item, dragon);

        return fedDragon;
    }
}
