import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { GUILD_APPLICATION_MESSAGE_MAX_LENGTH, GUILD_DESCRIPTION_MAX_LENGT, GUILD_NAME_MAX_LENGT, GUILD_NAME_MIN_LENGT, GUILD_TAG_MAX_LENGT, GUILD_TAG_MIN_LENGT } from "src/configuration/backend.config";
import { Repository } from "typeorm";
import { GuildApplicationCreateDto } from "../model/dto/guild-application.create";
import { GuildCreateDto } from "../model/dto/guild-create.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { GuildApplication } from "../model/guild-application.entity";
import { Guild } from "../model/guild.entity";

@Injectable()
export class GuildValidatorService {
    
    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        @InjectRepository(GuildApplication)
        private guildApplicatonRepository: Repository<GuildApplication>,
        private errorService: ErrorService,
    ) {}

    async validateCreateGuild(user: UserDto, dto: GuildCreateDto) {
        if (dto.name.length < GUILD_NAME_MIN_LENGT || dto.name.length > GUILD_NAME_MAX_LENGT) {
            this.errorService.throw('errors.guildNameInvalid');
        }
        if (dto.tag.length < GUILD_TAG_MIN_LENGT || dto.tag.length > GUILD_TAG_MAX_LENGT) {
            this.errorService.throw('errors.guildTagInvalid');
        }
        if (dto.description && dto.description.length > GUILD_DESCRIPTION_MAX_LENGT) {
            this.errorService.throw('errors.guildDescriptionInvalid');
        }
        if (!(await this.checkUniqueName(dto.name))) {
            this.errorService.throw('errors.guildNameNotUnique');
        }
        if (!(await this.checkUniqueTag(dto.tag))) {
            this.errorService.throw('errors.guildTagNotUnique');
        }
        if (!(await this.checkUniqueFounder(user))) {
            this.errorService.throw('errors.guildFounderNotUnique');
        }
    }

    async checkUniqueName(name: string): Promise<boolean> {
        const guilds = await this.guildRepository.find(
            { where: { name: name } }
        );
        return guilds.length === 0;
    }

    async checkUniqueTag(tag: string): Promise<boolean> {
        const guilds = await this.guildRepository.find(
            { where: { tag: tag } }
        );
        return guilds.length === 0;
    }

    async checkUniqueFounder(founder: UserDto): Promise<boolean> {
        const guilds = await this.guildRepository.find(
            { where: { founder: founder } }
        );
        return guilds.length === 0;
    }

    async validateCreateGuildApplication(user: UserDto, guild: GuildDto, dto: GuildApplicationCreateDto) {
        if (dto.message && dto.message.length > GUILD_APPLICATION_MESSAGE_MAX_LENGTH) {
            this.errorService.throw('errors.guildApplicationMessageInvalid');
        }
        if (!(await this.checkUserApplicationsEmpty(user))) {
            this.errorService.throw('errors.userAlreadyApplied');
        }
        if (await this.checkUserInGuild(user, guild)) {
            this.errorService.throw('errors.userAlreadyInThisGuild');
        }
    }

    async checkUserApplicationsEmpty(user: UserDto): Promise<boolean> {
        const applications = await this.guildApplicatonRepository.find(
            { where: { user: user } }
        );
        return applications.length === 0;
    }

    async checkUserInGuild(user: UserDto, guild: GuildDto): Promise<boolean> {
        return guild.members.map((member) => member.user.id).includes(user.id);
    }
}
