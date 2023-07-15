import { Component, Input, OnInit } from '@angular/core';
import {
    GuildController,
    GuildDto,
    GuildStructure,
    GuildStructureUpgrades,
    StructureUpgradeDto,
} from '../../../../client/api';
import { Observable } from 'rxjs';
import { ResourceType } from './deposit-resource/deposit-resource.component';
import { DisplayBuilding } from '../../../../core/definitions/structures';
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
    upgradedBuilding?: DisplayBuilding;
    upgrade?: StructureUpgradeDto;

    ResourceType = ResourceType;

    constructor(private guildController: GuildController, private engineService: EngineService) {}

    ngOnInit() {
        this.structureUpgrades$ = this.guildController.getGuildStructureUpgrades();
        this.setGuildBuildings();
    }

    setGuildBuildings() {
        this.buildings = [
            {
                name: 'guild.sawmill',
                type: GuildStructure.Sawmill,
                icon: 'wood.svg',
                level: this.guild.sawmillLevel,
            },
            {
                name: 'guild.quarry',
                type: GuildStructure.Quarry,
                icon: 'stone.svg',
                level: this.guild.quarryLevel,
            },
            {
                name: 'guild.forge',
                type: GuildStructure.Forge,
                icon: 'steel.svg',
                level: this.guild.forgeLevel,
            },
            {
                name: 'guild.tamerTower',
                type: GuildStructure.TamerTower,
                icon: 'tower-tamer.svg',
                level: this.guild.tamerTowerLevel,
            },
            {
                name: 'guild.beaconTower',
                type: GuildStructure.BeaconTower,
                icon: 'tower-beacon.svg',
                level: this.guild.beaconTowerLevel,
            },
            {
                name: 'guild.tenacityTower',
                type: GuildStructure.TenacityTower,
                icon: 'tower-tenacity.svg',
                level: this.guild.tenacityTowerLevel,
            },
        ];
    }

    getStructureDescription(level: number, type: GuildStructure, upgrades: GuildStructureUpgrades): string {
        switch (type) {
            case GuildStructure.Sawmill:
                return upgrades.sawmillUpgrades[level].description;
            case GuildStructure.Quarry:
                return upgrades.quarryUpgrades[level].description;
            case GuildStructure.Forge:
                return upgrades.forgeUpgrades[level].description;
            case GuildStructure.TamerTower:
                return upgrades.tamerTowerUpgrades[level].description;
            case GuildStructure.BeaconTower:
                return upgrades.beaconTowerUpgrades[level].description;
            case GuildStructure.TenacityTower:
                return upgrades.tenacityTowerUpgrades[level].description;
        }
    }

    checkConstructPermission(level: number, type: GuildStructure, upgrades: GuildStructureUpgrades): boolean {
        const upgradeArrays = {
            [GuildStructure.Sawmill]: upgrades.sawmillUpgrades,
            [GuildStructure.Quarry]: upgrades.quarryUpgrades,
            [GuildStructure.Forge]: upgrades.forgeUpgrades,
            [GuildStructure.TamerTower]: upgrades.tamerTowerUpgrades,
            [GuildStructure.BeaconTower]: upgrades.beaconTowerUpgrades,
            [GuildStructure.TenacityTower]: upgrades.tenacityTowerUpgrades,
        };
        const currentUserId = this.engineService.user.id;
        return (
            level < upgradeArrays[type].length - 1 &&
            (this.guild.founder.id === currentUserId ||
                this.guild.members.some(
                    (member) => (member.id = currentUserId && member.role && member.role.canConstruct),
                ))
        );
    }

    updateGuildResource(amount: number) {
        switch (this.depositResourceType) {
            case ResourceType.Gold: {
                this.guild.gold += amount;
                break;
            }
            case ResourceType.Eter: {
                this.guild.eter += amount;
                break;
            }
        }
        this.depositResourceType = undefined;
    }

    markForUpgrade(building: DisplayBuilding, upgrades: GuildStructureUpgrades) {
        const upgradeArrays = {
            [GuildStructure.Sawmill]: upgrades.sawmillUpgrades,
            [GuildStructure.Quarry]: upgrades.quarryUpgrades,
            [GuildStructure.Forge]: upgrades.forgeUpgrades,
            [GuildStructure.TamerTower]: upgrades.tamerTowerUpgrades,
            [GuildStructure.BeaconTower]: upgrades.beaconTowerUpgrades,
            [GuildStructure.TenacityTower]: upgrades.tenacityTowerUpgrades,
        };
        this.upgradedBuilding = building;
        this.upgrade = upgradeArrays[building.type][building.level + 1];
    }

    updateGuildBuilding() {
        this.guild[this.upgradedBuilding?.type! + 'Level'] += 1;
        this.guild.gold -= this.upgrade!.gold;
        this.guild.eter -= this.upgrade!.eter;
        this.guild.wood -= this.upgrade!.wood;
        this.guild.stone -= this.upgrade!.stone;
        this.guild.steel -= this.upgrade!.steel;
        this.setGuildBuildings();
        this.upgradedBuilding = undefined;
        console.log(this.guild)
    }
}
