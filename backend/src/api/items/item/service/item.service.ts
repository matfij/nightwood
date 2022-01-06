import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorService } from "src/common/services/error.service";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { StartingItems } from "../model/definitions/item-blueprints";
import { ItemDto } from "../model/dto/item.dto";
import { PageItemDto } from "../model/dto/page-item.dto";
import { Item } from "../model/item.entity";
import { ExpeditionReportDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { ExpeditionDto } from "src/api/dragons/dragon-action/model/dto/expedition.dto";
import { IHON_BERRY } from "../model/data/food";
import { ItemType } from "../model/definitions/item-type";

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
        const items = await this.itemRepository.find({ user: user, type: ItemType.Food });
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

    async updateInventory(user: UserDto, loots: ItemDto[]) {
        const items = await this.itemRepository.find({ user: user, type: ItemType.Food });

        const newItems = [];
        loots.forEach(loot => {
            if (items.map(x => x.name).includes(loot.name)) {
                const item = items[items.map(x => x.name).findIndex(x => x === loot.name)];
                item.quantity += loot.quantity;
            } else {
                const newItem = this.itemRepository.create({ ...loot, user });
                newItems.push(newItem);
            }
        });

        await this.itemRepository.save([...items, ...newItems]);
    }

    async awardExpeditionItems(user: UserDto, dragon: DragonDto, expedition: ExpeditionDto): Promise<ExpeditionReportDto> {
        const loots: ItemDto[] = [];
        expedition.loots.forEach(loot => {
            const presence = Math.random() + (dragon.luck / (2*dragon.level + 10)) > 0.5;
            if (presence) {
                const quantity = Math.floor(1 + ((dragon.luck + dragon.level) / dragon.level));
                loots.push({ ...loot, quantity: quantity });
            }
        });

        await this.updateInventory(user, loots);

        const results: ExpeditionReportDto = {
            dragonName: dragon.name,
            expeditionName: expedition.name,
            loots: loots,
        }
        return results;
    }
}
