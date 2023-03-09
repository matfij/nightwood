import { Component, Input } from '@angular/core';
import { GuildDto } from 'src/app/client/api';

@Component({
  selector: 'app-founder-guild',
  templateUrl: './founder-guild.component.html',
  styleUrls: ['./founder-guild.component.scss'],
})
export class FounderGuildComponent {
  @Input() guild!: GuildDto;
}
