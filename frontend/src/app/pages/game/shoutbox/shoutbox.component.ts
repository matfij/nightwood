import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { UserAuthDto, UserDto } from 'src/app/client/api';
import { CHAT_MESSAGE_MAX_LENGTH, CHAT_MESSAGE_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { ChatMessage, ChatMode } from 'src/app/common/definitions/chat';
import { ChatService } from 'src/app/common/services/chat.service';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ValidatorService } from 'src/app/common/services/validator.service';

@Component({
  selector: 'app-shoutbox',
  templateUrl: './shoutbox.component.html',
  styleUrls: ['./shoutbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoutboxComponent implements OnInit, OnDestroy {

  user!: UserAuthDto;
  message: string = '';
  message$!: Subscription;
  messages: ChatMessage[] = [];
  chatMode: ChatMode = ChatMode.General;

  @ViewChild('messagesWrapper') messagesWrapper?: ElementRef;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private chatService: ChatService,
    private repositoryService: RepositoryService,
    private validatorService: ValidatorService,
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

  changeMode(mode: ChatMode) {
    this.chatMode = mode;
    timer(0).subscribe(() => {
      if (this.messagesWrapper) {
        this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
      }
    });
  }

  sendMessage() {
    if (this.message.length < CHAT_MESSAGE_MIN_LENGTH) return;
    if (this.message.length > CHAT_MESSAGE_MAX_LENGTH) return;
    if (!this.validatorService.checkBannedWords(this.message)) return;

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
