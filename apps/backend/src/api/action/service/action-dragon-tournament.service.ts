import { Injectable } from '@nestjs/common';
import { DragonService } from '../../dragons/dragon/service/dragon.service';
import { UserService } from '../../users/user/service/user.service';
import { ItemService } from '../../items/item/service/item.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { battleTournamentAwards } from '../../dragons/dragon/data/battle-tournament-awards';
import { MailService } from '../../users/mail/service/mail.service';
import { BattleTournamentAward } from '../../dragons/dragon/model/definitions/battle-tournament-award';
import { UserDto } from '../../users/user/model/dto/user.dto';
import { DragonBestDto } from '../../dragons/dragon/model/dto/dragon-best.dto';
import { AchievementsService } from '../../users/achievements/service/achievements.service';

@Injectable()
export class ActionDragonTourneamentService {
    private readonly REWARDED_PLACES = 3;
    private readonly EDITION_NAMES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    constructor(
        private dragonService: DragonService,
        private userService: UserService,
        private itemService: ItemService,
        private mailService: MailService,
        private achievementsService: AchievementsService,
    ) {}

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
    async checkIfTournamentEnded() {
        await this.awardTournamentWinners();
    }

    async awardTournamentWinners() {
        const winningDragons = await this.dragonService.getSeasonalWinners();
        for (let place = 0; place < this.REWARDED_PLACES; place++) {
            if (winningDragons.length <= place) {
                return;
            }
            const dragon = winningDragons[place];
            if (!dragon || !dragon.userId || dragon.seasonalExperience === 0) {
                continue;
            }
            const owner = await this.userService.getOne(dragon.userId);
            const award = battleTournamentAwards[place];
            await this.userService.updateGold(owner.id, award.gold);
            await this.userService.updateEter(owner.id, award.eter);
            await this.itemService.updateInventory(owner.id, award.items);
            await this.achievementsService.checkChampionAchievements(owner.id, true);
            await this.notifyWinner(owner, dragon, place + 1, award);
        }
        await this.dragonService.resetSeasonalExperience();
    }

    private async notifyWinner(
        owner: UserDto,
        dragon: DragonBestDto,
        place: number,
        award: BattleTournamentAward,
    ) {
        const editionName = this.EDITION_NAMES[new Date().getMonth()];
        const topic = `${editionName} Battle Tournament Awards`;
        const placeName = place === 1 ? '1st' : place === 2 ? '2nd' : place === 3 ? '3rd' : `${place}th`;
        const message = `
            Congratulations ${owner.nickname}, your dragon ${dragon.name} achieved ${placeName} place during the ${editionName} Battle Tournament.
            <br> Obtained awards:
            <br> • ${award.gold} gold,
            <br> • ${award.eter} eter,
            ${award.items.map((item) => `<br> • ${item.name} (${item.quantity})`).join(', ')}.
        `;
        await this.mailService.sendSystemMail({
            receiverId: owner.id,
            topic: topic,
            message: message,
        });
    }
}
