import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { MailSendSystemParams } from "src/api/users/mail/model/definitions/mail-params";
import { MailService } from "src/api/users/mail/service/mail.service";
import { DateService } from "src/common/services/date.service";
import { AUCTION_OUT_OF_DATE_DAYS } from "src/configuration/backend.config";
import { LessThan, Repository } from "typeorm";
import { ItemDto } from "../../item/model/dto/item.dto";
import { ItemService } from "../../item/service/item.service";
import { Auction } from "../model/auction.entity";
import { AuctionDto } from "../model/dto/auction.dto";

@Injectable()
export class AuctionJobService {

    constructor(
        @InjectRepository(Auction)
        private auctionRepository: Repository<Auction>,
        private itemService: ItemService,
        private mailService: MailService,
        private dateService: DateService,
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async finalizeEndedAuctions(): Promise<void> {
        const auctions = await this.getEndedAuctions();

        for (const auction of auctions) {
            auction.active = false;
            auction.finalized = true;
            await this.auctionRepository.save(auction);
            await this.itemService.refillItem(auction.item as ItemDto, auction.quantity);

            await this.sendReportMail(auction);
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    async deleteOutOfDateAuctions(): Promise<void> {
        const auctions = await this.getFinalizedAuctions();

        for (const auction of auctions) {
            if (this.dateService.checkDateAgeInDays(auction.endTime) > AUCTION_OUT_OF_DATE_DAYS) {
                await this.auctionRepository.delete(auction);
            }
        }
    }

    async getEndedAuctions(): Promise<AuctionDto[]> {
        const auctions = await this.auctionRepository.find({
            relations: ['item'],
            where: {
                endTime: LessThan(this.dateService.getCurrentDate()),
                active: true,
                finalized: false,
            },
        });

        return auctions;
    }

    async getFinalizedAuctions(): Promise<AuctionDto[]> {
        const auctions = await this.auctionRepository.find({
            where: {
                finalized: true,
            },
        });

        return auctions;
    }

    async sendReportMail(auction: AuctionDto): Promise<void> {
        const params: MailSendSystemParams = {
            senderName: 'Marketplace',
            receiverId: auction.sellerId,
            topic: 'Auction ended',
            message: `Item ${auction.item.name} (${auction.quantity}) was not sold and returned to your inventory.`
        };
        await this.mailService.sendSystemMail(params);
    }
}
