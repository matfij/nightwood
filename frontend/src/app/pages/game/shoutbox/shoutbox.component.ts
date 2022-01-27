import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/common/services/chat.service';

@Component({
  selector: 'app-shoutbox',
  templateUrl: './shoutbox.component.html',
  styleUrls: ['./shoutbox.component.scss']
})
export class ShoutboxComponent implements OnInit {

  message$?: Observable<string>;

  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.initializeChat();
  }

  initializeChat() {
    this.message$ = this.chatService.getMessage();
  }

}
