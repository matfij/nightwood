import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { Repository } from "typeorm";
import { GuildMemberDto } from "../model/dto/guild-member.dto";
import { GuildDto } from "../model/dto/guild.dto";
import { GuildMember } from "../model/guild-member.entity";
import { Guild } from "../model/guild.entity";

@Injectable()
export class GuildMemberService {

    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        @InjectRepository(GuildMember)
        private guildMemberRepository: Repository<GuildMember>,
    ) {}

    async createMember(guild: GuildDto, user: UserDto): Promise<GuildMemberDto> {
        const newMember = this.guildMemberRepository.create({
            guild: guild,
            user: user,
        });
        return  await this.guildMemberRepository.save(newMember);
    }
}
