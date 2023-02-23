import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionGuildController, GuildController, GuildDto, GuildPageDto } from 'src/app/client/api';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuildComponent implements OnInit {

  founderGuild$?: Observable<GuildDto>;
  memberGuild$?: Observable<GuildDto>;
  guilds$?: Observable<GuildPageDto>;
  guildPage = 0;
  guildPageLimit = 20;

  constructor(
    private actionGuildController: ActionGuildController,
    private guildController: GuildController,
  ) {}

  ngOnInit(): void {
    this.founderGuild$ = this.guildController.getFounderGuild();
    this.memberGuild$ = this.guildController.getMemberGuild();
    this.guilds$ = this.guildController.getAll({
      page: this.guildPage,
      limit: this.guildPageLimit,
    });
  }
}
