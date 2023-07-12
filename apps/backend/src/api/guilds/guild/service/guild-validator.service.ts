import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { GUILD_APPLICATION_MESSAGE_MAX_LENGTH, GUILD_DESCRIPTION_MAX_LENGT, GUILD_MAX_DEPOSIT_AMOUNT, GUILD_MIN_DEPOSIT_AMOUNT, GUILD_NAME_MAX_LENGT, GUILD_NAME_MIN_LENGT, GUILD_ROLE_NAME_MAX_LENGTH, GUILD_ROLE_NAME_MIN_LENGTH, GUILD_ROLE_PRIORITY_MAX, GUILD_ROLE_PRIORITY_MIN, GUILD_TAG_MAX_LENGT, GUILD_TAG_MIN_LENGT } from "src/configuration/backend.config";
import { Repository } from "typeorm";
import { GuildApplicationCreateDto } from "../model/dto/guild-application.create";
import { GuildCreateDto } from "../model/dto/guild-create.dto";
import { GuildRoleCreateDto } from "../model/dto/guild-role-create.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { GuildApplication } from "../model/guild-application.entity";
import { Guild } from "../model/guild.entity";
import { GuildRoleUpdateDto } from "../model/dto/guild-role-update.dto";
import { GuildRoleDto } from "../model/dto/guild-role.dto";
import { GuildRole } from "../model/guild-role.entity";
import { GuildMember } from "../model/guild-member.entity";
import { GuildMemberDto } from "../model/dto/guild-member.dto";
import { GuildDepositResourceDto } from "../model/dto/guild-deposit-resource";

