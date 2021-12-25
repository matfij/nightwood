import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AdoptDragonDto } from "src/api/dragons/dragon/model/dto/adopt-dragon.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { FeedDragonDto } from "src/api/dragons/dragon/model/dto/feed-dragon.dto";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { JwtAuthGuard } from "../auth/util/jwt.guard";
import { ActionDragonService } from "./service/action-dragon.service";

@Controller('action')
@UseGuards(JwtAuthGuard)
@ApiTags('ActionController')
export class ActionController {

    constructor(
        private actionDragonService: ActionDragonService,
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

}
