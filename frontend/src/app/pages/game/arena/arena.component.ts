import { Component, OnInit } from '@angular/core';
import { DragonController, DragonDto } from 'src/app/client/api';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  dragonsLoading!: boolean;
  enemyDragons!: DragonDto[];

  constructor(
    private dragonController: DragonController,
  ) {}

  ngOnInit(): void {
    this.dragonsLoading = false;
    this.enemyDragons = [];
  }

}
