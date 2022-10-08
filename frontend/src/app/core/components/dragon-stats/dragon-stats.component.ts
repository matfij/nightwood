import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonBattleDto, DragonController, DragonDto } from 'src/app/client/api';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';

@Component({
  selector: 'app-dragon-stats',
  templateUrl: './dragon-stats.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-stats.component.scss',
  ]
})
export class DragonStatsComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DragonDto;

  statistics$: Observable<DragonBattleDto> = new Observable<DragonBattleDto>();

  constructor(
    private dragonController: DragonController,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDragonData();
  }

  getDragonData() {
    this.statistics$ = this.dragonController.calculateStatistics(this.dragon.id.toString());
  }
}
