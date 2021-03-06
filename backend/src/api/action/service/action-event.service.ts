import { Injectable } from "@nestjs/common";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { ExpeditionReportDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
import { StartExpeditionDto } from "src/api/dragons/dragon-action/model/dto/expedition-start.dto";
import { DragonActionService } from "src/api/dragons/dragon-action/service/dragon-action.service";
import { ACTION_INCREASE_DRAGON_LIMIT } from "src/api/dragons/dragon/data/dragon-tamer-actions";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { MailSendSystemParams } from "src/api/users/mail/model/definitions/mail-params";
import { MailService } from "src/api/users/mail/service/mail.service";
import { UserService } from "src/api/users/user/service/user.service";
import { ErrorService } from "src/common/services/error.service";
import { DRAGON_BASE_LIMIT } from "src/configuration/frontend.config";

@Injectable()
export class ActionEventService {

    constructor(
        private userService: UserService,
        private mailService: MailService,
        private dragonService: DragonService,
        private dragonActionService: DragonActionService,
        private itemService: ItemService,
        private errorService: ErrorService
    ) {}

    async startExpedition(userId: number, dto: StartExpeditionDto): Promise<DragonActionDto> {
        const dragon = await this.dragonService.checkIfEventAvailable(userId, dto.dragonId);

        const action = await this.dragonActionService.startExpedition(dto.expeditionUid, dragon);

        return action;
    }

    async checkExpeditions(userId: number): Promise<ExpeditionReportDto[]> {
        const dragons = await this.dragonService.getOwnedDragons(userId);

        let results: ExpeditionReportDto[] = [];
        for (const dragon of dragons) {
            const expedition = await this.dragonActionService.checkExpedition(dragon);
            if (expedition) {
                const user = await this.userService.getOne(userId);

                const gainedGold = await this.dragonService.awardExpeditionGold(dragon, expedition);
                const loots = await this.itemService.awardExpeditionItems(user, dragon, expedition);

                await this.userService.updateGold(userId, gainedGold);

                results.push({
                    dragonName: dragon.name,
                    expeditionName: expedition.name,
                    gainedGold: gainedGold,
                    loots: loots,
                });

                const params: MailSendSystemParams = {
                    receiverId: userId,
                    topic: 'Expedition ended',
                    message: `${dragon.name} has finished exploring ${expedition.name} and found: 
                        <br> ??? ${gainedGold} gold,
                        ${loots.map(loot => `<br> ??? ${loot.name} (${loot.quantity})`).join(', ')}.`,
                }
                this.mailService.sendSystemMail(params);
            }
        }

        return results.filter(result => result != null);
    }

    async extendDragonLimit(userId: number): Promise<void> {
        const user = await this.userService.getOne(userId);
        const dragons = await this.dragonService.getOwnedDragons(userId);

        if (user.maxOwnedDragons >= 5) this.errorService.throw('errors.currentDragonLimitReached');
        
        const actionCost = ACTION_INCREASE_DRAGON_LIMIT.baseCost + ACTION_INCREASE_DRAGON_LIMIT.costFactor * (user.maxOwnedDragons - DRAGON_BASE_LIMIT);
        if (user.gold < actionCost) this.errorService.throw('errors.insufficientsFound');

        const maxDragonLevel = Math.max(...dragons.map(dragon => dragon.level));
        if (maxDragonLevel < 30) this.errorService.throw('errors.currentDragonLimitReached');
        if (maxDragonLevel < 100 && user.maxOwnedDragons >= 4) this.errorService.throw('errors.currentDragonLimitReached');

        await this.userService.updateGold(userId, -actionCost);
        await this.userService.extendDragonLimit(userId);
    }
}
