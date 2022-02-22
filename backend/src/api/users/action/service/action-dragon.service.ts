import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdoptDragonDto } from "src/api/dragons/dragon/model/dto/adopt-dragon.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { FeedDragonDto } from "src/api/dragons/dragon/model/dto/feed-dragon.dto";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";
import { UserService } from "../../user/service/user.service";

@Injectable()
export class ActionDragonService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UserService,
        private dragonService: DragonService,
        private itemService: ItemService,
    ) {}

    async adopt(userId: number, dto: AdoptDragonDto): Promise<DragonDto> {
        await this.userService.incrementOwnedDragons(userId);
        
        const dragon = await this.dragonService.adopt(userId, dto);

        return dragon;
    }

    async feed(userId: number, dto: FeedDragonDto): Promise<DragonDto> {
        const item = await this.itemService.checkFeedingItem(userId, dto.itemId);
        const dragon = await this.dragonService.checkFeedingDragon(userId, dto.dragonId);

        await this.itemService.consumeItem(item);
        const fedDragon = await this.dragonService.feedDragon(item, dragon);

        return fedDragon;
    }

    async release(userId: number, dragonId: number): Promise<void> {
        const user = await this.userRepository.findOne(userId);

        this.dragonService.release(userId, dragonId);

        user.ownedDragons -= 1;
        await this.userRepository.update(userId, { ownedDragons: user.ownedDragons });
    }
}
