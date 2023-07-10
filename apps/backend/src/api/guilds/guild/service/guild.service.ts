import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { GuildCreateDto } from "../model/dto/guild-create.dto";
import { GuildGetDto } from "../model/dto/guild-get.dto";
import { GuildMemberDto } from "../model/dto/guild-member.dto";
import { GuildPageDto } from "../model/dto/guild-page.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { GuildMember } from "../model/guild-member.entity";
import { Guild } from "../model/guild.entity";
import { GuildValidatorService } from "./guild-validator.service";
import { GuildUserCheckResultDto } from "../model/dto/guild-user-check-result.dto";

@Injectable()
export class GuildService {

    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        @InjectRepository(GuildMember)
        private guildMemberRepository: Repository<GuildMember>,
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
        const guild: GuildDto = await this.guildRepository.findOne({ 
            where: { id: id }, 
            relations: ['founder', 'members', 'members.user', 'members.role'],
            select: { 
                founder: { id: true, nickname: true },
            },
        });
        if (!id || !guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        guild.members = guild.members.map((member) => {
            return {
                ...member,
                user: {
                    id: member.user.id,
                    nickname: member.user.nickname,
                }
            };
        });
        return guild;
    }

    async getDetails(id: number): Promise<GuildDto> {
        const guild: GuildDto = await this.guildRepository.findOne({ 
            where: { id: id }, 
            relations: ['founder', 'members', 'members.user'],
            select: { 
                founder: { id: true, nickname: true },
            },
        });
        if (!id || !guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        guild.members = guild.members.map((member) => {
            return {
                ...member,
                user: {
                    id: member.user.id,
                    nickname: member.user.nickname,
                }
            };
        });
        return guild;
    }

    async getFounderGuild(userId: number): Promise<GuildDto> {
        const guild: GuildDto = await this.guildRepository.findOne({ 
            where: { founder: { id: userId } },
            relations: {
                founder: true,
                members: {
                    user: true,
                    role: true,
                },
                applications: {
                    user: true,
                },
                roles: true,
            },
            select: { 
                founder: { 
                    id: true, 
                    nickname: true 
                },
                roles: true,
                members: {
                    id: true,
                    user: { id: true, nickname: true }
                }
            },
        });
        if (!guild) {
            return null;
        }
        return guild;
    }

    async getMemberGuild(userId: number): Promise<GuildDto> {
        const member: GuildMemberDto = await this.guildMemberRepository.findOne({
            where: { user: { id: userId } },
            relations: {
                guild: {
                    members: {
                        role: true,
                        user: true,
                    },
                    roles: true,
                    founder: true
                },
            },
            select: {
                guild: {
                    id: true,
                    tag: true,
                    name: true,
                    description: true,
                    roles: true,
                    gold: true,
                    eter: true,
                    wood: true,
                    stone: true,
                    steel: true,
                    founder: {
                        id: true,
                        nickname: true,
                    },
                    members: {
                        id: true,
                        role: {
                            id: true,
                            name: true,
                            priority: true,
                            canAddMembers: true,
                            canConstruct: true,
                            canRemoveMembers: true,
                        },
                        user: {
                            id: true,
                            nickname: true,
                        }
                    },
                    sawmillLevel: true,
                    quarryLevel: true,
                    forgeLevel: true,
                    tamerTowerLevel: true,
                    beaconTowerLevel: true,
                    tenacityTowerLevel: true,
                }
            }
        });
        if (!member) {
            return;
        }
        return member.guild as GuildDto;
    }

    async getAll(dto: GuildGetDto): Promise<GuildPageDto> {
        dto.page = Math.max(0, dto.page ?? 0);
        dto.limit = Math.max(1, dto.limit ?? 20);
        const guilds = await this.guildRepository.find({
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

    async deleteGuild(userId: number): Promise<void> {
        const guild = await this.guildRepository.findOne({
            where: { founder: { id: userId } }
        });
        if (!guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        await this.guildRepository.delete(guild.id);
    }

    async checkUserGuild(userId: number): Promise<GuildUserCheckResultDto> {
        if (!userId) {
            return;
        }
        const memberGuild = await this.getMemberGuild(userId);
        const founderGuild = await this.getFounderGuild(userId);
        const guildData = memberGuild || founderGuild;
        if (!guildData) {
            return;
        }
        return {
            guildId: guildData.id,
            guildName: guildData.name,
            guildTag: guildData.tag,
        }
    }
}
