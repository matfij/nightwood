import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AchievementDto, AchievementsController, AchievementsDto, DragonController, UserAuthDto } from 'src/app/client/api';
import { UserControllerHelper } from 'src/app/client/api-helper';
import { DisplayDragon } from 'src/app/core/definitions/dragons';
import { DragonService } from 'src/app/core/services/dragons.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$?: Observable<UserAuthDto>;
  avatar$?: Observable<string>;
  dragons$?: Observable<DisplayDragon[]>;
  allAchievements$?: Observable<AchievementDto[]>;
  userAchievements$?: Observable<AchievementsDto>;

  constructor(
    private achievementsController: AchievementsController,
    private dragonController: DragonController,
    private userController: UserControllerHelper,
    private engineService: EngineService,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getDragonData();
  }

  getUserData() {
    this.user$ = this.engineService.getUser();
    this.avatar$ = this.userController.getAvatar();
    this.allAchievements$ = this.achievementsController.getAllAchievements();
    this.userAchievements$ = this.achievementsController.getUserAchievements();
  }

  getDragonData() {
    this.dragons$ = this.dragonController.getOwned().pipe(
      map((dragons) => dragons.map((dragon => this.dragonService.toDisplayDragon(dragon))))
    );
  }

  setAvatar(event: any) {
    if (!event.target.files[0]) return;
    this.userController.setAvatar(event.target.files[0]).subscribe(() => {
      this.avatar$ = this.userController.getAvatar();
    });
  }

}
