import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AchievementDto, AchievementsController, AchievementsDto, DragonController, DragonDto, UserAuthDto, UserController, UserDto, UserPublicDto } from 'src/app/client/api';
import { UserControllerHelper } from 'src/app/client/api-helper';
import { DisplayDragon, DisplayDragonPublic } from 'src/app/core/definitions/dragons';
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

  ownProfile = false;
  user$?: Observable<UserPublicDto>;
  avatar$?: Observable<string>;
  dragons$?: Observable<DisplayDragonPublic[]>;
  allAchievements$?: Observable<DisplayAchievement[]>;
  userAchievements$?: Observable<AchievementsDto>;

  constructor(
    private route: ActivatedRoute,
    private achievementsController: AchievementsController,
    private dragonController: DragonController,
    private userController: UserController,
    private userControllerHelper: UserControllerHelper,
    private engineService: EngineService,
    private dragonService: DragonService,
    private itemService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      const otherUserId = paramMap.get('id');

      if (otherUserId) {
        this.getOtherUserData(otherUserId);
      } else {
        this.ownProfile = true;
        this.getUserData();
      }
    });

    this.allAchievements$ = this.achievementsController.getAllAchievements().pipe(
      map((achievements) => achievements.map((achievement) => this.itemService.toDisplayAchievement(achievement)))
    );
  }

  getUserData() {
    this.user$ = this.engineService.getUser();
    this.avatar$ = this.userControllerHelper.getAvatar();
    this.userAchievements$ = this.achievementsController.getUserAchievements();

    this.dragons$ = this.dragonController.getOwned().pipe(
      map((dragons) => dragons.map((dragon => this.dragonService.toDisplayDragon(dragon))))
    );
  }

  getOtherUserData(id: string) {
    this.user$ = this.userController.getPublicData(id);
    this.userAchievements$ = this.achievementsController.getUserPublicAchievements(id);

    this.dragons$ = this.dragonController.getPublicPlayerDragons(id).pipe(
      map((dragons) => dragons.map((dragon => this.dragonService.toDisplayDragonPublic(dragon))))
    );
  }

  setAvatar(event: any) {
    if (!event.target.files[0]) return;
    this.userControllerHelper.setAvatar(event.target.files[0]).subscribe(() => {
      this.avatar$ = this.userControllerHelper.getAvatar();
    });
  }

  checkCompleted(achievement: AchievementDto, userAchievements: AchievementsDto): boolean | number {
    return userAchievements[achievement.uid as keyof AchievementsDto];
  }

}
