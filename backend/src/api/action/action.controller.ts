import { Body, Controller, Post, UseGuards, Request, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { ExpeditionReportDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
import { StartExpeditionDto } from "src/api/dragons/dragon-action/model/dto/expedition-start.dto";
import { DragonAdoptDto } from "src/api/dragons/dragon/model/dto/dragon-adopt.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { DragonFeedDto } from "src/api/dragons/dragon/model/dto/dragon-feed.dto";
import { AuctionBuyResultDto } from "src/api/items/auction/model/dto/auction-buy-result.dto";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { ActionDragonService } from "./service/action-dragon.service";
import { ActionEventService } from "./service/action-event.service";
import { ActionItemService } from "./service/action-item.service";
import { JwtAuthGuard } from "../users/auth/util/jwt.guard";

@Controller('action')
@UseGuards(JwtAuthGuard)
@ApiTags('ActionController')
export class ActionController {

    constructor(
        private actionDragonService: ActionDragonService,
        private actionEventService: ActionEventService,
        private actionItemService: ActionItemService,
    ) {}
    
    @Post('adoptDragon')
    @ApiOkResponse({ type: DragonDto })
    adoptDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonAdoptDto): Promise<DragonDto> {
        return this.actionDragonService.adoptDragon(req.user.id, dto);
    }

    @Post('feedDragon')
    @ApiOkResponse({ type: DragonDto })
    feedDragon(@Request() req: AuthorizedRequest, @Body() dto: DragonFeedDto): Promise<DragonDto> {
        return this.actionDragonService.feedDragon(req.user.id, dto);
    }

    @Post('startExpedition')
    @ApiOkResponse({ type: DragonActionDto })
    startExpedition(@Request() req: AuthorizedRequest, @Body() dto: StartExpeditionDto): Promise<DragonActionDto> {
      return this.actionEventService.startExpedition(req.user.id, dto);
    }

    @Post('checkExpeditions')
    @ApiOkResponse({ type: [ExpeditionReportDto] })
    checkExpeditions(@Request() req: AuthorizedRequest): Promise<ExpeditionReportDto[]> {
      return this.actionEventService.checkExpeditions(req.user.id);
    }

    @Post('releaseDragon/:id')
    @ApiOkResponse()
    releaseDragon(@Request() req: AuthorizedRequest, @Param('id') id: string) {
      return this.actionDragonService.releaseDragon(req.user.id, +id);
    }

    @Post('buyAuction/:id')
    @ApiOkResponse({ type: AuctionBuyResultDto })
    async buyAuction(@Request() req: AuthorizedRequest, @Param('id') id: string): Promise<AuctionBuyResultDto> {
      return this.actionItemService.buyAuction(req.user.id, +id);
    }
}
