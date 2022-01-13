import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DragonController, DragonDto, StartBattleDto } from 'src/app/client/api';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-battle',
  templateUrl: './dragon-battle.component.html',
  styleUrls: ['./dragon-battle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DragonBattleComponent implements OnInit {

  @Input() ownedDragon!: DragonDto;
  @Input() enemyDragon!: DragonDto;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  ownedDisplayDragon!: DisplayDragon;
  enemyDisplayDragon!: DisplayDragon;

  battleLoading?: boolean;
  battleLogs?: string[];
  battleResult?: string;

  constructor(
    private dragonController: DragonController,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    this.battleLoading = false;

    if (!this.ownedDragon || !this.enemyDragon) { this.closeModal(); return; }

    this.ownedDisplayDragon = this.dragonService.toDisplayDragon(this.ownedDragon);
    this.enemyDisplayDragon = this.dragonService.toDisplayDragon(this.enemyDragon);

    this.startBattle();
  }

  closeModal() {
    this.close.next(true);
  }

  startBattle() {
    if (!this.ownedDragon || !this.enemyDragon) { this.closeModal(); return; }

    const dto: StartBattleDto = {
      ownedDragonId: this.ownedDragon.id,
      enemyDragonId: this.enemyDragon.id,
    };
    this.battleLoading = true;
    this.dragonController.startBattle(dto).subscribe(result => {
      this.battleLoading = false;
      this.battleLogs = result.logs;
      this.battleResult = result.result;
    }, () => this.battleLoading = false);
  }

}
