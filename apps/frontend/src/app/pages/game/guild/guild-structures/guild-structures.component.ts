import { Component, Input, OnInit } from '@angular/core';
import { GuildDto } from '../../../../client/api';
import { BehaviorSubject } from 'rxjs';
import { ResourceType } from './deposit-resource/deposit-resource.component';

@Component({
    selector: 'app-guild-structures',
    templateUrl: './guild-structures.component.html',
    styleUrls: ['./guild-structures.component.scss'],
})
export class GuildStructuresComponent implements OnInit {
    @Input() guild!: GuildDto;

    depositResourceType: ResourceType | undefined;
    displayDepositResource = false;
    buildings: DisplayBuilding[] = [];

    ngOnInit() {
        this.buildings = [
            {
                name: 'guild.sawmill',
                hint: 'guild.sawmill',
                icon: 'wood.svg',
                level: this.guild.sawmillLevel,
            },
            {
                name: 'guild.quarry',
                hint: 'guild.quarry',
                icon: 'stone.svg',
                level: this.guild.quarryLevel,
            },
            {
                name: 'guild.forge',
                hint: 'guild.forge',
                icon: 'steel.svg',
                level: this.guild.forgeLevel,
            },
            {
                name: 'guild.tamerTower',
                hint: 'guild.tamerTower',
                icon: 'tower-tamer.svg',
                level: this.guild.tamerTowerLevel,
            },
            {
                name: 'guild.beaconTower',
                hint: 'guild.beaconTower',
                icon: 'tower-beacon.svg',
                level: this.guild.beaconTowerLevel,
            },
            {
                name: 'guild.tenacityTower',
                hint: 'guild.tenacityTower',
                icon: 'tower-tenacity.svg',
                level: this.guild.tenacityTowerLevel,
            },
        ];
    }

    ResourceType = ResourceType;

    donateGold() {
        console.log('donating');
    }
}

export interface DisplayBuilding {
    name: string;
    hint: string;
    icon: string;
    level: number;
}
