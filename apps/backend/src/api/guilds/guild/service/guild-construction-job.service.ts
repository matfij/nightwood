import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from '../model/guild.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FORGE_UPGRADES, QUARRY_UPGRADES, SAWMILL_UPGRADES } from '../data/structure-upgrades';
import { GUILD_RESOURCES_GAIN } from '../../../../configuration/backend.config';

@Injectable()
export class GuildConstructionJobService {
    constructor(@InjectRepository(Guild) private guildRepository: Repository<Guild>) {}

    @Cron(CronExpression.EVERY_HOUR)
    async updateResources() {
        const guilds = await this.guildRepository.find();
        for (const guild of guilds) {
            guild.wood += GUILD_RESOURCES_GAIN * SAWMILL_UPGRADES[guild.sawmillLevel].utility;
            guild.stone += GUILD_RESOURCES_GAIN * QUARRY_UPGRADES[guild.quarryLevel].utility;
            guild.steel += GUILD_RESOURCES_GAIN * FORGE_UPGRADES[guild.forgeLevel].utility;
        }
        await this.guildRepository.save(guilds);
    }
}
