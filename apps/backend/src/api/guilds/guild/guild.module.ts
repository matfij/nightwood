import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ErrorService } from "src/common/services/error.service";
import { GuildController } from "./guild.controller";
import { GuildApplication } from "./model/guild-application.entity";
import { GuildMember } from "./model/guild-member.entity";
import { GuildRole } from "./model/guild-role.entity";
import { Guild } from "./model/guild.entity";
import { GuildApplicatonService } from "./service/guild-application.service";
import { GuildMemberService } from "./service/guild-member.service";
import { GuildRoleService } from "./service/guild-role.service";
import { GuildValidatorService } from "./service/guild-validator.service";
import { GuildService } from "./service/guild.service";
import { GuildConstructionService } from "./service/guild-construction.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Guild]),
        TypeOrmModule.forFeature([GuildApplication]),
        TypeOrmModule.forFeature([GuildRole]),
        TypeOrmModule.forFeature([GuildMember]),
    ],
    controllers: [
        GuildController,
    ],
    providers: [
        GuildService,
        GuildApplicatonService,
        GuildMemberService,
        GuildRoleService,
        GuildConstructionService,
        GuildValidatorService,
        ErrorService,
    ],
    exports: [
        GuildService,
        GuildApplicatonService,
        GuildMemberService,
        GuildRoleService,
        GuildConstructionService,
        GuildValidatorService,
    ],
})
export class GuildModule {}
