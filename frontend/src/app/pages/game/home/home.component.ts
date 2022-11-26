import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DragonBestDto, DragonController } from 'src/app/client/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  dragons$: Observable<DragonBestDto[]> = new Observable<DragonBestDto[]>();
  dragonsLoading: boolean = false;

  constructor(
    private router: Router,
    private dragonController: DragonController,
  ) {}

  ngOnInit(): void {
    this.getTopDragons();
  }

  getTopDragons() {
    this.dragons$ = this.dragonController.getBest();
  }

  showUserDetails(userId: number) {
    this.router.navigate(['game', 'profile', userId]);
  }

}
