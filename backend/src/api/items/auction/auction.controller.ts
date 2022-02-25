import { Body, Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';
import { AuthorizedRequest } from 'src/common/definitions/requests';
import { AuctionDto } from './model/dto/auction.dto';
import { AuctionCreateDto } from './model/dto/auction-create.dto';
import { AuctionGetDto } from './model/dto/auction-get.dto';
import { AuctionPageDto } from './model/dto/auction-page.dto';
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
    async create(@Request() req: AuthorizedRequest, @Body() dto: AuctionCreateDto): Promise<AuctionDto> {
        return this.auctionService.createAuction(req.user.id, dto);
    }

    @Post('getAll')
    @ApiOkResponse({ type: AuctionPageDto })
    async getAll(@Request() req: AuthorizedRequest, @Body() dto: AuctionGetDto): Promise<AuctionPageDto> {
        return this.auctionService.getAllAuctions(req.user.id, dto);
    }

    @Post('cancel/:id')
    @ApiOkResponse()
    async cancel(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<void> {
        return this.auctionService.cancelAuction(req.user.id, +id);
    }
}
