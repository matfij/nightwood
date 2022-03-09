import { Injectable } from "@nestjs/common";
import { DragonAdoptDto } from "src/api/dragons/dragon/model/dto/dragon-adopt.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { DragonFeedDto } from "src/api/dragons/dragon/model/dto/dragon-feed.dto";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { UserService } from "src/api/users/user/service/user.service";

@Injectable()
export class ActionDragonService {

    constructor(
        private userService: UserService,
        private dragonService: DragonService,
        private itemService: ItemService,
    ) {}

    async adoptDragon(userId: number, dto: DragonAdoptDto): Promise<DragonDto> {
        await this.userService.updateOwnedDragons(userId, true);
        
        const dragon = await this.dragonService.adopt(userId, dto);

        return dragon;
    }

    async feedDragon(userId: number, dto: DragonFeedDto): Promise<DragonDto> {
        const item = await this.itemService.checkFeedingItem(userId, dto.itemId);
        const dragon = await this.dragonService.checkFeedingDragon(userId, dto.dragonId);

        await this.itemService.consumeItem(item);
        const fedDragon = await this.dragonService.feedDragon(item, dragon);

        return fedDragon;
    }

    async releaseDragon(userId: number, dragonId: number): Promise<void> {
        await this.dragonService.releaseDragon(userId, dragonId);

        await this.userService.updateOwnedDragons(userId, false);
    }
}
