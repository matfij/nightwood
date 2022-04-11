import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonController, DragonGetDto, DragonPageDto } from 'src/app/client/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dragons$: Observable<DragonPageDto> = new Observable<DragonPageDto>();
  dragonsLoading: boolean = false;

  constructor(
    private dragonController: DragonController,
  ) {}

  ngOnInit(): void {
    this.getTopDragons();
  }

  getTopDragons() {
    const params: DragonGetDto = {
      limit: 10,
    };
    this.dragons$ = this.dragonController.getBest(params);
  }

}
