import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';
import { AuthorizedRequest } from 'src/common/definitions/requests';
import { AuctionDto } from './model/dto/auction.dto';
import { CreateAuctionDto } from './model/dto/create-auction.dto';
import { GetAuctionDto } from './model/dto/get-auction.dto';
import { PageAuctionDto } from './model/dto/page-auction.dto';
import { AuctionService } from './service/auction.service';

@Controller('auction')
@UseGuards(JwtAuthGuard)
@ApiTags('AuctionController')
export class AuctionController {

    constructor(
        private auctionService: AuctionService,
    ) {}

    @Post('create')
    @ApiOkResponse({ type: AuctionDto })
    async create(@Request() req: AuthorizedRequest, @Body() dto: CreateAuctionDto): Promise<AuctionDto> {
        return this.auctionService.create(req.user.id, dto);
    }

    @Post('getAll')
    @ApiOkResponse({ type: PageAuctionDto })
    async getAll(@Body() dto: GetAuctionDto): Promise<PageAuctionDto> {
        return this.auctionService.getAll(dto);
    }
}
