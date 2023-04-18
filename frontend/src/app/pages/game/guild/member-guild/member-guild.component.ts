import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GuildApplicationPageDto, GuildDto, GuildMemberDto } from 'src/app/client/api';

@Component({
  selector: 'app-member-guild',
  templateUrl: './member-guild.component.html',
  styleUrls: ['./member-guild.component.scss'],
})
export class MemberGuildComponent {
  @Input() guild!: GuildDto;
  GuildView = GuildView;
  viewMode = GuildView.Members
  guildApplications$?: Observable<GuildApplicationPageDto>;
  processApplication$ = new Observable();
  processApplicationLoading$ = new BehaviorSubject(false);

  constructor(
    private router: Router
  ) {}

  sortMembers(members: GuildMemberDto[]): GuildMemberDto[] {
    return members.sort((a, b) => (b.role?.priority || 0) - (a.role?.priority || 0));
  }

  showUserDetails(userId: number) {
    this.router.navigate(['game', 'profile', userId]);
  }

  processApplication(applicationId: number, accept: boolean) {}
}

enum GuildView {
  Applications,
  Members,
  Structures,
}
