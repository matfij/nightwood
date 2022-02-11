import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateService } from 'src/common/services/date.service';
import { ErrorService } from 'src/common/services/error.service';
import { Any, Between, Repository } from 'typeorm';
import { ItemRarity } from '../../item/model/definitions/item-rarity';
import { ItemType } from '../../item/model/definitions/item-type';
import { Item } from '../../item/model/item.entity';
import { ItemService } from '../../item/service/item.service';
import { Auction } from '../model/auction.entity';
import { AuctionDto } from '../model/dto/auction.dto';
import { CreateAuctionDto } from '../model/dto/create-auction.dto';
import { GetAuctionDto } from '../model/dto/get-auction.dto';
import { PageAuctionDto } from '../model/dto/page-auction.dto';

@Injectable()
export class AuctionService {

    constructor(
        @InjectRepository(Auction)
        private auctionRepository: Repository<Auction>,
        private dateService: DateService,
        private errorService: ErrorService,
        private itemService: ItemService,
    ) {}

    async create(userId: number, dto: CreateAuctionDto): Promise<AuctionDto> {
        const item = await this.itemService.checkItem(userId, dto.itemId);

        if(item.quantity < dto.quantity) this.errorService.throw('errors.insufficientQuantity');

        const auction: AuctionDto = {
            sellerId: userId,
            endTime: this.dateService.getFutureDate(0, dto.duration, 0),
            quantity: dto.quantity,
            totalGoldPrice: dto.quantity * dto.unitGoldPrice,
            item: item,
            active: true,
        };
        this.itemService.consumeItem(item, dto.quantity);

        let newAuction = await this.auctionRepository.save(auction);
        newAuction.item.user = null;
        return newAuction;
    }

    async getAll(dto: GetAuctionDto): Promise<PageAuctionDto> {
        dto.page = Math.max(0, dto.page ?? 0);
        dto.limit = Math.max(1, dto.limit ?? 20);
        dto.minLevel = dto.minLevel ?? 0;
        dto.maxLevel = dto.maxLevel ?? 999;
        dto.requiredRarity = dto.requiredRarity ?? ItemRarity.Common;

        let auctions = await this.auctionRepository.find({ 
            relations: ['item'],
            where: {
                active: true,
                item: { 
                    level: Between(dto.minLevel, dto.maxLevel),
                    type: dto.type ?? Any(Object.values(ItemType)),
                    rarity: dto.requiredRarity ?? Any(Object.values(ItemRarity)),
                },
            },
            order: { endTime: 'ASC' },
            skip: dto.page * dto.limit,
            take: dto.limit,
        });

        const total = await this.auctionRepository
            .createQueryBuilder('auction')
            .getCount();

        const page: PageAuctionDto = {
            data: auctions,
            meta: { totalItems: total },
        };
        return page;
    }
}
