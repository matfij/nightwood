import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { BattleResultDto, BattleStartDto, DragonController, DragonDto } from 'src/app/client/api';
import { FADE_IN } from 'src/app/common/utils/animations';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-battle',
  templateUrl: './dragon-battle.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-battle.component.scss',
  ],
  animations: [FADE_IN],
})
export class DragonBattleComponent implements OnInit, OnDestroy {

  @Input() ownedDragon!: DragonDto;
  @Input() enemyDragon!: DragonDto;
  @Output() updatedDragon: EventEmitter<DragonDto> = new EventEmitter<DragonDto>();

  ownedDisplayDragon!: DisplayDragon;
  enemyDisplayDragon!: DisplayDragon;
  battleLoading: boolean = false;
  battleData?: BattleResultDto;
  battleLogs: string[] = [];
  battleResult?: string;
  isAutoBattle: Subject<boolean> = new Subject<boolean>();

  @ViewChild('battleLogsWrapper') battleLogsWrapper?: ElementRef;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dragonController: DragonController,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    if (!this.ownedDragon || !this.enemyDragon) { this.closeModal(); return; }

    this.ownedDisplayDragon = this.dragonService.toDisplayDragon(this.ownedDragon);
    this.enemyDisplayDragon = this.dragonService.toDisplayDragon(this.enemyDragon);

    this.startBattle();
  }

  closeModal() {
    this.updatedDragon.next(this.battleData?.ownedDragon);
  }

  startBattle() {
    if (!this.ownedDragon || !this.enemyDragon) { this.closeModal(); return; }

    const dto: BattleStartDto = {
      ownedDragonId: this.ownedDragon.id,
      enemyDragonId: this.enemyDragon.id,
    };
    this.battleLoading = true;
    this.dragonController.startBattle(dto).subscribe(result => {
      this.battleLoading = false;
      this.battleData = result;

      timer(0, 500).pipe(take(result.logs.length), takeUntil(this.isAutoBattle)).subscribe(ind => {
        this.battleLogs?.push(result.logs[ind]);
        this.changeDetectorRef.detectChanges();
        if (ind === result.logs.length - 1) {
          this.battleResult = result.result;
        }
        this.scrollLogs();
      });
    }, () =>  {
      this.battleLoading = false;
      this.closeModal();
    });
  }

  onAuto() {
    if (this.battleData) {
      this.isAutoBattle.next(true);
      this.battleLogs = this.battleData.logs;
      this.battleResult = this.battleData.result;
      this.scrollLogs();
    }
  }

  scrollLogs() {
    timer(0).subscribe(() => {
      if (this.battleLogsWrapper) {
        this.battleLogsWrapper.nativeElement.scrollTop = this.battleLogsWrapper.nativeElement.scrollHeight;
      }
    });
  }

  ngOnDestroy(): void {
    this.isAutoBattle.complete();
  }

}
