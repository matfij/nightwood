import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuildController } from "./guild.controller";
import { Guild } from "./model/guild.entity";
import { GuildService } from "./service/guild.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Guild]),
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
