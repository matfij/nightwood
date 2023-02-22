import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { GuildCreateDto } from "../model/dto/guild-create.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { Guild } from "../model/guild.entity";
import { GuildValidatorService } from "./guild-validator.service";

@Injectable()
export class GuildService {

    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        private guildValidatorService: GuildValidatorService,
        private errorService: ErrorService,
    ) {}

    async createGuild(user: UserDto, dto: GuildCreateDto): Promise<GuildDto> {
        await this.guildValidatorService.validateCreateGuild(user, dto);
        const newGuild = this.guildRepository.create({
            founder: user,
            name: dto.name,
            tag: dto.tag,
            description: dto.description,
        });
        const savedGuild = await this.guildRepository.save(newGuild);
        savedGuild.founder = null;
        return savedGuild;
    }

    async getOne(id: number): Promise<GuildDto> {
        const guild = await this.guildRepository.findOne(
            { where: { id: id }, relations: ['members'] }
        );
        if (!id || !guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        return guild
    }
}
