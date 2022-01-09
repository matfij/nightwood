import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragonController, DragonDto, StartBattleDto } from 'src/app/client/api';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-battle',
  templateUrl: './dragon-battle.component.html',
  styleUrls: ['./dragon-battle.component.scss']
})
export class DragonBattleComponent implements OnInit {

  @Input() ownedDragon!: DragonDto;
  @Input() enemyDragon!: DragonDto;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  ownedDisplayDragon!: DisplayDragon;
  enemyDisplayDragon!: DisplayDragon;

  constructor(
    private dragonController: DragonController,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    if (!this.ownedDragon || !this.enemyDragon) { this.closeModal(); return; }

    this.ownedDisplayDragon = this.dragonService.toDisplayDragon(this.ownedDragon);
    this.enemyDisplayDragon = this.dragonService.toDisplayDragon(this.ownedDragon);
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
    this.dragonController.startBattle(dto).subscribe(result => {
      console.log(result);
    });
  }

}
