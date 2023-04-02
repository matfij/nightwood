import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { GuildApplicationPageDto } from "../model/dto/guild-application-page.dto";
import { GuildApplicationCreateDto } from "../model/dto/guild-application.create";
import { GuildApplicatonDto } from "../model/dto/guild-application.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { GuildApplication } from "../model/guild-application.entity";
import { Guild } from "../model/guild.entity";
import { GuildValidatorService } from "./guild-validator.service";

@Injectable()
export class GuildApplicatonService {
    
    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        @InjectRepository(GuildApplication)
        private guildApplicatonRepository: Repository<GuildApplication>,
        private guildValidatorService: GuildValidatorService,
        private errorService: ErrorService,
    ) {}

    async createGuildApplication(user: UserDto, guild: GuildDto, dto: GuildApplicationCreateDto): Promise<GuildApplicatonDto> {
        await this.guildValidatorService.validateCreateGuildApplication(user, guild, dto);
        const newGuildApplication = this.guildApplicatonRepository.create({
            user: user,
            guild: guild,
            message: dto.message,
        });
        const savedGuildApplication = await this.guildApplicatonRepository.save(newGuildApplication);
        savedGuildApplication.user = null;
        savedGuildApplication.guild = null;
        return savedGuildApplication;
    }

    async getOne(id: number): Promise<GuildApplicatonDto> {
        const application = await this.guildApplicatonRepository.findOne({
            where: { id: id },
            relations: ['guild', 'user'],
        });
        if (!application) {
            this.errorService.throw('errors.guildApplicationNotFound');
        }
        return application;
    }

    async getGuildApplications(user: UserDto): Promise<GuildApplicationPageDto> {
        const guild: GuildDto = await this.guildRepository.findOne({ 
            where: { founder: { id: user.id } } 
        });
        if (!guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        let applications: GuildApplicatonDto[] = await this.guildApplicatonRepository.find({ 
            where: { guild: { id: guild.id } }, 
            relations: ['user'], 
            select: { user: { id: true, nickname: true }} 
        });
        return {
            data: applications,
            meta: {},
        }
    }

    async delete(id: number) {
        await this.guildApplicatonRepository.delete(id);
    }
}
