import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DragonController, DragonDto, DragonGetDto } from 'src/app/client/api';
import { DRAGON_NAME_MAX_LENGTH, DRAGON_NAME_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { FormInputOptions } from 'src/app/common/definitions/forms';
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

  getEnemyDragons(next?: boolean, minLevel?: number, maxLevel?: number) {
    if (next === true) this.enemyDragonPage += 1;
    if (next === false) this.enemyDragonPage -= 1;
    if (this.enemyDragonPage < 0) this.enemyDragonPage = 0;

    const dto: DragonGetDto = {
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
