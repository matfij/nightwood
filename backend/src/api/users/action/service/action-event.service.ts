import { BadRequestException, Injectable } from "@nestjs/common";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { ExpeditionReportDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
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

    async checkExpeditions(user: UserDto): Promise<ExpeditionReportDto[]> {
        const dragons = await this.dragonService.getOwnedDragons(user.id);

        const results = await Promise.all(dragons.map(async (dragon) => {
            const expedition = await this.dragonActionService.checkExpedition(dragon);
            if (expedition) {
                return await this.itemService.awardExpeditionItems(user, dragon, expedition);
            }
        }));
        
        return results.filter(result => result != null);
    }
}