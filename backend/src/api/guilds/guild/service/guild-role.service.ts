import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { GuildRoleCreateDto } from "../model/dto/guild-role-create.dto";
import { GuildRole } from "../model/guild-role.entity";
import { Guild } from "../model/guild.entity";
import { GuildValidatorService } from "./guild-validator.service";

@Injectable()
export class GuildRoleService {

    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        @InjectRepository(GuildRole)
        private guildRoleRepository: Repository<GuildRole>,
        private guildValidatorService: GuildValidatorService,
    ) {}

    async createGuildRole(user: UserDto, dto: GuildRoleCreateDto): Promise<GuildRole> {
        await this.guildValidatorService.validateCreateGuildRole(user, dto);
        const newRole = this.guildRoleRepository.create({
            name: dto.name,
            priority: dto.priority,
            canAddMembers: dto.canAddMembers,
            canRemoveMembers: dto.canRemoveMembers,
            canConstruct: dto.canConstruct,
        });
        const savedRole = await this.guildRoleRepository.save(newRole);
        savedRole.guild = null;
        return savedRole;
    }
}
