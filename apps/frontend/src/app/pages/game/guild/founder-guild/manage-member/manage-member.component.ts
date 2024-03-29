import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { GuildController, GuildMemberDto, GuildRoleDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent {
  @Input() member!: GuildMemberDto;
  @Input() roles!: GuildRoleDto[];
  @Input() canUpdatePermission = true;
  @Input() manageSelf = false;
  @Output() managedMember = new EventEmitter<GuildMemberDto>();
  @Output() kickedMember = new EventEmitter<GuildMemberDto>();
  @Output() guildLeft = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();

  @ViewChild('roleSelect') roleSelect!: ElementRef<HTMLSelectElement>;
  roles$?: Observable<GuildRoleDto>;
  manageMember$ = new Observable();
  manageMemberLoading$ = new BehaviorSubject(false);

  constructor(
    private guildController: GuildController,
    private toastService: ToastService,
  ) {}

  sortRoles(roles: GuildRoleDto[]): GuildRoleDto[] {
    return roles.sort((a, b) => b.priority - a.priority);
  }

  onManage(): void {
    this.manageMemberLoading$.next(true);
    this.manageMember$ = this.guildController.updateGuildMemberRole({
      memberId: this.member.id,
      roleId: +this.roleSelect.nativeElement.value,
    }).pipe(
      tap((member) => {
        this.toastService.showSuccess('common.success', 'guild.roleUpdated');
        this.manageMemberLoading$.next(false);
        this.managedMember.next(member);
      }),
      catchError((err) => {
        this.manageMemberLoading$.next(false);
        throw err;
      })
    );
  }

  onKickOrLeave(): void {
    this.manageSelf ? this.onLeave() : this.onKick();
  }

  onKick() {
    this.manageMemberLoading$.next(true);
    this.manageMember$ = this.guildController.deleteMember(this.member.id).pipe(
      tap((member) => {
        this.toastService.showSuccess('common.success', 'guild.memberKicked');
        this.manageMemberLoading$.next(false);
        this.kickedMember.next(member);
      }),
      catchError((err) => {
        this.manageMemberLoading$.next(false);
        throw err;
      })
    );
  }

  onLeave() {
    this.manageMemberLoading$.next(true);
    this.manageMember$ = this.guildController.leaveGuild().pipe(
      tap(() => {
        this.toastService.showSuccess('common.success', 'guild.guildLeft');
        this.manageMemberLoading$.next(false);
        this.guildLeft.next(true);
      }),
      catchError((err) => {
        this.manageMemberLoading$.next(false);
        throw err;
      })
    )
  }

  onClose(): void {
    this.close.next(false);
  }
}
