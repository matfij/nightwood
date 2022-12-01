import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActionController, DragonChangeNatureDto, DragonController, DragonDto, DragonNature, DragonRenameDto, DragonTamerActionDto, UserAuthDto } from 'src/app/client/api';
import { DRAGON_BASE_LIMIT, DRAGON_NAME_MAX_LENGTH, DRAGON_NAME_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { SelectOption } from 'src/app/common/definitions/common';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { ValidatorService } from 'src/app/common/services/validator.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-dragon-tamer',
  templateUrl: './dragon-tamer.component.html',
  styleUrls: ['./dragon-tamer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragonTamerComponent implements OnInit {

  DRAGON_BASE_LIMIT = DRAGON_BASE_LIMIT;

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('newNatureSelect') newNatureSelect!: ElementRef;

  user?: UserAuthDto;
  actions$?: Observable<DragonTamerActionDto[]>;
  dragons$?: Observable<DragonDto[]>;
  actionsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dragonsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private actionController: ActionController,
    private dragonController: DragonController,
    private toastService: ToastService,
    private validatorService: ValidatorService,
    private engineService: EngineService,
    private repositoryService: RepositoryService,
  ) {}

  get basicNatures(): SelectOption[] {
    return [
      { value: DragonNature.Fire, name: 'enums.dragonNature.Fire' },
      { value: DragonNature.Water, name: 'enums.dragonNature.Water' },
      { value: DragonNature.Wind, name: 'enums.dragonNature.Wind' },
      { value: DragonNature.Earth, name: 'enums.dragonNature.Earth' },
    ];
  }

  ngOnInit(): void {
    this.user = this.repositoryService.getUserData();
    this.getDragonTamerActions();
    this.getOwnedDragons();
  }

  getDragonTamerActions() {
    this.actionsLoading$.next(true);
    this.actions$ = this.dragonController.getTamerActions().pipe(
      tap(() => this.actionsLoading$.next(false))
    );
  }

  getOwnedDragons() {
    this.dragonsLoading$.next(true);
    this.dragons$ = this.dragonController.getOwned().pipe(
      tap(() => this.dragonsLoading$.next(false))
    );
  }

  performAction(action: DragonTamerActionDto, dragon: DragonDto) {
    this.user = this.repositoryService.getUserData();
    const requiredGold = action.baseCost + dragon.level * action.costFactor;

    if (this.user && this.user.gold < requiredGold) { this.toastService.showError('errors.error', 'errors.insufficientsFound'); return; }
    if (dragon.level < action.requiredLevel) { this.toastService.showError('errors.error', 'errors.dragonTooYoung'); return; }

    switch(action.uid) {
      case 'tamer-action-1': { this.renameDragon(dragon); break; }
      case 'tamer-action-2': { this.resetDragonSkills(dragon); break; }
      case 'tamer-action-3': { this.restoreDragonStamina(dragon); break; }
      case 'tamer-action-4': { this.changeDragonNature(dragon); break; }
      default: { this.toastService.showError('errors.error', 'errors.actionNotFound'); }
    }
  }

  renameDragon(dragon: DragonDto) {
    const newName: string = this.nameInput.nativeElement.value;
    if (!this.validatorService.checkBannedWords(newName)) { return; }
    if (newName.length < DRAGON_NAME_MIN_LENGTH || newName.length > DRAGON_NAME_MAX_LENGTH) {
      this.toastService.showError('errors.error', 'errors.dragonNameIncorrectLength', null, { min: DRAGON_NAME_MIN_LENGTH, max: DRAGON_NAME_MAX_LENGTH });
      return;
    }

    const params: DragonRenameDto = {
      dragonId: dragon.id,
      newName: newName,
    };
    this.dragonsLoading$.next(true);
    this.actionController.renameDragon(params).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'dragonTamer.dragonRenamed');
      this.getOwnedDragons();
      this.engineService.tick();
      this.nameInput.nativeElement.value = null;
    }, () => this.dragonsLoading$.next(false));
  }

  resetDragonSkills(dragon: DragonDto) {
    this.dragonsLoading$.next(true);
    this.actionController.resetDragonSkills(dragon.id.toString()).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'dragonTamer.skillsReseted');
      this.getOwnedDragons();
      this.engineService.tick();
    }, () => this.dragonsLoading$.next(false));
  }

  restoreDragonStamina(dragon: DragonDto) {
    this.dragonsLoading$.next(true);
    this.actionController.restoreDragonStamina(dragon.id.toString()).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'dragonTamer.staminaRestored');
      this.getOwnedDragons();
      this.engineService.tick();
    }, () => this.dragonsLoading$.next(false));
  }

  changeDragonNature(dragon: DragonDto) {
    const newNature = this.newNatureSelect.nativeElement.value;
    if (!newNature) return;
    if (newNature === dragon.nature) { this.toastService.showError('errors.error', 'errors.dragonAlreadyHasThisNature'); return; }

    const params: DragonChangeNatureDto = {
      dragonId: dragon.id,
      newNature: newNature,
    };
    this.dragonsLoading$.next(true);
    this.actionController.changeDragonNature(params).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'dragonTamer.natureChanged');
      this.getOwnedDragons();
      this.engineService.tick();
    }, () => this.dragonsLoading$.next(false));
  }

  performActionWithoutDragon(action: DragonTamerActionDto) {
    switch(action.uid) {
      case 'tamer-action-5': { this.extendDragonLimit(action); break; }
      default: { this.toastService.showError('errors.error', 'errors.actionNotFound'); }
    }
  }

  extendDragonLimit(action: DragonTamerActionDto) {
    this.user = this.repositoryService.getUserData();
    const requiredGold = action.baseCost;

    if (this.user && this.user.gold < requiredGold) { this.toastService.showError('errors.error', 'errors.insufficientsFound'); return; }

    this.dragonsLoading$.next(true);
    this.actionController.extendDragonLimit().subscribe(_ => {
      this.toastService.showSuccess('common.success', 'dragonTamer.dragonLimitExtended');
      this.engineService.tick();
      this.getDragonTamerActions();
      this.getOwnedDragons();
      if(this.user) this.user.maxOwnedDragons++;
    }, () => this.dragonsLoading$.next(false));
  }

}
