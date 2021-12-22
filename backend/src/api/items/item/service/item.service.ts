import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/api/users/user/service/user.service";
import { Repository } from "typeorm";
import { Item } from "../model/item.entity";

@Injectable()
export class ItemService {

    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        private userService: UserService,
    ) {}
}
