import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from '../model/guild.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FORGE_UPGRADES, QUARRY_UPGRADES, SAWMILL_UPGRADES } from '../data/structure-upgrades';
import { GUILD_RESOURCES_GAIN, GUILD_RESOURCE_LIMIT } from '../../../../configuration/backend.config';

@Injectable()
export class GuildConstructionJobService {
    constructor(@InjectRepository(Guild) private guildRepository: Repository<Guild>) {}

    @Cron(CronExpression.EVERY_30_SECONDS)
    async updateResources() {
        const guilds = await this.guildRepository.find();
        for (const guild of guilds) {
            guild.wood += Math.round(GUILD_RESOURCES_GAIN * SAWMILL_UPGRADES[guild.sawmillLevel].utility);
            guild.wood = Math.min(guild.wood, GUILD_RESOURCE_LIMIT);
            guild.stone += Math.round(GUILD_RESOURCES_GAIN * QUARRY_UPGRADES[guild.quarryLevel].utility);
            guild.stone = Math.min(guild.stone, GUILD_RESOURCE_LIMIT);
            guild.steel += Math.round(GUILD_RESOURCES_GAIN * FORGE_UPGRADES[guild.forgeLevel].utility);
            guild.steel = Math.min(guild.steel, GUILD_RESOURCE_LIMIT);
        }
        await this.guildRepository.save(guilds);
    }
}
