import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/api/users/mail/mail.module';
import { DateService } from 'src/common/services/date.service';
import { ErrorService } from 'src/common/services/error.service';
import { ItemModule } from '../item/item.module';
import { AuctionController } from './auction.controller';
import { Auction } from './model/auction.entity';
import { AuctionJobService } from './service/auction-job.service';
import { AuctionService } from './service/auction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
    ItemModule,
    MailModule,
  ],
  controllers: [
    AuctionController,
  ],
  providers: [
    AuctionService,
    AuctionJobService,
    DateService,
    ErrorService,
  ],
  exports: [
    AuctionService,
  ]
})
export class AuctionModule {}
