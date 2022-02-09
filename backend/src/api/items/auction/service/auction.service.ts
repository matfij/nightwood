import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction } from '../model/auction.entity';

@Injectable()
export class AuctionService {

    constructor(
        @InjectRepository(Auction)
        private auctionRepository: Repository<Auction>
    ) {}
}
