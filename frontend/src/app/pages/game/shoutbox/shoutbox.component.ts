import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/common/services/chat.service';

@Component({
  selector: 'app-shoutbox',
  templateUrl: './shoutbox.component.html',
  styleUrls: ['./shoutbox.component.scss']
})
export class ShoutboxComponent implements OnInit {

  message$: any;//?: Observable<string>;

  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.initializeChat();
  }

  initializeChat() {
    console.log('chat init')
    this.message$ = this.chatService.getMessage().subscribe(x => console.log(x));
  }

}
