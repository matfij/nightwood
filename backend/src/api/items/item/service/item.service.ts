import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorService } from "src/api/users/auth/service/error.service";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { StartingItems } from "../model/definitions/item-blueprints";
import { ItemDto } from "../model/dto/item.dto";
import { PageItemDto } from "../model/dto/page-item.dto";
import { Item } from "../model/item.entity";

@Injectable()
export class ItemService {

    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        private errorService: ErrorService,
    ) {}

    async createStartingItems(user: UserDto) {
        StartingItems.forEach(x => {
            const item = this.itemRepository.create({ ...x, user });
            this.itemRepository.save(item);
        });
    }

    async getOwnedFoods(user: UserDto): Promise<PageItemDto> {
        const items = await this.itemRepository.find({ user: user });
        const itemsPage: PageItemDto = {
            data: items,
            meta: {},
        };
        return itemsPage;
    }

    async checkFeedingItem(ownerId: number, itemId: number): Promise<ItemDto> {
        const item = await this.itemRepository.findOne(itemId, { relations: ['user'] });
        
        if (!item) this.errorService.throw('errors.itemNotFound');
        if (item.user.id !== ownerId) this.errorService.throw('errors.itemNotFound');
        if (item.quantity < 1) this.errorService.throw('errors.insufficientQuantity');
        
        return item;
    }

    async consumeFeedingItem(item: ItemDto): Promise<void> {
        item.quantity -= 1;
        this.itemRepository.save(item);
    }
}
