import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { GuildCreateDto } from "../model/dto/guild-create.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { Guild } from "../model/guild.entity";

@Injectable()
export class GuildService {

    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
    ) {}

    async createGuild(user: UserDto, dto: GuildCreateDto): Promise<GuildDto> {
        if (!this.checkUniqueName(dto.name) || !this.checkUniqueTag(dto.tag) || !this.checkUniqueFounder(user)) {
            return;
        }
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

    async checkUniqueName(name: string): Promise<boolean> {
        const guilds = await this.guildRepository.find({ where: { name: name } });
        return guilds.length === 0;
    }

    async checkUniqueTag(tag: string): Promise<boolean> {
        const guilds = await this.guildRepository.find({ where: { tag: tag } });
        return guilds.length === 0;
    }

    async checkUniqueFounder(founder: UserDto): Promise<boolean> {
        const guilds = await this.guildRepository.find({ where: { founder: founder } });
        return guilds.length === 0;
    }
}
