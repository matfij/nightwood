import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from 'src/common/services/date.service';
import { ErrorService } from 'src/common/services/error.service';
import { ItemModule } from '../item/item.module';
import { AuctionController } from './auction.controller';
import { Auction } from './model/auction.entity';
import { AuctionService } from './service/auction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
    ItemModule,
  ],
  controllers: [
    AuctionController,
  ],
  providers: [
    AuctionService,
    DateService,
    ErrorService,
  ]
})
export class AuctionModule {}
