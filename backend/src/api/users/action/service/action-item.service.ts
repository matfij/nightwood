import { Injectable } from "@nestjs/common";
import { BuyAuctionResultDto } from "src/api/items/auction/model/dto/buy-auction-result.dto";
import { AuctionService } from "src/api/items/auction/service/auction.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { ErrorService } from "src/common/services/error.service";
import { UserService } from "../../user/service/user.service";

@Injectable()
export class ActionItemService {

    constructor(
        private errorService: ErrorService,
        private userService: UserService,
        private itemService: ItemService,
        private auctionService: AuctionService,
    ) {}

    async buyAuction(userId: number, auctionId: number): Promise<BuyAuctionResultDto> {
        const auction = await this.auctionService.checkAuction(auctionId);
        let user = await this.userService.getOne(userId);
        let seller = await this.userService.getOne(auction.sellerId);

        if (user.gold < auction.totalGoldPrice) this.errorService.throw('errors.insufficientsFound');

        user = await this.userService.updateGold(userId, -auction.totalGoldPrice);
        seller = await this.userService.updateGold(seller.id, auction.totalGoldPrice);

        await this.auctionService.finalizeAuction(auctionId);
        await this.itemService.updateInventory(user, [{...auction.item, quantity: auction.quantity}]);

        return { consumedGold: auction.totalGoldPrice };
    }
}