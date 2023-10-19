import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonBestDto } from '../../../../client/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dragon-list',
    templateUrl: './dragon-list.component.html',
    styleUrls: ['./dragon-list.component.scss'],
})
export class DragonListComponent {
    @Input() dragons$!: Observable<DragonBestDto[]>;
	@Input() isSeasonal = false;
    DRAGON_SKELETON_DATA = DRAGON_SKELETON_DATA;

    constructor(private router: Router) {}

    showUserDetails(userId: number) {
        this.router.navigate(['game/profile', userId]);
    }
}

const DRAGON_SKELETON_DATA = {
    itemCount: new Array(10),
    dragonName: 'XXXXXXX [88]',
    dragonExp: 88888,
    userName: 'XXXXXXXX',
}
