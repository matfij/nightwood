import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AchievementDto, AchievementsController, AchievementsDto, DragonController, UserAuthDto } from 'src/app/client/api';
import { UserControllerHelper } from 'src/app/client/api-helper';
import { DisplayDragon } from 'src/app/core/definitions/dragons';
import { DisplayAchievement } from 'src/app/core/definitions/items';
import { DragonService } from 'src/app/core/services/dragons.service';
import { EngineService } from 'src/app/core/services/engine.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$?: Observable<UserAuthDto>;
  avatar$?: Observable<string>;
  dragons$?: Observable<DisplayDragon[]>;
  allAchievements$?: Observable<DisplayAchievement[]>;
  userAchievements$?: Observable<AchievementsDto>;

  constructor(
    private achievementsController: AchievementsController,
    private dragonController: DragonController,
    private userController: UserControllerHelper,
    private engineService: EngineService,
    private dragonService: DragonService,
    private itemService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getDragonData();
  }

  getUserData() {
    this.user$ = this.engineService.getUser();
    this.avatar$ = this.userController.getAvatar();
    this.allAchievements$ = this.achievementsController.getAllAchievements().pipe(
      map((achievements) => achievements.map((achievement) => this.itemService.toDisplayAchievement(achievement)))
    );
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

  checkCompleted(achievement: AchievementDto, userAchievements: AchievementsDto): boolean {
    return userAchievements[achievement.uid as keyof AchievementsDto];
  }

}
