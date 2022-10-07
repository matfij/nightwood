import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorService } from "src/common/services/error.service";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { MoreThan, Repository } from "typeorm";
import { STARTING_ITEMS } from "../data/_blueprints";
import { ItemDto } from "../model/dto/item.dto";
import { ItemPageDto } from "../model/dto/item-page.dto";
import { Item } from "../model/item.entity";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { ExpeditionDto } from "src/api/dragons/dragon-action/model/dto/expedition.dto";
import { ItemType, LootChance } from "../model/definitions/items";
import { MathService } from "src/common/services/math.service";
import { DataService } from "src/common/services/data.service";

@Injectable()
export class ItemService {

    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        private dataService: DataService,
        private errorService: ErrorService,
        private mathService: MathService,
    ) {}

    async createStartingItems(user: UserDto) {
        STARTING_ITEMS.forEach(x => {
            const item = this.itemRepository.create({ ...x, user });
            this.itemRepository.save(item);
        });
    }

    async getOwnedFoods(user: UserDto): Promise<ItemPageDto> {
        const items = await this.itemRepository.find({ user: user, type: ItemType.Food, quantity: MoreThan(0) });
        const itemsPage: ItemPageDto = {
            data: items,
            meta: {},
        };
        return itemsPage;
    }

    async getOwnedItems(user: UserDto): Promise<ItemPageDto> {
        let items = await this.itemRepository.find({
            where: { user: user, quantity: MoreThan(0) },
            order: { id: 'DESC' },
        });

        items = items.map(item => {
            return { ...item, ...this.dataService.getItemData(item.uid) };
        });

        const itemsPage: ItemPageDto = {
            data: items,
            meta: {},
        };
        return itemsPage;
    }

    async checkItem(userId: number, itemId: number): Promise<ItemDto> {
        const item = await this.itemRepository.findOne(itemId, { relations: ['user', 'dragon'] });
        
        if (!item) this.errorService.throw('errors.itemNotFound');
        if (item.user.id !== userId) this.errorService.throw('errors.itemNotFound');
        if (item.quantity < 1) this.errorService.throw('errors.insufficientQuantity');

        let itemDef = this.dataService.getItemData(item.uid);
        return { ...item, ...itemDef };
    }

    async checkFeedingItem(userId: number, itemId: number): Promise<ItemDto> {
        const item = await this.checkItem(userId, itemId);

        if (item.type !== ItemType.Food) this.errorService.throw('errors.itemNotFound');

        let itemDef = this.dataService.getItemData(item.uid);
        return { ...item, ...itemDef };
    }
    
    async checkEquippingItem(userId: number, itemId: number): Promise<ItemDto> {
        const item = await this.checkItem(userId, itemId);
        
        if (item.type !== ItemType.Equipment) this.errorService.throw('errors.itemNotFound');
        
        let itemDef = this.dataService.getItemData(item.uid);
        return { ...item, ...itemDef };
    }

    async checkUnequippingItem(userId: number, itemId: number): Promise<ItemDto> {
        const item = await this.itemRepository.findOne(itemId, { relations: ['user', 'dragon'] });
        
        if (!item) this.errorService.throw('errors.itemNotFound');
        if (item.user.id !== userId) this.errorService.throw('errors.itemNotFound');

        if (item.type !== ItemType.Equipment) this.errorService.throw('errors.itemNotFound')
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

    async checkAndConsumeItems(requiredItems: ItemDto[], userId: number): Promise<void> {
        const userItems = await this.itemRepository.find({
            where: { user: userId, quantity: MoreThan(0) },
        });
        const missingItems = requiredItems.filter(requiredItem => {
            const item = userItems.find(item => item.uid === requiredItem.uid);
            if (!item || item.quantity < requiredItem.quantity) return true;
            return false;
        });
        if (missingItems.length > 0) this.errorService.throw('errors.insufficientIngredients');

        requiredItems.forEach(requiredItem => {
            const item = userItems.find(item => item.uid === requiredItem.uid);
            item.quantity -= requiredItem.quantity;
            this.itemRepository.save(item);
        });
    }

    async equipItem(item: ItemDto, dragon: DragonDto): Promise<ItemDto> {
        item.quantity -= 1;
        return await this.itemRepository.save({ ...item, dragon });
    }

    async unquipItem(item: Item): Promise<ItemDto> {
        item.quantity += 1;
        item.dragon = null;
        return await this.itemRepository.save(item);
    }

    async updateInventory(user: UserDto, loots: ItemDto[]) {
        const items = await this.itemRepository.find({ user: user });

        const newItems = [];
        loots.forEach(loot => {
            if (items.map(x => x.uid).includes(loot.uid) && loot.type !== ItemType.Equipment) {
                const item = items[items.map(x => x.uid).findIndex(x => x === loot.uid)];
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
        let baseLoots = expedition.loots;
        if (dragon.unlockedExpeditions.includes(expedition.uid)) baseLoots = [...baseLoots, ...expedition.extraLoots];

        baseLoots.forEach(loot => {

            const dragonChance = Math.random() * (1 + dragon.skills.treasureHunter / 40);  // 0 - 1 * 1 - 1.5
            const requiredChance = Math.random() * LootChance[loot.rarity];  // 0-1 * 2-44

            if (dragonChance > requiredChance) {
                if (loots.map(x => x.uid).includes(loot.uid)) loots.find(x => x.uid === loot.uid).quantity += 1;
                else loots.push({ ...loot, quantity: 1 });
            }
        });

        await this.updateInventory(user, loots);

        return loots;
    }
}
