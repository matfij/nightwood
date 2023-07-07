import { Component, Input } from '@angular/core';
import { GuildDto } from '../../../../client/api';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-guild-structures',
    templateUrl: './guild-structures.component.html',
    styleUrls: ['./guild-structures.component.scss'],
})
export class GuildStructuresComponent {
    @Input() guild!: GuildDto;

    displayDonateGold = false;
    donateGoldLoading$ = new BehaviorSubject(false);

    donateGold() {
        console.log('donating');
    }
}
