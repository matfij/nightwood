import { Controller, Param, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';
import { AuthorizedRequest } from 'src/common/definitions/requests';
import { GuildApplicationPageDto } from './model/dto/guild-application-page.dto';
import { GuildGetDto } from './model/dto/guild-get.dto';
import { GuildPageDto } from './model/dto/guild-page.dto';
import { GuildRoleCreateDto } from './model/dto/guild-role-create.dto';
import { GuildRoleDto } from './model/dto/guild-role.dto';
import { GuildDto } from './model/dto/guild.dto';
import { GuildApplicatonService } from './service/guild-application.service';
import { GuildRoleService } from './service/guild-role.service';
import { GuildService } from './service/guild.service';
import { GuildRoleUpdateDto } from './model/dto/guild-role-update.dto';
import { GuildMemberService } from './service/guild-member.service';
import { GuildMemberDto } from './model/dto/guild-member.dto';
import { GuildMemberUpdateDto } from './model/dto/guild-member-update.dto';
import { GuildUserCheckResultDto } from './model/dto/guild-user-check-result.dto';
import { GuildStructureUpgrades } from './model/dto/guild-structure-upgrades.dto';
import { GuildConstructionService } from './service/guild-construction.service';
import { GuildUpgradeStructureDto } from './model/dto/guild-upgrade-structure.dto';

@Controller('guild')
@UseGuards(JwtAuthGuard)
@ApiTags('GuildController')
export class GuildController {
    constructor(
        private guildService: GuildService,
        private guildApplicatonService: GuildApplicatonService,
        private guildRoleService: GuildRoleService,
        private guildMemberService: GuildMemberService,
        private guildConstructionService: GuildConstructionService,
    ) {}

    @Post('getDetails/:id')
    @ApiOkResponse({ type: GuildDto })
    async getDetails(@Request() req: AuthorizedRequest, @Param('id') id: number) {
        return this.guildService.getDetails(id);
    }

    @Post('getFounderGuild')
    @ApiOkResponse({ type: GuildDto })
    async getFounderGuild(@Request() req: AuthorizedRequest) {
        return this.guildService.getFounderGuild(req.user.id);
    }

    @Post('getMemberGuild')
    @ApiOkResponse({ type: GuildDto })
    async getMemberGuild(@Request() req: AuthorizedRequest) {
        return this.guildService.getMemberGuild(req.user.id);
    }

    @Post('getAll')
    @ApiOkResponse({ type: GuildPageDto })
    async getAll(@Request() req: AuthorizedRequest, @Body() dto: GuildGetDto) {
        return this.guildService.getAll(dto);
    }

    @Post('getApplications')
    @ApiOkResponse({ type: GuildApplicationPageDto })
    async getApplications(@Request() req: AuthorizedRequest) {
        return this.guildApplicatonService.getGuildApplications(req.user);
    }

    @Post('createGuildRole')
    @ApiOkResponse({ type: GuildRoleDto })
    async createGuildRole(@Request() req: AuthorizedRequest, @Body() dto: GuildRoleCreateDto) {
        return this.guildRoleService.createGuildRole(req.user, dto);
    }

    @Post('updateGuildRole')
    @ApiOkResponse({ type: GuildRoleDto })
    async updateGuildRole(@Request() req: AuthorizedRequest, @Body() dto: GuildRoleUpdateDto) {
        return this.guildRoleService.updateGuildRole(req.user, dto);
    }

    @Post('updateGuildMemberRole')
    @ApiOkResponse({ type: GuildMemberDto })
    async updateGuildMemberRole(@Request() req: AuthorizedRequest, @Body() dto: GuildMemberUpdateDto) {
        return this.guildMemberService.updateRole(req.user.id, dto);
    }

    @Post('deleteMember/:id')
    @ApiOkResponse({ type: GuildMemberDto })
    async deleteMember(@Request() req: AuthorizedRequest, @Param('id') id: number) {
        return this.guildMemberService.deleteMember(req.user.id, id);
    }

    @Post('leaveGuild')
    @ApiOkResponse()
    async leaveGuild(@Request() req: AuthorizedRequest) {
        return this.guildMemberService.leaveGuild(req.user.id);
    }

    @Post('deleteGuild')
    @ApiOkResponse()
    async deleteGuild(@Request() req: AuthorizedRequest) {
        return this.guildService.deleteGuild(req.user.id);
    }

    @Post('checkUserGuild/:id')
    @ApiOkResponse({ type: GuildUserCheckResultDto })
    async checkUserGuild(@Request() req: AuthorizedRequest, @Param('id') id: number) {
        return this.guildService.checkUserGuild(id);
    }

    @Post('getStructureUpgrades')
    @ApiOkResponse({ type: GuildStructureUpgrades })
    async getGuildStructureUpgrades() {
        return this.guildConstructionService.getGuildStructureUpgrades();
    }

    @Post('upgradeStructure')
    @ApiOkResponse()
    async upgradeStructure(@Request() req: AuthorizedRequest, @Body() dto: GuildUpgradeStructureDto) {
        return this.guildConstructionService.upgradeStructure(req.user.id, dto);
    }
}
