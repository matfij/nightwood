import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionController, DragonChangeNatureDto, DragonController, DragonDto, DragonNature, DragonRenameDto, DragonTamerActionDto, UserAuthDto, UserDto } from 'src/app/client/api';
import { DRAGON_NAME_MAX_LENGTH, DRAGON_NAME_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { UtilsService } from 'src/app/common/services/utils.service';
import { ValidatorService } from 'src/app/common/services/validator.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-dragon-tamer',
  templateUrl: './dragon-tamer.component.html',
  styleUrls: ['./dragon-tamer.component.scss']
})
export class DragonTamerComponent implements OnInit {

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('newNatureSelect') newNatureSelect!: ElementRef;

  user?: UserAuthDto;
  actions: DragonTamerActionDto[] = [];
  actionsLoading: boolean = false;
  dragons$: Observable<DragonDto[]> = new Observable<DragonDto[]>();

  constructor(
    private actionController: ActionController,
    private dragonController: DragonController,
    private utilsService: UtilsService,
    private toastService: ToastService,
    private validatorService: ValidatorService,
    private engineService: EngineService,
    private repositoryService: RepositoryService,
  ) {}

  get dragonNature() { return this.utilsService.enumToConst(DragonNature, 'enums.dragonNature.'); }

  ngOnInit(): void {
    this.user = this.repositoryService.getUserData();
    this.getDragonTamerActions();
    this.getOwnedDragons();
  }

  getDragonTamerActions() {
    this.actionsLoading = true;
    this.dragonController.getTamerActions().subscribe(actions => {
      this.actionsLoading = false;
      this.actions = actions;
    }, () => this.actionsLoading = false);
  }

  getOwnedDragons() {
    this.dragons$ = this.dragonController.getOwned();
  }

  performAction(action: DragonTamerActionDto, dragon: DragonDto) {
    const requiredGold = dragon.level * action.costFactor;
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
    this.actionsLoading = true;
    this.actionController.renameDragon(params).subscribe(_ => {
      this.actionsLoading = false;
      this.getOwnedDragons();
      this.engineService.tick();
    }, () => this.actionsLoading = false);
  }

  resetDragonSkills(dragon: DragonDto) {
    this.actionsLoading = true;
    this.actionController.resetDragonSkills(dragon.id.toString()).subscribe(_ => {
      this.actionsLoading = false;
      this.getOwnedDragons();
      this.engineService.tick();
    }, () => this.actionsLoading = false);
  }

  restoreDragonStamina(dragon: DragonDto) {
    this.actionsLoading = true;
    this.actionController.restoreDragonStamina(dragon.id.toString()).subscribe(_ => {
      this.actionsLoading = false;
      this.getOwnedDragons();
      this.engineService.tick();
    }, () => this.actionsLoading = false);
  }

  changeDragonNature(dragon: DragonDto) {
    const newNature = this.newNatureSelect.nativeElement.value;
    if (newNature === dragon.nature) { this.toastService.showError('errors.error', 'errors.dragonAlreadyHasThisNature'); return; }

    const params: DragonChangeNatureDto = {
      dragonId: dragon.id,
      newNature: newNature,
    };
    this.actionsLoading = true;
    this.actionController.changeDragonNature(params).subscribe(_ => {
      this.actionsLoading = false;
      this.getOwnedDragons();
      this.engineService.tick();
    }, () => this.actionsLoading = false);
  }

}
