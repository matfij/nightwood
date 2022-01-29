import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/client/api';
import { ChatService } from 'src/app/common/services/chat.service';
import { RepositoryService } from 'src/app/common/services/repository.service';

@Component({
  selector: 'app-shoutbox',
  templateUrl: './shoutbox.component.html',
  styleUrls: ['./shoutbox.component.scss']
})
export class ShoutboxComponent implements OnInit {

  user!: UserDto;
  message$?: Observable<string>;
  message: string = '';

  constructor(
    private chatService: ChatService,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.user = this.repositoryService.getUserData();
    this.initializeChat();
  }

  initializeChat() {
    this.message$ = this.chatService.getMessage();
  }

  sendMessage() {
    if (this.message.length === 0) return;
    this.chatService.sendMessage(this.message);
  }

}
