import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, catchError, tap } from 'rxjs';
import { GuildController, GuildRoleCreateDto, GuildRoleDto } from 'src/app/client/api';
import { GUILD_ROLE_NAME_MIN_LENGTH, GUILD_ROLE_NAME_MAX_LENGTH, GUILD_ROLE_PRIORITY_MIN, GUILD_ROLE_PRIORITY_MAX } from 'src/app/client/config/frontend.config';
import { FormInputOptions, FieldType } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {
  @Input() guildRole?: GuildRoleDto;
  @Output() newRole = new EventEmitter<GuildRoleDto>();
  @Output() close = new EventEmitter<boolean>();

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
  createGuildRoleLoading$ = new BehaviorSubject(false);

  constructor(
    private guildController: GuildController,
    private translateService: TranslateService,
    private toastService: ToastService,
  ) {
    this.addRoleFormFields[1].hint = this.translateService.instant('guild.priorityHint');
  }

  ngOnInit(): void {
    if (!this.guildRole) {
      return;
    }
    this.addRoleForm.patchValue({
      name: this.guildRole.name,
      priority: this.guildRole.priority,
      canAddMembers: this.guildRole.canAddMembers,
      canRemoveMembers: this.guildRole.canRemoveMembers,
      canConstruct: this.guildRole.canConstruct,
    });
  }

  onSubmit() {
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
    if (this.guildRole) {
      this.updateGuildRole(params);
    } else {
      this.createGuildRole(params);
    }
  }

  createGuildRole(params: GuildRoleCreateDto) {
    this.createGuildRoleLoading$.next(true);
    this.createGuildRole$ = this.guildController.createGuildRole(params).pipe(
      tap((role) => {
        if (role) {
          this.toastService.showSuccess('common.success', 'guild.roleCreated');
          this.addRoleForm.reset();
          this.newRole.next(role);
        }
        this.createGuildRoleLoading$.next(false);
      }),
      catchError((err) => {
        this.createGuildRoleLoading$?.next(false);
        throw err;
      })
    );
  }

  updateGuildRole(params: GuildRoleCreateDto) {
    this.createGuildRoleLoading$.next(true);
    this.createGuildRole$ = this.guildController.updateGuildRole({
      id: this.guildRole!.id,
      ...params
    }).pipe(
      tap((role) => {
        if (role) {
          this.toastService.showSuccess('common.success', 'guild.roleUpdated');
          this.addRoleForm.reset();
          this.newRole.next(role);
        }
        this.createGuildRoleLoading$.next(false);
      }),
      catchError((err) => {
        this.createGuildRoleLoading$?.next(false);
        throw err;
      })
    );
  }

  onClose() {
    this.close.next(true);
  }
}
