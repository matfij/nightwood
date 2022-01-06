import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { ExpeditionReportDto } from "src/api/dragons/dragon-action/model/dto/expedition-result.dto";
import { StartExpeditionDto } from "src/api/dragons/dragon-action/model/dto/start-expedition.dto";
import { AdoptDragonDto } from "src/api/dragons/dragon/model/dto/adopt-dragon.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { FeedDragonDto } from "src/api/dragons/dragon/model/dto/feed-dragon.dto";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { ActionDragonService } from "./service/action-dragon.service";
import { ActionEventService } from "./service/action-event.service";

@Controller('action')
@UseGuards(JwtAuthGuard)
@ApiTags('ActionController')
export class ActionController {

    constructor(
        private actionDragonService: ActionDragonService,
        private actionEventService: ActionEventService,
    ) {}
    
    @Post('adoptDragon')
    @ApiOkResponse({ type: DragonDto })
    adoptDragon(@Request() req: AuthorizedRequest, @Body() dto: AdoptDragonDto): Promise<DragonDto> {
        return this.actionDragonService.adopt(req.user, dto);
    }

    @Post('feedDragon')
    @ApiOkResponse({ type: DragonDto })
    feedDragon(@Request() req: AuthorizedRequest, @Body() dto: FeedDragonDto): Promise<DragonDto> {
        return this.actionDragonService.feed(req.user, dto);
    }

    @Post('startExpedition')
    @ApiOkResponse({ type: DragonActionDto })
    startExpedition(@Request() req: AuthorizedRequest, @Body() dto: StartExpeditionDto): Promise<DragonActionDto> {
      return this.actionEventService.startExpedition(req.user, dto);
    }

    @Post('checkExpeditions')
    @ApiOkResponse({ type: [ExpeditionReportDto] })
    checkExpeditions(@Request() req: AuthorizedRequest): Promise<ExpeditionReportDto[]> {
      return this.actionEventService.checkExpeditions(req.user);
    }

}
