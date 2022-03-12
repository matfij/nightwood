import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateService } from 'src/common/services/date.service';
import { ErrorService } from 'src/common/services/error.service';
import { Any, Between, FindManyOptions, Like, MoreThan, Repository } from 'typeorm';
import { ItemRarity } from '../../item/model/definitions/item-rarity';
import { ItemType } from '../../item/model/definitions/item-type';
import { ItemService } from '../../item/service/item.service';
import { Auction } from '../model/auction.entity';
import { AuctionDto } from '../model/dto/auction.dto';
import { AuctionCreateDto } from '../model/dto/auction-create.dto';
import { AuctionGetDto } from '../model/dto/auction-get.dto';
import { AuctionPageDto } from '../model/dto/auction-page.dto';
import { ItemDto } from '../../item/model/dto/item.dto';

@Injectable()
export class AuctionService {

    constructor(
        @InjectRepository(Auction)
        private auctionRepository: Repository<Auction>,
        private dateService: DateService,
        private errorService: ErrorService,
        private itemService: ItemService,
    ) {}

    async createAuction(userId: number, dto: AuctionCreateDto): Promise<AuctionDto> {
        const item = await this.itemService.checkItem(userId, dto.itemId);

        if(item.quantity < dto.quantity) this.errorService.throw('errors.insufficientQuantity');

        const auction: AuctionDto = {
            sellerId: userId,
            endTime: this.dateService.getFutureDate(0, dto.duration, 0),
            quantity: dto.quantity,
            totalGoldPrice: dto.quantity * Math.floor(dto.unitGoldPrice),
            item: item,
            active: true,
            finalized: false,
        };
        this.itemService.consumeItem(item, dto.quantity);

        let newAuction = await this.auctionRepository.save(auction);
        newAuction.item.user = null;
        return newAuction;
    }

    async checkAuction(auctionId: number): Promise<AuctionDto> {
        const auction = await this.auctionRepository.findOne({
            relations: ['item'],
            where: {
                id: auctionId,
                active: true,
                finalized: false,
                endTime: MoreThan(this.dateService.getCurrentDate()),
            },
        });
        if(!auction) this.errorService.throw('errors.auctionNotFound');
        return auction;
    }

    async checkOwnedAuction(userId: number, auctionId: number): Promise<AuctionDto> {
        const auction = await this.auctionRepository.findOne({
            relations: ['item'],
            where: {
                id: auctionId,
                sellerId: userId,
                finalized: false,
            },
        });
        if(!auction) this.errorService.throw('errors.auctionNotFound');
        return auction;
    }

    async getAllAuctions(userId: number, dto: AuctionGetDto): Promise<AuctionPageDto> {
        dto.page = Math.max(0, dto.page ?? 0);
        dto.limit = Math.max(1, dto.limit ?? 20);
        dto.minLevel = dto.minLevel ?? 0;
        dto.maxLevel = dto.maxLevel ?? 999;

        const filterOptions: FindManyOptions<AuctionDto> = {
            relations: ['item'],
            where: {
                active: true,
                finalized: false,
                endTime: MoreThan(this.dateService.getCurrentDate()),
                ...(dto.ownedByUser && { sellerId: userId }),
                item: {
                    level: Between(dto.minLevel, dto.maxLevel),
                    type: dto.type ?? Any(Object.values(ItemType)),
                    ...(dto.name && { name: Like(`%${dto.name}%`) }),
                    ...(dto.requiredRarity == ItemRarity.Common && { rarity: Any(Object.values(ItemRarity)) }),
                    ...(dto.requiredRarity == ItemRarity.Scarce && { rarity: Any([ItemRarity.Scarce, ItemRarity.Rare, ItemRarity.Mythical]) }),
                    ...(dto.requiredRarity == ItemRarity.Rare && { rarity: Any([ItemRarity.Rare, ItemRarity.Mythical]) }),
                    ...(dto.requiredRarity == ItemRarity.Mythical && { rarity: Any([ItemRarity.Mythical]) }),
                },
            },
        };

        const auctions = await this.auctionRepository.find({ 
            ...filterOptions,
            order: { endTime: 'ASC' },
            skip: dto.page * dto.limit,
            take: dto.limit,
        });
        const count = await this.auctionRepository.count({
            ...filterOptions,
        });

        const minimizedAuctions = auctions.map(auction => {
            const item = auction.item;
            return {
                ...auction,
                item: { id: item.id, uid: item.uid, name: item.name, rarity: item.rarity, type: item.type, level: item.level },
            }
        });
        const auctionPage: AuctionPageDto = {
            data: minimizedAuctions,
            meta: { totalItems: count },
        };
        return auctionPage;
    }

    async cancelAuction(userId: number, auctionId: number): Promise<void> {
        const auction = await this.checkOwnedAuction(userId, auctionId);

        await this.itemService.refillItem(auction.item as ItemDto, auction.quantity);

        auction.active = false;
        await this.auctionRepository.save(auction);
    }

    async finalizeAuction(auctionId: number): Promise<void> {
        const auction = await this.checkAuction(auctionId);

        auction.active = false;
        auction.finalized = true;
        await this.auctionRepository.save(auction);
    }
}
