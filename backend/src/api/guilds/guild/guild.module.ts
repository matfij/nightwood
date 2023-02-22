import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ErrorService } from "src/common/services/error.service";
import { GuildController } from "./guild.controller";
import { GuildApplication } from "./model/guild-application.entity";
import { GuildMember } from "./model/guild-member.entity";
import { GuildRole } from "./model/guild-role.entity";
import { Guild } from "./model/guild.entity";
import { GuildApplicatonService } from "./service/guild-application.service";
import { GuildValidatorService } from "./service/guild-validator.service";
import { GuildService } from "./service/guild.service";

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
        GuildValidatorService,
        ErrorService,
    ],
    exports: [
        GuildService,
        GuildApplicatonService,
        GuildValidatorService,
    ],
})
export class GuildModule {}
