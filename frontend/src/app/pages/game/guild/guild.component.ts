import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  ActionGuildController,
  GuildController,
  GuildDto,
  GuildPageDto,
} from 'src/app/client/api';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuildComponent implements OnInit {
  GuildView = GuildView;
  viewMode = GuildView.DefaultView;
  founderGuild$?: Observable<GuildDto>;
  memberGuild$?: Observable<GuildDto>;
  guilds$?: Observable<GuildPageDto>;
  guildPage = 0;
  guildPageLimit = 20;

  constructor(
    private actionGuildController: ActionGuildController,
    private guildController: GuildController
  ) {}

  ngOnInit(): void {
    this.founderGuild$ = this.guildController.getFounderGuild().pipe(
      tap((data) => {
        if (data) this.viewMode = GuildView.FounderView;
      })
    );
    this.memberGuild$ = this.guildController.getMemberGuild().pipe(
      tap((data) => {
        if (data) this.viewMode = GuildView.MemberView;
      })
    );
    this.guilds$ = this.guildController.getAll({
      page: this.guildPage,
      limit: this.guildPageLimit,
    });
  }

  onGuildDeleted() {
    this.guilds$ = this.guildController.getAll({
      page: this.guildPage,
      limit: this.guildPageLimit,
    });
    this.founderGuild$ = undefined;
    this.memberGuild$ = undefined;
    this.viewMode = GuildView.DefaultView;
  }

  onGuildLeft() {
    this.guilds$ = this.guildController.getAll({
      page: this.guildPage,
      limit: this.guildPageLimit,
    });
    this.founderGuild$ = undefined;
    this.memberGuild$ = undefined;
    this.viewMode = GuildView.DefaultView;
  }
}

enum GuildView {
  FounderView,
  MemberView,
  DefaultView,
}
