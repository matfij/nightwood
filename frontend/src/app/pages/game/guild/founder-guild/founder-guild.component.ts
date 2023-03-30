import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { GuildController, GuildDto, GuildRoleCreateDto, GuildRoleDto } from 'src/app/client/api';
import { GUILD_ROLE_NAME_MAX_LENGTH, GUILD_ROLE_NAME_MIN_LENGTH, GUILD_ROLE_PRIORITY_MAX, GUILD_ROLE_PRIORITY_MIN } from 'src/app/client/config/frontend.config';
import { FieldType, FormInputOptions } from 'src/app/common/definitions/forms';
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
  addRoleForm = new FormGroup({
    name: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(GUILD_ROLE_NAME_MIN_LENGTH), Validators.maxLength(GUILD_ROLE_NAME_MAX_LENGTH)]
    ),
    priority: new FormControl<number|null>(
      null,
      [Validators.required, Validators.min(GUILD_ROLE_PRIORITY_MIN), Validators.max(GUILD_ROLE_PRIORITY_MAX)]
    ),
    canAddMembers: new FormControl<boolean>(false),
    canRemoveMembers: new FormControl<boolean>(false),
    canConstruct: new FormControl<boolean>(false),
  });
  addRoleFormFields: FormInputOptions[] = [
    { form: this.addRoleForm, key: 'name', label: 'guild.name', type: 'text' },
    { form: this.addRoleForm, key: 'priority', label: 'guild.priority', type: 'number' },
    { form: this.addRoleForm, key: 'canAddMembers', label: 'guild.canAddMembers', fieldType: FieldType.CHECKBOX },
    { form: this.addRoleForm, key: 'canRemoveMembers', label: 'guild.canRemoveMembers', fieldType: FieldType.CHECKBOX },
    { form: this.addRoleForm, key: 'canConstruct', label: 'guild.canConstruct', fieldType: FieldType.CHECKBOX },
  ];
  createGuildRole$ = new Observable();
  createGuildLoading$ = new BehaviorSubject(false);

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private guildController: GuildController,
  ) {
    this.addRoleFormFields[1].hint = this.translateService.instant('guild.priorityHint');
  }

  sortRoles(roles: GuildRoleDto[]): GuildRoleDto[] {
    return roles.sort((a, b) => b.priority - a.priority);
  }

  createGuildRole() {
    if (!this.addRoleForm.valid) {
      return;
    }
    const params: GuildRoleCreateDto = {
      name: this.addRoleForm.value.name!,
      priority: this.addRoleForm.value.priority!,
      canAddMembers: this.addRoleForm.value.canAddMembers!,
      canRemoveMembers: this.addRoleForm.value.canRemoveMembers!,
      canConstruct: this.addRoleForm.value.canConstruct!,
    };
    this.createGuildLoading$.next(true);
    this.createGuildRole$ = this.guildController.createGuildRole(params).pipe(
      tap((role) => {
        if (role) {
          this.toastService.showSuccess('success.success', 'guild.roleCreated');
          this.addRoleForm.reset();
          this.guild.roles = [
            role,
            ...this.guild.roles
          ];
        }
        this.createGuildLoading$.next(false);
      }),
      catchError((err) => {
        this.createGuildLoading$?.next(false);
        throw err;
      })
    );
  }
}

enum GuildView {
  Members,
  Roles,
  Structures,
}
