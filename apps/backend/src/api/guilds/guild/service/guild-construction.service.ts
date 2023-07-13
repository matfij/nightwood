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
import { GuildUpgradeStructureDto } from '../model/dto/guild-upgrade-structure.dto';
import { GuildValidatorService } from './guild-validator.service';
import { GuildStructure } from '../model/definitions/guild-structure';
import { StructureUpgradeDto } from '../model/dto/structure-upgrade.dto';

@Injectable()
export class GuildConstructionService {
    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        private guildValidatorService: GuildValidatorService,
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

    async upgradeStructure(userId: number, dto: GuildUpgradeStructureDto): Promise<void> {
        const upgradeArrays = {
            [GuildStructure.Sawmill]: SAWMILL_UPGRADES,
            [GuildStructure.Quarry]: QUARRY_UPGRADES,
            [GuildStructure.Forge]: FORGE_UPGRADES,
            [GuildStructure.TamerTower]: TAMER_TOWER_UPGRADES,
            [GuildStructure.BeaconTower]: BEACON_TOWER_UPGRADES,
            [GuildStructure.TenacityTower]: TENACITY_TOWER_UPGRADES,
        };
        const guild = await this.guildRepository.findOne({
            where: { id: dto.guildId },
            relations: { founder: true, members: true },
        });
        if (!guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        this.guildValidatorService.checkCanUpgrade(userId, guild);
        let nextUpgrade: StructureUpgradeDto;

        const upgradeArray = upgradeArrays[dto.structureType];
        if (!upgradeArray) {
            this.errorService.throw('errors.invalidStructureType');
        }

        if (guild[dto.structureType + 'Level'] >= upgradeArray.length) {
            this.errorService.throw('errors.maxLevelReached');
        }

        nextUpgrade = upgradeArray[guild[dto.structureType + 'Level'] + 1];
        guild[dto.structureType + 'Level'] += 1;

        this.consumeUpgradeResources(guild, nextUpgrade);

        await this.guildRepository.update(guild.id, {
            gold: guild.gold,
            eter: guild.eter,
            wood: guild.wood,
            stone: guild.stone,
            steel: guild.steel,
        });
    }

    consumeUpgradeResources(guild: Guild, upgrade: StructureUpgradeDto) {
        this.guildValidatorService.checkUpgradeResources(guild, upgrade);
        guild.gold -= upgrade.gold;
        guild.eter -= upgrade.eter;
        guild.wood -= upgrade.wood;
        guild.stone -= upgrade.stone;
        guild.steel -= upgrade.steel;
    }
}
