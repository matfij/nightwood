import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { GuildController, GuildDto, StructureUpgradeDto } from '../../../../../client/api';
import { DisplayBuilding } from '../../../../../core/definitions/structures';
import { ToastService } from '../../../../../common/services/toast.service';

@Component({
    selector: 'app-upgrade-building',
    templateUrl: './upgrade-building.component.html',
    styleUrls: ['./upgrade-building.component.scss'],
})
export class UpgradeBuildingComponent {
    @Input() guild!: GuildDto;
    @Input() building!: DisplayBuilding;
    @Input() upgrade!: StructureUpgradeDto;
    @Output() close = new EventEmitter<boolean>();
    @Output() buildingUpgraded = new EventEmitter<boolean>();

    upgradeBuilding$?: Observable<void>;
    upgradeBuildingLoading$ = new BehaviorSubject(false);

    constructor(private toastService: ToastService, private guildController: GuildController) {}

    upgradeBuilding() {
        // if (!this.checkUpgradeResources()) {
        //     this.toastService.showError('errors.error', 'errors.insufficientsFound');
        //     return;
        // }
        this.upgradeBuildingLoading$.next(true);
        this.upgradeBuilding$ = this.guildController
            .upgradeStructure({
                guildId: this.guild.id,
                structureType: this.building.type,
            })
            .pipe(
                tap(() => {
                    this.toastService.showSuccess('common.success', 'guild.buildingUpgraded');
                    this.buildingUpgraded.next(true);
                }),
                catchError((err) => {
                    this.upgradeBuildingLoading$.next(false);
                    throw err;
                }),
            );
    }

    checkUpgradeResources(): boolean {
        if (
            this.upgrade.gold > this.guild.gold ||
            this.upgrade.eter > this.guild.eter ||
            this.upgrade.wood > this.guild.wood ||
            this.upgrade.stone > this.guild.stone ||
            this.upgrade.steel > this.guild.steel
        ) {
            return false;
        }
        return true;
    }

    onClose() {
        this.close.next(true);
    }
}
