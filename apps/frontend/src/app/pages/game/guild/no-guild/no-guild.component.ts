import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { ActionGuildController, GuildDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-no-guild',
  templateUrl: './no-guild.component.html',
  styleUrls: ['./no-guild.component.scss']
})
export class NoGuildComponent {
  @Input() guilds!: GuildDto[];
  @Output() guildCreated = new EventEmitter();

  displayCreateGuild = false;
  createGuildApplication$ = new Observable();
  createGuildApplicationLoading$ = new BehaviorSubject(false);

  constructor(
    private actionGuildController: ActionGuildController,
    private toastService: ToastService,
  ) {}

  apply(guildId: number, guildName: string) {
    this.createGuildApplicationLoading$.next(true);
    this.createGuildApplication$ = this.actionGuildController.createGuildApplication({
      guildId: guildId,
      message: '',
    }).pipe(
      tap(() => {
        this.createGuildApplicationLoading$.next(false);
        this.toastService.showSuccess('common.success', 'guild.applicationCreated', {}, { guild: guildName });
      }),
      catchError((err) => {
        this.createGuildApplicationLoading$.next(false);
        throw err;
      })
    );

  }
}
