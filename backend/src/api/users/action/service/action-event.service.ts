import { Injectable } from "@nestjs/common";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { StartExpeditionDto } from "src/api/dragons/dragon-action/model/dto/start-expedition.dto";
import { DragonActionService } from "src/api/dragons/dragon-action/service/dragon-action.service";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { UserDto } from "../../user/model/dto/user.dto";
import { UserService } from "../../user/service/user.service";

@Injectable()
export class ActionEventService {

    constructor(
        private userService: UserService,
        private dragonService: DragonService,
        private dragonActionService: DragonActionService,
        private itemService: ItemService,
    ) {}

    async startExpedition(user: UserDto, dto: StartExpeditionDto): Promise<DragonActionDto> {
        const dragon = await this.dragonService.checkIfEventAvailable(user.id, dto.dragonId);

        const action = await this.dragonActionService.startExpedition(dto.expeditionId, dragon);

        return action;
    }
}