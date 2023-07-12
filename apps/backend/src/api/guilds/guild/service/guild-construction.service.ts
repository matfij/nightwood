import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from '../model/guild.entity';
import { Repository } from 'typeorm';
import { ErrorService } from '../../../../common/services/error.service';
import { GuildStructureUpgrades } from '../model/dto/guild-structure-upgrades.dto';
import {
    BEACON_TOWER_UPGRADES,
    FORGE_UPGRADES,
    QUARRY_UPGRADES,
    SAWMILL_UPGRADES,
    TAMER_TOWER_UPGRADES,
    TENACITY_TOWER_UPGRADES,
} from '../data/structure-upgrades';

@Injectable()
export class GuildConstructionService {
    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        private errorService: ErrorService,
    ) {}

    async donateGold(guildId: number, gold: number): Promise<void> {
        const guild = await this.guildRepository.findOne({ where: { id: guildId } });
        if (!guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        guild.gold += gold;
        let g = await this.guildRepository.update(guildId, { gold: guild.gold });

    }

    async donateEter(guildId: number, eter: number): Promise<void> {
        const guild = await this.guildRepository.findOne({ where: { id: guildId } });
        if (!guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        guild.eter += eter;
        await this.guildRepository.update(guildId, { eter: guild.eter });
    }

    async getGuildStructureUpgrades(): Promise<GuildStructureUpgrades> {
        return {
            sawmillUpgrades: SAWMILL_UPGRADES,
            quarryUpgrades: QUARRY_UPGRADES,
            forgeUpgrades: FORGE_UPGRADES,
            beaconTowerUpgrades: BEACON_TOWER_UPGRADES,
            tamerTowerUpgrades: TAMER_TOWER_UPGRADES,
            tenacityTowerUpgrades: TENACITY_TOWER_UPGRADES,
        };
    }
}
