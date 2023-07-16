import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/api/users/user/model/dto/user.dto';
import { Repository } from 'typeorm';
import { GuildMemberDto } from '../model/dto/guild-member.dto';
import { GuildDto } from '../model/dto/guild.dto';
import { GuildMember } from '../model/guild-member.entity';
import { GuildMemberUpdateDto } from '../model/dto/guild-member-update.dto';
import { GuildValidatorService } from './guild-validator.service';
import { ErrorService } from 'src/common/services/error.service';
import { TAMER_TOWER_UPGRADES } from '../data/structure-upgrades';
import { UserService } from '../../../users/user/service/user.service';

@Injectable()
export class GuildMemberService {
    constructor(
        @InjectRepository(GuildMember)
        private guildMemberRepository: Repository<GuildMember>,
        private guildValidatorService: GuildValidatorService,
        private userService: UserService,
        private errorService: ErrorService,
    ) {}

    async createMember(guild: GuildDto, user: UserDto): Promise<GuildMemberDto> {
        const newMember = this.guildMemberRepository.create({
            guild: guild,
            user: user,
        });
        const savedMember = await this.guildMemberRepository.save(newMember);
        const member = this.guildMemberRepository.findOne({
            where: { id: savedMember.id },
            relations: {
                user: true,
                role: true,
            },
            select: {
                id: true,
                user: { id: true, nickname: true },
                role: {
                    id: true,
                    name: true,
                    priority: true,
                    canAddMembers: true,
                    canRemoveMembers: true,
                    canConstruct: true,
                },
            },
        });
        await this.userService.updateGuild(user.id, guild.id);
        return member;
    }

    async updateRole(userId: number, dto: GuildMemberUpdateDto): Promise<GuildMemberDto> {
        const member = await this.guildValidatorService.validateGuildMember(userId, dto.memberId);
        const newRole = await this.guildValidatorService.validateGuildRole(dto.roleId);
        member.role = newRole;
        await this.guildMemberRepository.update(member.id, member);
        return member;
    }

    async deleteMember(userId: number, memberId: number): Promise<GuildMemberDto> {
        const member = await this.guildValidatorService.validateGuildMember(userId, memberId);
        await this.guildMemberRepository.delete(member.id);
        await this.userService.updateGuild(member.user.id, null);
        return member;
    }

    async leaveGuild(userId: number): Promise<void> {
        const member = await this.guildMemberRepository.findOne({
            where: {
                user: { id: userId },
            },
        });
        if (!member) {
            this.errorService.throw('errors.guildMemberNotFound');
        }
        await this.guildMemberRepository.delete(member.id);
        await this.userService.updateGuild(userId, null);
    }
}
