import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { UserDto } from 'src/app/client/api';
import { ChatMessage, ChatMode } from 'src/app/common/definitions/chat';
import { ChatService } from 'src/app/common/services/chat.service';
import { RepositoryService } from 'src/app/common/services/repository.service';

@Component({
  selector: 'app-shoutbox',
  templateUrl: './shoutbox.component.html',
  styleUrls: ['./shoutbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoutboxComponent implements OnInit, OnDestroy {

  user!: UserDto;
  message$!: Subscription;
  messages: ChatMessage[] = [];
  message: string = '';
  chatMode: ChatMode = ChatMode.General;

  @ViewChild('messagesWrapper') messagesWrapper?: ElementRef;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private chatService: ChatService,
    private repositoryService: RepositoryService,
  ) {}

  get ChatMode() { return ChatMode; }

  ngOnInit(): void {
    this.user = this.repositoryService.getUserData();
    this.initializeChat();
  }

  initializeChat() {
    this.message$ = this.chatService.getMessage(ChatMode.General).subscribe(data => {
      this.messages.push(...data);
      timer(0).subscribe(() => {
        if (this.messagesWrapper) {
          this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
        }
      });
      this.changeDetectorRef.detectChanges();
    });
  }

  sendMessage() {
    if (this.message.length === 0) return;
    const chatMessage: ChatMessage = {
      date: Date.now(),
      nickname: this.user.nickname,
      data: this.message,
      mode: this.chatMode,
    }
    this.chatService.sendMessage(ChatMode.General, chatMessage);
    this.message = '';
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    this.message$.unsubscribe();
  }
}
