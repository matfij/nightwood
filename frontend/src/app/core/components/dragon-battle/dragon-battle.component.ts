import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { BattleResultDto, DragonController, DragonDto, StartBattleDto } from 'src/app/client/api';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-battle',
  templateUrl: './dragon-battle.component.html',
  styleUrls: [
    './dragon-battle.component.scss',
    '../abstract-modal/abstract-modal.component.scss',
  ],
})
export class DragonBattleComponent implements OnInit {

  @Input() ownedDragon!: DragonDto;
  @Input() enemyDragon!: DragonDto;
  @Output() updatedDragon: EventEmitter<DragonDto> = new EventEmitter<DragonDto>();

  ownedDisplayDragon!: DisplayDragon;
  enemyDisplayDragon!: DisplayDragon;
  battleLoading?: boolean;
  battleResult?: BattleResultDto;

  @ViewChild('battleLogsWrapper') battleLogsWrapper?: ElementRef;

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
    this.updatedDragon.next(this.battleResult?.ownedDragon);
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
      this.battleResult = result;

      timer(0).subscribe(() => {
        if (this.battleLogsWrapper) {
          this.battleLogsWrapper.nativeElement.scrollTop = this.battleLogsWrapper.nativeElement.scrollHeight;
        }
      });
    }, () => this.battleLoading = false);
  }

}