@Injectable()
export class GuildValidatorService {
    
    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        @InjectRepository(GuildApplication)
        private guildApplicatonRepository: Repository<GuildApplication>,
        @InjectRepository(GuildRole)
        private guildRoleRepository: Repository<GuildRole>,
        @InjectRepository(GuildMember)
        private guildMemberRepository: Repository<GuildMember>,
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
        const guilds = await this.guildRepository.find({ 
            where: { name: name } 
        });
        return guilds.length === 0;
    }

    async checkUniqueTag(tag: string): Promise<boolean> {
        const guilds = await this.guildRepository.find({ 
            where: { tag: tag } 
        });
        return guilds.length === 0;
    }

    async checkUniqueFounder(founder: UserDto): Promise<boolean> {
        const guilds = await this.guildRepository.find({ 
            where: { founder: { id: founder.id } } 
        });
        return guilds.length === 0;
    }

    async validateCreateGuildApplication(user: UserDto, guild: GuildDto, dto: GuildApplicationCreateDto) {
        if (dto.message && dto.message.length > GUILD_APPLICATION_MESSAGE_MAX_LENGTH) {
            this.errorService.throw('errors.guildApplicationMessageInvalid');
        }
        if (await this.checkUserAppliedToGuild(user, guild)) {
            this.errorService.throw('errors.userAlreadyApplied');
        }
        if (await this.checkUserInGuild(user, guild)) {
            this.errorService.throw('errors.userAlreadyInThisGuild');
        }
    }

    async checkUserAppliedToGuild(user: UserDto, guild: GuildDto): Promise<boolean> {
        const applications = await this.guildApplicatonRepository.find({ 
            where: { guild: { id: guild.id }, user: { id: user.id } }
        });
        return applications.length !== 0;
    }

    async checkUserInGuild(user: UserDto, guild: GuildDto): Promise<boolean> {
        return user.id === guild.founder.id || guild.members.map((member) => member.user.id).includes(user.id);
    }

    async validateCreateGuildRole(user: UserDto, dto: GuildRoleCreateDto): Promise<GuildDto> {
        if (dto.name.length < GUILD_ROLE_NAME_MIN_LENGTH || dto.name.length > GUILD_ROLE_NAME_MAX_LENGTH) {
            this.errorService.throw('errors.guildRoleNameInvalid');
        }
        if (
            dto.priority < GUILD_ROLE_PRIORITY_MIN || dto.priority > GUILD_ROLE_PRIORITY_MAX
            || !Number.isInteger(+dto.priority)
        ) {
            this.errorService.throw('errors.guildRolePriorityInvalid');
        }
        const guild = await this.checkGuildFounder(user);
        if (guild.roles.map((role) => role.name).includes(dto.name)) {
            this.errorService.throw('errors.guildRoleNameNotUnique');
        }
        if (guild.roles.map((role) => +role.priority).includes(+dto.priority)) {
            this.errorService.throw('errors.guildRolePriorityNotUnique');
        }
        return guild;
    }

    async validateUpdateGuildRole(user: UserDto, dto: GuildRoleUpdateDto): Promise<GuildRoleDto> {
        if (dto.name.length < GUILD_ROLE_NAME_MIN_LENGTH || dto.name.length > GUILD_ROLE_NAME_MAX_LENGTH) {
            this.errorService.throw('errors.guildRoleNameInvalid');
        }
        if (
            dto.priority < GUILD_ROLE_PRIORITY_MIN || dto.priority > GUILD_ROLE_PRIORITY_MAX
            || !Number.isInteger(+dto.priority)
        ) {
            this.errorService.throw('errors.guildRolePriorityInvalid');
        }
        const role = await this.guildRoleRepository.findOne({ where: { id: dto.id }});
        if (!role) {
            this.errorService.throw('errors.guildRoleNotFound');
        }
        const guild = await this.checkGuildFounder(user);
        if (guild.roles.filter((role) => role.id !== dto.id).map((role) => role.name).includes(dto.name)) {
            this.errorService.throw('errors.guildRoleNameNotUnique');
        }
        if (guild.roles.filter((role) => role.id !== dto.id).map((role) => +role.priority).includes(+dto.priority)) {
            this.errorService.throw('errors.guildRolePriorityNotUnique');
        }
        return role;
    }

    async checkGuildFounder(user: UserDto): Promise<GuildDto> {
        const guild = await this.guildRepository.findOne({ 
            where: { founder: { id: user.id } },
            relations: ['roles'],
        });
        if (!guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        return guild;
    }

    async validateGuildMember(userId: number, memberId: number): Promise<GuildMemberDto> {
        const member = await this.guildMemberRepository.findOne({
            where: { id: memberId },
            relations: { guild: true, user: true },
            select: { 
                user: { id: true, nickname: true },
            },
        });
        const guild = await this.guildRepository.findOne({ 
            where: { founder: { id: userId} } 
        });
        if (!member || !guild || member.guild.id !== guild.id) {
            this.errorService.throw('errors.guildMemberNotFound');
        }
        return member;
    }
    
    async validateDeleteGuildMember(userId: number, memberId: number): Promise<GuildMemberDto> {
        const member = await this.guildMemberRepository.findOne({
            where: { id: memberId },
            relations: { guild: true, user: true },
            select: { 
                user: { id: true, nickname: true },
            },
        });
        let guild: Partial<GuildDto> = await this.guildRepository.findOne({ 
            where: { founder: { id: userId} } 
        });
        if (!guild) {
            const kickingMember: GuildMemberDto = await this.guildMemberRepository.findOne({
                where: { user: { id: userId } },
                relations: {
                    guild: true,
                    role: true,
                },
            });
            if (member?.guild?.id !== kickingMember?.guild?.id || !kickingMember?.role?.canRemoveMembers) {
                this.errorService.throw('errors.insufficientPermissions');
            }
            guild = kickingMember.guild;
        }
        if (!member || !guild || member.guild.id !== guild.id) {
            this.errorService.throw('errors.guildMemberNotFound');
        }
        return member;
    }

    async validateGuildRole(roleId: number): Promise<GuildRoleDto> {
        const role = await this.guildRoleRepository.findOne({
            where: { id: roleId }
        });
        if (!role) {
            this.errorService.throw('errors.guildRoleNotFound');
        }
        return role;
    }

    async validateCanProccessApplication(user: UserDto, guild: GuildDto) {
        if (user.id === guild.founder.id) {
            return;
        }
        if (guild.members.some((member) => member.user.id === user.id && member.role && member.role.canAddMembers)) {
            return;
        }
        this.errorService.throw('errors.insufficientPermissions');
    }

    async validateDepositResource(dto: GuildDepositResourceDto) {
        if (!dto.guildId) {
            this.errorService.throw('errors.guildNotFound');
        }
        if (dto.gold < GUILD_MIN_DEPOSIT_AMOUNT || dto.gold > GUILD_MAX_DEPOSIT_AMOUNT) {
            this.errorService.throw('errors.incorrectAmount');
        }
        if (dto.eter < GUILD_MIN_DEPOSIT_AMOUNT || dto.eter > GUILD_MAX_DEPOSIT_AMOUNT) {
            this.errorService.throw('errors.incorrectAmount');
        }
    }
}
