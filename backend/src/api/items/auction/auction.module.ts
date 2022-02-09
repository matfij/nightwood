import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionController } from './auction.controller';
import { Auction } from './model/auction.entity';
import { AuctionService } from './service/auction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
  ],
  controllers: [
    AuctionController,
  ],
  providers: [
    AuctionService,
  ]
})
export class AuctionModule {}
