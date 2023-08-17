import { Injectable } from "@nestjs/common";
import { AuctionBuyResultDto } from "src/api/items/auction/model/dto/auction-buy-result.dto";
import { AuctionService } from "src/api/items/auction/service/auction.service";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { ItemService } from "src/api/items/item/service/item.service";
import { AchievementsService } from "src/api/users/achievements/service/achievements.service";
import { MailSendSystemParams } from "src/api/users/mail/model/definitions/mails";
import { MailService } from "src/api/users/mail/service/mail.service";
import { UserService } from "src/api/users/user/service/user.service";
import { ErrorService } from "src/common/services/error.service";

@Injectable()
export class ActionItemService {

    constructor(
        private achievementsService: AchievementsService,
        private errorService: ErrorService,
        private userService: UserService,
        private mailService: MailService,
        private itemService: ItemService,
        private auctionService: AuctionService,
    ) {}

    async buyAuction(userId: number, auctionId: number): Promise<AuctionBuyResultDto> {
        const auction = await this.auctionService.checkAuction(auctionId);
        let user = await this.userService.getOne(userId);
        let seller = await this.userService.getOne(auction.sellerId);

        if (user.gold < auction.totalGoldPrice) this.errorService.throw('errors.insufficientsFound');

        user = await this.userService.updateGold(userId, -auction.totalGoldPrice);
        seller = await this.userService.updateGold(seller.id, auction.totalGoldPrice);

        await this.auctionService.finalizeAuction(auctionId);
        await this.itemService.updateInventory(userId, [{...auction.item as ItemDto, quantity: auction.quantity}]);

        const mailParams: MailSendSystemParams = {
            senderName: 'Marketplace',
            receiverId: seller.id,
            topic: 'Auction ended',
            message: `Your item ${auction.item.name} (${auction.quantity}) was sold. ${auction.totalGoldPrice} gold has been deposited into your account.`,
        };
        await this.mailService.sendSystemMail(mailParams);

        this.achievementsService.checkCroesusAchievements(seller.id);

        return { consumedGold: auction.totalGoldPrice };
    }

    async decomposeItem(userId: number, itemId: number): Promise<number> {
        const gainedEter = await this.itemService.decomposeItem(userId, itemId);
        await this.userService.updateEter(userId, gainedEter);
        return gainedEter;
    }
}