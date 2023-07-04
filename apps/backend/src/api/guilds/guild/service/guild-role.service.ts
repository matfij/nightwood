import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { GuildRoleCreateDto } from "../model/dto/guild-role-create.dto";
import { GuildRole } from "../model/guild-role.entity";
import { Guild } from "../model/guild.entity";
import { GuildValidatorService } from "./guild-validator.service";
import { GuildRoleUpdateDto } from "../model/dto/guild-role-update.dto";
import { GuildRoleDto } from "../model/dto/guild-role.dto";

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
        const guild = await this.guildValidatorService.validateCreateGuildRole(user, dto);
        const newRole = this.guildRoleRepository.create({
            name: dto.name,
            priority: dto.priority,
            canAddMembers: dto.canAddMembers || false,
            canRemoveMembers: dto.canRemoveMembers || false,
            canConstruct: dto.canConstruct || false,
            guild: guild,
        });
        const savedRole = await this.guildRoleRepository.save(newRole);
        savedRole.guild = null;
        return savedRole;
    }

    async updateGuildRole(user: UserDto, dto: GuildRoleUpdateDto): Promise<GuildRoleDto> {
        let editedRole = await this.guildValidatorService.validateUpdateGuildRole(user, dto);
        editedRole = {
            ...editedRole,
            ...dto,
        };
        await this.guildRoleRepository.update(editedRole.id, editedRole);
        return editedRole;
    }
}
