import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { ActionGuildController, GuildApplicationPageDto, GuildController, GuildDto, GuildRoleDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-founder-guild',
  templateUrl: './founder-guild.component.html',
  styleUrls: ['./founder-guild.component.scss'],
})
export class FounderGuildComponent {
  @Input() guild!: GuildDto;
  GuildView = GuildView;
  viewMode = GuildView.Roles;
  editedGuildRole?: GuildRoleDto;
  displayGuildRoleForm = false;
  guildApplications$?: Observable<GuildApplicationPageDto>;
  processApplication$ = new Observable();
  processApplicationLoading$ = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private toastService: ToastService,
    private actionGuildController: ActionGuildController,
    private guildController: GuildController,
  ) {
    this.getAppliations();
  }

  showUserDetails(userId: number) {
    this.router.navigate(['game', 'profile', userId]);
  }

  getAppliations() {
    this.guildApplications$ = this.guildController.getApplications();
  }

  processApplication(applicationId: number, accept: boolean) {
    this.processApplicationLoading$.next(true);
    this.processApplication$ = this.actionGuildController.processApplication({
      applicationId: applicationId,
      accept: accept
    }).pipe(
      tap(() => {
        this.processApplicationLoading$.next(false);
        const message = accept ? 'guild.applicationAccepted' : 'guild.applicationRejected';
        this.toastService.showSuccess('common.success', message);
        this.getAppliations();
      }),
      catchError((err) => {
        this.processApplicationLoading$.next(false);
        throw err;
      })
    );
  }

  sortRoles(roles: GuildRoleDto[]): GuildRoleDto[] {
    return roles.sort((a, b) => b.priority - a.priority);
  }

  parseRolePermission(allowed: boolean): string {
    return allowed ? 'assets/img/icons/allowed.svg' : 'assets/img/icons/disallowed.svg';
  }

  editRole(role: GuildRoleDto): void {
    this.editedGuildRole = role;
    console.log(this.editedGuildRole)
    this.displayGuildRoleForm = true;
  }

  onAddEditRoleClose(): void {
    this.editedGuildRole = undefined;
    this.displayGuildRoleForm = false;
  }

  onAddEditRole(newRole: GuildRoleDto): void {
    this.displayGuildRoleForm = false;
    if (newRole.id === this.editedGuildRole?.id) {
      this.guild.roles = this.guild.roles.map((role) => {
        if (newRole.id === role.id) {
          return newRole;
        };
        return role;
      });
      this.editedGuildRole = undefined;
      return;
    }
    this.guild.roles = [
      newRole,
      ...this.guild.roles
    ];
  }
}

enum GuildView {
  Applications,
  Members,
  Roles,
  Structures,
}
