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

    constructor(private router: Router) {}

    showUserDetails(userId: number) {
        this.router.navigate(['game/profile', userId]);
    }
}
