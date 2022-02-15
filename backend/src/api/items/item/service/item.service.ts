import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorService } from "src/common/services/error.service";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { StartingItems } from "../model/data/item-blueprints";
import { ItemDto } from "../model/dto/item.dto";
import { PageItemDto } from "../model/dto/page-item.dto";
import { Item } from "../model/item.entity";
import { ExpeditionReportDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { ExpeditionDto } from "src/api/dragons/dragon-action/model/dto/expedition.dto";
import { IHON_BERRY } from "../model/data/food";
import { ItemType } from "../model/definitions/item-type";
import { ItemRarity, LootChance } from "../model/definitions/item-rarity";

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

    async checkItem(userId: number, itemId: number): Promise<ItemDto> {
        const item = await this.itemRepository.findOne(itemId, { relations: ['user'] });
        
        if (!item) this.errorService.throw('errors.itemNotFound');
        if (item.user.id !== userId) this.errorService.throw('errors.itemNotFound');
        if (item.quantity < 1) this.errorService.throw('errors.insufficientQuantity');
        
        return item;
    }

    async checkFeedingItem(userId: number, itemId: number): Promise<ItemDto> {
        const item = await this.itemRepository.findOne(itemId, { relations: ['user'] });
        
        if (!item) this.errorService.throw('errors.itemNotFound');
        if (item.user.id !== userId) this.errorService.throw('errors.itemNotFound');
        if (item.type !== ItemType.Food) this.errorService.throw('errors.itemNotFound');
        if (item.quantity < 1) this.errorService.throw('errors.insufficientQuantity');
        
        return item;
    }

    async refillItem(item: ItemDto, quantity: number = 1): Promise<void> {
        item.quantity += quantity;
        this.itemRepository.save(item);
    }

    async consumeItem(item: ItemDto, quantity: number = 1): Promise<void> {
        item.quantity -= quantity;
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

    async awardExpeditionItems(user: UserDto, dragon: DragonDto, expedition: ExpeditionDto): Promise<ItemDto[]> {
        const loots: ItemDto[] = [];
        expedition.loots.forEach(loot => {

            const dragonChance = Math.random() * (1 + (dragon.luck / (2*dragon.level + 5)));
            const requiredChance = Math.random() * LootChance[loot.rarity];

            if (dragonChance > requiredChance) {
                if (loots.map(x => x.name).includes(loot.name)) loots.find(x => x.name === loot.name).quantity += 1;
                else loots.push({ ...loot, quantity: 1 });
            }
        });

        await this.updateInventory(user, loots);

        return loots;
    }

    getIdentifierName(name: string): string {
        return name.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join('');
    }

    getRarityValue(rarity: ItemRarity): number {
        switch (rarity) {
            case ItemRarity.Common: return 1;
            case ItemRarity.Scarce: return 2;
            case ItemRarity.Rare: return 4;
            case ItemRarity.Mythical: return 8;
            default: return 1;
        }
    }
}
