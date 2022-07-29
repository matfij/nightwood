import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonBestDto, DragonController, DragonGetDto, DragonPageDto } from 'src/app/client/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dragons$: Observable<DragonBestDto[]> = new Observable<DragonBestDto[]>();
  dragonsLoading: boolean = false;

  constructor(
    private dragonController: DragonController,
  ) {}

  ngOnInit(): void {
    this.getTopDragons();
  }

  getTopDragons() {
    this.dragons$ = this.dragonController.getBest();
  }

  showUserDetails(userId: number) {
    // todo - navigate to user profile
    console.log(userId);
  }

}
