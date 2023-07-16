import { Injectable } from "@nestjs/common";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { ExpeditionReportDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
import { StartExpeditionDto } from "src/api/dragons/dragon-action/model/dto/expedition-start.dto";
import { DragonActionService } from "src/api/dragons/dragon-action/service/dragon-action.service";
import { ACTION_INCREASE_DRAGON_LIMIT } from "src/api/dragons/dragon/data/dragon-tamer-actions";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { AchievementsService } from "src/api/users/achievements/service/achievements.service";
import { MailSendSystemParams } from "src/api/users/mail/model/definitions/mails";
import { MailService } from "src/api/users/mail/service/mail.service";
import { UserService } from "src/api/users/user/service/user.service";
import { ErrorService } from "src/common/services/error.service";
import { DRAGON_BASE_LIMIT } from "src/configuration/frontend.config";
import { GuildService } from "../../guilds/guild/service/guild.service";

@Injectable()
export class ActionEventService {

    constructor(
        private achievementsService: AchievementsService,
        private guildService: GuildService,
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
        const user = await this.userService.getOne(userId);
        const dragons = await this.dragonService.getOwnedDragons(userId);

        let results: ExpeditionReportDto[] = [];
        let totalExpeditionTime = 0;
        for (const dragon of dragons) {
            const expedition = await this.dragonActionService.checkExpedition(dragon);
            if (expedition) {
                const gainedGold = await this.dragonService.awardExpeditionGold(dragon, expedition);
                const loots = await this.itemService.awardExpeditionItems(userId, dragon, expedition);

                await this.userService.updateGold(userId, gainedGold);

                results.push({
                    dragonName: dragon.name,
                    expeditionName: expedition.name,
                    gainedGold: gainedGold,
                    loots: loots,
                });

                totalExpeditionTime += expedition.minimumActionTime / (60 * 60 * 1000);

                const params: MailSendSystemParams = {
                    receiverId: userId,
                    topic: 'Expedition ended',
                    message: `${dragon.name} has finished exploring ${expedition.name} and found: 
                        <br> • ${gainedGold} gold,
                        ${loots.map(loot => `<br> • ${loot.name} (${loot.quantity})`).join(', ')}.`,
                }
                this.mailService.sendSystemMail(params);
            }
        }

        this.achievementsService.checkCroesusAchievements(userId);
        this.achievementsService.checkCuriousExplorerAchievements(userId, totalExpeditionTime);

        return results.filter(result => result != null);
    }

    async extendDragonLimit(userId: number): Promise<void> {
        const user = await this.userService.getOne(userId);
        const dragons = await this.dragonService.getOwnedDragons(userId);
        const guild = user.guildId ? await this.guildService.getOne(user.guildId) : null;
        
        const extraDragonLimit = guild?.tamerTowerLevel || 0;

        const actionCost = ACTION_INCREASE_DRAGON_LIMIT.baseCost + ACTION_INCREASE_DRAGON_LIMIT.costFactor * (user.maxOwnedDragons - DRAGON_BASE_LIMIT);
        if (user.gold < actionCost) {
            this.errorService.throw('errors.insufficientsFound');
        }
        
        if (user.maxOwnedDragons >= 5 + extraDragonLimit) {
            this.errorService.throw('errors.currentDragonLimitReached');
        }
        const maxDragonLevel = Math.max(...dragons.map(dragon => dragon.level));
        if (maxDragonLevel < 30 && user.maxOwnedDragons >= 3 + extraDragonLimit) {
            this.errorService.throw('errors.currentDragonLimitReached');
        }
        if (maxDragonLevel < 100 && user.maxOwnedDragons >= 4 + extraDragonLimit) {
            this.errorService.throw('errors.currentDragonLimitReached');
        }

        await this.userService.updateGold(userId, -actionCost);
        await this.userService.extendDragonLimit(userId);
    }
}
