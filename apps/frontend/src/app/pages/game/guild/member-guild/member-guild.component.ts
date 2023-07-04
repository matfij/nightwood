import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { ActionGuildController, GuildApplicationPageDto, GuildController, GuildDto, GuildMemberDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-member-guild',
  templateUrl: './member-guild.component.html',
  styleUrls: ['./member-guild.component.scss'],
})
export class MemberGuildComponent {
  @Input() guild!: GuildDto;
  @Output() guildLeft = new EventEmitter<boolean>();
  GuildView = GuildView;
  viewMode = GuildView.Members
  guildApplications$?: Observable<GuildApplicationPageDto>;
  processApplication$ = new Observable();
  processApplicationLoading$ = new BehaviorSubject(false);
  managedGuildMember?: GuildMemberDto;
  manageSelf = false;
  displayManageGuildMember = false;

  constructor(
    private router: Router,
    private actionGuildController: ActionGuildController,
    private guildController: GuildController,
    private toastService: ToastService,
    private engineService: EngineService,
  ) {
    this.getAppliations();
  }

  sortMembers(members: GuildMemberDto[]): GuildMemberDto[] {
    return members.sort((a, b) => (b.role?.priority || 0) - (a.role?.priority || 0));
  }

  showUserDetails(userId: number) {
    this.router.navigate(['game', 'profile', userId]);
  }

  getAppliations() {
    this.guildApplications$ = this.guildController.getApplications();
  }

  checkProcessApplicationPermission(): boolean {
    const currentUserId = this.engineService.user.id;
    return this.guild.members.some((member) => member.id = currentUserId && member.role && member.role.canAddMembers);
  }

  processApplication(applicationId: number, accept: boolean) {
    this.processApplicationLoading$.next(true);
    this.processApplication$ = this.actionGuildController.processApplication({
      applicationId: applicationId,
      accept: accept
    }).pipe(
      tap((member) => {
        this.processApplicationLoading$.next(false);
        const message = accept ? 'guild.applicationAccepted' : 'guild.applicationRejected';
        this.toastService.showSuccess('common.success', message);
        this.getAppliations();
        if (accept && member) {
          this.guild.members.push(member);
        }
      }),
      catchError((err) => {
        this.processApplicationLoading$.next(false);
        throw err;
      })
    );
  }

  checkRemoveMembersPermissions(member: GuildMemberDto): boolean {
    const currentUserId = this.engineService.user.id;
    return currentUserId === member.user.id
      || this.guild.members.some((member) => member.id = currentUserId && member.role && member.role.canRemoveMembers);
  }

  manageGuildMember(member: GuildMemberDto) {
    const currentUserId = this.engineService.user.id;
    this.manageSelf = currentUserId === member.user.id;
    this.managedGuildMember = member;
    this.displayManageGuildMember = true;
  }

  onKickMember(kickedMember: GuildMemberDto) {
    this.displayManageGuildMember = false;
    this.guild.members = this.guild.members.filter((member) => member.id !== kickedMember.id);
  }
}

enum GuildView {
  Applications,
  Members,
  Structures,
}
