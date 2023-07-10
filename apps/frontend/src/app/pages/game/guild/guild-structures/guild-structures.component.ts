import { Component, Input, OnInit } from '@angular/core';
import {
    GuildController,
    GuildDto,
    GuildStructureUpgrades,
    StructureUpgradeDto,
} from '../../../../client/api';
import { Observable } from 'rxjs';
import { ResourceType } from './deposit-resource/deposit-resource.component';
import { DisplayBuilding, StructureType } from '../../../../core/definitions/structures';
import { EngineService } from '../../../../core/services/engine.service';

@Component({
    selector: 'app-guild-structures',
    templateUrl: './guild-structures.component.html',
    styleUrls: ['./guild-structures.component.scss'],
})
export class GuildStructuresComponent implements OnInit {
    @Input() guild!: GuildDto;

    structureUpgrades$?: Observable<GuildStructureUpgrades>;
    depositResourceType: ResourceType | undefined;
    displayDepositResource = false;
    buildings: DisplayBuilding[] = [];

    ResourceType = ResourceType;

    constructor(private guildController: GuildController, private engineService: EngineService) {}

    ngOnInit() {
        this.structureUpgrades$ = this.guildController.getGuildStructureUpgrades();
        this.buildings = [
            {
                name: 'guild.sawmill',
                type: StructureType.Sawmill,
                icon: 'wood.svg',
                level: this.guild.sawmillLevel,
            },
            {
                name: 'guild.quarry',
                type: StructureType.Quarry,
                icon: 'stone.svg',
                level: this.guild.quarryLevel,
            },
            {
                name: 'guild.forge',
                type: StructureType.Forge,
                icon: 'steel.svg',
                level: this.guild.forgeLevel,
            },
            {
                name: 'guild.tamerTower',
                type: StructureType.TamerTower,
                icon: 'tower-tamer.svg',
                level: this.guild.tamerTowerLevel,
            },
            {
                name: 'guild.beaconTower',
                type: StructureType.BeaconTower,
                icon: 'tower-beacon.svg',
                level: this.guild.beaconTowerLevel,
            },
            {
                name: 'guild.tenacityTower',
                type: StructureType.TenacityTower,
                icon: 'tower-tenacity.svg',
                level: this.guild.tenacityTowerLevel,
            },
        ];
    }

    getStructuredescription(level: number, type: StructureType, upgrades: GuildStructureUpgrades): string {
        switch (type) {
            case StructureType.Sawmill:
                return upgrades.sawmillUpgrades[level].description;
            case StructureType.Quarry:
                return upgrades.quarryUpgrades[level].description;
            case StructureType.Forge:
                return upgrades.forgeUpgrades[level].description;
            case StructureType.TamerTower:
                return upgrades.tamerTowerUpgrades[level].description;
            case StructureType.BeaconTower:
                return upgrades.beaconTowerUpgrades[level].description;
            case StructureType.TenacityTower:
                return upgrades.tenacityTowerUpgrades[level].description;
        }
    }

    checkConstructPermission(): boolean {
        const currentUserId = this.engineService.user.id;
        return (
            this.guild.founder.id === currentUserId ||
            this.guild.members.some(
                (member) => (member.id = currentUserId && member.role && member.role.canConstruct),
            )
        );
    }

    donateGold() {
        console.log('donating');
    }
}
