import { BadRequestException, Injectable } from "@nestjs/common";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { ExpeditionResultDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
import { StartExpeditionDto } from "src/api/dragons/dragon-action/model/dto/start-expedition.dto";
import { DragonActionService } from "src/api/dragons/dragon-action/service/dragon-action.service";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { UserDto } from "../../user/model/dto/user.dto";

@Injectable()
export class ActionEventService {

    constructor(
        private dragonService: DragonService,
        private dragonActionService: DragonActionService,
        private itemService: ItemService,
    ) {}

    async startExpedition(user: UserDto, dto: StartExpeditionDto): Promise<DragonActionDto> {
        const dragon = await this.dragonService.checkIfEventAvailable(user.id, dto.dragonId);

        const action = await this.dragonActionService.startExpedition(dto.expeditionId, dragon);

        return action;
    }

    async endExpedition(user: UserDto, dto: DragonDto): Promise<ExpeditionResultDto> {
        const dragon = await this.dragonService.checkDragon(user.id, dto.id);

        const expedition = await this.dragonActionService.checkExpedition(dragon);
        
        const result = this.itemService.awardExpeditionItems(user, dragon, expedition);

        return result;
    }
}