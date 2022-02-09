import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';
import { AuctionService } from './service/auction.service';

@Controller('auction')
@UseGuards(JwtAuthGuard)
@ApiTags('AuctionController')
export class AuctionController {

    constructor(
        private auctionService: AuctionService,
    ) {}
}
