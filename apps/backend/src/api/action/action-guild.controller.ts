import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizedRequest } from 'src/common/definitions/requests';
import { GuildApplicationProcessDto } from '../guilds/guild/model/dto/guild-application-process.dto';
import { GuildApplicationCreateDto } from '../guilds/guild/model/dto/guild-application.create';
import { GuildApplicatonDto } from '../guilds/guild/model/dto/guild-application.dto';
import { GuildCreateDto } from '../guilds/guild/model/dto/guild-create.dto';
import { GuildDto } from '../guilds/guild/model/dto/guild.dto';
import { JwtAuthGuard } from '../users/auth/util/jwt.guard';
import { ActionGuildService } from './service/action-guild.service';
import { GuildMemberDto } from '../guilds/guild/model/dto/guild-member.dto';
import { GuildDepositResourceDto } from '../guilds/guild/model/dto/guild-deposit-resource';

@Controller('actionGuild')
@UseGuards(JwtAuthGuard)
@ApiTags('ActionGuildController')
export class ActionGuildController {
    constructor(private actionGuildService: ActionGuildService) {}

    @Post('createGuild')
    @ApiOkResponse({ type: GuildDto })
    createGuild(@Request() req: AuthorizedRequest, @Body() dto: GuildCreateDto): Promise<GuildDto> {
        return this.actionGuildService.createGuild(req.user.id, dto);
    }

    @Post('createGuildApplication')
    @ApiOkResponse({ type: GuildApplicatonDto })
    createGuildApplication(
        @Request() req: AuthorizedRequest,
        @Body() dto: GuildApplicationCreateDto,
    ): Promise<GuildApplicatonDto> {
        return this.actionGuildService.createGuildApplication(req.user.id, dto);
    }

    @Post('processApplication')
    @ApiOkResponse({ type: GuildMemberDto })
    async processApplication(
        @Request() req: AuthorizedRequest,
        @Body() dto: GuildApplicationProcessDto,
    ): Promise<GuildMemberDto | void> {
        return this.actionGuildService.processApplication(req.user.id, dto);
    }

    @Post('depositResource')
    @ApiOkResponse()
    async depositResource(@Request() req: AuthorizedRequest, @Body() dto: GuildDepositResourceDto) {
        return this.actionGuildService.depositResource(req.user.id, dto);
    }
}
