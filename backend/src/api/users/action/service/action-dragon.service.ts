import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdoptDragonDto } from "src/api/dragons/dragon/model/dto/adopt-dragon.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { FeedDragonDto } from "src/api/dragons/dragon/model/dto/feed-dragon.dto";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { Repository } from "typeorm";
import { UserDto } from "../../user/model/dto/user.dto";
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

    async adopt(owner: UserDto, dto: AdoptDragonDto): Promise<DragonDto> {
        await this.userService.incrementOwnedDragons(owner.id);
        
        const dragon = await this.dragonService.adopt(owner.id, dto);

        return dragon;
    }

    async feed(owner: UserDto, dto: FeedDragonDto): Promise<DragonDto> {
        const item = await this.itemService.checkFeedingItem(owner.id, dto.itemId);
        const dragon = await this.dragonService.checkFeedingDragon(owner.id, dto.dragonId);

        await this.itemService.consumeFeedingItem(item);
        const fedDragon = await this.dragonService.feedDragon(item, dragon);

        return fedDragon;
    }

    async release(user: UserDto, dragonId: number): Promise<void> {
        this.dragonService.release(user.id, dragonId);

        user.ownedDragons -= 1;
        this.userRepository.update(user.id, { ownedDragons: user.ownedDragons });
    }
}
