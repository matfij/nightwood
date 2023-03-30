import { Component, Input } from '@angular/core';
import { GuildDto } from 'src/app/client/api';

@Component({
  selector: 'app-no-guild',
  templateUrl: './no-guild.component.html',
  styleUrls: ['./no-guild.component.scss']
})
export class NoGuildComponent {
  @Input() guilds!: GuildDto[];

  displayCreateGuild = false;
}
