import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { GuildCreateDto } from "../guilds/guild/model/dto/guild-create.dto";
import { GuildDto } from "../guilds/guild/model/dto/guild.dto";
import { JwtAuthGuard } from "../users/auth/util/jwt.guard";
import { ActionGuildService } from "./service/action-guild.service";

@Controller('actionGuild')
@UseGuards(JwtAuthGuard)
@ApiTags('ActionGuildController')
export class ActionGuildController {
    
    constructor(
        private actionGuildService: ActionGuildService,
    ) {}

    @Post('createGuild')
    @ApiOkResponse({ type: GuildDto })
    createGuild(@Request() req: AuthorizedRequest, @Body() dto: GuildCreateDto): Promise<GuildDto> {
        return this.actionGuildService.createGuild(req.user.id, dto);
    }
}
