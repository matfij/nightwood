import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragonController, DragonDto } from 'src/app/client/api';

@Component({
  selector: 'app-my-dragons',
  templateUrl: './my-dragons.component.html',
  styleUrls: ['./my-dragons.component.scss']
})
export class MyDragonsComponent implements OnInit {

  ownedDragons: DragonDto[] = [];
  dragonsLoading: boolean = false;

  constructor(
    private router: Router,
    private dragonController: DragonController,
  ) {}

  ngOnInit(): void {
    this.getOwnedDragons();
  }

  getOwnedDragons(): void {
    this.dragonsLoading = true;
    this.dragonController.getOwned().subscribe(dragons => {
      this.dragonsLoading = false;

      this.ownedDragons = dragons;
    }, () => this.dragonsLoading = false)
  }

  navigateAdopt() {
    this.router.navigate(['game', 'adopt-dragon']);
  }

}
