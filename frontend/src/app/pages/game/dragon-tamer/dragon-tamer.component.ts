import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonController, DragonDto, DragonTamerActionDto } from 'src/app/client/api';

@Component({
  selector: 'app-dragon-tamer',
  templateUrl: './dragon-tamer.component.html',
  styleUrls: ['./dragon-tamer.component.scss']
})
export class DragonTamerComponent implements OnInit {

  actions: DragonTamerActionDto[] = [];
  actionsLoading: boolean = false;
  dragons$: Observable<DragonDto[]> = new Observable<DragonDto[]>();

  renameDragon?: number;
  renameCost: number = 0;

  constructor(
    private dragonController: DragonController,
  ) {}

  ngOnInit(): void {
    this.getDragonTamerActions();
    this.getOwnedDragons();
  }

  getDragonTamerActions() {
    this.actionsLoading = true;
    this.dragonController.getTamerActions().subscribe(actions => {
      this.actionsLoading = false;
      this.actions = actions;
    }, () => this.actionsLoading = false);
  }

  getOwnedDragons() {
    this.dragons$ = this.dragonController.getOwned();
  }

  performAction(action: DragonTamerActionDto, dragon: DragonDto) {
    // check gold
    // check required items
    console.log(action, dragon);
  }
}
