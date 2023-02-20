import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuildController } from "./guild.controller";
import { GuildApplicaton } from "./model/guild-application.entity";
import { GuildMember } from "./model/guild-member.entity";
import { GuildRole } from "./model/guild-role.entity";
import { Guild } from "./model/guild.entity";
import { GuildService } from "./service/guild.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Guild]),
        TypeOrmModule.forFeature([GuildApplicaton]),
        TypeOrmModule.forFeature([GuildRole]),
        TypeOrmModule.forFeature([GuildMember]),
    ],
    controllers: [
        GuildController,
    ],
    providers: [
        GuildService,
    ],
    exports: [
        GuildService,
    ],
})
export class GuildModule {}
