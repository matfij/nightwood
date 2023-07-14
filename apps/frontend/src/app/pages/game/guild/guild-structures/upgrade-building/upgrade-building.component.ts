import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StructureUpgradeDto } from '../../../../../client/api';
import { DisplayBuilding } from '../../../../../core/definitions/structures';

@Component({
    selector: 'app-upgrade-building',
    templateUrl: './upgrade-building.component.html',
    styleUrls: ['./upgrade-building.component.scss'],
})
export class UpgradeBuildingComponent {
    @Input() building!: DisplayBuilding;
    @Input() upgrade!: StructureUpgradeDto;
    @Output() close = new EventEmitter<boolean>();
    @Output() buildingUpgraded = new EventEmitter<boolean>();

    upgradeBuildingLoading$ = new BehaviorSubject(false);

    upgradeBuilding() {
        this.buildingUpgraded.next(true);
    }

    onClose() {
        this.close.next(true);
    }
}
