import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { GuildApplicationCreateDto } from "../model/dto/guild-application.create";
import { GuildApplicatonDto } from "../model/dto/guild-application.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { GuildApplication } from "../model/guild-application.entity";
import { GuildValidatorService } from "./guild-validator.service";

@Injectable()
export class GuildApplicatonService {
    
    constructor(
        @InjectRepository(GuildApplication)
        private guildApplicatonRepository: Repository<GuildApplication>,
        private guildValidatorService: GuildValidatorService,
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
}
