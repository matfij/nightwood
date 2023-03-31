import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { ActionGuildController, GuildCreateDto } from 'src/app/client/api';
import { GUILD_COST, GUILD_DESCRIPTION_MAX_LENGT, GUILD_NAME_MAX_LENGT, GUILD_NAME_MIN_LENGT, GUILD_TAG_MAX_LENGT, GUILD_TAG_MIN_LENGT } from 'src/app/client/config/frontend.config';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.scss']
})
export class CreateGuildComponent {
  @Output() close = new EventEmitter();
  GUILD_COST = GUILD_COST;
  createGuildForm = new FormGroup({
    name: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(GUILD_NAME_MIN_LENGT), Validators.maxLength(GUILD_NAME_MAX_LENGT)]
    ),
    tag: new FormControl<string|null>(
      null,
      [Validators.required, Validators.minLength(GUILD_TAG_MIN_LENGT), Validators.maxLength(GUILD_TAG_MAX_LENGT)]
    ),
    description: new FormControl<string|null>(
      null,
      [Validators.max(GUILD_DESCRIPTION_MAX_LENGT)]
    ),
  });
  createGuildFormFields: FormInputOptions[] = [
    { form: this.createGuildForm, key: 'name', label: 'guild.name', type: 'text' },
    { form: this.createGuildForm, key: 'tag', label: 'guild.tag', type: 'text' },
    { form: this.createGuildForm, key: 'description', label: 'guild.description', type: 'text' },
  ];
  createGuild$ = new Observable();
  createGuildLoading$ = new BehaviorSubject(false);

  constructor(
    private actionGuildController: ActionGuildController,
    private translateService: TranslateService,
    private toastService: ToastService
  ) {
    this.createGuildFormFields[1].hint = this.translateService.instant(
      'guild.tagHint', { min: GUILD_TAG_MIN_LENGT, max: GUILD_TAG_MAX_LENGT }
    );
  }

  createGuild() {
    if (!this.createGuildForm.valid) {
      return;
    }
    const params: GuildCreateDto = {
      name: this.createGuildForm.value.name!,
      tag: this.createGuildForm.value.tag!,
      description: this.createGuildForm.value.description ?? '',
    };
    this.createGuildLoading$.next(true);
    this.createGuild$ = this.actionGuildController.createGuild(params).pipe(
      tap(() => {
        this.toastService.showSuccess('success.success', 'guild.guildFounded');
        this.close.next(true);
      }),
      catchError((err) => {
        this.createGuildLoading$?.next(false);
        throw err;
      })
    );
  }
}
