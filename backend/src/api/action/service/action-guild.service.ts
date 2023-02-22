import { Injectable } from "@nestjs/common";
import { GUILD_COST_GOLD } from "src/api/guilds/guild/data/guilds";
import { GuildApplicationProcessDto } from "src/api/guilds/guild/model/dto/guild-application-process.dto";
import { GuildApplicationCreateDto } from "src/api/guilds/guild/model/dto/guild-application.create";
import { GuildApplicatonDto } from "src/api/guilds/guild/model/dto/guild-application.dto";
import { GuildCreateDto } from "src/api/guilds/guild/model/dto/guild-create.dto";
import { GuildDto } from "src/api/guilds/guild/model/dto/guild.dto";
import { GuildApplicatonService } from "src/api/guilds/guild/service/guild-application.service";
import { GuildMemberService } from "src/api/guilds/guild/service/guild-member.service";
import { GuildValidatorService } from "src/api/guilds/guild/service/guild-validator.service";
import { GuildService } from "src/api/guilds/guild/service/guild.service";
import { MailSendSystemParams } from "src/api/users/mail/model/definitions/mails";
import { MailService } from "src/api/users/mail/service/mail.service";
import { UserService } from "src/api/users/user/service/user.service";

@Injectable()
export class ActionGuildService {

    constructor(
        private guildService: GuildService,
        private guildApplicatonService: GuildApplicatonService,
        private guildMemberService: GuildMemberService,
        private guildValidatorService: GuildValidatorService,
        private userService: UserService,
        private mailService: MailService,
    ) {}

    async createGuild(userId: number, guildCreateDto: GuildCreateDto): Promise<GuildDto> {
        const user = await this.userService.getOne(userId);
        await this.guildValidatorService.validateCreateGuild(user, guildCreateDto);
        await this.userService.updateGold(userId, -GUILD_COST_GOLD);
        return this.guildService.createGuild(user, guildCreateDto);
    }

    async createGuildApplication(userId: number, guildApplicationCreateDto: GuildApplicationCreateDto): Promise<GuildApplicatonDto> {
        const user = await this.userService.getOne(userId);
        const guild = await this.guildService.getOne(guildApplicationCreateDto.guildId);
        await this.guildValidatorService.validateCreateGuildApplication(user, guild, guildApplicationCreateDto);
        return this.guildApplicatonService.createGuildApplication(user, guild, guildApplicationCreateDto);
    }

    async processApplication(dto: GuildApplicationProcessDto): Promise<any> {
        const application: GuildApplicatonDto = await this.guildApplicatonService.getOne(dto.applicationId);
        const mailParams: MailSendSystemParams = {
            receiverId: application.user.id,
            topic: 'Guild',
            message: dto.accept ? `Your guild application has been accepted.` : `Your guild application has been rejected.`,
        };
        if (dto.accept) {
            const guild = await this.guildService.getOne(application.guild.id);
            const user = await this.userService.getOne(application.user.id)
            await this.guildMemberService.createMember(guild, user);
        }
        this.mailService.sendSystemMail(mailParams);
        await this.guildApplicatonService.delete(application.id);
    }
}
