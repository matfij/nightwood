import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { ImposePenaltyDto, PenaltyType, UserAuthDto, UserRole } from 'src/app/client/api';
import { CHAT_MESSAGE_MAX_LENGTH, CHAT_MESSAGE_MIN_LENGTH } from 'src/app/client/config/frontend.config';
import { ChatMessage, ChatMode } from 'src/app/common/definitions/chat';
import { ChatService } from 'src/app/common/services/chat.service';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { ValidatorService } from 'src/app/common/services/validator.service';
import { FullPenaltyInfo } from 'src/app/core/components/shoutbox-penalty-modal/shoutbox-penalty-modal.component';

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

  penaltyMessage?: ChatMessage;
  penaltyType?: PenaltyType;
  displayPenaltyModal: boolean = false;

  @ViewChild('messagesWrapper') messagesWrapper?: ElementRef;

  PenaltyType = PenaltyType;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService,
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
    this.message$ = this.chatService.getMessages(ChatMode.General).subscribe(data => {
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
    if (!this.validatorService.checkBannedWords(this.message, true)) return;

    const chatMessage: ChatMessage = {
      date: Date.now(),
      userId: this.user.id,
      userRole: this.user.role,
      nickname: this.user.nickname,
      data: this.message,
      mode: this.chatMode,
    }
    this.chatService.sendMessage(ChatMode.General, chatMessage);
    this.message = '';
  }

  canMute(message: ChatMessage): boolean {
    return message.userRole !== UserRole.Administrator && message.userId !== this.user.id
      && (this.user.role === UserRole.Moderator || this.user.role === UserRole.Administrator);
  }

  canBan(message: ChatMessage): boolean {
    return message.userId !== this.user.id && this.user.role === UserRole.Administrator;
  }

  openPenaltyModal(message: ChatMessage, type: PenaltyType) {
    this.penaltyMessage = message;
    this.penaltyType = type;
    this.displayPenaltyModal = true;
  }

  notifyPenaltyInfo(penaltyInfo: FullPenaltyInfo) {
    this.displayPenaltyModal = false;

    const messageParams = { nickname: penaltyInfo.punishedNickname, duration: penaltyInfo.duration };
    const message = penaltyInfo.type === PenaltyType.Ban ?
      this.translateService.instant('shoutbox.banInfo', messageParams)
      : this.translateService.instant('shoutbox.muteInfo', messageParams);

    const chatMessage: ChatMessage = {
      date: Date.now(),
      userId: this.user.id,
      userRole: this.user.role,
      nickname: this.user.nickname,
      data: message,
      mode: this.chatMode,
    }
    this.chatService.sendMessage(ChatMode.General, chatMessage);
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    this.message$.unsubscribe();
  }
}
