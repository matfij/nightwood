import { Injectable } from "@nestjs/common";
import { GUILD_COST_GOLD } from "src/api/guilds/guild/data/guilds";
import { GuildCreateDto } from "src/api/guilds/guild/model/dto/guild-create.dto";
import { GuildDto } from "src/api/guilds/guild/model/dto/guild.dto";
import { GuildService } from "src/api/guilds/guild/service/guild.service";
import { UserService } from "src/api/users/user/service/user.service";
import { ErrorService } from "src/common/services/error.service";

@Injectable()
export class ActionGuildService {

    constructor(
        private guildService: GuildService,
        private userService: UserService,
        private errorService: ErrorService,
    ) {}

    async createGuild(userId: number, guildCreateDto: GuildCreateDto): Promise<GuildDto> {
        const user = await this.userService.getOne(userId);

        if (!(await this.guildService.checkUniqueName(guildCreateDto.name))) {
            this.errorService.throw('errors.guildNameNotUnique');
        }
        if (!(await this.guildService.checkUniqueTag(guildCreateDto.tag))) {
            this.errorService.throw('errors.guildTagNotUnique');
        }
        if (!(await this.guildService.checkUniqueFounder(user))) {
            this.errorService.throw('errors.guildFounderNotUnique');
        }
        
        await this.userService.updateGold(userId, -GUILD_COST_GOLD);

        return this.guildService.createGuild(user, guildCreateDto);
    }
}
