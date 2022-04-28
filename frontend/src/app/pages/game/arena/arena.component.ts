import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DragonController, DragonDto, DragonGetDto } from 'src/app/client/api';
import { DRAGON_MAX_SEARCH_LEVEL, DRAGON_MIN_SEARCH_LEVEL } from 'src/app/client/config/frontend.config';
import { DateService } from 'src/app/common/services/date.service';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  @ViewChild('searchMinLevel') searchMinLevel?: ElementRef;
  @ViewChild('searchMaxLevel') searchMaxLevel?: ElementRef;

  enemyDragonsLoading: boolean = false;
  enemyDragons: DragonDto[] = [];
  selectedOwnedDragon?: DragonDto;
  selectedEnemyDragon?: DragonDto;

  enemyDragonPage: number = 0;
  enemyDragonLimit: number = 12;
  canGetPrev: boolean = false;
  canGetNext: boolean = true;

  displayDragonChoiceModal: boolean = false;
  modalMessage: string = '';
  battleLoading: boolean = false;
  displayBattle: boolean = false;

  constructor(
    private router: Router,
    private dragonController: DragonController,
    private dateService: DateService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getEnemyDragons();
  }

  validateSearchParams(): boolean {
    const searchMinLevel = +this.searchMinLevel?.nativeElement.value;
    if (searchMinLevel) {
      if (searchMinLevel < DRAGON_MIN_SEARCH_LEVEL) return false;
      if (searchMinLevel > DRAGON_MAX_SEARCH_LEVEL) return false;
    }
    const searchMaxLevel = +this.searchMaxLevel?.nativeElement.value;
    if (searchMaxLevel) {
      if (searchMaxLevel < DRAGON_MIN_SEARCH_LEVEL) return false;
      if (searchMaxLevel > DRAGON_MAX_SEARCH_LEVEL) return false;
    }
    if (searchMinLevel && searchMaxLevel && searchMinLevel > searchMaxLevel) return false

    return true;
  }

  getEnemyDragons(next?: boolean) {
    if (!this.validateSearchParams()) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }

    if (next === true) this.enemyDragonPage += 1;
    if (next === false) this.enemyDragonPage -= 1;
    if (this.enemyDragonPage < 0) this.enemyDragonPage = 0;

    const dto: DragonGetDto = {
      page: this.enemyDragonPage,
      limit: this.enemyDragonLimit,
      minLevel: this.searchMinLevel?.nativeElement.value ? Math.floor(+this.searchMinLevel.nativeElement.value) : DRAGON_MIN_SEARCH_LEVEL,
      maxLevel: this.searchMaxLevel?.nativeElement.value ? Math.floor(+this.searchMaxLevel.nativeElement.value) : DRAGON_MAX_SEARCH_LEVEL,
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

  selectBattleDragon(enemyDragon: DragonDto) {
    this.selectedEnemyDragon = enemyDragon;
    this.displayDragonChoiceModal = true;
  }

  startBattle(selectedOwnedDragon: DragonDto) {
    this.displayDragonChoiceModal = false
    this.selectedOwnedDragon = selectedOwnedDragon;

    if (!selectedOwnedDragon || !this.selectedEnemyDragon) return;
    if (selectedOwnedDragon.id == this.selectedEnemyDragon.id) { this.toastService.showError('errors.error', 'errors.battleItself'); return; }
    if (selectedOwnedDragon.stamina < 1) { this.toastService.showError('errors.error', 'errors.noStamina'); return; }
    if (selectedOwnedDragon.battledWith.filter(id => id === this.selectedEnemyDragon!.id).length > 1) { this.toastService.showError('errors.error', 'errors.alreadyBattled'); return; }
    if (!this.dateService.checkIfEventAvailable(selectedOwnedDragon!.action.nextAction)) { this.toastService.showError('errors.error', 'errors.dragonBusy'); return; }

    this.displayBattle = true;
  }

  handleModalClose(dragon?: DragonDto) {
    if (dragon && this.selectedOwnedDragon) {
      this.selectedOwnedDragon.stamina = dragon.stamina;
    }
    this.displayBattle = false;
  }
}
