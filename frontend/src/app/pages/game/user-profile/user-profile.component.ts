import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AchievementDto, AchievementsController, AchievementsDto, DragonController, FriendshipRequestDto, GuildController, GuildUserCheckResultDto, UserController, UserPublicDto } from 'src/app/client/api';
import { UserControllerHelper } from 'src/app/client/api-helper';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayDragonPublic } from 'src/app/core/definitions/dragons';
import { DisplayAchievement } from 'src/app/core/definitions/items';
import { DisplayFriendshipPendingRequestDto, DisplayUserPublic } from 'src/app/core/definitions/user';
import { DragonService } from 'src/app/core/services/dragons.service';
import { EngineService } from 'src/app/core/services/engine.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {

  ownProfile = false;
  user$?: Observable<UserPublicDto>;
  avatar$?: Observable<string>;
  dragons$?: Observable<DisplayDragonPublic[]>;
  friends$?: Observable<DisplayUserPublic[]>;
  friendInvitations$?: Observable<DisplayFriendshipPendingRequestDto[]>;
  allAchievements$?: Observable<DisplayAchievement[]>;
  userAchievements$?: Observable<AchievementsDto>;
  guild$?: Observable<GuildUserCheckResultDto>;

  displayFriendInvitations: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private achievementsController: AchievementsController,
    private dragonController: DragonController,
    private userController: UserController,
    private guildController: GuildController,
    private userControllerHelper: UserControllerHelper,
    private engineService: EngineService,
    private dragonService: DragonService,
    private itemService: ItemsService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      const userId = this.engineService.user.id;
      const otherUserId = paramMap.get('id');

      if (otherUserId && userId !== +otherUserId) {
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
    this.friends$ = this.userController.getFriends().pipe(
      mergeMap((friends) => (
        forkJoin(friends.map((friend) =>
        this.userControllerHelper.getAvatarPublic(friend.id!).pipe(
          map((avatar) => ({
            ...friend,
            avatar,
          })),
    ))))));

    this.friendInvitations$ = this.userController.getPendingFriendshipRequests().pipe(
      mergeMap((invitations) => (
        forkJoin(invitations.map((invitation) =>
        this.userControllerHelper.getAvatarPublic(invitation.requesterId).pipe(
          map((avatar) => ({
            ...invitation,
            avatar,
          })),
    ))))));

    this.dragons$ = this.dragonController.getOwned().pipe(
      map((dragons) => dragons.map((dragon => this.dragonService.toDisplayDragon(dragon))))
    );

    this.guild$ = this.guildController.checkUserGuild(this.engineService.user.id);
  }

  getOtherUserData(id: string) {
    this.user$ = this.userController.getPublicData(id);
    this.avatar$ = this.userControllerHelper.getAvatarPublic(id);
    this.userAchievements$ = this.achievementsController.getUserPublicAchievements(id);
    this.friends$ = this.userController.getFriendsPublic(id).pipe(
      mergeMap((friends) => (
        forkJoin(friends.map((friend) =>
        this.userControllerHelper.getAvatarPublic(friend.id!).pipe(
          map((avatar) => ({
            ...friend,
            avatar,
          })),
    ))))));

    this.dragons$ = this.dragonController.getPublicPlayerDragons(id).pipe(
      map((dragons) => dragons.map((dragon => this.dragonService.toDisplayDragonPublic(dragon))))
    );

    this.guild$ = this.guildController.checkUserGuild(+id);
  }

  requestFriend(id: number) {
    const params: FriendshipRequestDto = {
      targetUserId: id,
    };
    this.userController.requestFriendship(params).subscribe(() => {
      this.toastService.showSuccess('common.success', 'user.friendInvitationSent');
    });
  }

  updateFriends(friendAccepted: boolean) {
    this.displayFriendInvitations = false;

    this.friendInvitations$ = this.userController.getPendingFriendshipRequests().pipe(
      mergeMap((invitations) => (
        forkJoin(invitations.map((invitation) =>
        this.userControllerHelper.getAvatarPublic(invitation.requesterId).pipe(
          map((avatar) => ({
            ...invitation,
            avatar,
          })),
    ))))));

    if (!friendAccepted) {
      this.toastService.showSuccess('common.success', 'user.requestDeclined');
      return;
    }
    this.toastService.showSuccess('common.success', 'user.requestAccepted');
    this.friends$ = this.userController.getFriends().pipe(
      mergeMap((friends) => (
        forkJoin(friends.map((friend) =>
        this.userControllerHelper.getAvatarPublic(friend.id!).pipe(
          map((avatar) => ({
            ...friend,
            avatar,
          })),
    ))))));
  }

  setAvatar(event: any) {
    if (!event.target.files[0]) return;
    this.userControllerHelper.setAvatar(event.target.files[0]).subscribe(() => {
      this.avatar$ = this.userControllerHelper.getAvatar();
      this.toastService.showSuccess('common.success', 'user.avatarSet')
      this.cdRef.detectChanges();
    });
  }

  showFriendDetails(userId: number) {
    this.router.navigate(['game', 'profile', userId]);
  }

  checkCompleted(achievement: AchievementDto, userAchievements: AchievementsDto): boolean | number {
    return userAchievements[achievement.uid as keyof AchievementsDto] >= achievement.tier;
  }

}
