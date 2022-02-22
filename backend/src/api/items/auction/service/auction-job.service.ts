import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { MailSendDto, MailSendSystemParams } from "src/api/users/mail/model/dto/mail-send.dto";
import { MailService } from "src/api/users/mail/service/mail.service";
import { DateService } from "src/common/services/date.service";
import { LessThan, Repository } from "typeorm";
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
            await this.itemService.refillItem(auction.item, auction.quantity);

            await this.sendReportMail(auction);
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

    async sendReportMail(auction: AuctionDto): Promise<void> {
        const params: MailSendSystemParams = {
            receiverId: auction.sellerId,
            topic: 'Auction ended',
            message: `item ${auction.item.name} (${auction.quantity}) was not sold.`
        };
        await this.mailService.systemSend(params);
    }
}
