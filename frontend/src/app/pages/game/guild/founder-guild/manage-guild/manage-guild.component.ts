import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { GuildController } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-manage-guild',
  templateUrl: './manage-guild.component.html',
  styleUrls: ['./manage-guild.component.scss']
})
export class ManageGuildComponent {
  @Input() guildName!: string;
  @Output() guildDeleted = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();
  confirmDeleteInput = '';
  manageGuild$ = new Observable();
  manageGuildLoading$ = new BehaviorSubject(false);

  constructor(
    private guildController: GuildController,
    private toastService: ToastService,
  ) {}

  onDeleteGuild() {
    if (this.confirmDeleteInput !== this.guildName) {
      return;
    }
    this.manageGuildLoading$.next(true);
    this.manageGuild$ = this.guildController.deleteGuild().pipe(
      tap(() => {
        this.manageGuildLoading$.next(false);
        this.toastService.showSuccess('common.success', 'guild.guildDeleted');
        this.guildDeleted.next(true);
      }),
      catchError((err) => {
        this.manageGuildLoading$.next(false);
        throw err;
      })
    );
  }

  onClose() {
    this.close.next(true);
  }
}
