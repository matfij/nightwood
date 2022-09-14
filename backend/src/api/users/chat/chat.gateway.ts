import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { DateService } from 'src/common/services/date.service';
import { AuthService } from '../auth/service/auth.service';
import { UserDto } from '../user/model/dto/user.dto';
import { ChatMessage, ChatMode } from './model/chat.definitions';
import { ChatService } from './service/chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  SAVED_MESSAGES_LIMIT = 100;

  chatMode: ChatMode = ChatMode.General;
  savedMessages: ChatMessage[] = [];

  @WebSocketServer()
  wsServer: Server;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private dateService: DateService,
  ) {}

  async handleConnection(socket: Socket) {
    if (!await this.authorize(socket)) return;
    socket.emit(this.chatMode, this.savedMessages);
  }

  @SubscribeMessage(ChatMode.General)
  async handleMessage(client: Socket, message: ChatMessage) {
    const user = await this.authService.getUserData(message.userId);
  
    if (user === null) return;
    if (!this.chatService.validateMessage(message.data)) return;
    if (!this.dateService.checkIfEventAvailable(user.mutedUntil)) return;

    message = {
      ...message,
      nickname: user.nickname,
      userId: user.id,
      userRole: user.role,
    }
    this.savedMessages.push(message);
    if (this.savedMessages.length > this.SAVED_MESSAGES_LIMIT) this.savedMessages.shift();
    this.wsServer.emit(this.chatMode, [message]);
  }

  async handleDisconnect(client: Socket) {
    this.disconnect(client);
  }

  private async authorize(socket: Socket): Promise<UserDto | null> {
    const userFromToken = await this.authService.getUserFromToken(socket.handshake.headers.authorization);
    const user = await this.authService.getUserData(userFromToken.id);
    if (!user) { this.disconnect(socket); return null; };
    return user;
  }

  private disconnect(socket: Socket) {
    socket.emit(ChatMode.Error, new UnauthorizedException());
    socket.disconnect();
  }
}
