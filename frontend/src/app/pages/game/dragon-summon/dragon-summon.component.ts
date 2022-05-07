import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthDto, DragonController, DragonSummonActionDto } from 'src/app/client/api';
import { RepositoryService } from 'src/app/common/services/repository.service';

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
    private dragonController: DragonController,
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
    console.log(action, name)
  }

}
