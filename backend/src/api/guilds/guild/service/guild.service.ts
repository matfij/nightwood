import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { GuildCreateDto } from "../model/dto/guild-create.dto";
import { GuildGetDto } from "../model/dto/guild-get.dto";
import { GuildPageDto } from "../model/dto/guild-page.dto";
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
        const guild = await this.guildRepository.findOne({ 
            where: { id: id }, relations: ['members'] 
        });
        if (!id || !guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        return guild;
    }

    async getDetails(id: number): Promise<GuildDto> {
        const guild: GuildDto = await this.guildRepository.findOne({ 
            where: { id: id }, 
            relations: ['founder', 'members'],
            select: { 
                founder: { id: true, nickname: true }, 
                members: { user: { id: true, nickname: true } },
            }
        });
        if (!id || !guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        return guild;
    }

    async getAll(dto: GuildGetDto): Promise<GuildPageDto> {
        dto.page = Math.max(0, dto.page ?? 0);
        dto.limit = Math.max(1, dto.limit ?? 20);
        const guilds = await this.guildRepository.find({
            order: { /** TODO */ },
            skip: dto.page * dto.limit,
            take: dto.limit,
        });
        return {
            data: guilds,
            meta: { 
                totalItems: guilds.length,
            },
        };
    }
}
