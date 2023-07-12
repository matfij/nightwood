import { Injectable } from '@nestjs/common';
import { GUILD_COST_GOLD } from 'src/api/guilds/guild/data/guilds';
import { GuildApplicationProcessDto } from 'src/api/guilds/guild/model/dto/guild-application-process.dto';
import { GuildApplicationCreateDto } from 'src/api/guilds/guild/model/dto/guild-application.create';
import { GuildApplicatonDto } from 'src/api/guilds/guild/model/dto/guild-application.dto';
import { GuildCreateDto } from 'src/api/guilds/guild/model/dto/guild-create.dto';
import { GuildMemberDto } from 'src/api/guilds/guild/model/dto/guild-member.dto';
import { GuildDto } from 'src/api/guilds/guild/model/dto/guild.dto';
import { GuildApplicatonService } from 'src/api/guilds/guild/service/guild-application.service';
import { GuildMemberService } from 'src/api/guilds/guild/service/guild-member.service';
import { GuildValidatorService } from 'src/api/guilds/guild/service/guild-validator.service';
import { GuildService } from 'src/api/guilds/guild/service/guild.service';
import { MailSendSystemParams } from 'src/api/users/mail/model/definitions/mails';
import { MailService } from 'src/api/users/mail/service/mail.service';
import { UserService } from 'src/api/users/user/service/user.service';
import { GuildDepositResourceDto } from '../../guilds/guild/model/dto/guild-deposit-resource';
import { GuildConstructionService } from '../../guilds/guild/service/guild-construction.service';

@Injectable()
export class ActionGuildService {
    constructor(
        private guildService: GuildService,
        private guildApplicatonService: GuildApplicatonService,
        private guildMemberService: GuildMemberService,
        private guildConstructionService: GuildConstructionService,
        private guildValidatorService: GuildValidatorService,
        private userService: UserService,
        private mailService: MailService,
    ) {}

    async createGuild(userId: number, guildCreateDto: GuildCreateDto): Promise<GuildDto> {
        const user = await this.userService.getOne(userId);
        await this.guildValidatorService.validateCreateGuild(user, guildCreateDto);
        await this.userService.updateGold(userId, -GUILD_COST_GOLD);
        await this.guildApplicatonService.deleteUserApplications(userId);
        return this.guildService.createGuild(user, guildCreateDto);
    }

    async createGuildApplication(
        userId: number,
        guildApplicationCreateDto: GuildApplicationCreateDto,
    ): Promise<GuildApplicatonDto> {
        const user = await this.userService.getOne(userId);
        const guild = await this.guildService.getOne(guildApplicationCreateDto.guildId);
        await this.guildValidatorService.validateCreateGuildApplication(
            user,
            guild,
            guildApplicationCreateDto,
        );
        return this.guildApplicatonService.createGuildApplication(user, guild, guildApplicationCreateDto);
    }

    async processApplication(userId: number, dto: GuildApplicationProcessDto): Promise<GuildMemberDto> {
        const user = await this.userService.getOne(userId);
        const application: GuildApplicatonDto = await this.guildApplicatonService.getOne(dto.applicationId);
        const guild = await this.guildService.getOne(application.guild.id);
        await this.guildValidatorService.validateCanProccessApplication(user, guild);
        const mailParams: MailSendSystemParams = {
            receiverId: application.user.id,
            topic: 'Guild',
            message: dto.accept
                ? `Your guild application to ${guild.name} has been accepted.`
                : `Your guild application to ${guild.name} has been rejected.`,
        };
        let member = undefined;
        if (dto.accept) {
            const guild = await this.guildService.getOne(application.guild.id);
            const user = await this.userService.getOne(application.user.id);
            member = await this.guildMemberService.createMember(guild, user);
        }
        this.mailService.sendSystemMail(mailParams);
        await this.guildApplicatonService.deleteUserApplications(application.user.id);
        return member;
    }

    async depositResource(userId: number, dto: GuildDepositResourceDto): Promise<void> {
        this.guildValidatorService.validateDepositResource(dto);
        await this.userService.updateGold(userId, -dto.gold);
        await this.guildConstructionService.donateGold(dto.guildId, dto.gold);
        await this.userService.updateEter(userId, -dto.eter);
        await this.guildConstructionService.donateEter(dto.guildId, dto.eter);
    }
}
