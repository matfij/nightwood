import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { StartingItems } from "../model/definitions/item-blueprints";
import { PageItemDto } from "../model/dto/page-item.dto";
import { Item } from "../model/item.entity";

@Injectable()
export class ItemService {

    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
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
}
