import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DragonController, DragonDto, GetDragonDto, StartBattleDto } from 'src/app/client/api';
import { DateService } from 'src/app/common/services/date.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayDragon } from 'src/app/core/definitions/dragons';
import { DragonService } from 'src/app/core/services/dragons.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  enemyDragonsLoading: boolean = false;
  ownedDragonsLoading: boolean = false;
  ownedDragons: DisplayDragon[] = [];
  enemyDragons: DragonDto[] = [];
  selectedOwnedDragon?: DragonDto;
  selectedEnemyDragon?: DragonDto;

  enemyDragonPage: number = 0;
  enemyDragonLimit: number = 12;
  canGetPrev: boolean = false;
  canGetNext: boolean = true;

  battleLoading: boolean = false;
  displayBattle: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dragonController: DragonController,
    private dateService: DateService,
    private toastService: ToastService,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getOwnedDragons(+params['id']);
      this.getEnemyDragons();
    });
  }

  getOwnedDragons(selectedId?: number) {
    this.ownedDragonsLoading = true;
    this.dragonController.getOwned().subscribe(dragons => {
      this.ownedDragonsLoading = false;
      this.ownedDragons = dragons.map(dragon => this.dragonService.toDisplayDragon(dragon));

      if (selectedId) this.selectedOwnedDragon = this.ownedDragons.find(dragon => dragon.id === selectedId);
      if (!this.selectedOwnedDragon && this.ownedDragons.length > 0) this.selectedOwnedDragon = this.ownedDragons[0];
    }, () => this.ownedDragonsLoading = false);
  }

  getEnemyDragons(next?: boolean, minLevel?: number, maxLevel?: number) {
    if (next) this.enemyDragonPage += 1;
    if (next === false) this.enemyDragonPage -= 1;
    if (this.enemyDragonPage < 0) this.enemyDragonPage = 0;

    const dto: GetDragonDto = {
      page: this.enemyDragonPage,
      limit: this.enemyDragonLimit,
      minLevel: minLevel ?? 1,
      maxLevel: maxLevel ?? 9999,
    };
    this.enemyDragonsLoading = true;
    this.dragonController.getAll(dto).subscribe(dragonPage => {
      this.enemyDragonsLoading = false;
      this.enemyDragons = dragonPage.data;

      this.canGetPrev = this.enemyDragonPage !== 0;
      this.canGetNext = (this.enemyDragonPage + 1) * this.enemyDragonLimit <= dragonPage.meta.totalItems!;
    }, () => this.enemyDragonsLoading = false);
  }

  navigateAdopt() {
    this.router.navigate(['game', 'adopt-dragon']);
  }

  startBattle(enemyDragonId: number) {
    if (!this.selectedOwnedDragon && !enemyDragonId) return;
    if (this.selectedOwnedDragon!.id === enemyDragonId) { this.toastService.showError('errors.error', 'errors.battleItself'); return; }
    if (this.selectedOwnedDragon!.stamina < 1) { this.toastService.showError('errors.error', 'errors.noStamina'); return; }
    if (!this.dateService.checkIfEventAvailable(this.selectedOwnedDragon!.action.nextAction)) { this.toastService.showError('errors.error', 'errors.dragonBusy'); return; }

    this.selectedEnemyDragon = this.enemyDragons.find(dragon => dragon.id === enemyDragonId);
    if (!this.selectedEnemyDragon) return;

    this.displayBattle = true;
  }

  handleModalClose(dragon?: DragonDto) {
    if (dragon && this.selectedOwnedDragon) {
      this.selectedOwnedDragon.stamina = dragon.stamina;
    }
    this.displayBattle = false;
  }
}
