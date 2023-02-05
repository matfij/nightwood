import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { BattleGuardianStartDto, BattleResultDto, BattleStartDto, DragonController, DragonDto, ExpeditionDto } from 'src/app/client/api';
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

  @Input() battleSpeed: number = 500;
  @Input() ownedDragon!: DragonDto;
  @Input() enemyDragon?: DragonDto;
  @Input() expedition?: ExpeditionDto;
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
    if (!this.ownedDragon || (!this.enemyDragon && ! this.expedition)) { this.closeModal(); return; }

    this.ownedDisplayDragon = this.dragonService.toDisplayDragon(this.ownedDragon);

    if (this.enemyDragon) {
      this.enemyDisplayDragon = this.dragonService.toDisplayDragon(this.enemyDragon);
      this.startBattle();
    }
    else if (this.expedition) {
      this.enemyDisplayDragon = this.dragonService.toDisplayGuardian(this.expedition.guardian);
      this.startGuardianBattle();
    }
  }

  closeModal() {
    this.updatedDragon.next(this.battleData?.ownedDragon);
  }

  startBattle() {
    if (!this.enemyDragon) { this.closeModal(); return; }

    const params: BattleStartDto = {
      ownedDragonId: this.ownedDragon.id,
      enemyDragonId: this.enemyDragon.id,
    };
    this.battleLoading = true;
    this.dragonController.startBattle(params).subscribe(result => {
      this.battleLoading = false;
      this.battleData = result;

      timer(0, this.battleSpeed).pipe(
        take(result.logs.length),
        takeUntil(this.isAutoBattle)
        ).subscribe(ind => {
          this.battleLogs?.push(result.logs[ind]);
          if (ind === result.logs.length - 1) {
            this.battleResult = result.result;
          }
          this.scrollLogs();
          this.changeDetectorRef.detectChanges();
        });
    }, () =>  {
      this.battleLoading = false;
      this.closeModal();
    });
  }

  startGuardianBattle() {
    if (!this.expedition) { this.closeModal(); return; }

    const params: BattleGuardianStartDto = {
      expeditionUid: this.expedition.uid,
      ownedDragonId: this.ownedDragon.id,
    }
    this.battleLoading = true;
    this.dragonController.startGuardianBattle(params).subscribe(result => {
      this.battleLoading = false;
      this.battleData = result;

      timer(0, this.battleSpeed).pipe(
        take(result.logs.length),
        takeUntil(this.isAutoBattle)
        ).subscribe(ind => {
          this.battleLogs?.push(result.logs[ind]);
          if (ind === result.logs.length - 1) {
            this.battleResult = result.result;
          }
          this.scrollLogs();
          this.changeDetectorRef.detectChanges();
        });
    }, () =>  {
      this.battleLoading = false;
      this.closeModal();
    });
  }

  onAuto() {
    if (!this.battleData) return;

    this.isAutoBattle.next(true);
    this.battleLogs = this.battleData.logs;
    this.battleResult = this.battleData.result;
    this.scrollLogs();
    this.changeDetectorRef.detectChanges();
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
