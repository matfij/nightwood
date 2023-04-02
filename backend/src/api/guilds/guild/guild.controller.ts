import { Controller, Param, Post, UseGuards, Request, Body } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/users/auth/util/jwt.guard";
import { AuthorizedRequest } from "src/common/definitions/requests";
import { GuildApplicationPageDto } from "./model/dto/guild-application-page.dto";
import { GuildApplicationProcessDto } from "./model/dto/guild-application-process.dto";
import { GuildGetDto } from "./model/dto/guild-get.dto";
import { GuildPageDto } from "./model/dto/guild-page.dto";
import { GuildRoleCreateDto } from "./model/dto/guild-role-create.dto";
import { GuildRoleDto } from "./model/dto/guild-role.dto";
import { GuildDto } from "./model/dto/guild.dto";
import { GuildApplicatonService } from "./service/guild-application.service";
import { GuildRoleService } from "./service/guild-role.service";
import { GuildService } from "./service/guild.service";
import { GuildRoleUpdateDto } from "./model/dto/guild-role-update.dto";
import { GuildMemberService } from "./service/guild-member.service";
import { GuildMemberDto } from "./model/dto/guild-member.dto";
import { GuildMemberUpdateDto } from "./model/dto/guild-member-update.dto";

@Controller('guild')
@UseGuards(JwtAuthGuard)
@ApiTags('GuildController')
export class GuildController {

    constructor(
        private guildService: GuildService,
        private guildApplicatonService: GuildApplicatonService,
        private guildRoleService: GuildRoleService,
        private guildMemberService: GuildMemberService,
    ) {}

    @Post('getDetails/:id')
    @ApiOkResponse({ type: GuildDto })
    async getDetails(@Request() req: AuthorizedRequest, @Param('id') id: number): Promise<GuildDto> {
        return this.guildService.getDetails(id);
    }

    @Post('getFounderGuild')
    @ApiOkResponse({ type: GuildDto })
    async getFounderGuild(@Request() req: AuthorizedRequest): Promise<GuildDto> {
        return this.guildService.getFounderGuild(req.user);
    }

    @Post('getMemberGuild')
    @ApiOkResponse({ type: GuildDto })
    async getMemberGuild(@Request() req: AuthorizedRequest): Promise<GuildDto> {
        return this.guildService.getMemberGuild(req.user);
    }

    @Post('getAll')
    @ApiOkResponse({ type: GuildPageDto })
    async getAll(@Request() req: AuthorizedRequest, @Body() dto: GuildGetDto): Promise<GuildPageDto> {
        return this.guildService.getAll(dto);
    }

    @Post('getApplications')
    @ApiOkResponse({ type: GuildApplicationPageDto })
    async getApplications(@Request() req: AuthorizedRequest): Promise<GuildApplicationPageDto> {
        return this.guildApplicatonService.getGuildApplications(req.user);
    }

    @Post('createGuildRole')
    @ApiOkResponse({ type: GuildRoleDto })
    async createGuildRole(@Request() req: AuthorizedRequest, @Body() dto: GuildRoleCreateDto): Promise<GuildRoleDto> {
        return this.guildRoleService.createGuildRole(req.user, dto);
    }

    @Post('updateGuildRole')
    @ApiOkResponse({ type: GuildRoleDto })
    async updateGuildRole(@Request() req: AuthorizedRequest, @Body() dto: GuildRoleUpdateDto): Promise<GuildRoleDto> {
        return this.guildRoleService.updateGuildRole(req.user, dto);
    }

    @Post('updateGuildMemberRole')
    @ApiOkResponse({ type: GuildMemberDto })
    async updateGuildMemberRole(@Request() req: AuthorizedRequest, @Body() dto: GuildMemberUpdateDto): Promise<GuildMemberDto> {
        return this.guildMemberService.updateRole(req.user.id, dto);
    }

    @Post('deleteMember')
    @ApiOkResponse({ type: GuildMemberDto })
    async deleteMember(@Request() req: AuthorizedRequest, @Param('id') id: number): Promise<GuildMemberDto> {
        return this.guildMemberService.deleteMember(req.user.id, id);
    }
}
