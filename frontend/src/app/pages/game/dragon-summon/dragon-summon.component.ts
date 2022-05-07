import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthDto, DragonController, DragonSummonActionDto, ActionController, DragonSummonDto } from 'src/app/client/api';
import { DRAGON_NAME_MAX_LENGTH, DRAGON_NAME_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { ValidatorService } from 'src/app/common/services/validator.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-dragon-summon',
  templateUrl: './dragon-summon.component.html',
  styleUrls: ['./dragon-summon.component.scss']
})
export class DragonSummonComponent implements OnInit {

  user?: UserAuthDto;
  actions$: Observable<DragonSummonActionDto[]> = new Observable<DragonSummonActionDto[]>();
  actionsLoading: boolean = false;

  constructor(
    private router: Router,
    private actionController: ActionController,
    private dragonController: DragonController,
    private toastService: ToastService,
    private validatorService: ValidatorService,
    private engineService: EngineService,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.user = this.repositoryService.getUserData();
    this.getSummonActions();
  }

  getSummonActions() {
    this.actions$ = this.dragonController.getSummonActions();
  }


  summonDragon(action: DragonSummonActionDto, name: string) {
    if (!this.validatorService.checkBannedWords(name)) { return; }
    if (name.length < DRAGON_NAME_MIN_LENGTH || name.length > DRAGON_NAME_MAX_LENGTH) {
      this.toastService.showError('errors.error', 'errors.dragonNameIncorrectLength', null, { min: DRAGON_NAME_MIN_LENGTH, max: DRAGON_NAME_MAX_LENGTH });
      return;
    }
    if (this.user && this.user.gold < action.cost) { this.toastService.showError('errors.error', 'errors.insufficientsFound'); return; }

    const params: DragonSummonDto = {
      actionUid: action.uid,
      name: name,
      nature: action.nature,
    }
    this.actionsLoading = true;
    this.actionController.summonDragon(params).subscribe(_ => {
      this.toastService.showSuccess('common.success', 'dragonSummon.summonSuccess');
      this.actionsLoading = false;
      this.engineService.tick();
      this.router.navigate(['game', 'my-dragons']);
    }, () => this.actionsLoading = false);
  }

}
