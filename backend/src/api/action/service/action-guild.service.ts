import { Injectable } from "@nestjs/common";
import { GUILD_COST_GOLD } from "src/api/guilds/guild/data/guilds";
import { GuildApplicationCreateDto } from "src/api/guilds/guild/model/dto/guild-application.create";
import { GuildApplicatonDto } from "src/api/guilds/guild/model/dto/guild-application.dto";
import { GuildCreateDto } from "src/api/guilds/guild/model/dto/guild-create.dto";
import { GuildDto } from "src/api/guilds/guild/model/dto/guild.dto";
import { GuildApplicatonService } from "src/api/guilds/guild/service/guild-application.service";
import { GuildValidatorService } from "src/api/guilds/guild/service/guild-validator.service";
import { GuildService } from "src/api/guilds/guild/service/guild.service";
import { UserService } from "src/api/users/user/service/user.service";

@Injectable()
export class ActionGuildService {

    constructor(
        private guildService: GuildService,
        private guildApplicatonService: GuildApplicatonService,
        private guildValidatorService: GuildValidatorService,
        private userService: UserService,
    ) {}

    async createGuild(userId: number, guildCreateDto: GuildCreateDto): Promise<GuildDto> {
        const user = await this.userService.getOne(userId);
        await this.guildValidatorService.validateCreateGuild(user, guildCreateDto);
        await this.userService.updateGold(userId, -GUILD_COST_GOLD);
        return this.guildService.createGuild(user, guildCreateDto);
    }

    async createGuildApplication(userId: number, guildApplicationCreateDto: GuildApplicationCreateDto): Promise<GuildApplicatonDto> {
        const user = await this.userService.getOne(userId);
        const guild = await this.guildService.getOne(guildApplicationCreateDto.guildId);
        await this.guildValidatorService.validateCreateGuildApplication(user, guild, guildApplicationCreateDto);
        return this.guildApplicatonService.createGuildApplication(user, guild, guildApplicationCreateDto);
    }
}
